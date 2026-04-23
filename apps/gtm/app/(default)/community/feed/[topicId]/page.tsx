export const metadata = {
  title: 'Topic - Community',
  description: 'Community discussion topic',
}

import TopicDetail from './topic-detail'

export default function TopicPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
      <TopicDetail />
    </div>
  )
}
