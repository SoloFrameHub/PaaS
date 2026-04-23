'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

interface Pod {
  id: string;
  name: string;
  slug: string;
  status: string;
  curriculumStage: string;
  currentMemberCount: number;
  maxMembers: number;
  weekNumber: number;
  nodebbCategoryId: number | null;
}

export default function CommunityHub({
  userId,
  userName,
  pods,
}: {
  userId: string;
  userName: string;
  pods: Pod[];
}) {
  const locale = useLocale();
  const isEs = locale === 'es';

  const stageConfig: Record<string, { label: string; color: string; border: string }> = {
    foundation: { label: isEs ? 'Fundamentos' : 'Foundation', color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400', border: 'border-l-blue-500' },
    lead_gen: { label: isEs ? 'Generación de leads' : 'Lead Generation', color: 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400', border: 'border-l-emerald-500' },
    sales_conv: { label: isEs ? 'Conversaciones de ventas' : 'Sales Conversations', color: 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400', border: 'border-l-amber-500' },
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-sky-400 to-gray-800 dark:to-gray-100 pb-1">
          {isEs ? 'Comunidad' : 'Community'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {userName
            ? (isEs ? `Bienvenido de vuelta, ${userName}` : `Welcome back, ${userName}`)
            : (isEs ? 'Tus pods de aprendizaje entre pares y comunidad' : 'Your peer learning pods and community')}
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link
          href="/community/feed"
          className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-150 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-150">
              <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{isEs ? 'Actividad' : 'Activity Feed'}</p>
              <p className="text-xs text-gray-500">{isEs ? 'Ve qué está haciendo la comunidad' : 'See what the community is up to'}</p>
            </div>
          </div>
        </Link>
        <Link
          href="/community/forum"
          className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-150 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-150">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{isEs ? 'Foro' : 'Forum'}</p>
              <p className="text-xs text-gray-500">{isEs ? 'Explora todas las discusiones' : 'Browse all discussions'}</p>
            </div>
          </div>
        </Link>
        <Link
          href="/community/feed"
          className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-150 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-150">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{isEs ? 'Comparte un logro' : 'Share a Win'}</p>
              <p className="text-xs text-gray-500">{isEs ? 'Celebra tus éxitos' : 'Celebrate your achievements'}</p>
            </div>
          </div>
        </Link>
      </div>

      {/* My Pods */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{isEs ? 'Mis Pods' : 'My Pods'}</h2>
        {pods.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {isEs
                ? 'Aún no has sido asignado a un pod. El sistema de emparejamiento está encontrando el grupo adecuado para ti.'
                : "You haven't been assigned to a pod yet. The matching system is finding the right group for you."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pods.map((pod) => {
              const stage = stageConfig[pod.curriculumStage] || { label: pod.curriculumStage, color: 'bg-gray-100 text-gray-700', border: 'border-l-gray-400' };
              return (
                <Link
                  key={pod.id}
                  href={`/community/pods/${pod.id}`}
                  className={`bg-white dark:bg-gray-800 rounded-xl border-l-4 ${stage.border} border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all duration-150 block`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                        {pod.name}
                      </h3>
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${stage.color} mt-1`}>
                        {stage.label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{isEs ? `Semana ${pod.weekNumber}` : `Week ${pod.weekNumber}`}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {pod.currentMemberCount}/{pod.maxMembers} {isEs ? 'miembros' : 'members'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
