'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import UserImage01 from '@/public/images/avatar-01.jpg'
import UserImage02 from '@/public/images/avatar-02.jpg'
import UserImage03 from '@/public/images/avatar-03.jpg'
import UserImage04 from '@/public/images/avatar-04.jpg'
import UserImage05 from '@/public/images/avatar-05.jpg'
import UserImage06 from '@/public/images/avatar-06.jpg'
import type { ForumDiscussion } from '@/types/forum'

export default function ForumRightContent({
  onCreatePost,
  onSearch,
}: {
  onCreatePost?: () => void
  onSearch?: (q: string) => void
}) {
  const [searchValue, setSearchValue] = useState('')
  const [popularPosts, setPopularPosts] = useState<ForumDiscussion[]>([])

  // Fetch popular discussions for sidebar
  useEffect(() => {
    fetch('/api/forum/discussions?sort=popular&limit=5')
      .then((res) => res.json())
      .then((json) => setPopularPosts(json.data?.discussions || []))
      .catch(() => {})
  }, [])

  return (
    <div className="w-full hidden xl:block xl:w-[18rem]">
      <div className="lg:sticky lg:top-16 lg:h-[calc(100dvh-64px)] lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar">
        <div className="md:py-8">
          {/* Button */}
          <div className="mb-6">
            <button
              onClick={onCreatePost}
              className="btn w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
            >
              Create Post
            </button>
          </div>

          {/* Search (Cruip sidebar style) */}
          <div className="mb-6">
            <form onSubmit={(e) => { e.preventDefault(); onSearch?.(searchValue) }}>
              <div className="relative flex items-center">
                <input
                  type="search"
                  className="form-input py-1.5 w-full pl-10 rounded-full text-sm"
                  placeholder="Search discussions..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <div className="absolute inset-0 right-auto flex items-center justify-center">
                  <svg className="w-4 h-4 shrink-0 mx-3" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      className="fill-gray-400 dark:fill-gray-500"
                      d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm8.707 12.293a.999.999 0 11-1.414 1.414L11.9 13.314a8.019 8.019 0 001.414-1.414l2.393 2.393z"
                    />
                  </svg>
                </div>
              </div>
            </form>
          </div>

          {/* Blocks */}
          <div className="space-y-4">

            {/* Block 1: Wellness Events */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-4">Upcoming Wellness Events</div>
              <ul>
                {/* Event 1 */}
                <li className="relative pb-4 last-of-type:pb-0">
                  <div className="pl-6">
                    <div className="text-xs font-medium uppercase text-primary-600 mb-0.5">Mon 3 Mar</div>
                    <div className="text-sm mb-2">
                      <a className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white" href="#0">
                        Mindfulness Monday - Guided Meditation Session
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-3 -ml-0.5">
                        <Image className="rounded-full border-2 border-white dark:border-gray-800 box-content" src={UserImage02} width={28} height={28} alt="Participant" />
                        <Image className="rounded-full border-2 border-white dark:border-gray-800 box-content" src={UserImage03} width={28} height={28} alt="Participant" />
                        <Image className="rounded-full border-2 border-white dark:border-gray-800 box-content" src={UserImage04} width={28} height={28} alt="Participant" />
                      </div>
                      <div className="text-xs font-medium text-gray-400 dark:text-gray-500 italic">+18</div>
                    </div>
                  </div>
                  <div aria-hidden="true">
                    <div className="absolute top-0.5 -bottom-1 left-0.5 ml-px w-0.5 bg-gray-200 dark:bg-gray-700" />
                    <div className="absolute top-0.5 left-0 -ml-0.5 w-3 h-3 rounded-full bg-blue-400 border-2 border-white dark:border-gray-800" />
                  </div>
                </li>
                {/* Event 2 */}
                <li className="relative pb-4 last-of-type:pb-0">
                  <div className="pl-6">
                    <div className="text-xs font-medium uppercase text-primary-600 mb-0.5">Wed 5 Mar</div>
                    <div className="text-sm mb-2">
                      <a className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white" href="#0">
                        Anxiety Support Group - Open Virtual Meeting
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-3 -ml-0.5">
                        <Image className="rounded-full border-2 border-white dark:border-gray-800 box-content" src={UserImage01} width={28} height={28} alt="Participant" />
                        <Image className="rounded-full border-2 border-white dark:border-gray-800 box-content" src={UserImage05} width={28} height={28} alt="Participant" />
                        <Image className="rounded-full border-2 border-white dark:border-gray-800 box-content" src={UserImage06} width={28} height={28} alt="Participant" />
                      </div>
                      <div className="text-xs font-medium text-gray-400 dark:text-gray-500 italic">+42</div>
                    </div>
                  </div>
                  <div aria-hidden="true">
                    <div className="absolute top-0.5 -bottom-1 left-0.5 ml-px w-0.5 bg-gray-200 dark:bg-gray-700" />
                    <div className="absolute top-0.5 left-0 -ml-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white dark:border-gray-800" />
                  </div>
                </li>
                {/* Event 3 */}
                <li className="relative pb-4 last-of-type:pb-0">
                  <div className="pl-6">
                    <div className="text-xs font-medium uppercase text-primary-600 mb-0.5">Fri 7 Mar</div>
                    <div className="text-sm mb-2">
                      <a className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white" href="#0">
                        Journaling Workshop - Express &amp; Process
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-3 -ml-0.5">
                        <Image className="rounded-full border-2 border-white dark:border-gray-800 box-content" src={UserImage03} width={28} height={28} alt="Participant" />
                        <Image className="rounded-full border-2 border-white dark:border-gray-800 box-content" src={UserImage04} width={28} height={28} alt="Participant" />
                      </div>
                      <div className="text-xs font-medium text-gray-400 dark:text-gray-500 italic">+9</div>
                    </div>
                  </div>
                  <div aria-hidden="true">
                    <div className="absolute top-0.5 -bottom-1 left-0.5 ml-px w-0.5 bg-gray-200 dark:bg-gray-700" />
                    <div className="absolute top-0.5 left-0 -ml-0.5 w-3 h-3 rounded-full bg-purple-400 border-2 border-white dark:border-gray-800" />
                  </div>
                </li>
                {/* Event 4 */}
                <li className="relative pb-4 last-of-type:pb-0">
                  <div className="pl-6">
                    <div className="text-xs font-medium uppercase text-primary-600 mb-0.5">Sun 9 Mar</div>
                    <div className="text-sm mb-2">
                      <a className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white" href="#0">
                        Peer Support Circle - Share Your Story
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-3 -ml-0.5">
                        <Image className="rounded-full border-2 border-white dark:border-gray-800 box-content" src={UserImage02} width={28} height={28} alt="Participant" />
                        <Image className="rounded-full border-2 border-white dark:border-gray-800 box-content" src={UserImage06} width={28} height={28} alt="Participant" />
                        <Image className="rounded-full border-2 border-white dark:border-gray-800 box-content" src={UserImage01} width={28} height={28} alt="Participant" />
                      </div>
                      <div className="text-xs font-medium text-gray-400 dark:text-gray-500 italic">+25</div>
                    </div>
                  </div>
                  <div aria-hidden="true">
                    <div className="absolute top-0.5 left-0 -ml-0.5 w-3 h-3 rounded-full bg-amber-400 border-2 border-white dark:border-gray-800" />
                  </div>
                </li>
              </ul>
              <div className="mt-4">
                <button className="btn-sm w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300">View All</button>
              </div>
            </div>

            {/* Block 2: Popular Stories (dynamic) */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-4">Popular Discussions</div>
              <ul className="space-y-3">
                {popularPosts.length > 0
                  ? popularPosts.slice(0, 5).map((post) => (
                      <li key={post.id}>
                        <div className="text-sm mb-1">
                          <a className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white" href={`/community/forum/post/${post.id}`}>
                            {post.title}
                          </a>
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium text-primary-500">{post.author.displayName}</span>
                          {' '}&middot; {post.commentCount} comments
                        </div>
                      </li>
                    ))
                  : (
                    <>
                      <li>
                        <div className="text-sm mb-1">
                          <a className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white" href="#0">
                            My breathing exercise routine that changed everything
                          </a>
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium text-primary-500">mindful_maya</span> &middot; 24 comments
                        </div>
                      </li>
                      <li>
                        <div className="text-sm mb-1">
                          <a className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white" href="#0">
                            How do you manage anxiety before exams?
                          </a>
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium text-primary-500">calm_student</span> &middot; 31 comments
                        </div>
                      </li>
                      <li>
                        <div className="text-sm mb-1">
                          <a className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white" href="#0">
                            Daily gratitude journal - share what you are grateful for
                          </a>
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium text-primary-500">grateful_grace</span> &middot; 67 comments
                        </div>
                      </li>
                      <li>
                        <div className="text-sm mb-1">
                          <a className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white" href="#0">
                            What self-care habit changed your life?
                          </a>
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium text-primary-500">wellness_warrior</span> &middot; 45 comments
                        </div>
                      </li>
                      <li>
                        <div className="text-sm mb-1">
                          <a className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white" href="#0">
                            Coping with seasonal mood changes - tips that work
                          </a>
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium text-primary-500">sunny_side</span> &middot; 19 comments
                        </div>
                      </li>
                    </>
                  )}
              </ul>
              <div className="mt-4">
                <button className="btn-sm w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300">View All</button>
              </div>
            </div>

            {/* Block 3: Newsletter (Cruip gradient style) */}
            <div className="-rotate-1">
              <div className="relative p-5 bg-gradient-to-tr from-gray-100 via-white to-gray-100 dark:from-gray-800/20 dark:via-gray-800/50 dark:to-gray-800/20 rounded-xl">
                <div
                  className="absolute inset-0 -m-px pointer-events-none -z-10 rounded-xl before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-t before:from-gray-200 before:to-gray-100 dark:before:from-gray-700 dark:before:to-gray-800 after:absolute after:inset-0 after:bg-white after:m-px after:rounded-xl dark:after:bg-gray-900"
                  aria-hidden="true"
                />
                <div className="font-semibold text-center bg-clip-text text-transparent bg-gradient-to-tr from-primary-600 via-blue-500 to-gray-600 dark:from-primary-500 dark:via-blue-300 dark:to-gray-200 mb-3">
                  Get wellness tips and community highlights in your inbox.
                </div>
                <div className="w-full">
                  <label className="block text-sm sr-only" htmlFor="newsletter">Email</label>
                  <form className="relative flex items-center max-w-xs mx-auto">
                    <input id="newsletter" type="email" className="form-input py-1.5 w-full pr-10 rounded-full text-sm" placeholder="Your email" />
                    <button type="submit" className="absolute inset-0 left-auto" aria-label="Subscribe">
                      <svg className="w-3 h-3 fill-current text-primary-500 mx-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
