import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Forum Post - Wellness Academy',
  description: 'Community discussion',
}

export default function ForumPostLegacy() {
  redirect('/community/forum')
}
