import Link from 'next/link'
import { Phone, Mail, MapPin, HardHat } from 'lucide-react'

const services = [
  'Renovations & Maintenance',
  'Building & Blockwork',
  'Plastering',
  'Painting',
  'Laminate Flooring',
  'Ceilings',
  'Plumbing',
  'Tiling',
  'Paving',
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0F172A' }} className='text-gray-300'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          {/* Brand */}
          <div>
            <Link href='/' className='flex items-center gap-2.5 mb-4'>
              <div
                className='w-9 h-9 rounded-lg flex items-center justify-center'
                style={{ backgroundColor: '#F97316' }}
              >
                <HardHat className='w-5 h-5 text-white' />
              </div>
              <div>
                <div className='text-white font-bold text-base leading-tight'>
                  Jobo Building
                </div>
                <div className='text-xs leading-tight' style={{ color: '#F97316' }}>
                  Construction
                </div>
              </div>
            </Link>
            <p className='text-sm text-gray-400 leading-relaxed mb-6'>
              Professional builder and contractor based in Cape Town. Quality workmanship
              at fair prices across the Cape Town area.
            </p>
            <div className='flex flex-col gap-3 text-sm'>
              <span className='flex items-center gap-2'>
                <Phone className='w-4 h-4 flex-shrink-0' style={{ color: '#F97316' }} />
                066 367 6516
              </span>
              <span className='flex items-center gap-2'>
                <Mail className='w-4 h-4 flex-shrink-0' style={{ color: '#F97316' }} />
                jobobuildingc@gmail.com
              </span>
              <span className='flex items-start gap-2'>
                <MapPin className='w-4 h-4 flex-shrink-0 mt-0.5' style={{ color: '#F97316' }} />
                Kraaifontein, Cape Town
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-white font-semibold text-sm uppercase tracking-wider mb-4'>
              Quick Links
            </h3>
            <ul className='space-y-2 text-sm'>
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Our Services' },
                { href: '/portfolio', label: 'Portfolio' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/about', label: 'About Jobo' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='hover:text-white transition-colors duration-200'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className='text-white font-semibold text-sm uppercase tracking-wider mb-4'>
              Services
            </h3>
            <ul className='space-y-2 text-sm'>
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href='/services'
                    className='hover:text-white transition-colors duration-200'
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className='border-t py-6'
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500'>
          <p>© {new Date().getFullYear()} Jobo Building Construction. All rights reserved.</p>
          <p>Cape Town, South Africa</p>
        </div>
      </div>
    </footer>
  )
}
