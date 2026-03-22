'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ZoomIn } from 'lucide-react'
import ProjectModal from './ProjectModal'
import type { Project } from '@/lib/types'


const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'Full Home Renovation – Durbanville',
    category: 'Renovations',
    description: 'Complete interior renovation including new ceilings, plastering, painting, tiling and laminate flooring. The client wanted a full refresh of their family home – we delivered on time and on budget.',
    date: '2024-03-15',
    image_urls: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80',
    ],
    created_at: '2024-03-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Brick Boundary Wall – Bellville',
    category: 'Building',
    description: 'New brick and mortar boundary wall with neat plaster and paint finish. Solid, well-crafted wall with proper foundations.',
    date: '2024-02-20',
    image_urls: [
      'https://images.unsplash.com/photo-1565117962316-3acffabef879?w=800&q=80',
    ],
    created_at: '2024-02-20T00:00:00Z',
  },
  {
    id: '3',
    title: 'Driveway Paving – Table View',
    category: 'Paving',
    description: 'Full driveway and entrance paving using concrete pavers. Professional finish with correct drainage gradients.',
    date: '2024-01-10',
    image_urls: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
    created_at: '2024-01-10T00:00:00Z',
  },
  {
    id: '4',
    title: 'Bathroom Tiling & Renovation – Parow',
    category: 'Tiling',
    description: 'Full bathroom renovation including waterproofing, floor-to-ceiling tiling, new vanity, and painting.',
    date: '2023-12-05',
    image_urls: [
      'https://images.unsplash.com/photo-1581814927969-dc4de2671f95?w=800&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    ],
    created_at: '2023-12-05T00:00:00Z',
  },
  {
    id: '5',
    title: 'Exterior & Interior Painting – Brackenfell',
    category: 'Painting',
    description: 'Full exterior repaint and interior walls. Used weather-resistant exterior paint for long-lasting protection.',
    date: '2023-11-18',
    image_urls: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca71b5?w=800&q=80',
    ],
    created_at: '2023-11-18T00:00:00Z',
  },
  {
    id: '6',
    title: 'New Ceilings & Cornices – Durbanville',
    category: 'Ceilings',
    description: 'Replaced damaged old ceilings with new board ceilings and decorative cornices throughout the home.',
    date: '2023-10-22',
    image_urls: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
    ],
    created_at: '2023-10-22T00:00:00Z',
  },
  {
    id: '7',
    title: 'Laminate Flooring Installation – Bellville',
    category: 'Flooring',
    description: 'Full house laminate flooring installation, including floor prep, levelling, and skirting boards throughout.',
    date: '2023-09-14',
    image_urls: [
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80',
    ],
    created_at: '2023-09-14T00:00:00Z',
  },
  {
    id: '8',
    title: 'Wall Plastering & Skimming – Cape Town City Bowl',
    category: 'Plastering',
    description: 'Full interior re-plaster after water damage repairs. Smooth skim finish ready for painting.',
    date: '2023-08-30',
    image_urls: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
    created_at: '2023-08-30T00:00:00Z',
  },
]

interface Props {
  initialProjects: Project[]
}

export default function PortfolioGallery({ initialProjects }: Props) {
  const projects = initialProjects.length > 0 ? initialProjects : fallbackProjects
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      {/* Masonry grid – all projects, no filters */}
      <div className='columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5'>
        {projects.map((project) => (
          <div
            key={project.id}
            className='break-inside-avoid group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300'
            onClick={() => setSelectedProject(project)}
          >
            <div className='relative overflow-hidden'>
              <Image
                src={project.image_urls[0] || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80'}
                alt={`${project.title} – building and construction project Cape Town`}
                width={600}
                height={400}
                unoptimized
                className='w-full object-cover group-hover:scale-105 transition-transform duration-500'
                style={{ aspectRatio: '4/3' }}
              />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center'>
                <ZoomIn className='text-white w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </div>
            </div>
            <div className='p-4'>
              <h3 className='font-bold text-gray-900 text-sm'>{project.title}</h3>
              {project.date && (
                <p className='text-xs text-gray-400 mt-1'>
                  {new Date(project.date).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className='text-center py-20 text-gray-400'>
          No projects yet. Check back soon!
        </div>
      )}

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
