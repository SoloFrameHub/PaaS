'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { WellnessProfile } from '@/types/wellness-profile'

export default function ProfileEditor() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<Partial<WellnessProfile>>({})
  const [activeTab, setActiveTab] = useState<'basics' | 'wellness' | 'preferences'>('basics')

  useEffect(() => {
    const controller = new AbortController()
    async function fetchProfile() {
      try {
        const res = await fetch('/api/profile', { signal: controller.signal })
        if (res.ok) {
          const { data } = await res.json()
          setProfile(data.profile || data)
        }
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Failed to load profile', error)
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    fetchProfile()
    return () => controller.abort()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      })
      if (!res.ok) throw new Error('Failed to update')
      router.refresh()
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Failed to save profile changes.')
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof WellnessProfile, value: unknown) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const updateQuestionnaire = (field: string, value: unknown) => {
    setProfile(prev => ({
      ...prev,
      questionnaire: {
        ...prev.questionnaire,
        [field]: value
      } as WellnessProfile['questionnaire']
    }))
  }

  if (loading) return <div className="p-6">Loading profile...</div>

  return (
    <div className="grow bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold">Profile & Settings</h2>
          <div className="flex space-x-2">
            {['basics', 'wellness', 'preferences'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'basics' | 'wellness' | 'preferences')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab
                  ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'basics' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">About You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Display Name</label>
                  <input
                    className="form-input w-full"
                    type="text"
                    value={profile.name || ''}
                    onChange={e => updateField('name', e.target.value)}
                    placeholder="How should we address you?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    className="form-input w-full"
                    type="email"
                    value={profile.email || ''}
                    disabled
                    placeholder="Your email"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed here.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'wellness' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Wellness Focus</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                This information helps personalize your learning experience and AI coach recommendations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Primary Focus Area</label>
                  <select
                    className="form-select w-full"
                    value={profile.questionnaire?.primarySymptoms?.[0]?.category || ''}
                    onChange={e => updateQuestionnaire('primarySymptoms', e.target.value ? [{ category: e.target.value, severity: 'moderate' as const }] : [])}
                  >
                    <option value="">Select...</option>
                    <option value="anxiety">Anxiety</option>
                    <option value="depression">Depression</option>
                    <option value="sleep">Sleep Issues</option>
                    <option value="stress">Stress Management</option>
                    <option value="social-anxiety">Social Anxiety</option>
                    <option value="panic">Panic Attacks</option>
                    <option value="grief">Grief & Loss</option>
                    <option value="anger">Anger Management</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Wellness Goals</label>
                  <input
                    className="form-input w-full"
                    type="text"
                    value={profile.questionnaire?.wellnessGoals?.join(', ') || ''}
                    onChange={e => updateQuestionnaire('wellnessGoals', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                    placeholder="e.g. Better sleep, reduce anxiety, build coping skills"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Update Assessment</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Retake the wellness assessment to update your personalized recommendations.
              </p>
              <a
                href="/onboarding/symptoms"
                className="btn bg-teal-500 text-white hover:bg-teal-600"
              >
                Retake Wellness Assessment
              </a>
            </section>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Learning Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Learning Style</label>
                  <select
                    className="form-select w-full"
                    value={profile.questionnaire?.learningStyle || ''}
                    onChange={e => updateQuestionnaire('learningStyle', e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="self-paced">Self-paced (I like to go at my own speed)</option>
                    <option value="guided">Guided (Walk me through step by step)</option>
                    <option value="intensive">Intensive (Give me everything at once)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Daily Time Commitment</label>
                  <select
                    className="form-select w-full"
                    value={profile.questionnaire?.timeCommitment || ''}
                    onChange={e => updateQuestionnaire('timeCommitment', e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="5-10min">5-10 minutes</option>
                    <option value="15-30min">15-30 minutes</option>
                    <option value="30-60min">30-60 minutes</option>
                    <option value="60min+">Over 60 minutes</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Crisis Resources */}
            <section className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">Crisis Resources</h3>
              <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                If you or someone you know is in crisis, please reach out for help.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-red-800 dark:text-red-200">988 Suicide & Crisis Lifeline:</span>
                  <a href="tel:988" className="text-red-600 dark:text-red-400 font-bold hover:underline">Call or text 988</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-red-800 dark:text-red-200">Crisis Text Line:</span>
                  <span className="text-red-600 dark:text-red-400">Text HOME to 741741</span>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      <footer className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-xl flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </footer>
    </div>
  )
}
