import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Project } from '@/lib/types'

const fallbackProjects = [
  {
    id: '1',
    title: 'Full Home Renovation – Durbanville',
    category: 'Renovations',
    description: 'Complete interior renovation including new ceilings, plastering, painting, tiling and laminate flooring.',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
  },
  {
    id: '2',
    title: 'Brick Boundary Wall – Bellville',
    category: 'Building',
    description: 'New brick and mortar boundary wall with neat plaster and paint finish.',
    image: 'https://images.unsplash.com/photo-1565117962316-3acffabef879?w=800&q=80',
  },
  {
    id: '3',
    title: 'Driveway Paving – Table View',
    category: 'Paving',
    description: 'Full driveway and entrance paving using concrete pavers. Professional finish and drainage installed.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
]

const categoryColour: Record<string, string> = {
  Building: '#2563EB',
  Plastering: '#7C3AED',
  Painting: '#059669',
  Renovations: '#D97706',
  Tiling: '#0891B2',
  Paving: '#DC2626',
  Ceilings: '#4F46E5',
  Flooring: '#BE185D',
  Plumbing: '#0F766E',
}

export default async function FeaturedProjects() {
  let projects: (Project | typeof fallbackProjects[0])[] = fallbackProjects

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)
    if (data && data.length > 0) projects = data
  } catch {
    // Use fallback
  }

  return (
    <section className='py-20' style={{ backgroundColor: '#0F172A' }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14'>
          <div>
            <span
              className='inline-block text-xs font-semibold uppercase tracking-widest mb-3'
              style={{ color: '#F97316' }}
            >
              Our Work
            </span>
            <h2 className='text-3xl sm:text-4xl font-extrabold text-white'>
              Recent Construction Projects
              <br />
              <span style={{ color: '#F97316' }}>in Cape Town</span>
            </h2>
          </div>
          <Link
            href='/portfolio'
            className='flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors whitespace-nowrap'
          >
            View full portfolio <ArrowRight className='w-4 h-4' />
          </Link>
        </div>

        {/* Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {projects.map((project) => {
            const imageUrl =
              'image_urls' in project && project.image_urls?.[0]
                ? project.image_urls[0]
                : 'image' in project
                ? project.image
                : ''

            return (
              <div
                key={project.id}
                className='group rounded-2xl overflow-hidden border hover:border-orange-500 transition-all duration-300'
                style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: '#1E293B' }}
              >
                <div className='relative h-52 overflow-hidden'>
                  <Image
                    src={imageUrl}
                    alt={`${project.title} – construction project by Jobo Builds Cape Town`}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-500'
                    sizes='(max-width: 768px) 100vw, 33vw'
                  />
                  <div
                    className='absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white'
                    style={{ backgroundColor: categoryColour[project.category] || '#F97316' }}
                  >
                    {project.category}
                  </div>
                </div>
                <div className='p-5'>
                  <h3 className='text-white font-bold text-base mb-2'>{project.title}</h3>
                  <p className='text-gray-400 text-sm leading-relaxed line-clamp-2'>
                    {project.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className='text-center mt-12'>
          <Link
            href='/portfolio'
            className='inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105 text-white'
            style={{ backgroundColor: '#F97316' }}
          >
            <ExternalLink className='w-4 h-4' />
            See All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
