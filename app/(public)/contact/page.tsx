import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact – Builder Cape Town | Jobo Builds',
  description:
    'Contact Jobo Builds. Call 060 687 3078 or email jobobuildingc@gmail.com. Based in Kraaifontein, serving Cape Town, Southern Suburbs and Northern Suburbs.',
  openGraph: {
    title: 'Contact Jobo Builds – Cape Town Builder',
    description: 'Call or email Jobo for building and renovation work in Cape Town.',
  },
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: '#0F172A' }} className='py-16 sm:py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <span
            className='inline-block text-xs font-semibold uppercase tracking-widest mb-4'
            style={{ color: '#F97316' }}
          >
            Get In Touch
          </span>
          <h1 className='text-4xl sm:text-5xl font-extrabold text-white mb-4'>
            Contact <span style={{ color: '#F97316' }}>Jobo</span>
          </h1>
          <p className='text-gray-300 max-w-xl mx-auto text-lg'>
            Call or email us and Jobo will get back to you with a fair, no-obligation quote.
          </p>
        </div>
      </section>

      <section className='py-16 bg-gray-50'>
        <div className='max-w-lg mx-auto px-4 sm:px-6'>
          <div className='bg-white rounded-2xl p-8 border border-gray-100 shadow-sm'>
            <h2 className='font-bold text-lg mb-6' style={{ color: '#0F172A' }}>
              Contact Details
            </h2>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-4'>
                <div
                  className='w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0'
                  style={{ backgroundColor: 'rgba(249,115,22,0.1)' }}
                >
                  <Phone className='w-5 h-5' style={{ color: '#F97316' }} />
                </div>
                <div>
                  <div className='text-xs text-gray-400 font-medium'>Phone</div>
                  <div className='font-semibold text-gray-900'>060 687 3078</div>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <div
                  className='w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0'
                  style={{ backgroundColor: 'rgba(249,115,22,0.1)' }}
                >
                  <Mail className='w-5 h-5' style={{ color: '#F97316' }} />
                </div>
                <div>
                  <div className='text-xs text-gray-400 font-medium'>Email</div>
                  <div className='font-semibold text-gray-900 text-sm break-all'>
                    jobobuildingc@gmail.com
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <div
                  className='w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0'
                  style={{ backgroundColor: 'rgba(249,115,22,0.1)' }}
                >
                  <MapPin className='w-5 h-5' style={{ color: '#F97316' }} />
                </div>
                <div>
                  <div className='text-xs text-gray-400 font-medium'>Address</div>
                  <div className='font-semibold text-gray-900 text-sm'>
                    Kraaifontein, Cape Town
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <div
                  className='w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0'
                  style={{ backgroundColor: 'rgba(249,115,22,0.1)' }}
                >
                  <Clock className='w-5 h-5' style={{ color: '#F97316' }} />
                </div>
                <div>
                  <div className='text-xs text-gray-400 font-medium'>Hours</div>
                  <div className='font-semibold text-gray-900 text-sm'>Mon–Sat: 7am – 6pm</div>
                </div>
              </div>
            </div>

            <div className='mt-6 pt-6 border-t border-gray-100'>
              <div className='text-xs text-gray-400 font-medium mb-1'>Areas Served</div>
              <div className='text-sm text-gray-700'>
                Cape Town · Southern Suburbs · Northern Suburbs
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
