'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useAppProvider } from '@/app/app-provider'
import { useSelectedLayoutSegments } from 'next/navigation'
import { useWindowWidth } from '@/components/utils/use-window-width'
import SidebarLinkGroup from './sidebar-link-group'
import SidebarLink from './sidebar-link'
import Logo from './logo'

export default function Sidebar({
  variant = 'default',
  tracks = [],
  pathCourses = [],
}: {
  variant?: 'default' | 'v2'
  tracks?: any[]
  pathCourses?: any[]
}) {
  const sidebar = useRef<HTMLDivElement>(null)
  const { sidebarOpen, setSidebarOpen, sidebarExpanded, setSidebarExpanded } = useAppProvider()
  const segments = useSelectedLayoutSegments()
  const breakpoint = useWindowWidth();
  const expandOnly = !sidebarExpanded && breakpoint && (breakpoint >= 1024 && breakpoint < 1536)

  // ... (rest of the component remains the same, but using 'tracks' instead of 'CURRICULUM')

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!sidebar.current) return
      if (!sidebarOpen || sidebar.current.contains(target as Node)) return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <div className={`min-w-fit ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900/20 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64! shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'rounded-r-2xl shadow-xs'}`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <Logo />
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Main group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Home</span>
            </h3>
            <ul className="mt-3">
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${segments.includes('dashboard') ? 'bg-primary-500/[0.12] dark:bg-primary-500/[0.18]' : ''}`}>
                <SidebarLink href="/dashboard">
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${segments.includes('dashboard') ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                      <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </SidebarLink>
              </li>
            </ul>
          </div>

          {/* My Learning Path — expandable with course list */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Your Path</span>
            </h3>
            <ul className="mt-3">
              {pathCourses.length > 0 ? (
                <SidebarLinkGroup open={segments.includes('my-path') || pathCourses.some((c: any) => segments.includes(c.id))}>
                  {(handleClick, open) => (
                    <>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition ${segments.includes('my-path') ? '' : 'hover:text-gray-900 dark:hover:text-white'}`}
                        onClick={(e) => {
                          e.preventDefault()
                          if (expandOnly) {
                            setSidebarExpanded(true);
                          } else {
                            handleClick();
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className={`shrink-0 fill-current ${segments.includes('my-path') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                              <path d="M6 2a1 1 0 0 0-2 0v1H3a1 1 0 0 0 0 2h1v2H3a1 1 0 0 0 0 2h1v2H3a1 1 0 1 0 0 2h1v1a1 1 0 1 0 2 0v-1h4v1a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1V9h1a1 1 0 1 0 0-2h-1V5h1a1 1 0 1 0 0-2h-1V2a1 1 0 1 0-2 0v1H6V2Zm0 3h4v2H6V5Zm0 4h4v2H6V9Z" />
                            </svg>
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              My Learning Path
                            </span>
                          </div>
                          <div className="flex items-center shrink-0 ml-2">
                            {(() => {
                              const completed = pathCourses.filter((c: any) => c.isCompleted).length;
                              return completed > 0 ? (
                                <span className="text-[10px] font-semibold text-gray-400 mr-1 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  {completed}/{pathCourses.length}
                                </span>
                              ) : null;
                            })()}
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && 'hidden'}`}>
                          {/* View full path link */}
                          <li className="mb-1">
                            <SidebarLink href="/academy/my-path">
                              <span className={`text-xs font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${segments.includes('my-path') ? 'text-violet-600 dark:text-violet-400' : 'text-gray-500'}`}>
                                View Full Path &rarr;
                              </span>
                            </SidebarLink>
                          </li>
                          {pathCourses.map((course: any) => (
                            <li key={course.id} className="mb-1 last:mb-0">
                              <SidebarLink href={`/academy/${course.id}`}>
                                <div className="flex items-center gap-2 min-w-0">
                                  {course.isCompleted ? (
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-green-500" title="Completed" />
                                  ) : course.isCurrent ? (
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-primary-500 animate-pulse" title="In Progress" />
                                  ) : (
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-violet-400" title="Recommended" />
                                  )}
                                  <span className="text-xs font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 truncate block">
                                    {course.title}
                                  </span>
                                </div>
                                {course.isCurrent && course.completedLessonCount > 0 && course.lessonCount > 0 && (
                                  <div className="mt-1 ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1">
                                      <div
                                        className="h-full bg-violet-500 rounded-full transition-all"
                                        style={{ width: `${(course.completedLessonCount / course.lessonCount) * 100}%` }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </SidebarLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </SidebarLinkGroup>
              ) : (
                <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${segments.includes('my-path') ? 'bg-violet-500/[0.12] dark:bg-violet-500/[0.18]' : ''}`}>
                  <SidebarLink href="/academy/my-path">
                    <div className="flex items-center">
                      <svg className={`shrink-0 fill-current ${segments.includes('my-path') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M6 2a1 1 0 0 0-2 0v1H3a1 1 0 0 0 0 2h1v2H3a1 1 0 0 0 0 2h1v2H3a1 1 0 1 0 0 2h1v1a1 1 0 1 0 2 0v-1h4v1a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1V9h1a1 1 0 1 0 0-2h-1V5h1a1 1 0 1 0 0-2h-1V2a1 1 0 1 0-2 0v1H6V2Zm0 3h4v2H6V5Zm0 4h4v2H6V9Z" />
                      </svg>
                      <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        My Learning Path
                      </span>
                    </div>
                  </SidebarLink>
                </li>
              )}
            </ul>
          </div>

          {/* All Courses */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">All Courses</span>
            </h3>
            <ul className="mt-3">
              {tracks.map((track: any) => (
                <SidebarLinkGroup key={track.id} open={segments.includes('academy') && segments.includes(track.id)}>
                  {(handleClick, open) => (
                    <>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition ${segments.includes('academy') && segments.includes(track.id) ? '' : 'hover:text-gray-900 dark:hover:text-white'}`}
                        onClick={(e) => {
                          e.preventDefault()
                          if (expandOnly) {
                            setSidebarExpanded(true);
                          } else {
                            handleClick();
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className={`shrink-0 flex items-center justify-center w-4 h-4 rounded text-[10px] font-bold ${segments.includes(track.id) ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                              {track.magnetComponent}
                            </span>
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              {track.title}
                            </span>
                          </div>
                          <div className="flex items-center shrink-0 ml-2">
                            {(() => {
                              const completed = track.courses.filter((c: any) => c.isCompleted).length;
                              return completed > 0 ? (
                                <span className="text-[10px] font-semibold text-gray-400 mr-1 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  {completed}/{track.courses.length}
                                </span>
                              ) : null;
                            })()}
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && 'hidden'}`}>
                          {track.courses.map((course: any) => (
                            <li key={course.id} className="mb-1 last:mb-0">
                              <SidebarLink href={`/academy/${course.id}`}>
                                <div className="flex items-center gap-2 min-w-0">
                                  {/* Status dot */}
                                  {course.isCompleted ? (
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-green-500" title="Completed" />
                                  ) : course.isCurrent ? (
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-primary-500 animate-pulse" title="In Progress" />
                                  ) : course.isRecommended ? (
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-violet-400" title="Recommended" />
                                  ) : (
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-600" />
                                  )}
                                  <span className="text-xs font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 truncate block">
                                    {course.title}
                                  </span>
                                </div>
                                {/* Mini progress bar for in-progress courses */}
                                {course.isCurrent && course.completedLessonCount > 0 && course.lessonCount > 0 && (
                                  <div className="mt-1 ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1">
                                      <div
                                        className="h-full bg-primary-500 rounded-full transition-all"
                                        style={{ width: `${(course.completedLessonCount / course.lessonCount) * 100}%` }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </SidebarLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </SidebarLinkGroup>
              ))}
            </ul>
          </div>

          {/* Support Tools */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Your Support</span>
            </h3>
            <ul className="mt-3">
              <li className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0">
                <SidebarLink href="/coach">
                  <div className="flex items-center">
                    <svg className="shrink-0 fill-current text-gray-400 dark:text-gray-500" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7Zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 1.4-.7 2.7-2 3.8Z" />
                      <path d="M5 6h2v1H5V6Zm4 0h2v1H9V6ZM5 8h6v1H5V8Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Wellness Coach
                    </span>
                  </div>
                </SidebarLink>
              </li>
            </ul>
          </div>

          {/* Crisis Resources - Always Visible */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Crisis Support</span>
            </h3>
            <ul className="mt-3">
              <li className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0">
                <a
                  href="tel:988"
                  className="block text-gray-800 dark:text-gray-100 truncate transition hover:text-gray-900 dark:hover:text-white"
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 fill-current text-red-500" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8Zm0 14a6 6 0 1 1 6-6 6 6 0 0 1-6 6Z" />
                      <path d="M8 4a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V5a1 1 0 0 0-1-1Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      988 Crisis Line
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Connect</span>
            </h3>
            <ul className="mt-3">
              <li className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0">
                <Link
                  href="/community/forum"
                  className="block text-gray-800 dark:text-gray-100 truncate transition hover:text-gray-900 dark:hover:text-white"
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 fill-current text-gray-400 dark:text-gray-500" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M15 4.5c0 .72-.36 1.38-.94 1.78l.04.22c0 2.1-2.24 3.8-5 3.8-.35 0-.7-.03-1.02-.08A3.42 3.42 0 0 1 5 12c-1.93 0-3.5-1.4-3.5-3.13v-.2A2 2 0 0 1 0 6.75c0-.89.63-1.64 1.5-1.9V4.5a2.5 2.5 0 0 1 5 0v.35c.32-.06.66-.1 1-.1 2.76 0 5 1.7 5 3.75v.16c.87.26 1.5 1.01 1.5 1.89a1.97 1.97 0 0 1-1.5 1.87v.08c0 1.73-1.57 3.13-3.5 3.13a3.5 3.5 0 0 1-2-.58 6.06 6.06 0 0 1-3.5.91c-2.76 0-5-1.7-5-3.8v-.22A2 2 0 0 1 0 9.5c0-.88.63-1.63 1.5-1.89v-.08c0-1.73 1.57-3.13 3.5-3.13.45 0 .88.06 1.28.17A2.49 2.49 0 0 1 8.5 3c.5 0 .97.14 1.36.4A2.5 2.5 0 0 1 15 4.5Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Support Community
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Resources</span>
            </h3>
            <ul className="mt-3">
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${segments.includes('docs') ? 'bg-primary-500/[0.12] dark:bg-primary-500/[0.18]' : ''}`}>
                <SidebarLink href="/docs">
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${segments.includes('docs') ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M2 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Zm1 2h9v6H3V5Z" />
                      <path d="M14 5h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4v-2h10V5Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Documentation
                    </span>
                  </div>
                </SidebarLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-gray-400 dark:text-gray-500" d="M19.707 14.707l-1.414-1.414L12 19.586l-6.293-6.293-1.414 1.414L12 22.414z" />
                <path className="text-gray-200 dark:text-gray-600" d="M19.707 9.707l-1.414-1.414L12 14.586 5.707 8.293 4.293 9.707 12 17.414z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}