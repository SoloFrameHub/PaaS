'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FounderProvider } from '@/lib/context/FounderContext'

interface AppContextProps {
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
  sidebarExpanded: boolean
  setSidebarExpanded: Dispatch<SetStateAction<boolean>>
}

interface AuthUser {
  uid: string
  email?: string | null
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
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data?.user?.uid) {
          setUser({ uid: data.user.uid, email: data.user.email })
        } else {
          setUser(null)
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
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
        <FounderProviderWrapper userId={user?.uid || null}>
          {children}
        </FounderProviderWrapper>
      </AuthContext.Provider>
    </AppContext.Provider>
  )
}

function FounderProviderWrapper({ userId, children }: { userId: string | null, children: React.ReactNode }) {
  return (
    <FounderProvider userId={userId}>
      {children}
    </FounderProvider>
  )
}

export const useAppProvider = () => useContext(AppContext)
export const useAuth = () => useContext(AuthContext)
