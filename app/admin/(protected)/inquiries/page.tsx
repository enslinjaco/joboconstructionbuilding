import { createClient } from '@/lib/supabase/server'
import { MessageSquare, Phone, Mail, Calendar } from 'lucide-react'

export default async function InquiriesPage() {
  const supabase = await createClient()
  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Inquiries</h1>
        <p className='text-gray-500 mt-1'>
          All contact form submissions from your website.
          {inquiries && ` ${inquiries.length} total.`}
        </p>
      </div>

      {!inquiries || inquiries.length === 0 ? (
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-20 text-gray-400'>
          <MessageSquare className='w-10 h-10 mx-auto mb-3 text-gray-300' />
          <p className='font-medium'>No inquiries yet</p>
          <p className='text-sm mt-1'>Submissions from your contact form will appear here.</p>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'
            >
              <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-4'>
                <div className='min-w-0 flex-1'>
                  <div className='flex items-center gap-2 mb-3'>
                    <h3 className='font-bold text-gray-900'>{inq.name}</h3>
                  </div>

                  <div className='flex flex-wrap gap-4 text-sm text-gray-500 mb-4'>
                    {inq.phone && (
                      <a
                        href={`tel:${inq.phone}`}
                        className='flex items-center gap-1.5 hover:text-orange-500 transition-colors'
                      >
                        <Phone className='w-3.5 h-3.5' />
                        {inq.phone}
                      </a>
                    )}
                    {inq.email && (
                      <a
                        href={`mailto:${inq.email}`}
                        className='flex items-center gap-1.5 hover:text-orange-500 transition-colors'
                      >
                        <Mail className='w-3.5 h-3.5' />
                        {inq.email}
                      </a>
                    )}
                    <span className='flex items-center gap-1.5'>
                      <Calendar className='w-3.5 h-3.5' />
                      {new Date(inq.created_at).toLocaleDateString('en-ZA', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div className='bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap'>
                    {inq.message}
                  </div>
                </div>

                <div className='flex flex-row sm:flex-col gap-2 flex-shrink-0'>
                  {inq.phone && (
                    <a
                      href={`https://wa.me/${inq.phone.replace(/\D/g, '')}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='px-4 py-2 rounded-lg text-white text-xs font-semibold hover:opacity-90 transition text-center'
                      style={{ backgroundColor: '#25D366' }}
                    >
                      WhatsApp
                    </a>
                  )}
                  {inq.phone && (
                    <a
                      href={`tel:${inq.phone}`}
                      className='px-4 py-2 rounded-lg text-white text-xs font-semibold hover:opacity-90 transition text-center'
                      style={{ backgroundColor: '#F97316' }}
                    >
                      Call
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
