'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import AuthHeader from '../auth-header'
import AuthImage from '../auth-image'
import { GA4Events } from '@/lib/analytics/ga4'

export default function SignUp() {
  const [name, setName] = useState('')
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
            uid: `mock-${Date.now()}`,
            email,
            name,
          }),
        });
        if (response.ok) {
          router.push('/onboarding/welcome');
          return;
        }
        setError('Failed to create mock session');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.ok) {
        GA4Events.signUp('email');
        router.push(data.redirect || '/onboarding/welcome');
      } else {
        setError(data.error || 'Failed to sign up');
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Failed to sign up')
      setLoading(false)
    }
  }

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="relative md:flex">
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <AuthHeader />
            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">{isEs ? 'Crea tu Cuenta' : 'Create your Account'}</h1>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">{isEs ? 'Nombre completo' : 'Full Name'} <span className="text-red-500">*</span></label>
                    <input
                      id="name"
                      className="form-input w-full"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">{isEs ? 'Correo electrónico' : 'Email Address'} <span className="text-red-500">*</span></label>
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
                    <label className="block text-sm font-medium mb-1" htmlFor="password">{isEs ? 'Contraseña' : 'Password'} <span className="text-red-500">*</span></label>
                    <input
                      id="password"
                      className="form-input w-full"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
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
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" required />
                      <span className="text-sm ml-2">{isEs ? 'Acepto los Términos y Condiciones' : 'I accept the Terms and Conditions'}</span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-3 whitespace-nowrap disabled:opacity-50"
                  >
                    {loading ? (isEs ? 'Creando...' : 'Creating...') : (isEs ? 'Crear Cuenta' : 'Sign Up')}
                  </button>
                </div>
              </form>

              <div className="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60">
                <div className="text-sm">
                  {isEs ? '¿Ya tienes cuenta?' : 'Have an account?'} <Link className="font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" href="/signin">{isEs ? 'Iniciar Sesión' : 'Sign In'}</Link>
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
