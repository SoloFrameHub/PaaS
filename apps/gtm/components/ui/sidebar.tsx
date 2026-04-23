"use client";

import { useEffect, useRef, useState } from "react";
import { useAppProvider } from "@/app/app-provider";
import { useSelectedLayoutSegments } from "next/navigation";
import { useWindowWidth } from "@/components/utils/use-window-width";
import { useLocale } from "next-intl";
import SidebarLinkGroup from "./sidebar-link-group";
import SidebarLink from "./sidebar-link";
import Logo from "./logo";

export default function Sidebar({
  variant = "default",
  tracks = [],
}: {
  variant?: "default" | "v2";
  tracks?: any[];
}) {
  const sidebar = useRef<HTMLDivElement>(null);
  const { sidebarOpen, setSidebarOpen, sidebarExpanded, setSidebarExpanded } =
    useAppProvider();
  const segments = useSelectedLayoutSegments();
  const breakpoint = useWindowWidth();
  const locale = useLocale();
  const isEs = locale === "es";
  const expandOnly =
    !sidebarExpanded && breakpoint && breakpoint >= 1024 && breakpoint < 1536;

  // ... (rest of the component remains the same, but using 'tracks' instead of 'CURRICULUM')

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!sidebar.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className={`min-w-fit ${sidebarExpanded ? "sidebar-expanded" : ""}`}>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64! shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${variant === "v2" ? "border-r border-gray-200 dark:border-gray-700/60" : "rounded-r-2xl shadow-xs"}`}
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
            <span className="sr-only">{isEs ? "Cerrar menú" : "Close sidebar"}</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
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
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                {isEs ? "Principal" : "Main"}
              </span>
            </h3>
            <ul className="mt-3">
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${segments.includes("dashboard") && !segments.includes("outreach") && !segments.includes("pipeline") ? "bg-primary-500/[0.08] dark:bg-primary-500/[0.16]" : ""}`}
              >
                <SidebarLink href="/dashboard">
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${segments.includes("dashboard") && !segments.includes("outreach") && !segments.includes("pipeline") ? "text-primary-500" : "text-gray-400 dark:text-gray-500"}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                      <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      {isEs ? "Panel" : "Dashboard"}
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${segments.includes("guide") ? "bg-primary-500/[0.08] dark:bg-primary-500/[0.16]" : ""}`}
              >
                <SidebarLink href="/guide">
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${segments.includes("guide") ? "text-primary-500" : "text-gray-400 dark:text-gray-500"}`}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12Zm1-5H7V5h2v4Zm0 3H7v-2h2v2Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      {isEs ? "Cómo Funciona" : "How This Works"}
                    </span>
                  </div>
                </SidebarLink>
              </li>
            </ul>
          </div>

          {/* Academy Tracks */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                {isEs ? "Tracks del OS" : "OS Tracks"}
              </span>
            </h3>
            <ul className="mt-3">
              {tracks.map((track: any) => (
                <SidebarLinkGroup
                  key={track.id}
                  open={
                    segments.includes("academy") && segments.includes(track.id)
                  }
                >
                  {(handleClick, open) => (
                    <>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition ${segments.includes("academy") && segments.includes(track.id) ? "" : "hover:text-gray-900 dark:hover:text-white"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (expandOnly) {
                            setSidebarExpanded(true);
                          } else {
                            handleClick();
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span
                              className={`shrink-0 flex items-center justify-center w-4 h-4 rounded text-[10px] font-bold ${segments.includes(track.id) ? "bg-primary-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500"}`}
                            >
                              {track.magnetComponent}
                            </span>
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              {track.title}
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                          {track.courses.map((course: any) => (
                            <li key={course.id} className="mb-1 last:mb-0">
                              <SidebarLink href={`/academy/${course.id}`}>
                                <span className="text-xs font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 truncate block">
                                  {course.title}
                                </span>
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

          {/* AI Tools */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                {isEs ? "Herramientas AI" : "AI Tools"}
              </span>
            </h3>
            <ul className="mt-3">
              <li className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0">
                <SidebarLink href="/coach">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 fill-current text-gray-400 dark:text-gray-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8Zm0 14a6 6 0 1 1 6-6 6 6 0 0 1-6 6Z" />
                      <path d="M8 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm1 3H7v1h1v3h1V7Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      {isEs ? "Asesor AI" : "Solo Advisor AI"}
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0">
                <SidebarLink href="/roleplay">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 fill-current text-gray-400 dark:text-gray-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13 15h2v-2h-2v2Zm-4 0h2v-2H9v2Zm-4 0h2v-2H5v2Zm-4 0h2v-2H1v2ZM0 12h16V0H0v12ZM2 2h12v8H2V2Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      {isEs ? "Roleplay de Ventas" : "Sales Roleplay"}
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0">
                <SidebarLink href="/academy/tools/icp-builder">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 fill-current text-gray-400 dark:text-gray-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12ZM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" />
                      <path d="M4 4h8v2H4V4Zm0 4h8v2H4V8Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      ICP Builder
                    </span>
                  </div>
                </SidebarLink>
              </li>
            </ul>
          </div>

          {/* Execute */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                {isEs ? "Ejecutar" : "Execute"}
              </span>
            </h3>
            <ul className="mt-3">
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${segments.includes("outreach") ? "bg-primary-500/[0.08] dark:bg-primary-500/[0.16]" : ""}`}
              >
                <SidebarLink href="/dashboard/outreach">
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${segments.includes("outreach") ? "text-primary-500" : "text-gray-400 dark:text-gray-500"}`}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Zm-1 2L8 8 3 4h10Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      {isEs ? "Registro de Outreach" : "Outreach Log"}
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${segments.includes("pipeline") ? "bg-primary-500/[0.08] dark:bg-primary-500/[0.16]" : ""}`}
              >
                <SidebarLink href="/dashboard/pipeline">
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${segments.includes("pipeline") ? "text-primary-500" : "text-gray-400 dark:text-gray-500"}`}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 3h2v10H1V3Zm4 2h2v8H5V5Zm4-1h2v9H9V4Zm4 3h2v6h-2V7Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Pipeline
                    </span>
                  </div>
                </SidebarLink>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                {isEs ? "Comunidad" : "Community"}
              </span>
            </h3>
            <ul className="mt-3">
              <li className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0">
                <SidebarLink href="/community">
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 fill-current text-gray-400 dark:text-gray-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2Zm6 14H2a2 2 0 0 1-2-2v-1c0-2.21 3.58-4 8-4s8 1.79 8 4v1a2 2 0 0 1-2 2Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      {isEs ? "Mis Pods" : "My Pods"}
                    </span>
                  </div>
                </SidebarLink>
              </li>
              <li className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0">
                <a
                  href={
                    process.env.NEXT_PUBLIC_FORUM_URL ||
                    "https://ai-caa-forum.soloframehub.com"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-800 dark:text-gray-100 truncate transition hover:text-gray-900 dark:hover:text-white"
                >
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 fill-current text-gray-400 dark:text-gray-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 4.5c0 .72-.36 1.38-.94 1.78l.04.22c0 2.1-2.24 3.8-5 3.8-.35 0-.7-.03-1.02-.08A3.42 3.42 0 0 1 5 12c-1.93 0-3.5-1.4-3.5-3.13v-.2A2 2 0 0 1 0 6.75c0-.89.63-1.64 1.5-1.9V4.5a2.5 2.5 0 0 1 5 0v.35c.32-.06.66-.1 1-.1 2.76 0 5 1.7 5 3.75v.16c.87.26 1.5 1.01 1.5 1.89a1.97 1.97 0 0 1-1.5 1.87v.08c0 1.73-1.57 3.13-3.5 3.13a3.5 3.5 0 0 1-2-.58 6.06 6.06 0 0 1-3.5.91c-2.76 0-5-1.7-5-3.8v-.22A2 2 0 0 1 0 9.5c0-.88.63-1.63 1.5-1.89v-.08c0-1.73 1.57-3.13 3.5-3.13.45 0 .88.06 1.28.17A2.49 2.49 0 0 1 8.5 3c.5 0 .97.14 1.36.4A2.5 2.5 0 0 1 15 4.5Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      {isEs ? "Foro del Cohorte" : "Cohort Forum"}
                    </span>
                    <svg
                      className="shrink-0 ml-2 fill-current text-gray-400 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                    >
                      <path d="M10 1H6a1 1 0 0 0 0 2h1.59L3.3 7.29a1 1 0 0 0 1.42 1.42L9 4.41V6a1 1 0 0 0 2 0V2a1 1 0 0 0-1-1Z" />
                      <path d="M9 9H3a1 1 0 0 1-1-1V2a1 1 0 0 0-2 0v6a3 3 0 0 0 3 3h6a1 1 0 0 0 0-2Z" />
                    </svg>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Insights */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                {isEs ? "Analíticas" : "Insights"}
              </span>
            </h3>
            <ul className="mt-3">
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${segments.includes("analytics") ? "bg-primary-500/[0.08] dark:bg-primary-500/[0.16]" : ""}`}
              >
                <SidebarLink href="/analytics">
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${segments.includes("analytics") ? "text-primary-500" : "text-gray-400 dark:text-gray-500"}`}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 13h2V7H2v6Zm4 0h2V3H6v10Zm4 0h2V5h-2v8Zm-9 2a1 1 0 0 1-1-1V2a1 1 0 0 1 2 0v12a1 1 0 0 1-1 1Zm14-1H1a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Analytics
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
              <span className="sr-only">{isEs ? "Expandir / colapsar menú" : "Expand / collapse sidebar"}</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-gray-400 dark:text-gray-500"
                  d="M19.707 14.707l-1.414-1.414L12 19.586l-6.293-6.293-1.414 1.414L12 22.414z"
                />
                <path
                  className="text-gray-200 dark:text-gray-600"
                  d="M19.707 9.707l-1.414-1.414L12 14.586 5.707 8.293 4.293 9.707 12 17.414z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
