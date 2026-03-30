'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { HardHat, Loader2, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div
      className='min-h-screen flex items-center justify-center px-4'
      style={{ backgroundColor: '#0F172A' }}
    >
      <div className='w-full max-w-sm'>
        {/* Logo */}
        <div className='text-center mb-8'>
          <div
            className='w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4'
            style={{ backgroundColor: '#F97316' }}
          >
            <HardHat className='w-7 h-7 text-white' />
          </div>
          <h1 className='text-xl font-bold text-white'>Jobo Builds</h1>
          <p className='text-sm text-gray-400 mt-1'>Admin Panel</p>
        </div>

        <div className='bg-white rounded-2xl p-8 shadow-2xl'>
          <h2 className='text-lg font-bold mb-6' style={{ color: '#0F172A' }}>
            Sign In
          </h2>

          <form onSubmit={handleLogin} className='flex flex-col gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                Email
              </label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='admin@example.com'
                className='w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder='••••••••'
                  className='w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition'
                />
                <button
                  type='button'
                  onClick={() => setShowPw(!showPw)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                </button>
              </div>
            </div>

            {error && (
              <div className='text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg'>
                {error}
              </div>
            )}

            <button
              type='submit'
              disabled={loading}
              className='flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-semibold transition hover:opacity-90 disabled:opacity-60 mt-2'
              style={{ backgroundColor: '#F97316' }}
            >
              {loading && <Loader2 className='w-4 h-4 animate-spin' />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
