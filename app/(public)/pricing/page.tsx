import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Pricing – Builder Cape Town | Jobo Building Construction',
  description:
    'Jobo Building Construction charges a daily labour rate. The client supplies all tools and building materials. Transparent, no-surprise pricing for Cape Town homeowners.',
  openGraph: {
    title: 'Pricing – Jobo Building Construction Cape Town',
    description: 'Daily labour rate. Client provides tools and materials.',
  },
}

const included = [
  'Skilled labour for the full working day',
  'Years of hands-on building experience',
  'Professional workmanship on every task',
]

const clientSupplies = [
  'All required building materials (bricks, sand, cement, paint, tiles, etc.)',
  'All tools and equipment needed for the job',
]

export default async function PricingPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('site_content')
    .select('value')
    .eq('key', 'daily_rate')
    .single()

  const rate = data?.value ? `R${Number(data.value).toLocaleString('en-ZA')}` : 'R1 000'

  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: '#0F172A' }} className='py-16 sm:py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <span
            className='inline-block text-xs font-semibold uppercase tracking-widest mb-4'
            style={{ color: '#F97316' }}
          >
            Transparent Pricing
          </span>
          <h1 className='text-4xl sm:text-5xl font-extrabold text-white mb-4'>
            Simple, Fair <span style={{ color: '#F97316' }}>Pricing</span>
          </h1>
          <p className='text-gray-300 max-w-xl mx-auto text-lg'>
            No hidden costs. No surprises. Just honest labour at a fair daily rate.
          </p>
        </div>
      </section>

      <section className='py-16 bg-gray-50'>
        <div className='max-w-2xl mx-auto px-4 sm:px-6'>

          {/* Rate card */}
          <div className='bg-white rounded-2xl border-2 shadow-sm overflow-hidden mb-8' style={{ borderColor: '#F97316' }}>
            <div className='px-8 py-6 text-center' style={{ backgroundColor: '#F97316' }}>
              <div className='text-white text-sm font-semibold uppercase tracking-widest mb-1'>
                Daily Labour Rate
              </div>
              <div className='text-white text-6xl font-extrabold'>{rate}</div>
              <div className='text-orange-100 text-sm mt-1'>per labourer, per day</div>
            </div>
            <div className='px-8 py-6'>
              <div className='mb-5'>
                <div className='text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3'>
                  What&apos;s included
                </div>
                <ul className='flex flex-col gap-2'>
                  {included.map((item) => (
                    <li key={item} className='flex items-start gap-2.5 text-sm text-gray-700'>
                      <CheckCircle2 className='w-4 h-4 flex-shrink-0 mt-0.5' style={{ color: '#F97316' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className='border-t border-gray-100 pt-5'>
                <div className='text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3'>
                  Client provides
                </div>
                <ul className='flex flex-col gap-2'>
                  {clientSupplies.map((item) => (
                    <li key={item} className='flex items-start gap-2.5 text-sm text-gray-500'>
                      <span className='w-4 h-4 flex-shrink-0 mt-0.5 text-center text-gray-400 font-bold text-xs leading-4'>
                        →
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-sm text-gray-600 leading-relaxed'>
            <strong className='text-gray-900'>Please note:</strong> Jobo sells his skilled labour
            at {rate} per labourer, per day. Larger jobs that require additional labourers will
            be priced accordingly. The client is responsible for sourcing and supplying all necessary
            tools and building products required for the job. This keeps costs transparent and
            ensures you only pay for what you need.
          </div>
        </div>
      </section>
    </>
  )
}
