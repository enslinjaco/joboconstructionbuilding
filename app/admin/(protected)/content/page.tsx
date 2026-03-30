import { createClient } from '@/lib/supabase/server'
import ContentEditor from '@/components/admin/ContentEditor'

const defaultContent: Record<string, string> = {
  hero_heading: 'Professional Builder & Contractor in Cape Town',
  hero_subheading: 'Jobo Builds delivers quality building, plastering, painting, tiling, paving and full home renovations across Cape Town and the Western Cape.',
  about_bio: "My name is Jobo and I've been building and renovating homes across Cape Town for over a decade. I started Jobo Builds on a simple promise: deliver quality craftsmanship you can be proud of, on time, and at a price that's fair.",
  contact_phone: '060 687 3078',
  contact_email: 'jobobuildingc@gmail.com',
  areas_served: 'Cape Town, Southern Suburbs, Northern Suburbs',
}

export default async function ContentPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('site_content').select('*')

  const content: Record<string, string> = { ...defaultContent }
  if (data) {
    data.forEach((row: { key: string; value: string }) => {
      content[row.key] = row.value
    })
  }

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Site Content</h1>
        <p className='text-gray-500 mt-1'>
          Edit the text and contact details shown on your website. Changes are saved immediately.
        </p>
      </div>
      <ContentEditor initialContent={content} />
    </div>
  )
}
