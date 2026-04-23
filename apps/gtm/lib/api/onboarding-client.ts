import { Industry } from '@/types/roleplay';
import { UserFounderProfile } from '@/types/user';

export async function getIndustries(): Promise<Industry[]> {
    const response = await fetch('/api/onboarding/industries');
    if (!response.ok) {
        return [];
    }
    const json = await response.json();
    return json.data || [];
}

export async function completeOnboarding(
    userId: string,
    categoryAnswers: Record<string, string>,
    businessContext: UserFounderProfile['business_context'],
    discAnswers: Record<string, string>
) {
    const response = await fetch('/api/onboarding/complete-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryAnswers, businessContext, discAnswers })
    });

    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.error?.message || 'Failed to complete onboarding');
    }

    return json.data;
}
