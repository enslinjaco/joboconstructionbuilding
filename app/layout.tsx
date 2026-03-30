import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jobobuildingconstruction.co.za'),
  title: {
    default: 'Jobo Builds | Builder & Contractor Cape Town',
    template: '%s | Jobo Builds Cape Town',
  },
  description:
    'Jobo Builds – trusted builder, plastering, painting, tiling, paving, renovations & maintenance in Cape Town and Western Cape. Free quotes. Call +27606873078.',
  keywords: [
    'builder Cape Town',
    'building contractor Cape Town',
    'home renovations Cape Town',
    'plastering Cape Town',
    'painting contractor Cape Town',
    'tiling Cape Town',
    'paving Cape Town',
    'laminate flooring Cape Town',
    'ceiling installation Cape Town',
    'plumber Cape Town',
    'renovations and maintenance Cape Town',
    'Jobo Builds',
    'handyman Cape Town',
    'construction Western Cape',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Jobo Builds',
    title: 'Jobo Builds | Builder & Contractor Cape Town',
    description:
      'Trusted builder and contractor in Cape Town. Plastering, painting, tiling, paving, renovations & more. Free quotes available.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobo Builds | Cape Town Builder',
    description: 'Trusted builder and contractor in Cape Town. Free quotes.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Jobo Builds',
  description:
    'Professional builder and contractor in Cape Town offering plastering, painting, tiling, paving, laminate flooring, ceilings, plumbing, renovations and maintenance.',
  telephone: '+27606873078',
  email: 'jobobuildingconstruction@gmail.com',
  url: 'https://jobobuildingconstruction.co.za',
  areaServed: [
    'Cape Town',
    'Durbanville',
    'Bellville',
    'Brackenfell',
    'Parow',
    'Table View',
    'Milnerton',
    'Atlantic Seaboard',
    'City Bowl',
    'Southern Suburbs',
    'Winelands',
    'Western Cape',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cape Town',
    addressRegion: 'Western Cape',
    addressCountry: 'ZA',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Building & Construction Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Renovations & Maintenance' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Building & Blockwork' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plastering' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Painting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Laminate Flooring' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ceilings' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plumbing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tiling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paving' } },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en-ZA'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className='min-h-full flex flex-col'>
        {children}
        <Toaster richColors position='top-right' />
      </body>
    </html>
  )
}
