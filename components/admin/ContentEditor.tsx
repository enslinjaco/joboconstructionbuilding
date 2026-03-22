'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Save, Loader2 } from 'lucide-react'

interface Props {
  initialContent: Record<string, string>
}

const fields = [
  { key: 'hero_heading', label: 'Hero Heading', type: 'text', placeholder: 'Main headline on homepage' },
  { key: 'hero_subheading', label: 'Hero Subheading', type: 'textarea', placeholder: 'Subtitle on homepage' },
  { key: 'about_bio', label: 'About Bio', type: 'textarea', placeholder: 'Your biography / about text' },
  { key: 'contact_phone', label: 'Phone Number (display)', type: 'text', placeholder: 'e.g. 066 367 6516' },
  { key: 'contact_email', label: 'Email Address', type: 'text', placeholder: 'your@email.com' },
  { key: 'contact_whatsapp', label: 'WhatsApp Number (with country code)', type: 'text', placeholder: 'e.g. +27663676516' },
  { key: 'areas_served', label: 'Areas Served (comma separated)', type: 'textarea', placeholder: 'Durbanville, Bellville, ...' },
  { key: 'daily_rate', label: 'Daily Labour Rate (R)', type: 'text', placeholder: 'e.g. 1000' },
]

export default function ContentEditor({ initialContent }: Props) {
  const [content, setContent] = useState(initialContent)
  const [saving, setSaving] = useState<string | null>(null)

  const saveField = async (key: string) => {
    setSaving(key)
    const supabase = createClient()

    const { error } = await supabase
      .from('site_content')
      .upsert({ key, value: content[key] || '' }, { onConflict: 'key' })

    if (error) {
      toast.error(`Failed to save ${key}`)
    } else {
      toast.success('Saved successfully!')
    }
    setSaving(null)
  }

  const saveAll = async () => {
    setSaving('all')
    const supabase = createClient()

    const rows = Object.entries(content).map(([key, value]) => ({ key, value: value || '' }))

    const { error } = await supabase
      .from('site_content')
      .upsert(rows, { onConflict: 'key' })

    if (error) {
      toast.error('Failed to save changes')
    } else {
      toast.success('All changes saved!')
    }
    setSaving(null)
  }

  return (
    <div>
      <div className='flex justify-end mb-6'>
        <button
          onClick={saveAll}
          disabled={saving === 'all'}
          className='flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold transition hover:opacity-90 disabled:opacity-60'
          style={{ backgroundColor: '#F97316' }}
        >
          {saving === 'all' ? (
            <Loader2 className='w-4 h-4 animate-spin' />
          ) : (
            <Save className='w-4 h-4' />
          )}
          Save All Changes
        </button>
      </div>

      <div className='flex flex-col gap-6'>
        {fields.map((field) => (
          <div
            key={field.key}
            className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'
          >
            <div className='flex items-center justify-between mb-3'>
              <div>
                <label className='block font-semibold text-gray-900 text-sm'>
                  {field.label}
                </label>
                <span className='text-xs text-gray-400 font-mono'>{field.key}</span>
              </div>
              <button
                onClick={() => saveField(field.key)}
                disabled={saving === field.key}
                className='flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-white text-xs font-semibold transition hover:opacity-90 disabled:opacity-60'
                style={{ backgroundColor: '#0F172A' }}
              >
                {saving === field.key ? (
                  <Loader2 className='w-3 h-3 animate-spin' />
                ) : (
                  <Save className='w-3 h-3' />
                )}
                Save
              </button>
            </div>

            {field.type === 'textarea' ? (
              <textarea
                value={content[field.key] || ''}
                onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                rows={4}
                placeholder={field.placeholder}
                className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none'
              />
            ) : (
              <input
                type='text'
                value={content[field.key] || ''}
                onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition'
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
