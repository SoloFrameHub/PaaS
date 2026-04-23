'use client'

import Image from 'next/image'
import { useState } from 'react'

interface FeatureScreenshotProps {
  imagePath: string
  alt: string
  fallbackIcon: React.ReactNode
  fallbackTitle: string
  fallbackDescription: string
  gradientFrom: string
  gradientTo: string
  iconBg: string
}

export function FeatureScreenshot({
  imagePath,
  alt,
  fallbackIcon,
  fallbackTitle,
  fallbackDescription,
  gradientFrom,
  gradientTo,
  iconBg,
}: FeatureScreenshotProps) {
  const [imageError, setImageError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 aspect-[16/10] cursor-pointer group"
        onClick={() => !imageError && setIsModalOpen(true)}
      >
        {/* Zoom hint overlay */}
        {!imageError && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-900 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              Click to enlarge
            </div>
          </div>
        )}

        {!imageError ? (
          <Image
            src={imagePath}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setImageError(true)}
          />
        ) : (
        // Fallback placeholder
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center`}>
          <div className="text-center p-8">
            <div className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              {fallbackIcon}
            </div>
            <p className="text-sm text-gray-600 font-medium">{fallbackTitle}</p>
            <p className="text-xs text-gray-400 mt-1">{fallbackDescription}</p>
          </div>
        </div>
      )}
      </div>

      {/* Full-size modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition"
            onClick={() => setIsModalOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Full image */}
          <div className="relative max-w-7xl w-full" style={{ aspectRatio: '16/10' }}>
            <Image
              src={imagePath}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              quality={100}
            />
          </div>

          {/* Image caption */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
            <p className="text-white text-sm font-medium">{alt}</p>
          </div>
        </div>
      )}
    </>
  )
}
