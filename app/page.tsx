import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import ServicesTeaser from '@/components/home/ServicesTeaser'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import AboutSnippet from '@/components/home/AboutSnippet'
import AreasServed from '@/components/home/AreasServed'

export const metadata: Metadata = {
  title: 'Builder & Contractor Cape Town | Jobo Building Construction',
  description:
    'Jobo Building Construction – professional builder in Cape Town. Plastering, painting, tiling, paving, renovations, ceilings, laminate flooring & more. Free quotes. Call 066 367 6516.',
  openGraph: {
    title: 'Jobo Building Construction | Builder Cape Town',
    description:
      'Trusted Cape Town builder. Renovations, plastering, painting, tiling, paving & more. Free quotes available.',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className='flex-1 pt-16 lg:pt-20'>
        <Hero />
        <ServicesTeaser />
        <FeaturedProjects />
        <AboutSnippet />
<AreasServed />
      </main>
      <Footer />
    </>
  )
}
