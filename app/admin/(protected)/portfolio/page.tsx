import { createClient } from '@/lib/supabase/server'
import PortfolioManager from '@/components/admin/PortfolioManager'
import type { Project } from '@/lib/types'

export default async function AdminPortfolioPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Portfolio</h1>
        <p className='text-gray-500 mt-1'>
          Add, edit, and delete projects. Uploaded photos appear on your website&apos;s portfolio page.
        </p>
      </div>
      <PortfolioManager initialProjects={(projects as Project[]) || []} />
    </div>
  )
}
