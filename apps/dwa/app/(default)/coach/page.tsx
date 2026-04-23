import CoachingChat from './coaching-chat';
import { getAuthContext } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Wellness Coach | Wellness Academy',
    description: 'Get personalized mental wellness guidance and learn evidence-based coping techniques.',
}

export default async function CoachPage() {
    const { user, profile } = await getAuthContext();

    if (!user) {
        redirect('/signin');
    }

    if (!profile || !profile.onboardingCompleted) {
        redirect('/onboarding/welcome');
    }

    // Serialize only the fields the client component needs to avoid non-serializable data
    const safeProfile = {
        displayName: profile.displayName ?? null,
        name: profile.name ?? '',
        questionnaire: profile.questionnaire ? {
            primarySymptoms: profile.questionnaire.primarySymptoms ?? [],
        } : null,
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-gray-50 dark:bg-gray-950">
            <div className="flex-1 overflow-hidden p-4 lg:p-8 flex items-center justify-center">
                <CoachingChat profile={safeProfile} />
            </div>
        </div>
    );
}
