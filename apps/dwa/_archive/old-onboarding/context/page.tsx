'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingHeader from '../../onboarding-header'
import OnboardingProgress from '../../onboarding-progress'
import { useOnboarding } from '../../onboarding-context'

export default function ContextPage() {
    const router = useRouter()
    const { data, updateData } = useOnboarding()
    const [linkedinUrl, setLinkedinUrl] = useState(data.linkedinUrl)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        setLoading(true)
        try {
            updateData({ linkedinUrl })

            // No native confirm. If they click "Next", we assume they are done uploading.
            // We just proceed.

            await fetch('/api/onboarding/context', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ linkedinUrl, documents: data.uploadedDocuments }),
            })

            router.push('/onboarding/analyzing')
        } catch (error) {
            console.error('Error saving context:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files?.length) return

        setLoading(true)

        const newUploadedDocs = [];

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
                    id: result.data?.document?.id,
                    content: result.data?.document?.content || content,
                    status: 'ready' as const
                });

            } catch (err) {
                console.error(`Error uploading ${file.name}:`, err);
            }
        }

        updateData({
            uploadedDocuments: [...data.uploadedDocuments, ...newUploadedDocs]
        })
        setLoading(false)
    }

    const removeDocument = (id: string) => {
        updateData({
            uploadedDocuments: data.uploadedDocuments.filter(d => d.id !== id)
        })
    }

    return (
        <main className="bg-white dark:bg-gray-900">
            <div className="relative flex">
                <div className="w-full">
                    <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
                        <div className="flex-1">
                            <OnboardingHeader />
                            <OnboardingProgress step={4} />
                        </div>

                        <div className="px-4 py-8">
                            <div className="max-w-xl mx-auto">
                                <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">
                                    Add more context 📄
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Optional: Upload documents or add your LinkedIn to help AI coach you better.
                                </p>

                                <form onSubmit={handleSubmit}>
                                    {/* File Upload Zone */}
                                    <div className="mb-6">
                                        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Upload business documents
                                        </label>
                                        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                                            <input
                                                type="file"
                                                id="file-upload"
                                                className="hidden"
                                                multiple
                                                accept=".pdf,.doc,.docx,.txt,.md"
                                                onChange={handleFileUpload}
                                                disabled={loading}
                                            />
                                            <label
                                                htmlFor="file-upload"
                                                className="cursor-pointer block"
                                            >
                                                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                    {loading ? 'Uploading...' : 'Click to upload or drag and drop'}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    PDF, DOC, DOCX, TXT, MD (max 10MB)
                                                </p>
                                            </label>
                                        </div>

                                        {/* Uploaded Files */}
                                        {data.uploadedDocuments.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                {data.uploadedDocuments.map((doc) => (
                                                    <div
                                                        key={doc.id}
                                                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                                    >
                                                        <div className="flex items-center">
                                                            <svg className="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                                            </svg>
                                                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[200px]">
                                                                {doc.name}
                                                            </span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeDocument(doc.id)}
                                                            className="text-gray-400 hover:text-red-500"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* LinkedIn URL */}
                                    <div className="mb-4">
                                        <label htmlFor="linkedin-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            LinkedIn Profile <span className="text-gray-400">(optional)</span>
                                        </label>
                                        <input
                                            id="linkedin-url"
                                            type="url"
                                            value={linkedinUrl}
                                            onChange={(e) => setLinkedinUrl(e.target.value)}
                                            placeholder="https://linkedin.com/in/yourprofile"
                                            className="form-input w-full"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Helps us understand your authority and background
                                        </p>
                                    </div>

                                    {/* LinkedIn Permission */}
                                    {linkedinUrl && (
                                        <div className="mb-8">
                                            <label className="flex items-start cursor-pointer">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.linkedinPermission}
                                                        onChange={(e) => updateData({ linkedinPermission: e.target.checked })}
                                                        className="form-checkbox h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                                                    />
                                                </div>
                                                <div className="ml-3 text-xs">
                                                    <span className="text-gray-700 dark:text-gray-300 font-medium">Authorize Professional Analysis</span>
                                                    <p className="text-gray-500">I authorize SoloFrameHub to analyze my LinkedIn profile to personalize my learning journey and improve AI coaching context.</p>
                                                </div>
                                            </label>
                                        </div>
                                    )}

                                    {/* Navigation */}
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                                        <button
                                            type="button"
                                            onClick={() => router.push('/onboarding/questionnaire')}
                                            className="btn border-gray-200 dark:border-gray-700/60 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`btn text-white disabled:opacity-50 transition-all ${data.uploadedDocuments.length === 0 && !linkedinUrl
                                                ? 'bg-gray-500 hover:bg-gray-600'
                                                : 'bg-primary-500 hover:bg-primary-600'
                                                }`}
                                        >
                                            {loading ? 'Processing...' : (
                                                data.uploadedDocuments.length === 0 && !linkedinUrl
                                                    ? 'Skip & Analyze →'
                                                    : 'Analyze My Business →'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
