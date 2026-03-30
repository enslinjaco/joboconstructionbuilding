'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Phone, MessageCircle, Send, Loader2 } from 'lucide-react'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  phone: z.string().min(9, 'Please enter a valid phone number'),
  message: z.string().min(10, 'Please describe your project (min 10 characters)'),
})

type FormData = z.infer<typeof schema>

export default function CtaForm() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
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
        toast.success('Message sent! Jobo will contact you shortly.')
        reset()
      } else {
        toast.error('Failed to send. Please call us directly.')
      }
    } catch {
      toast.error('Failed to send. Please call us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className='py-20'
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left */}
          <div>
            <span
              className='inline-block text-xs font-semibold uppercase tracking-widest mb-4'
              style={{ color: '#F97316' }}
            >
              Free Quote
            </span>
            <h2 className='text-3xl sm:text-4xl font-extrabold text-white mb-4'>
              Get Your Free Building Quote Today
            </h2>
            <p className='text-gray-300 leading-relaxed mb-8'>
              Tell us about your project and Jobo will get back to you quickly with a
              fair, no-obligation quote. Serving all areas of Cape Town and the Western Cape.
            </p>

            <div className='flex flex-col gap-4'>
              <a
                href='tel:+27606873078'
                className='flex items-center gap-3 text-gray-200 hover:text-white transition-colors'
              >
                <div
                  className='w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0'
                  style={{ backgroundColor: 'rgba(249,115,22,0.2)' }}
                >
                  <Phone className='w-5 h-5' style={{ color: '#F97316' }} />
                </div>
                <div>
                  <div className='font-semibold'>Call Directly</div>
                  <div className='text-sm text-gray-400'>060 687 3078</div>
                </div>
              </a>
              <a
                href='https://wa.me/27663676516'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-3 text-gray-200 hover:text-white transition-colors'
              >
                <div
                  className='w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0'
                  style={{ backgroundColor: 'rgba(37,211,102,0.2)' }}
                >
                  <MessageCircle className='w-5 h-5' style={{ color: '#25D366' }} />
                </div>
                <div>
                  <div className='font-semibold'>WhatsApp</div>
                  <div className='text-sm text-gray-400'>Chat with Jobo directly</div>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className='bg-white rounded-2xl p-8'>
            <h3 className='text-lg font-bold mb-6' style={{ color: '#0F172A' }}>
              Send a Message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                  Your Name
                </label>
                <input
                  {...register('name')}
                  placeholder='e.g. John Smith'
                  className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition'
                  style={{ focusRingColor: '#F97316' } as React.CSSProperties}
                />
                {errors.name && (
                  <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                  Phone Number
                </label>
                <input
                  {...register('phone')}
                  type='tel'
                  placeholder='e.g. 082 123 4567'
                  className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition'
                />
                {errors.phone && (
                  <p className='text-red-500 text-xs mt-1'>{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                  Tell Us About Your Project
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder='e.g. I need my kitchen and bathroom tiled, and the living room repainted...'
                  className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition resize-none'
                />
                {errors.message && (
                  <p className='text-red-500 text-xs mt-1'>{errors.message.message}</p>
                )}
              </div>

              <button
                type='submit'
                disabled={loading}
                className='flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-60'
                style={{ backgroundColor: '#F97316' }}
              >
                {loading ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                  <Send className='w-4 h-4' />
                )}
                {loading ? 'Sending...' : 'Send Message & Get Free Quote'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
