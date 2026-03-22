import { createClient } from '@/lib/supabase/server'
import { MessageSquare, Images, FileText, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [{ count: inquiriesCount }, { count: projectsCount }] = await Promise.all([
    supabase.from('inquiries').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
  ])

  const { data: recentInquiries } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    {
      label: 'Total Inquiries',
      value: inquiriesCount ?? 0,
      icon: MessageSquare,
      href: '/admin/inquiries',
      color: '#F97316',
    },
    {
      label: 'Portfolio Projects',
      value: projectsCount ?? 0,
      icon: Images,
      href: '/admin/portfolio',
      color: '#2563EB',
    },
  ]

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
        <p className='text-gray-500 mt-1'>Welcome back, Jobo. Here&apos;s an overview of your site.</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10'>
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4'
            >
              <div
                className='w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0'
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <Icon className='w-6 h-6' style={{ color: stat.color }} />
              </div>
              <div>
                <div className='text-3xl font-extrabold text-gray-900'>{stat.value}</div>
                <div className='text-sm text-gray-500'>{stat.label}</div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10'>
        {[
          { href: '/admin/portfolio', icon: Images, label: 'Add New Project', color: '#F97316' },
          { href: '/admin/content', icon: FileText, label: 'Edit Site Content', color: '#2563EB' },
          { href: '/admin/inquiries', icon: TrendingUp, label: 'View All Inquiries', color: '#059669' },
        ].map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.href}
              href={action.href}
              className='bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-3 group'
            >
              <div
                className='w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0'
                style={{ backgroundColor: `${action.color}18` }}
              >
                <Icon className='w-4.5 h-4.5' style={{ color: action.color }} />
              </div>
              <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                {action.label}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Recent inquiries */}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
          <h2 className='font-semibold text-gray-900'>Recent Inquiries</h2>
          <Link href='/admin/inquiries' className='text-sm font-medium hover:underline' style={{ color: '#F97316' }}>
            View all
          </Link>
        </div>

        {!recentInquiries || recentInquiries.length === 0 ? (
          <div className='text-center py-12 text-gray-400 text-sm'>
            No inquiries yet. Share your website to start getting leads!
          </div>
        ) : (
          <div className='divide-y divide-gray-50'>
            {recentInquiries.map((inq) => (
              <div key={inq.id} className='px-6 py-4 flex items-start justify-between gap-4'>
                <div className='min-w-0'>
                  <div className='font-medium text-gray-900 text-sm'>{inq.name}</div>
                  <div className='text-xs text-gray-500 mt-0.5 truncate'>{inq.phone} {inq.email && `· ${inq.email}`}</div>
                  <div className='text-sm text-gray-600 mt-1 line-clamp-1'>{inq.message}</div>
                </div>
                <div className='text-xs text-gray-400 whitespace-nowrap flex-shrink-0'>
                  {new Date(inq.created_at).toLocaleDateString('en-ZA')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
