'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import AuthHeader from '../auth-header'
import AuthImage from '../auth-image'

type Step = 'email' | 'code' | 'password' | 'done'

export default function ResetPassword() {
  const locale = useLocale()
  const isEs = locale === 'es'
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  // Cooldown timer for resend
  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendCooldown])

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json().catch(() => ({}))
      if (response.ok && data.ok) {
        setStep('code')
        setResendCooldown(60)
      } else {
        setError(data.error || (isEs ? 'Algo salió mal' : 'Something went wrong'))
      }
    } catch {
      setError(isEs ? 'Algo salió mal. Por favor intenta de nuevo.' : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setError(null)
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (response.ok) {
        setResendCooldown(60)
      }
    } catch {
      setError(isEs ? 'Error al reenviar el código. Por favor intenta de nuevo.' : 'Failed to resend code. Please try again.')
    }
  }

  const handleVerifyAndReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError(isEs ? 'Las contraseñas no coinciden' : 'Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError(isEs ? 'La contraseña debe tener al menos 6 caracteres' : 'Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, password }),
      })
      const data = await response.json().catch(() => ({}))
      if (response.ok && data.ok) {
        setStep('done')
      } else {
        setError(data.error || (isEs ? 'Error al restablecer la contraseña' : 'Failed to reset password'))
      }
    } catch {
      setError(isEs ? 'Algo salió mal. Por favor intenta de nuevo.' : 'Something went wrong. Please try again.')
    } finally {
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
              <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">{isEs ? 'Restablecer tu Contraseña' : 'Reset your Password'}</h1>

              {/* Step 1: Enter Email */}
              {step === 'email' && (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {isEs ? 'Ingresa tu correo y te enviaremos un código para restablecer tu contraseña.' : "Enter your email and we'll send you a code to reset your password."}
                  </p>
                  <form onSubmit={handleRequestCode}>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="email">
                        {isEs ? 'Correo electrónico' : 'Email Address'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        className="form-input w-full"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>

                    {error && (
                      <div className="mt-4 p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded text-sm">
                        {error}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-6">
                      <Link className="text-sm underline hover:no-underline" href="/signin">
                        {isEs ? 'Volver a Iniciar Sesión' : 'Back to Sign In'}
                      </Link>
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap disabled:opacity-50"
                      >
                        {loading ? (isEs ? 'Enviando...' : 'Sending...') : (isEs ? 'Enviar Código' : 'Send Reset Code')}
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* Step 2: Enter Code + New Password */}
              {step === 'code' && (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {isEs ? 'Enviamos un código de 6 dígitos a ' : 'We sent a 6-digit code to '}
                    <span className="font-medium text-gray-700 dark:text-gray-300">{email}</span>.
                    {isEs ? ' Ingrésalo a continuación con tu nueva contraseña.' : ' Enter it below with your new password.'}
                  </p>
                  <form onSubmit={handleVerifyAndReset}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="code">
                          {isEs ? 'Código de restablecimiento' : 'Reset Code'}
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
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="password">
                          {isEs ? 'Nueva Contraseña' : 'New Password'} <span className="text-red-500">*</span>
                        </label>
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
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="confirm-password">
                          {isEs ? 'Confirmar Contraseña' : 'Confirm Password'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="confirm-password"
                          className="form-input w-full"
                          type="password"
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          minLength={6}
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="mt-4 p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded text-sm">
                        {error}
                      </div>
                    )}

                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={loading || code.length !== 6}
                        className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white w-full disabled:opacity-50"
                      >
                        {loading ? (isEs ? 'Restableciendo...' : 'Resetting...') : (isEs ? 'Restablecer Contraseña' : 'Reset Password')}
                      </button>
                    </div>
                  </form>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => { setStep('email'); setError(null); setCode(''); }}
                      className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {isEs ? 'Cambiar correo' : 'Change email'}
                    </button>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendCooldown > 0}
                      className="text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 disabled:text-gray-400 disabled:dark:text-gray-600"
                    >
                      {resendCooldown > 0 ? (isEs ? `Reenviar en ${resendCooldown}s` : `Resend in ${resendCooldown}s`) : (isEs ? 'Reenviar código' : 'Resend code')}
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Success */}
              {step === 'done' && (
                <div className="mt-6">
                  <div className="p-4 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded mb-6">
                    {isEs ? 'Tu contraseña se ha restablecido exitosamente.' : 'Your password has been reset successfully.'}
                  </div>
                  <Link
                    href="/signin"
                    className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white w-full text-center block"
                  >
                    {isEs ? 'Iniciar Sesión con Nueva Contraseña' : 'Sign In with New Password'}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <AuthImage />
      </div>
    </main>
  )
}
