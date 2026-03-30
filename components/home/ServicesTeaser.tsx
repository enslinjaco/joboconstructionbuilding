import Link from 'next/link'
import {
  Building2,
  PaintBucket,
  Wrench,
  Layers,
  Droplets,
  Grid3X3,
  ArrowRight,
  Construction,
  Square,
} from 'lucide-react'

const services = [
  {
    icon: Wrench,
    title: 'Renovations & Maintenance',
    description: 'Complete home renovations and ongoing maintenance. We transform and repair to the highest standard.',
    href: '/services#renovations',
  },
  {
    icon: Building2,
    title: 'Building',
    description: 'New builds, extensions, and structural work. From foundations to finishing.',
    href: '/services#building',
  },
  {
    icon: Construction,
    title: 'Plastering',
    description: 'Internal and external plastering. Smooth, durable finishes for walls and ceilings.',
    href: '/services#plastering',
  },
  {
    icon: PaintBucket,
    title: 'Painting',
    description: 'Interior and exterior painting with premium paints. Clean lines, flawless results.',
    href: '/services#painting',
  },
  {
    icon: Layers,
    title: 'Laminate Flooring',
    description: 'Professional laminate floor installation. Wide range of styles and finishes available.',
    href: '/services#flooring',
  },
  {
    icon: Square,
    title: 'Ceilings',
    description: 'Suspended, board, and cornice ceilings. New installs and repairs done right.',
    href: '/services#ceilings',
  },
  {
    icon: Droplets,
    title: 'Plumbing',
    description: 'Leak repairs, pipe installation, and general plumbing maintenance throughout Cape Town.',
    href: '/services#plumbing',
  },
  {
    icon: Grid3X3,
    title: 'Tiling',
    description: 'Bathroom, kitchen, and floor tiling with precision. All tile types expertly fitted.',
    href: '/services#tiling',
  },
  {
    icon: Layers,
    title: 'Paving',
    description: 'Driveway, walkway, and patio paving. Neat, durable surfaces that last.',
    href: '/services#paving',
  },
]

export default function ServicesTeaser() {
  return (
    <section className='py-20 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center max-w-2xl mx-auto mb-14'>
          <span
            className='inline-block text-xs font-semibold uppercase tracking-widest mb-3'
            style={{ color: '#F97316' }}
          >
            What We Do
          </span>
          <h2 className='text-3xl sm:text-4xl font-extrabold mb-4' style={{ color: '#0F172A' }}>
            Building &amp; Construction Services in Cape Town
          </h2>
          <p className='text-gray-600'>
            From a single room renovation to a full new build — Jobo Builds
            handles every trade with skill and care.
          </p>
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.title}
                href={service.href}
                className='group bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 flex flex-col gap-4'
              >
                <div
                  className='w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300'
                  style={{ backgroundColor: 'rgba(249,115,22,0.1)' }}
                >
                  <Icon
                    className='w-6 h-6 transition-colors duration-300'
                    style={{ color: '#F97316' }}
                  />
                </div>
                <div>
                  <h3
                    className='font-bold text-base mb-1.5 group-hover:text-orange-500 transition-colors'
                    style={{ color: '#0F172A' }}
                  >
                    {service.title}
                  </h3>
                  <p className='text-sm text-gray-500 leading-relaxed'>{service.description}</p>
                </div>
                <div
                  className='flex items-center gap-1 text-xs font-semibold mt-auto'
                  style={{ color: '#F97316' }}
                >
                  Learn more <ArrowRight className='w-3.5 h-3.5' />
                </div>
              </Link>
            )
          })}
        </div>

        <div className='text-center mt-12'>
          <Link
            href='/services'
            className='inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold transition-all duration-200 hover:scale-105'
            style={{ backgroundColor: '#0F172A' }}
          >
            View All Services <ArrowRight className='w-4 h-4' />
          </Link>
        </div>
      </div>
    </section>
  )
}
