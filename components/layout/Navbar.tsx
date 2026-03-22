'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, HardHat } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
      style={{ backgroundColor: '#0F172A' }}
    >
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 lg:h-20'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-2.5 flex-shrink-0'>
            <div
              className='w-9 h-9 rounded-lg flex items-center justify-center'
              style={{ backgroundColor: '#F97316' }}
            >
              <HardHat className='w-5 h-5 text-white' />
            </div>
            <div className='flex flex-col'>
              <span className='text-white font-bold text-sm sm:text-base leading-tight'>
                Jobo Building
              </span>
              <span className='text-xs leading-tight' style={{ color: '#F97316' }}>
                Construction
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className='hidden lg:flex items-center gap-8'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-orange-400'
                    : 'text-gray-300 hover:text-white'
                }`}
                style={
                  pathname === link.href ? { color: '#F97316' } : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors'
            aria-label='Toggle menu'
          >
            {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            className='lg:hidden border-t pb-4'
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div className='flex flex-col gap-1 pt-4'>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  style={
                    pathname === link.href
                      ? { backgroundColor: '#F97316', color: 'white' }
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
