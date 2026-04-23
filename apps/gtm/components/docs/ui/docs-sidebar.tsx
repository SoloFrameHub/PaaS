"use client";

import { useRef, useEffect } from "react";
import { useDocsProvider } from "@/components/docs/docs-provider";
import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";
import DocsSidebarLink from "./docs-sidebar-link";
import DocsSidebarLinkGroup from "./docs-sidebar-link-group";

export default function DocsSidebar() {
  const sidebar = useRef<HTMLDivElement>(null);
  const { sidebarOpen, setSidebarOpen } = useDocsProvider();
  const segments = useSelectedLayoutSegments();

  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!sidebar.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div>
      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 bg-slate-900/20 z-10 transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <aside
        ref={sidebar}
        id="docs-sidebar"
        className={`fixed left-0 top-0 bottom-0 w-64 h-screen border-r border-slate-200 md:left-auto md:shrink-0 z-10 dark:border-slate-800 dark:bg-slate-900 transform transition-transform ease-out duration-200 ${sidebarOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full max-md:opacity-0"}`}
      >
        {/* Gradient bg */}
        <div
          className="absolute inset-0 -left-[9999px] bg-gradient-to-b from-slate-50 to-white pointer-events-none -z-10 dark:hidden"
          aria-hidden="true"
        ></div>

        <div className="fixed top-0 bottom-0 w-64 px-4 sm:px-6 md:pl-0 md:pr-8 overflow-y-auto no-scrollbar">
          <div className="pt-24 md:pt-28 pb-8">
            <nav className="md:block">
              <ul className="text-sm">
                {/* Getting Started */}
                <DocsSidebarLinkGroup
                  open={segments.includes("getting-started")}
                >
                  {(handleClick, open) => (
                    <>
                      <a
                        href="#0"
                        className={`relative flex items-center font-semibold text-slate-800 p-1 before:absolute before:inset-0 before:rounded-sm before:bg-gradient-to-tr before:from-blue-400 before:to-purple-500 before:opacity-20 before:-z-10 before:pointer-events-none dark:text-slate-200 ${!segments.includes("getting-started") && "before:hidden"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                        }}
                      >
                        <svg
                          className="mr-3 shrink-0"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="fill-blue-400"
                            d="M19.888 7.804a.88.88 0 0 0-.314-.328l-7.11-4.346a.889.889 0 0 0-.927 0L4.426 7.476a.88.88 0 0 0-.314.328L12 12.624l7.888-4.82Z"
                          />
                          <path
                            className="fill-white dark:fill-slate-800"
                            d="M4.112 7.804a.889.889 0 0 0-.112.43v7.892c0 .31.161.597.426.758l7.11 4.346c.14.085.3.13.464.13v-8.736l-7.888-4.82Z"
                          />
                          <path
                            className="fill-blue-600"
                            d="M19.888 7.804c.073.132.112.28.112.43v7.892c0 .31-.161.597-.426.758l-7.11 4.346c-.14.085-.3.13-.464.13v-8.736l7.888-4.82Z"
                          />
                        </svg>
                        <span>Getting Started</span>
                      </a>
                      <ul
                        className={`mb-3 ml-4 pl-6 border-l border-slate-200 dark:border-slate-800 ${!open && "hidden"}`}
                      >
                        <li className="mt-3">
                          <DocsSidebarLink href="/docs/getting-started/platform-overview">
                            Platform Overview
                          </DocsSidebarLink>
                        </li>
                        <li className="mt-3">
                          <DocsSidebarLink href="/docs/getting-started/quick-start">
                            Quick Start Guide
                          </DocsSidebarLink>
                        </li>
                        <li className="mt-3">
                          <DocsSidebarLink href="/docs/getting-started/account-setup">
                            Account & Profile Setup
                          </DocsSidebarLink>
                        </li>
                      </ul>
                    </>
                  )}
                </DocsSidebarLinkGroup>

                {/* Academy */}
                <DocsSidebarLinkGroup open={segments.includes("academy")}>
                  {(handleClick, open) => (
                    <>
                      <a
                        href="#0"
                        className={`relative flex items-center font-semibold text-slate-800 p-1 before:absolute before:inset-0 before:rounded-sm before:bg-gradient-to-tr before:from-blue-400 before:to-purple-500 before:opacity-20 before:-z-10 before:pointer-events-none dark:text-slate-200 ${!segments.includes("academy") && "before:hidden"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                        }}
                      >
                        <svg
                          className="mr-3 shrink-0"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="fill-purple-400"
                            d="M19.888 7.804a.88.88 0 0 0-.314-.328l-7.11-4.346a.889.889 0 0 0-.927 0L4.426 7.476a.88.88 0 0 0-.314.328L12 12.624l7.888-4.82Z"
                          />
                          <path
                            className="fill-white dark:fill-slate-800"
                            d="M4.112 7.804a.889.889 0 0 0-.112.43v7.892c0 .31.161.597.426.758l7.11 4.346c.14.085.3.13.464.13v-8.736l-7.888-4.82Z"
                          />
                          <path
                            className="fill-purple-600"
                            d="M19.888 7.804c.073.132.112.28.112.43v7.892c0 .31-.161.597-.426.758l-7.11 4.346c-.14.085-.3.13-.464.13v-8.736l7.888-4.82Z"
                          />
                        </svg>
                        <span>Academy</span>
                      </a>
                      <ul
                        className={`mb-3 ml-4 pl-6 border-l border-slate-200 dark:border-slate-800 ${!open && "hidden"}`}
                      >
                        <li className="mt-3">
                          <DocsSidebarLink href="/docs/academy/how-it-works">
                            How the Academy Works
                          </DocsSidebarLink>
                        </li>
                        <li className="mt-3">
                          <DocsSidebarLink href="/docs/academy/course-tracks">
                            Course Tracks
                          </DocsSidebarLink>
                        </li>
                        <li className="mt-3">
                          <DocsSidebarLink href="/docs/academy/ai-coaching">
                            AI Coaching
                          </DocsSidebarLink>
                        </li>
                        <li className="mt-3">
                          <DocsSidebarLink href="/docs/academy/assessments">
                            Assessments & Readiness Score
                          </DocsSidebarLink>
                        </li>
                      </ul>
                    </>
                  )}
                </DocsSidebarLinkGroup>

                {/* Community */}
                <DocsSidebarLinkGroup open={segments.includes("community")}>
                  {(handleClick, open) => (
                    <>
                      <a
                        href="#0"
                        className={`relative flex items-center font-semibold text-slate-800 p-1 before:absolute before:inset-0 before:rounded-sm before:bg-gradient-to-tr before:from-blue-400 before:to-purple-500 before:opacity-20 before:-z-10 before:pointer-events-none dark:text-slate-200 ${!segments.includes("community") && "before:hidden"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                        }}
                      >
                        <svg
                          className="mr-3 shrink-0"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="fill-emerald-400"
                            d="M19.888 7.804a.88.88 0 0 0-.314-.328l-7.11-4.346a.889.889 0 0 0-.927 0L4.426 7.476a.88.88 0 0 0-.314.328L12 12.624l7.888-4.82Z"
                          />
                          <path
                            className="fill-white dark:fill-slate-800"
                            d="M4.112 7.804a.889.889 0 0 0-.112.43v7.892c0 .31.161.597.426.758l7.11 4.346c.14.085.3.13.464.13v-8.736l-7.888-4.82Z"
                          />
                          <path
                            className="fill-emerald-600"
                            d="M19.888 7.804c.073.132.112.28.112.43v7.892c0 .31-.161.597-.426.758l-7.11 4.346c-.14.085-.3.13-.464.13v-8.736l7.888-4.82Z"
                          />
                        </svg>
                        <span>Community</span>
                      </a>
                      <ul
                        className={`mb-3 ml-4 pl-6 border-l border-slate-200 dark:border-slate-800 ${!open && "hidden"}`}
                      >
                        <li className="mt-3">
                          <DocsSidebarLink href="/docs/community/pods">
                            Community & Pods
                          </DocsSidebarLink>
                        </li>
                        <li className="mt-3">
                          <DocsSidebarLink href="/docs/community/forum">
                            Forum & AI Personas
                          </DocsSidebarLink>
                        </li>
                      </ul>
                    </>
                  )}
                </DocsSidebarLinkGroup>

                {/* Tools */}
                <li className="mb-1">
                  <Link
                    href="/docs/tools/templates"
                    className={`relative flex items-center font-semibold text-slate-800 p-1 before:absolute before:inset-0 before:rounded-sm before:bg-gradient-to-tr before:from-blue-400 before:to-purple-500 before:opacity-20 before:-z-10 before:pointer-events-none dark:text-slate-200 ${!segments.includes("tools") && "before:hidden"}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <svg
                      className="mr-3 shrink-0"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="fill-amber-400"
                        d="M19.888 7.804a.88.88 0 0 0-.314-.328l-7.11-4.346a.889.889 0 0 0-.927 0L4.426 7.476a.88.88 0 0 0-.314.328L12 12.624l7.888-4.82Z"
                      />
                      <path
                        className="fill-white dark:fill-slate-800"
                        d="M4.112 7.804a.889.889 0 0 0-.112.43v7.892c0 .31.161.597.426.758l7.11 4.346c.14.085.3.13.464.13v-8.736l-7.888-4.82Z"
                      />
                      <path
                        className="fill-amber-600"
                        d="M19.888 7.804c.073.132.112.28.112.43v7.892c0 .31-.161.597-.426.758l-7.11 4.346c-.14.085-.3.13-.464.13v-8.736l7.888-4.82Z"
                      />
                    </svg>
                    <span>Tools & Templates</span>
                  </Link>
                </li>

                {/* Help */}
                <DocsSidebarLinkGroup open={segments.includes("help")}>
                  {(handleClick, open) => (
                    <>
                      <a
                        href="#0"
                        className={`relative flex items-center font-semibold text-slate-800 p-1 before:absolute before:inset-0 before:rounded-sm before:bg-gradient-to-tr before:from-blue-400 before:to-purple-500 before:opacity-20 before:-z-10 before:pointer-events-none dark:text-slate-200 ${!segments.includes("help") && "before:hidden"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                        }}
                      >
                        <svg
                          className="mr-3 shrink-0"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="fill-sky-400"
                            d="M19.888 7.804a.88.88 0 0 0-.314-.328l-7.11-4.346a.889.889 0 0 0-.927 0L4.426 7.476a.88.88 0 0 0-.314.328L12 12.624l7.888-4.82Z"
                          />
                          <path
                            className="fill-white dark:fill-slate-800"
                            d="M4.112 7.804a.889.889 0 0 0-.112.43v7.892c0 .31.161.597.426.758l7.11 4.346c.14.085.3.13.464.13v-8.736l-7.888-4.82Z"
                          />
                          <path
                            className="fill-sky-600"
                            d="M19.888 7.804c.073.132.112.28.112.43v7.892c0 .31-.161.597-.426.758l-7.11 4.346c-.14.085-.3.13-.464.13v-8.736l7.888-4.82Z"
                          />
                        </svg>
                        <span>Help & Support</span>
                      </a>
                      <ul
                        className={`mb-3 ml-4 pl-6 border-l border-slate-200 dark:border-slate-800 ${!open && "hidden"}`}
                      >
                        <li className="mt-3">
                          <DocsSidebarLink href="/docs/help/pricing">
                            Pricing & Billing
                          </DocsSidebarLink>
                        </li>
                        <li className="mt-3">
                          <DocsSidebarLink href="/docs/help/faq">
                            FAQ
                          </DocsSidebarLink>
                        </li>
                      </ul>
                    </>
                  )}
                </DocsSidebarLinkGroup>
              </ul>
            </nav>
          </div>
        </div>
      </aside>
    </div>
  );
}
