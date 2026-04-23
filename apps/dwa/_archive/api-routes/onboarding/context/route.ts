import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody } from '@/lib/api/response-utils';
import { contextWithDocsSchema } from '@/lib/validations/onboarding';

export const POST = withAuth(async (request: NextRequest, { userId, email }) => {
    const { linkedinUrl, documents } = await validateBody(request, contextWithDocsSchema);

    // Ensure profile exists
    await profileService.getOrCreateProfile(userId, email);

    // Save linkedin URL
    if (linkedinUrl) {
        await profileService.updateProfile(userId, { linkedinUrl });
    }

    // Process Documents (Mock Mode or Metadata Storage)
    if (documents && Array.isArray(documents)) {
        for (const doc of documents) {
            // Create a mock profile document record
            const profileDoc: any = {
                id: doc.id || `doc-${Date.now()}`,
                type: 'other',
                fileName: doc.name,
                fileSize: 1024 * 1024,
                mimeType: 'application/pdf',
                storageUrl: `mock-storage://${doc.name}`,
                vectorized: false,
                chunkCount: 0,
                extractedContext: null,
                uploadedAt: new Date().toISOString(),
                processedAt: null
            };

            await profileService.addDocument(userId, profileDoc);
        }
    }

    return successResponse({ success: true });
});
