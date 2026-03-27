import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const highlights = [
  'Over 10 years of hands-on building experience',
  'Quality workmanship with attention to detail',
  'Fair, transparent pricing – no hidden costs',
  'Reliable, punctual, and professional service',
]

export default function AboutSnippet() {
  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Image */}
          <div className='relative'>
            <div className='relative h-[420px] rounded-2xl overflow-hidden shadow-2xl'>
              <Image
                src='/jobo.jpeg'
                alt='Jobo – professional builder and contractor in Cape Town South Africa'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 50vw'
              />
            </div>
            {/* Floating badge */}
            <div
              className='absolute -bottom-4 -right-4 sm:right-8 rounded-2xl px-5 py-4 shadow-xl text-white'
              style={{ backgroundColor: '#F97316' }}
            >
              <div className='text-3xl font-extrabold'>10+</div>
              <div className='text-xs font-medium opacity-90'>Years in Cape Town</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span
              className='inline-block text-xs font-semibold uppercase tracking-widest mb-3'
              style={{ color: '#F97316' }}
            >
              About Jobo
            </span>
            <h2 className='text-3xl sm:text-4xl font-extrabold mb-5' style={{ color: '#0F172A' }}>
              Cape Town&apos;s Reliable Local{' '}
              <span style={{ color: '#F97316' }}>Builder</span>
            </h2>
            <p className='text-gray-600 leading-relaxed mb-4'>
              My name is Jobo and I&apos;ve been building and renovating homes across Cape Town for
              over a decade. I started Jobo Building Construction on a simple promise: deliver
              quality craftsmanship you can be proud of, on time, and at a price that&apos;s fair.
            </p>
            <p className='text-gray-600 leading-relaxed mb-8'>
              Whether it&apos;s a single room renovation, a new boundary wall, fresh plastering,
              painting, or a full new build — I bring the same focus and care to every job,
              big or small. Based in Kraaifontein, serving Cape Town, Southern Suburbs and Northern Suburbs.
            </p>

            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10'>
              {highlights.map((h) => (
                <li key={h} className='flex items-start gap-2.5 text-sm text-gray-700'>
                  <CheckCircle2
                    className='w-4.5 h-4.5 flex-shrink-0 mt-0.5'
                    style={{ color: '#F97316' }}
                  />
                  {h}
                </li>
              ))}
            </ul>

            <Link
              href='/about'
              className='inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold transition-all duration-200 hover:scale-105'
              style={{ backgroundColor: '#0F172A' }}
            >
              Read More About Jobo <ArrowRight className='w-4 h-4' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
