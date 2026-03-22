'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Images,
  FileText,
  MessageSquare,
  LogOut,
  HardHat,
  ExternalLink,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/portfolio', label: 'Portfolio', icon: Images },
  { href: '/admin/content', label: 'Site Content', icon: FileText },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside
      className='w-64 flex-shrink-0 flex flex-col min-h-screen border-r shadow-sm'
      style={{ backgroundColor: '#0F172A', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      {/* Logo */}
      <div className='flex items-center gap-2.5 px-6 py-5 border-b' style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div
          className='w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0'
          style={{ backgroundColor: '#F97316' }}
        >
          <HardHat className='w-4.5 h-4.5 text-white' />
        </div>
        <div>
          <div className='text-white font-bold text-sm leading-tight'>Jobo Building</div>
          <div className='text-xs' style={{ color: '#F97316' }}>Admin Panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav className='flex-1 px-3 py-4 flex flex-col gap-1'>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className='flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150'
              style={
                isActive
                  ? { backgroundColor: '#F97316', color: 'white' }
                  : { color: '#94A3B8' }
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.color = 'white'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#94A3B8'
                }
              }}
            >
              <Icon className='w-4.5 h-4.5' />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className='px-3 py-4 border-t flex flex-col gap-1' style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <Link
          href='/'
          target='_blank'
          className='flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all'
        >
          <ExternalLink className='w-4 h-4' />
          View Website
        </Link>
        <button
          onClick={handleLogout}
          className='flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full text-left'
        >
          <LogOut className='w-4 h-4' />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
