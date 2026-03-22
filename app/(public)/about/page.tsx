import type { Metadata } from 'next'
import Image from 'next/image'
import { CheckCircle2, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Jobo – Trusted Builder & Contractor in Cape Town',
  description:
    'Meet Jobo – professional builder and contractor with over 10 years of experience in Cape Town. Specialising in renovations, building, plastering, painting, tiling, paving and more.',
  openGraph: {
    title: 'About Jobo – Builder Cape Town | Jobo Building Construction',
    description: 'Experienced Cape Town builder with 10+ years. Quality workmanship at fair prices.',
  },
}

const skills = [
  'Renovations & Maintenance',
  'Building & Blockwork',
  'Plastering & Skimming',
  'Interior & Exterior Painting',
  'Laminate Flooring Installation',
  'Ceiling Board & Cornice Work',
  'Bathroom & Kitchen Tiling',
  'Driveway & Garden Paving',
  'General Plumbing',
  'Waterproofing',
]

const timeline = [
  {
    year: 'Early Career',
    title: 'Started in the Building Trade',
    description: 'Began as a labourer and quickly learned every aspect of the trade — from bricklaying and plastering to finishing work.',
  },
  {
    year: '10+ Years',
    title: 'Established Jobo Building Construction',
    description: 'After a decade of experience, launched Jobo Building Construction to deliver quality work directly to homeowners across Cape Town.',
  },
  {
    year: 'Today',
    title: 'Serving Cape Town & Western Cape',
    description: 'Trusted by hundreds of homeowners across Durbanville, Bellville, Table View, City Bowl, and beyond. Every project done with pride.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: '#0F172A' }} className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <span
                className='inline-block text-xs font-semibold uppercase tracking-widest mb-4'
                style={{ color: '#F97316' }}
              >
                About Us
              </span>
              <h1 className='text-4xl sm:text-5xl font-extrabold text-white mb-6'>
                Cape Town&apos;s Trusted{' '}
                <span style={{ color: '#F97316' }}>Builder</span>
              </h1>
              <p className='text-gray-300 leading-relaxed text-lg mb-6'>
                I&apos;m Jobo — a professional builder and contractor based in Cape Town with
                over 10 years of hands-on experience in every aspect of building and renovation.
              </p>
              <p className='text-gray-400 leading-relaxed mb-8'>
                I started Jobo Building Construction to bring quality craftsmanship directly to
                homeowners who want the job done right the first time. No sub-standard work.
                No surprise costs. Just honest, skilled building work you can be proud of.
              </p>
              <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-2 text-gray-700'>
                  <Phone className='w-4 h-4' style={{ color: '#F97316' }} />
                  <span className='font-semibold'>066 367 6516</span>
                </div>
                <div className='text-gray-500 text-sm'>jobobuildingc@gmail.com</div>
              </div>
            </div>

            <div className='relative'>
              <div className='relative h-[400px] rounded-2xl overflow-hidden shadow-2xl'>
                <Image
                  src='https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80'
                  alt='Jobo – professional builder and building contractor in Cape Town South Africa'
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
              </div>
              <div
                className='absolute -bottom-5 -left-5 rounded-2xl px-6 py-4 shadow-xl text-white'
                style={{ backgroundColor: '#F97316' }}
              >
                <div className='text-3xl font-extrabold'>10+</div>
                <div className='text-sm font-medium opacity-90'>Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-extrabold mb-4' style={{ color: '#0F172A' }}>
                Skills &amp; Expertise
              </h2>
              <p className='text-gray-600 mb-8 leading-relaxed'>
                A true all-rounder, Jobo handles every trade required for your renovation or
                building project — so you only deal with one contractor from start to finish.
              </p>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                {skills.map((skill) => (
                  <div key={skill} className='flex items-center gap-2.5 text-sm text-gray-700'>
                    <CheckCircle2 className='w-4 h-4 flex-shrink-0' style={{ color: '#F97316' }} />
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className='relative h-80 rounded-2xl overflow-hidden shadow-xl'>
              <Image
                src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'
                alt='Building and construction work in Cape Town – Jobo Building Construction skills'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 50vw'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className='py-20' style={{ backgroundColor: '#0F172A' }}>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-14'>
            <h2 className='text-3xl font-extrabold text-white'>
              Building a Reputation in Cape Town
            </h2>
          </div>
          <div className='flex flex-col gap-8'>
            {timeline.map((t, i) => (
              <div key={i} className='flex gap-6'>
                <div className='flex flex-col items-center'>
                  <div
                    className='w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0'
                    style={{ backgroundColor: '#F97316' }}
                  >
                    {i + 1}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className='w-0.5 flex-1 mt-2' style={{ backgroundColor: 'rgba(249,115,22,0.3)' }} />
                  )}
                </div>
                <div className='pb-8'>
                  <div className='text-sm font-semibold mb-1' style={{ color: '#F97316' }}>
                    {t.year}
                  </div>
                  <h3 className='text-white font-bold text-lg mb-2'>{t.title}</h3>
                  <p className='text-gray-400 text-sm leading-relaxed'>{t.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-16 bg-gray-50 text-center'>
        <div className='max-w-xl mx-auto px-4'>
          <h2 className='text-2xl font-extrabold mb-4' style={{ color: '#0F172A' }}>
            Ready to Start Your Project?
          </h2>
          <p className='text-gray-500'>
            jobobuildingc@gmail.com
          </p>
        </div>
      </section>
    </>
  )
}
