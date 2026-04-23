'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import type { FounderProfile, BusinessModel, Stage } from '@/types/profile'

export default function ProfileEditor() {
  const router = useRouter()
  const locale = useLocale()
  const isEs = locale === 'es'
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<Partial<FounderProfile>>({})
  const [activeTab, setActiveTab] = useState<'basics' | 'context' | 'preferences'>('basics')

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/profile')
        if (res.ok) {
          const { data } = await res.json()
          setProfile(data.profile || data)
        }
      } catch (error) {
        console.error('Failed to load profile', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT', // Assuming PUT for updates, or POST if the API handles upsert
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

  const updateField = (field: keyof FounderProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    setUploading(true)

    const newUploadedDocs: any[] = [];

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/onboarding/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');

        const result = await response.json();

        // Also read locally for immediate context (lite RAG)
        const content = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve((event.target?.result as string || '').slice(0, 50000));
          reader.onerror = () => resolve('');
          if (file.type.includes('text') || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
            reader.readAsText(file);
          } else {
            resolve('');
          }
        });

        newUploadedDocs.push({
          name: file.name,
          id: result.document.id,
          content: content,
          status: 'pending' as const,
          type: file.type,
          uploadedAt: new Date().toISOString()
        });

      } catch (err) {
        console.error(`Error uploading ${file.name}:`, err);
        alert(`Failed to upload ${file.name}`);
      }
    }

    setProfile(prev => ({
      ...prev,
      documents: [...(prev.documents || []), ...newUploadedDocs]
    }))
    setUploading(false)
  }

  const removeDocument = (id: string) => {
    setProfile(prev => ({
      ...prev,
      documents: (prev.documents || []).filter(d => d.id !== id)
    }))
  }

  const updateQuestionnaire = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      questionnaire: {
        ...prev.questionnaire,
        [field]: value
      } as any
    }))
  }

  if (loading) return <div className="p-6">{isEs ? 'Cargando perfil...' : 'Loading profile...'}</div>

  return (
    <div className="grow bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold">{isEs ? 'Perfil y contexto' : 'Profile & Context'}</h2>
          <div className="flex space-x-2">
            {(['basics', 'context', 'preferences'] as const).map((tab) => {
              const tabLabels = isEs
                ? { basics: 'Básico', context: 'Contexto', preferences: 'Preferencias' }
                : { basics: 'Basics', context: 'Context', preferences: 'Preferences' };
              return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                {tabLabels[tab]}
              </button>
            )})}
          </div>
        </div>

        {activeTab === 'basics' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{isEs ? 'Identidad principal' : 'Core Identity'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">{isEs ? 'Tu nombre' : 'Your Name'}</label>
                  <input
                    className="form-input w-full"
                    type="text"
                    value={profile.name || ''}
                    onChange={e => updateField('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{isEs ? 'Nombre del negocio' : 'Business Name'}</label>
                  <input
                    className="form-input w-full"
                    type="text"
                    value={profile.businessName || ''}
                    onChange={e => updateField('businessName', e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">{isEs ? 'Sitio web' : 'Website URL'}</label>
                  <input
                    className="form-input w-full"
                    type="url"
                    value={profile.websiteUrl || ''}
                    onChange={e => updateField('websiteUrl', e.target.value)}
                    placeholder="https://"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{isEs ? 'Elevator pitch' : 'Elevator Pitch'}</h3>
              <div>
                <label className="block text-sm font-medium mb-1">{isEs ? '¿A qué te dedicas?' : 'What do you do?'}</label>
                <textarea
                  className="form-textarea w-full"
                  rows={4}
                  value={profile.elevatorPitch || ''}
                  onChange={e => updateField('elevatorPitch', e.target.value)}
                  placeholder={isEs ? 'Ayudo a [público objetivo] a lograr [resultado] mediante [método]...' : 'I help [target] achieve [result] by [method]...'}
                />
                <p className="text-xs text-gray-500 mt-1">{isEs ? 'Este contexto es usado por la IA para el roleplay contigo.' : 'This context is used by the AI to roleplay with you.'}</p>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'context' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{isEs ? 'Posicionamiento de mercado' : 'Market Positioning'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">{isEs ? 'Modelo de negocio' : 'Business Model'}</label>
                  <select
                    className="form-select w-full"
                    value={profile.businessModel || ''}
                    onChange={e => updateField('businessModel', e.target.value)}
                  >
                    <option value="">{isEs ? 'Seleccionar...' : 'Select...'}</option>
                    <option value="b2b-saas">B2B SaaS</option>
                    <option value="creator-coach">{isEs ? 'Creador / Coach' : 'Creator / Coach'}</option>
                    <option value="service">{isEs ? 'Agencia / Servicios' : 'Agency / Service'}</option>
                    <option value="marketplace">Marketplace</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{isEs ? 'Industria' : 'Industry'}</label>
                  <input
                    className="form-input w-full"
                    type="text"
                    value={profile.questionnaire?.industry || ''}
                    onChange={e => updateQuestionnaire('industry', e.target.value)}
                    placeholder={isEs ? 'Ej. Fintech, EdTech...' : 'e.g. Fintech, EdTech...'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{isEs ? 'Tamaño del deal objetivo' : 'Target Deal Size'}</label>
                  <select
                    className="form-select w-full"
                    value={profile.questionnaire?.deal_size || ''}
                    onChange={e => updateQuestionnaire('deal_size', e.target.value)}
                  >
                    <option value="">{isEs ? 'Seleccionar...' : 'Select...'}</option>
                    <option value="transactional">{isEs ? 'Menos de $100/mes' : 'Under $100/mo'}</option>
                    <option value="smb">$100-$1K/{isEs ? 'mes' : 'mo'} (SMB)</option>
                    <option value="mid_market">$1K-$5K/{isEs ? 'mes' : 'mo'} (Mid-Market)</option>
                    <option value="enterprise">$50k+/{isEs ? 'año' : 'yr'} (Enterprise)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{isEs ? 'Etapa en ventas' : 'Sales Journey Stage'}</label>
                  <select
                    className="form-select w-full"
                    value={profile.questionnaire?.sales_journey || ''}
                    onChange={e => updateQuestionnaire('sales_journey', e.target.value)}
                  >
                    <option value="">{isEs ? 'Seleccionar...' : 'Select...'}</option>
                    <option value="Haven't started outreach yet">{isEs ? 'Sin outreach aún' : 'No outreach yet'}</option>
                    <option value="Doing outreach, no meetings booked">{isEs ? 'Outreach iniciado, sin reuniones' : 'Outreach started, no meetings'}</option>
                    <option value="Getting meetings, struggling to close">{isEs ? 'Consiguiendo reuniones, sin cerrar' : 'Getting meetings, not closing'}</option>
                    <option value="Closing some deals, want to systematize">{isEs ? 'Cerrando esporádicamente' : 'Closing sporadically'}</option>
                    <option value="Have a process, optimizing for scale">{isEs ? 'Escalando un proceso que funciona' : 'Scaling a working process'}</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{isEs ? 'Audiencia objetivo' : 'Target Audience'}</h3>
              <div>
                <label className="block text-sm font-medium mb-1">{isEs ? 'Roles / Personas objetivo' : 'Target Roles / Personas'}</label>
                <input
                  className="form-input w-full"
                  type="text"
                  placeholder={isEs ? 'Ej. CTO, VP de Ventas, Solopreneurs' : 'e.g. CTO, VP of Sales, Solopreneurs'}
                  value={profile.targetAudience || ''}
                  onChange={e => updateField('targetAudience', e.target.value)}
                />
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{isEs ? 'Documentos y contexto' : 'Documents & Context'}</h3>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isEs ? 'Sube documentos de negocio (pitch decks, docs de ICP, scripts)' : 'Upload business documents (Pitch decks, ICP docs, scripts)'}
                </label>
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.md"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <div className="text-4xl text-gray-300 mb-2">📄</div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {uploading ? (isEs ? 'Subiendo...' : 'Uploading...') : (isEs ? 'Haz clic para subir' : 'Click to upload')}
                    </p>
                  </label>
                </div>

                {/* Uploaded Files List */}
                {profile.documents && profile.documents.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {profile.documents.map((doc: any) => (
                      <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700/50">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[200px]">
                            {doc.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDocument(doc.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{isEs ? 'Perfil de LinkedIn' : 'LinkedIn Profile'}</label>
                <input
                  className="form-input w-full"
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={profile.linkedinUrl || ''}
                  onChange={e => updateField('linkedinUrl', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">{isEs ? 'Usado para personalización.' : 'Used for personality matching.'}</p>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{isEs ? 'Aprendizaje y engagement' : 'Learning & Engagement'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">{isEs ? 'Estilo de aprendizaje' : 'Learning Style'}</label>
                  <select
                    className="form-select w-full"
                    value={profile.questionnaire?.learning_style || ''}
                    onChange={e => updateQuestionnaire('learning_style', e.target.value)}
                  >
                    <option value="">{isEs ? 'Seleccionar...' : 'Select...'}</option>
                    <option value="aggressive">{isEs ? 'Agresivo (Dame frameworks)' : 'Aggressive (Give me frameworks)'}</option>
                    <option value="assistive">{isEs ? 'Asistivo (Guíame paso a paso)' : 'Assistive (Guide me step-by-step)'}</option>
                    <option value="adaptive">{isEs ? 'Adaptivo (Mezcla de ambos)' : 'Adaptive (Mix of both)'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{isEs ? 'Meta a 90 días' : '90-Day Success Goal'}</label>
                  <input
                    className="form-input w-full"
                    type="text"
                    value={profile.questionnaire?.success_90_days || ''}
                    onChange={e => updateQuestionnaire('success_90_days', e.target.value)}
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{isEs ? 'Perfil DISC (autoevaluación)' : 'DISC Profile (Self-Assessment)'}</h3>
              <p className="text-sm text-gray-500 mb-4">{isEs ? 'Basado en tus respuestas del cuestionario.' : 'Based on your questionnaire answers.'}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-xs font-bold text-gray-500 uppercase">{isEs ? 'Escenario: Detalle técnico' : 'Scenario: Technical Drill-down'}</span>
                  <div className="font-medium mt-1">
                    {profile.questionnaire?.disc_answers?.q10 || (isEs ? 'Sin respuesta' : 'Not answered')}
                  </div>
                </div>
                {/* Add more DISC visualizations if available in profile.questionnaire.disc_profile */}
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
          {saving ? (isEs ? 'Guardando...' : 'Saving...') : (isEs ? 'Guardar cambios' : 'Save Changes')}
        </button>
      </footer>
    </div>
  )
}