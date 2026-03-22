import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import PortfolioGallery from '@/components/portfolio/PortfolioGallery'
import type { Project } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Portfolio – Construction & Renovation Projects Cape Town',
  description:
    'Browse Jobo Building Construction\'s portfolio of completed projects across Cape Town – renovations, building, plastering, painting, tiling, paving and more. See the quality of our work.',
  openGraph: {
    title: 'Portfolio – Building Projects Cape Town | Jobo Building Construction',
    description: 'See our completed construction and renovation projects across Cape Town.',
  },
}

export const revalidate = 60

export default async function PortfolioPage() {
  let projects: Project[] = []

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) projects = data
  } catch {
    // Use fallback inside PortfolioGallery
  }

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
            Our Work
          </span>
          <h1 className='text-4xl sm:text-5xl font-extrabold text-white mb-4'>
            Construction Projects{' '}
            <span style={{ color: '#F97316' }}>in Cape Town</span>
          </h1>
          <p className='text-gray-300 text-lg max-w-xl mx-auto'>
            Real work. Real results. Browse our completed building, renovation, and
            maintenance projects across Cape Town and the Western Cape.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <PortfolioGallery initialProjects={projects} />
        </div>
      </section>
    </>
  )
}
