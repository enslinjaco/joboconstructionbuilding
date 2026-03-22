'use client'

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah van der Merwe',
    location: 'Durbanville',
    rating: 5,
    text: 'Jobo renovated our entire downstairs — new tiling, plastering, ceilings and painting. The quality of work is exceptional and he completed everything on time. Will definitely use him again!',
    service: 'Full Home Renovation',
  },
  {
    name: 'Mark Fredericks',
    location: 'Bellville',
    rating: 5,
    text: 'Got Jobo to build a new boundary wall and pave my driveway. Professional from start to finish — gave me a proper quote, started when he said he would, and did a fantastic job. Highly recommended.',
    service: 'Building & Paving',
  },
  {
    name: 'Thandi Nkosi',
    location: 'Table View',
    rating: 5,
    text: 'Had my entire house repainted inside and out. Jobo and his team were tidy, efficient and the finish is beautiful. Great value for money and excellent communication throughout.',
    service: 'Interior & Exterior Painting',
  },
  {
    name: 'Johan Botha',
    location: 'Parow',
    rating: 5,
    text: 'Called Jobo for plastering repairs after water damage. He assessed the problem properly, fixed it correctly and the finish looks brand new. Fast, fair price, and quality work.',
    service: 'Plastering & Repairs',
  },
  {
    name: 'Anita Coetzee',
    location: 'Brackenfell',
    rating: 5,
    text: 'New laminate floors and ceiling boards installed throughout my home. Jobo took care of everything from start to finish. Clean, professional work and left the site spotless every day.',
    service: 'Flooring & Ceilings',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className='flex gap-0.5'>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className='w-4 h-4'
          style={{
            color: i < rating ? '#F97316' : '#CBD5E1',
            fill: i < rating ? '#F97316' : 'none',
          }}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoplay])

  const prev = () => {
    setAutoplay(false)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }
  const next = () => {
    setAutoplay(false)
    setCurrent((c) => (c + 1) % testimonials.length)
  }

  return (
    <section className='py-20 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-14'>
          <span
            className='inline-block text-xs font-semibold uppercase tracking-widest mb-3'
            style={{ color: '#F97316' }}
          >
            Testimonials
          </span>
          <h2 className='text-3xl sm:text-4xl font-extrabold' style={{ color: '#0F172A' }}>
            What Cape Town Homeowners Say
          </h2>
        </div>

        {/* Carousel */}
        <div className='relative max-w-3xl mx-auto'>
          <div className='overflow-hidden rounded-2xl'>
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`transition-all duration-500 ${
                  i === current ? 'block' : 'hidden'
                }`}
              >
                <div
                  className='p-8 sm:p-12 rounded-2xl text-white relative'
                  style={{ backgroundColor: '#0F172A' }}
                >
                  <Quote
                    className='absolute top-6 right-6 w-10 h-10 opacity-20'
                    style={{ color: '#F97316' }}
                  />
                  <StarRating rating={t.rating} />
                  <p className='text-lg text-gray-200 leading-relaxed mt-6 mb-8'>
                    &quot;{t.text}&quot;
                  </p>
                  <div className='flex items-center justify-between'>
                    <div>
                      <div className='font-bold text-white'>{t.name}</div>
                      <div className='text-sm text-gray-400'>
                        {t.location} · {t.service}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className='flex items-center justify-center gap-4 mt-8'>
            <button
              onClick={prev}
              className='w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-colors'
              aria-label='Previous testimonial'
            >
              <ChevronLeft className='w-5 h-5' />
            </button>

            <div className='flex gap-2'>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoplay(false); setCurrent(i) }}
                  className='w-2.5 h-2.5 rounded-full transition-all duration-200'
                  style={{
                    backgroundColor: i === current ? '#F97316' : '#CBD5E1',
                    transform: i === current ? 'scale(1.3)' : 'scale(1)',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className='w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-colors'
              aria-label='Next testimonial'
            >
              <ChevronRight className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
