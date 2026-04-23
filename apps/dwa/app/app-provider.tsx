'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AppContextProps {
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
  sidebarExpanded: boolean
  setSidebarExpanded: Dispatch<SetStateAction<boolean>>
}

interface AuthUser {
  uid: string
  email?: string | null
  role?: string | null
}

interface AuthContextProps {
  user: AuthUser | null
  loading: boolean
  signOut: () => Promise<void>
}

const AppContext = createContext<AppContextProps>({
  sidebarOpen: false,
  setSidebarOpen: (): boolean => false,
  sidebarExpanded: false,
  setSidebarExpanded: (): boolean => false
})

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  signOut: async () => { },
})

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-expanded')
    if (stored !== null) {
      setSidebarExpanded(stored === 'true')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', String(sidebarExpanded))
  }, [sidebarExpanded])

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/auth/session', { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (!controller.signal.aborted) {
          if (data?.user?.uid) {
            setUser({ uid: data.user.uid, email: data.user.email, role: data.user.role ?? 'user' })
          } else {
            setUser(null)
          }
        }
      })
      .catch((err) => { if (err.name !== 'AbortError') setUser(null) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [])

  const signOut = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' })
      await fetch('/api/auth/session', { method: 'DELETE' })
    } catch (e) {
      console.error('Failed to sign out', e)
    }
    setUser(null)
    router.push('/signin')
  }

  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen, sidebarExpanded, setSidebarExpanded }}>
      <AuthContext.Provider value={{ user, loading, signOut }}>
        {children}
      </AuthContext.Provider>
    </AppContext.Provider>
  )
}

export const useAppProvider = () => useContext(AppContext)
export const useAuth = () => useContext(AuthContext)
