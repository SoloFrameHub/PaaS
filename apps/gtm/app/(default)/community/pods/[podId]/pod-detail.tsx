'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

interface PodData {
  id: string;
  name: string;
  slug: string;
  status: string;
  curriculumStage: string;
  currentMemberCount: number;
  maxMembers: number;
  weekNumber: number;
  nodebbCategoryId: number | null;
  createdAt: string;
}

interface Member {
  id: string;
  userId: string;
  status: string;
  joinedAt: string;
  lastActiveAt: string | null;
  postCount: number;
  engagementScore: number;
}

interface Health {
  memberCount: number;
  activeLast7Days: number;
  totalActivities30Days: number;
  healthScore: number;
  recommendation: string;
}

interface Activity {
  id: string;
  eventType: string;
  userId: string | null;
  metadata: Record<string, any> | null;
  createdAt: string;
}

export default function PodDetail({
  pod,
  members,
  health,
  activity,
  userId,
}: {
  pod: PodData;
  members: Member[];
  health: Health;
  activity: Activity[];
  userId: string;
}) {
  const forumUrl = process.env.NEXT_PUBLIC_FORUM_URL || 'https://ai-caa-forum.soloframehub.com';
  const locale = useLocale();
  const isEs = locale === 'es';

  const stageLabels: Record<string, string> = {
    foundation: isEs ? 'Fundamentos' : 'Foundation',
    lead_gen: isEs ? 'Generación de leads' : 'Lead Generation',
    sales_conv: isEs ? 'Conversaciones de ventas' : 'Sales Conversations',
  };

  const eventLabels: Record<string, string> = {
    pod_created: isEs ? 'Pod creado' : 'Pod created',
    member_joined: isEs ? 'Miembro se unió' : 'Member joined',
    member_removed: isEs ? 'Miembro salió' : 'Member left',
    bot_posted: isEs ? 'Publicación del facilitador' : 'Facilitator post',
    post_created: isEs ? 'Nueva publicación en el foro' : 'New forum post',
    milestone_achieved: isEs ? 'Hito alcanzado' : 'Milestone achieved',
    pod_merged: isEs ? 'Pod fusionado' : 'Pod merged',
  };

  const healthColor = health.healthScore >= 70 ? 'text-emerald-500' :
    health.healthScore >= 50 ? 'text-amber-500' : 'text-red-500';

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Back link */}
      <div className="mb-4">
        <Link href="/community" className="text-sm text-primary-500 hover:text-primary-600">
          {isEs ? '← Volver a la comunidad' : '← Back to Community'}
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            {pod.name}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
              {stageLabels[pod.curriculumStage] || pod.curriculumStage}
            </span>
            <span className="text-sm text-gray-500">{isEs ? `Semana ${pod.weekNumber}` : `Week ${pod.weekNumber}`}</span>
          </div>
        </div>
        {pod.nodebbCategoryId && (
          <a
            href={`${forumUrl}/category/${pod.nodebbCategoryId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {isEs ? 'Abrir foro del pod' : 'Open Pod Forum'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Health Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">{isEs ? 'Salud del pod' : 'Pod Health'}</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className={`text-2xl font-bold ${healthColor}`}>{health.healthScore}</p>
                <p className="text-xs text-gray-500">{isEs ? 'Puntuación de salud' : 'Health Score'}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{health.activeLast7Days}</p>
                <p className="text-xs text-gray-500">{isEs ? 'Activos (7d)' : 'Active (7d)'}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{health.totalActivities30Days}</p>
                <p className="text-xs text-gray-500">{isEs ? 'Actividades (30d)' : 'Activities (30d)'}</p>
              </div>
            </div>
            {health.recommendation !== 'Healthy' && (
              <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">{health.recommendation}</p>
            )}
          </div>

          {/* Activity Feed */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">{isEs ? 'Actividad reciente' : 'Recent Activity'}</h2>
            {activity.length === 0 ? (
              <p className="text-sm text-gray-500">{isEs ? '¡Sin actividad aún. Inicia una conversación en el foro!' : 'No activity yet. Start a conversation in the forum!'}</p>
            ) : (
              <div className="space-y-3">
                {activity.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-gray-300 dark:bg-gray-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 dark:text-gray-200">
                        {eventLabels[event.eventType] || event.eventType}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.createdAt).toLocaleDateString(isEs ? 'es-MX' : 'en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Members */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {isEs ? `Miembros (${members.length}/${pod.maxMembers})` : `Members (${members.length}/${pod.maxMembers})`}
            </h2>
            <div className="space-y-3">
              {members.map((member) => {
                const isActive = member.lastActiveAt &&
                  (Date.now() - new Date(member.lastActiveAt).getTime()) < 7 * 24 * 60 * 60 * 1000;
                return (
                  <div key={member.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      member.userId === userId
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {member.userId.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 dark:text-gray-100 truncate">
                        {member.userId === userId ? (isEs ? 'Tú' : 'You') : member.userId.slice(0, 8)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {member.postCount} posts
                      </p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-gray-300'}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pod Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">{isEs ? 'Info del pod' : 'Pod Info'}</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">{isEs ? 'Etapa' : 'Stage'}</dt>
                <dd className="text-gray-800 dark:text-gray-200">{stageLabels[pod.curriculumStage]}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">{isEs ? 'Semana' : 'Week'}</dt>
                <dd className="text-gray-800 dark:text-gray-200">{pod.weekNumber}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">{isEs ? 'Creado' : 'Created'}</dt>
                <dd className="text-gray-800 dark:text-gray-200">
                  {new Date(pod.createdAt).toLocaleDateString(isEs ? 'es-MX' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">{isEs ? 'Estado' : 'Status'}</dt>
                <dd className="text-gray-800 dark:text-gray-200 capitalize">{pod.status}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
