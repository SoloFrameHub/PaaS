'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import AuthHeader from '../auth-header'
import AuthImage from '../auth-image'

export default function VerifyEmail() {
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [resendMessage, setResendMessage] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const router = useRouter()
  const locale = useLocale()
  const isEs = locale === 'es'

  // Fetch session to get email
  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.push('/signin')
        } else {
          setEmail(data.user.email || null)
          if (data.user.emailVerified) {
            router.push('/onboarding/welcome')
          }
        }
      })
      .catch(() => router.push('/signin'))
  }, [router])

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendCooldown])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await response.json().catch(() => ({}))
      if (response.ok && data.ok) {
        router.push(data.redirect || '/onboarding/welcome')
      } else {
        setError(data.error || 'Verification failed')
        setLoading(false)
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResendMessage(null)
    setError(null)

    try {
      const response = await fetch('/api/auth/resend-code', { method: 'POST' })
      const data = await response.json().catch(() => ({}))
      if (response.ok && data.ok) {
        setResendMessage(isEs ? '¡Código enviado! Revisa tu bandeja.' : 'New code sent! Check your inbox.')
        setResendCooldown(60)
      } else {
        setError(data.error || 'Failed to resend code')
      }
    } catch {
      setError('Failed to resend code. Please try again.')
    }
  }

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="relative md:flex">
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <AuthHeader />
            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">{isEs ? 'Verifica tu correo' : 'Verify your email'}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {isEs ? 'Te enviamos un código de 6 dígitos a ' : 'We sent a 6-digit code to '}
                {email ? <span className="font-medium text-gray-700 dark:text-gray-300">{email}</span> : (isEs ? 'tu correo' : 'your email')}
                . {isEs ? 'Ingrésalo abajo para continuar.' : 'Enter it below to continue.'}
              </p>

              <form onSubmit={handleVerify}>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="code">
                    {isEs ? 'Código de verificación' : 'Verification Code'}
                  </label>
                  <input
                    id="code"
                    className="form-input w-full text-center text-2xl tracking-[0.5em] font-mono"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    autoFocus
                    required
                  />
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded text-sm">
                    {error}
                  </div>
                )}

                {resendMessage && (
                  <div className="mt-4 p-3 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded text-sm">
                    {resendMessage}
                  </div>
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={loading || code.length !== 6}
                    className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white w-full disabled:opacity-50"
                  >
                    {loading ? (isEs ? 'Verificando...' : 'Verifying...') : (isEs ? 'Verificar Correo' : 'Verify Email')}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                  className="text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 disabled:text-gray-400 disabled:dark:text-gray-600"
                >
                  {resendCooldown > 0 ? (isEs ? `Reenviar en ${resendCooldown}s` : `Resend code in ${resendCooldown}s`) : (isEs ? '¿No recibiste el código? Reenviar' : "Didn't get the code? Resend")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <AuthImage />
      </div>
    </main>
  )
}
