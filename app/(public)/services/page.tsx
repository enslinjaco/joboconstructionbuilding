import type { Metadata } from 'next'
import {
  Building2,
  PaintBucket,
  Wrench,
  Layers,
  Droplets,
  Grid3X3,
  Square,
  Construction,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Building & Construction Services Cape Town | Plastering, Tiling, Paving & More',
  description:
    'Full range of building and construction services in Cape Town: renovations & maintenance, building, plastering, painting, laminate flooring, ceilings, plumbing, tiling and paving. Free quotes.',
  keywords: [
    'plastering Cape Town',
    'painting contractor Cape Town',
    'tiling Cape Town',
    'paving Cape Town',
    'laminate flooring Cape Town',
    'ceiling installation Cape Town',
    'plumber Cape Town',
    'building renovations Cape Town',
    'home renovations Cape Town',
  ],
  openGraph: {
    title: 'Building & Construction Services Cape Town',
    description:
      'Renovations, plastering, painting, tiling, paving, flooring, ceilings, plumbing in Cape Town. Call Jobo for a free quote.',
  },
}

const services = [
  {
    id: 'renovations',
    icon: Wrench,
    title: 'Renovations & Maintenance',
    tagline: 'Complete home transformations and ongoing repairs',
    description:
      'From a single room makeover to whole-house renovations, Jobo Building Construction handles every aspect of home renovation in Cape Town. We assess, plan, and execute renovations to the highest standard – on time and within budget.',
    includes: [
      'Full interior renovations',
      'Room additions and alterations',
      'Bathroom and kitchen renovations',
      'Crack repairs and maintenance',
      'Waterproofing and rising damp treatment',
      'General building repairs',
    ],
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    altText: 'Home renovation work in Cape Town – Jobo Building Construction',
    keyword: 'home renovations Cape Town',
  },
  {
    id: 'building',
    icon: Building2,
    title: 'Building & Blockwork',
    tagline: 'Foundations to finishing – quality construction',
    description:
      'Professional building contractor in Cape Town for new builds, extensions, boundary walls, and all structural work. Whether it\'s brickwork, blockwork, or concrete work, we build it right the first time.',
    includes: [
      'New home construction',
      'Room additions and extensions',
      'Boundary walls and retaining walls',
      'Brick and block laying',
      'Foundation work',
      'Garage and outbuilding construction',
    ],
    image: 'https://images.unsplash.com/photo-1565117962316-3acffabef879?w=800&q=80',
    altText: 'Builder and brickwork contractor Cape Town – Jobo Building Construction',
    keyword: 'building contractor Cape Town',
  },
  {
    id: 'plastering',
    icon: Construction,
    title: 'Plastering',
    tagline: 'Smooth, durable finishes inside and out',
    description:
      'Expert plastering contractor in Cape Town. We plaster new walls, re-plaster damaged surfaces, and apply speciality finishes. Our work gives you a perfect base for painting or tiling.',
    includes: [
      'Internal wall plastering',
      'External plaster rendering',
      'Re-plastering and repairs',
      'Smooth and textured finishes',
      'Waterproof plaster coatings',
      'Crack filling and skimming',
    ],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    altText: 'Plastering contractor Cape Town – smooth wall finishes by Jobo Building Construction',
    keyword: 'plastering Cape Town',
  },
  {
    id: 'painting',
    icon: PaintBucket,
    title: 'Painting',
    tagline: 'Flawless interior & exterior painting',
    description:
      'Professional painting contractor in Cape Town using quality paints for long-lasting, beautiful results. We prepare surfaces properly, mask neatly, and deliver clean, even coverage every time.',
    includes: [
      'Interior walls and ceilings',
      'Exterior house painting',
      'Roof painting',
      'Woodwork and trim painting',
      'Feature wall finishes',
      'Commercial painting',
    ],
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca71b5?w=800&q=80',
    altText: 'Painting contractor Cape Town – interior and exterior painting by Jobo',
    keyword: 'painting contractor Cape Town',
  },
  {
    id: 'flooring',
    icon: Layers,
    title: 'Laminate Flooring',
    tagline: 'Beautiful, durable floors installed professionally',
    description:
      'Laminate floor installation across Cape Town. We supply and install a wide range of laminate styles – from wood-look to tile-effect – with expert fitting, underlayment, and neat skirting.',
    includes: [
      'Laminate flooring supply and install',
      'Underfloor preparation and levelling',
      'Skirting board fitting',
      'Floor repairs and replacement',
      'Wide range of styles and finishes',
      'Quick, clean installation',
    ],
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80',
    altText: 'Laminate flooring installation Cape Town – Jobo Building Construction',
    keyword: 'laminate flooring Cape Town',
  },
  {
    id: 'ceilings',
    icon: Square,
    title: 'Ceilings',
    tagline: 'New ceiling installs and expert repairs',
    description:
      'Ceiling installation and repair specialist in Cape Town. We fit suspended, board, and corniced ceilings to transform any space. Existing ceiling repairs handled neatly and efficiently.',
    includes: [
      'Suspended ceiling installation',
      'Ceiling board fitting',
      'Cornices and skirtings',
      'Ceiling repairs and patching',
      'Insulation installation',
      'Ceiling painting',
    ],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
    altText: 'Ceiling installation and repair Cape Town – Jobo Building Construction',
    keyword: 'ceiling installation Cape Town',
  },
  {
    id: 'plumbing',
    icon: Droplets,
    title: 'Plumbing',
    tagline: 'Reliable plumbing repairs and installations',
    description:
      'General plumbing services across Cape Town. From fixing a leaking tap to installing new pipework during renovations — Jobo handles plumbing as part of your broader project or as a standalone job.',
    includes: [
      'Leak detection and repair',
      'Pipe installation and replacement',
      'Bathroom and kitchen plumbing',
      'Geyser installations',
      'Drain cleaning and unblocking',
      'Renovation plumbing',
    ],
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
    altText: 'Plumbing repairs and installation Cape Town – Jobo Building Construction',
    keyword: 'plumber Cape Town',
  },
  {
    id: 'tiling',
    icon: Grid3X3,
    title: 'Tiling',
    tagline: 'Precision tiling for floors, walls & bathrooms',
    description:
      'Professional tile installation in Cape Town for bathrooms, kitchens, floors, and outdoor areas. All tile types accepted – ceramic, porcelain, slate, mosaic. Precise, durable, and beautifully finished.',
    includes: [
      'Bathroom tiling',
      'Kitchen splashbacks and floors',
      'Living area floor tiling',
      'Outdoor and pool surround tiling',
      'Waterproofing before tiling',
      'Tile repair and re-grouting',
    ],
    image: 'https://images.unsplash.com/photo-1581814927969-dc4de2671f95?w=800&q=80',
    altText: 'Tiling contractor Cape Town – Jobo Building Construction bathroom and floor tiling',
    keyword: 'tiling Cape Town',
  },
  {
    id: 'paving',
    icon: Layers,
    title: 'Paving',
    tagline: 'Driveways, walkways & patios done right',
    description:
      'Expert paving contractor in Cape Town for driveways, garden paths, patios, and parking areas. We lay concrete, clay, and brick pavers with proper drainage and a professional finish that lasts.',
    includes: [
      'Driveway paving',
      'Garden path and walkway paving',
      'Patio and braai area paving',
      'Parking area paving',
      'Retaining walls and edging',
      'Paving repairs and relaying',
    ],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    altText: 'Paving contractor Cape Town – driveway and patio paving by Jobo',
    keyword: 'paving Cape Town',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section
        className='py-16 sm:py-20'
        style={{ backgroundColor: '#0F172A' }}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <span
            className='inline-block text-xs font-semibold uppercase tracking-widest mb-4'
            style={{ color: '#F97316' }}
          >
            What We Offer
          </span>
          <h1 className='text-4xl sm:text-5xl font-extrabold text-white mb-4'>
            Building &amp; Construction Services
            <br />
            <span style={{ color: '#F97316' }}>in Cape Town</span>
          </h1>
          <p className='text-gray-300 text-lg max-w-2xl mx-auto'>
            From plastering and painting to full renovations — one contractor, every job done right.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col gap-10'>
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className='bg-white rounded-2xl p-8 border border-gray-100 shadow-sm scroll-mt-24'
                >
                  <div className='flex items-center gap-3 mb-4'>
                    <div
                      className='w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0'
                      style={{ backgroundColor: 'rgba(249,115,22,0.12)' }}
                    >
                      <Icon className='w-5 h-5' style={{ color: '#F97316' }} />
                    </div>
                    <div>
                      <h2 className='text-xl font-extrabold' style={{ color: '#0F172A' }}>
                        {service.title}
                      </h2>
                      <p className='text-sm' style={{ color: '#F97316' }}>{service.tagline}</p>
                    </div>
                  </div>

                  <p className='text-gray-600 leading-relaxed mb-5'>
                    {service.description}
                  </p>

                  <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                    {service.includes.map((item) => (
                      <li key={item} className='flex items-center gap-2 text-sm text-gray-700'>
                        <span
                          className='w-1.5 h-1.5 rounded-full flex-shrink-0'
                          style={{ backgroundColor: '#F97316' }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
