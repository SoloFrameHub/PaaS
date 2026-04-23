import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth'

export default async function Home() {
  const session = await getServerSession()
  if (session?.uid) {
    redirect('/dashboard')
  }
  // Fallback: middleware handles the rewrite to /home.html for most cases,
  // but if someone reaches here (e.g. stale cookie), redirect to marketing page
  redirect('/home.html')
}
