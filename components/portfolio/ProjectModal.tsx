'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react'
import type { Project } from '@/lib/types'

interface Props {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const [photoIndex, setPhotoIndex] = useState(0)

  useEffect(() => {
    setPhotoIndex(0)
  }, [project])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!project) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setPhotoIndex((i) => (i + 1) % project.image_urls.length)
      if (e.key === 'ArrowLeft')
        setPhotoIndex((i) => (i - 1 + project.image_urls.length) % project.image_urls.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  if (!project) return null

  const images = project.image_urls.length > 0
    ? project.image_urls
    : ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80']

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className='bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl'>
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
          <div>
            <h2 className='font-bold text-gray-900 text-lg'>{project.title}</h2>
            <div className='flex items-center gap-3 mt-1'>
              <span
                className='flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full text-white'
                style={{ backgroundColor: '#F97316' }}
              >
                <Tag className='w-3 h-3' /> {project.category}
              </span>
              {project.date && (
                <span className='flex items-center gap-1 text-xs text-gray-400'>
                  <Calendar className='w-3 h-3' />
                  {new Date(project.date).toLocaleDateString('en-ZA', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className='p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors'
            aria-label='Close'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Image viewer */}
        <div className='relative bg-gray-900 flex-shrink-0'>
          <div className='relative h-64 sm:h-80'>
            <Image
              src={images[photoIndex]}
              alt={`${project.title} – project photo ${photoIndex + 1}`}
              fill
              unoptimized
              className='object-contain'
              sizes='700px'
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={() => setPhotoIndex((i) => (i - 1 + images.length) % images.length)}
                className='absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors'
                aria-label='Previous photo'
              >
                <ChevronLeft className='w-5 h-5' />
              </button>
              <button
                onClick={() => setPhotoIndex((i) => (i + 1) % images.length)}
                className='absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors'
                aria-label='Next photo'
              >
                <ChevronRight className='w-5 h-5' />
              </button>
              <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5'>
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIndex(i)}
                    className='w-2 h-2 rounded-full transition-all'
                    style={{
                      backgroundColor: i === photoIndex ? '#F97316' : 'rgba(255,255,255,0.5)',
                    }}
                    aria-label={`Go to photo ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className='flex gap-2 px-6 py-3 overflow-x-auto border-b border-gray-100'>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setPhotoIndex(i)}
                className='flex-shrink-0 relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all'
                style={{ borderColor: i === photoIndex ? '#F97316' : 'transparent' }}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className='object-cover'
                  sizes='56px'
                />
              </button>
            ))}
          </div>
        )}

        {/* Description */}
        <div className='px-6 py-5 overflow-y-auto'>
          {project.description && (
            <p className='text-gray-600 text-sm leading-relaxed'>{project.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
