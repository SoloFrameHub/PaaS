import { getAuthContext, getSubscriptionStatus } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getWorkshop } from '@/lib/data/workshops';
import WorkshopPlayer from './workshop-player';

interface WorkshopPageProps {
    params: Promise<{ workshopId: string }>;
}

export async function generateMetadata({ params }: WorkshopPageProps) {
    const { workshopId } = await params;
    const workshop = getWorkshop(workshopId);
    return {
        title: workshop ? `${workshop.title} - SoloFrameHub` : 'Workshop - SoloFrameHub',
    };
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
    const { workshopId } = await params;
    const { user, profile } = await getAuthContext();

    if (!user) redirect('/signin');
    if (!user.emailVerified) redirect('/verify-email');
    if (!profile || !profile.onboardingCompleted) redirect('/onboarding/welcome');

    const subStatus = await getSubscriptionStatus(user.uid);
    if (subStatus !== 'active') redirect('/subscribe');

    const workshop = getWorkshop(workshopId);
    if (!workshop) notFound();

    // Build initial state from profile for show-current steps
    const currentState = {
        icpSummary: profile.inferred?.icpSummary || null,
        positioningStatement: profile.artifacts?.positioningStatement?.content
            ? (typeof profile.artifacts.positioningStatement.content === 'string'
                ? profile.artifacts.positioningStatement.content
                : JSON.stringify(profile.artifacts.positioningStatement.content))
            : null,
        linkedinAnalysis: profile.inferred?.linkedinAnalysis
            ? JSON.stringify(profile.inferred.linkedinAnalysis).slice(0, 800)
            : null,
        acquisitionPath: profile.artifacts?.acquisitionPath
            ? `${profile.artifacts.acquisitionPath.primary} via ${(profile.artifacts.acquisitionPath.channels || []).join(', ')}`
            : null,
        discoveryPlaybook: profile.artifacts?.discoveryPlaybook?.content
            ? JSON.stringify(profile.artifacts.discoveryPlaybook.content).slice(0, 500)
            : null,
        scores: profile.assessment?.scores || null,
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
            <WorkshopPlayer
                workshop={workshop}
                currentState={currentState}
            />
        </div>
    );
}
