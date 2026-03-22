'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Send, Loader2, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(9, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email').or(z.literal('')).optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Please describe your project (min 10 characters)'),
})

type FormData = z.infer<typeof schema>

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
  'Other / Multiple Services',
]

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitted(true)
        toast.success('Message sent successfully!')
      } else {
        toast.error('Failed to send. Please call us directly on 066 367 6516.')
      }
    } catch {
      toast.error('Failed to send. Please call us directly on 066 367 6516.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className='bg-white rounded-2xl p-10 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center min-h-[400px]'>
        <div
          className='w-16 h-16 rounded-full flex items-center justify-center mb-6'
          style={{ backgroundColor: 'rgba(249,115,22,0.1)' }}
        >
          <CheckCircle2 className='w-8 h-8' style={{ color: '#F97316' }} />
        </div>
        <h3 className='text-xl font-bold mb-3' style={{ color: '#0F172A' }}>
          Message Received!
        </h3>
        <p className='text-gray-500 mb-2'>
          Thanks for reaching out. Jobo will contact you shortly to discuss your project.
        </p>
        <p className='text-sm text-gray-400'>
          For urgent queries, call <strong className='text-gray-700'>066 367 6516</strong>{' '}
          or WhatsApp directly.
        </p>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-2xl p-8 border border-gray-100 shadow-sm'>
      <h2 className='text-xl font-bold mb-2' style={{ color: '#0F172A' }}>
        Get Your Free Quote
      </h2>
      <p className='text-sm text-gray-500 mb-7'>
        Fill in the form and Jobo will get back to you with a free, no-obligation quote.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>
              Full Name <span className='text-red-400'>*</span>
            </label>
            <input
              {...register('name')}
              placeholder='Your name'
              className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition'
            />
            {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>
              Phone Number <span className='text-red-400'>*</span>
            </label>
            <input
              {...register('phone')}
              type='tel'
              placeholder='e.g. 082 123 4567'
              className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition'
            />
            {errors.phone && <p className='text-red-500 text-xs mt-1'>{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1.5'>
            Email Address (optional)
          </label>
          <input
            {...register('email')}
            type='email'
            placeholder='your@email.com'
            className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition'
          />
          {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1.5'>
            Service Required
          </label>
          <select
            {...register('service')}
            className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition bg-white'
          >
            <option value=''>Select a service...</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1.5'>
            Describe Your Project <span className='text-red-400'>*</span>
          </label>
          <textarea
            {...register('message')}
            rows={5}
            placeholder='Tell Jobo about your project – what needs doing, where you are, and any other details that will help us give you an accurate quote...'
            className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none'
          />
          {errors.message && <p className='text-red-500 text-xs mt-1'>{errors.message.message}</p>}
        </div>

        <button
          type='submit'
          disabled={loading}
          className='flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-white font-bold text-base transition-all duration-200 hover:opacity-90 disabled:opacity-60'
          style={{ backgroundColor: '#F97316' }}
        >
          {loading ? (
            <Loader2 className='w-5 h-5 animate-spin' />
          ) : (
            <Send className='w-5 h-5' />
          )}
          {loading ? 'Sending...' : 'Send Message & Request Free Quote'}
        </button>

        <p className='text-xs text-center text-gray-400'>
          By submitting, you agree to be contacted by Jobo Building Construction regarding your inquiry.
        </p>
      </form>
    </div>
  )
}
