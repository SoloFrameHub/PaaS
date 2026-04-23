import Sidebar from '@/components/ui/sidebar'
import Header from '@/components/ui/header'
import FlyoutChat from '@/components/ai/flyout-chat'
import CelebrationProvider from '@/components/celebrations/celebration-provider'
import { CURRICULUM } from '@/lib/data/curriculum'
import ErrorBoundary from '@/components/error-boundary'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Simplify curriculum for sidebar to reduce client bundle size
  const sidebarTracks = CURRICULUM.map(track => ({
    id: track.id,
    title: track.title,
    magnetComponent: track.magnetComponent,
    courses: track.courses.map(course => ({
      id: course.id,
      title: course.title,
    }))
  }))

  return (
    <CelebrationProvider>
      <div className="flex h-[100dvh] overflow-hidden">

        {/* Sidebar */}
        <Sidebar tracks={sidebarTracks} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

          {/*  Site header */}
          <Header />

          <main className="grow [&>*:first-child]:scroll-mt-16">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>

        </div>

        <FlyoutChat />

      </div>
    </CelebrationProvider>
  )
}
