'use client'

import Link from 'next/link'
import { ChevronDown, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className='relative min-h-[92vh] flex items-center overflow-hidden'>
      {/* Background image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80)',
        }}
        role='img'
        aria-label='Construction workers building a house in Cape Town'
      />
      {/* Overlay */}
      <div
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.75) 60%, rgba(15,23,42,0.5) 100%)',
        }}
      />

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='max-w-3xl'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border' style={{ backgroundColor: 'rgba(249,115,22,0.15)', borderColor: 'rgba(249,115,22,0.4)', color: '#F97316' }}>
            <Star className='w-3.5 h-3.5 fill-current' />
            Cape Town&apos;s Trusted Builder
          </div>

          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6'>
            Professional{' '}
            <span style={{ color: '#F97316' }}>Builder</span>{' '}
            &amp; Contractor in{' '}
            <span style={{ color: '#F97316' }}>Cape Town</span>
          </h1>

          <p className='text-lg sm:text-xl text-gray-300 leading-relaxed mb-4'>
            Quality <strong className='text-white'>building, plastering, painting, tiling, paving</strong>{' '}
            and full <strong className='text-white'>home renovations</strong> across Cape Town.
          </p>

          <p className='text-base text-gray-400 mb-10'>
            Based in Kraaifontein. Serving Cape Town, Southern Suburbs and Northern Suburbs.
          </p>

          {/* Contact info – plain text */}
          <div className='flex flex-col sm:flex-row gap-8 mb-10'>
            <div>
              <div className='text-xs text-gray-400 uppercase tracking-wider mb-1'>Phone</div>
              <div className='text-xl font-bold text-white'>060 687 3078</div>
            </div>
            <div>
              <div className='text-xs text-gray-400 uppercase tracking-wider mb-1'>Email</div>
              <div className='text-xl font-bold text-white'>jobobuildingc@gmail.com</div>
            </div>
          </div>

          <Link
            href='/portfolio'
            className='inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:opacity-90 text-white'
            style={{ backgroundColor: '#F97316' }}
          >
            View Our Work
          </Link>
        </div>
      </div>

      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce'>
        <ChevronDown className='w-6 h-6' />
      </div>
    </section>
  )
}
