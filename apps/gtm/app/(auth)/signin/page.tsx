'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import AuthHeader from '../auth-header'
import AuthImage from '../auth-image'
import { GA4Events } from '@/lib/analytics/ga4'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const locale = useLocale()
  const isEs = locale === 'es'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (process.env.NEXT_PUBLIC_MOCK_AUTH === 'true') {
        const response = await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idToken: 'mock-token',
            uid: `mock-${email.replace(/[^a-zA-Z0-9]/g, '')}`,
            email,
          }),
        });
        if (response.ok) {
          router.push('/dashboard');
          return;
        }
        setError('Failed to create mock session');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.ok) {
        GA4Events.login('email');
        router.push(data.redirect || '/dashboard');
      } else {
        setError(data.error || 'Failed to sign in');
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Failed to sign in')
      setLoading(false)
    }
  }

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <AuthHeader />
            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">{isEs ? '¡Bienvenido/a de vuelta!' : 'Welcome back!'}</h1>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">{isEs ? 'Correo electrónico' : 'Email Address'}</label>
                    <input
                      id="email"
                      className="form-input w-full"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">{isEs ? 'Contraseña' : 'Password'}</label>
                    <input
                      id="password"
                      className="form-input w-full"
                      type="password"
                      autoComplete="on"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link className="text-sm underline hover:no-underline" href="/reset-password">{isEs ? '¿Olvidaste tu contraseña?' : 'Forgot Password?'}</Link>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-3 disabled:opacity-50"
                  >
                    {loading ? (isEs ? 'Iniciando...' : 'Signing In...') : (isEs ? 'Iniciar Sesión' : 'Sign In')}
                  </button>
                </div>
              </form>

              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60">
                <div className="text-sm">
                  {isEs ? '¿No tienes cuenta?' : "Don't you have an account?"} <Link className="font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" href="/signup">{isEs ? 'Crear Cuenta' : 'Sign Up'}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AuthImage />
      </div>
    </main>
  )
}
