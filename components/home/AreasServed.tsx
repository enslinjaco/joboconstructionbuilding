import { MapPin } from 'lucide-react'

export default function AreasServed() {
  return (
    <section className='py-12 bg-white border-t border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
          <div className='flex items-center gap-2 flex-shrink-0'>
            <MapPin className='w-5 h-5' style={{ color: '#F97316' }} />
            <span className='font-semibold text-sm' style={{ color: '#0F172A' }}>
              Areas Served:
            </span>
          </div>
          <p className='text-gray-600 text-sm'>
            Cape Town · Southern Suburbs · Northern Suburbs
          </p>
        </div>
      </div>
    </section>
  )
}
