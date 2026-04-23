'use client'

import { useDiscussion } from '@/hooks/useForum'

export default function ForumPostRightContent({ discussionId }: { discussionId: string }) {
  const { data } = useDiscussion(discussionId)
  const author = data?.discussion.author

  return (
    <div className="w-full hidden xl:block xl:w-[18rem]">
      <div className="lg:sticky lg:top-16 lg:h-[calc(100dvh-64px)] lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar">
        <div className="md:py-8">
          {/* Button */}
          <div className="mb-6">
            <button className="btn w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">Create Post</button>
          </div>

          {/* Blocks */}
          <div className="space-y-4">

            {/* About the Author */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-4">About the Author</div>
              {author ? (
                <>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 shrink-0 mr-3">
                      {author.avatarUrl ? (
                        <img className="rounded-full" src={author.avatarUrl} width={40} height={40} alt={author.displayName} />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-500 font-bold text-sm">
                          {author.displayName[0]?.toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-100">{author.displayName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 italic">Community member</div>
                    </div>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">{author.discussionCount}</span> Discussions</li>
                    <li><span className="font-medium">{author.commentCount}</span> Comments</li>
                  </ul>
                  <div className="mt-4">
                    <button className="btn-sm w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300">Follow</button>
                  </div>
                </>
              ) : (
                <div className="animate-pulse space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3" />
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                      <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Crisis Resources Card */}
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 p-4 rounded-xl">
              <div className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase mb-2">Need Help Now?</div>
              <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                If you or someone you know is in crisis, please reach out:
              </p>
              <ul className="text-sm space-y-1 text-red-600 dark:text-red-400">
                <li><strong>988</strong> Suicide &amp; Crisis Lifeline</li>
                <li><strong>741741</strong> Crisis Text Line</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
