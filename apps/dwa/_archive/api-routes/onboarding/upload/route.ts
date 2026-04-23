import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { uploadBuffer, hasS3 } from '@/lib/storage/s3';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { ValidationError } from '@/lib/api/errors';
import { logger } from '@/lib/logger';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
        throw new ValidationError('No file uploaded');
    }

    // 1. MIME Type and Extension Validation
    const allowedTypes: Record<string, string[]> = {
        'pdf': ['application/pdf'],
        'txt': ['text/plain'],
        // Markdown files can have various MIME types depending on browser/OS
        'md': ['text/markdown', 'text/plain', 'text/x-markdown', 'application/octet-stream', ''],
        'json': ['application/json', 'text/plain'],
        'doc': ['application/msword'],
        'docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    };

    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    const expectedMimeTypes = allowedTypes[fileExtension];

    // Allow empty MIME type for known safe text extensions (browser inconsistency)
    const isKnownTextExtension = ['md', 'txt', 'json'].includes(fileExtension);
    const mimeTypeMatches = expectedMimeTypes && (
        expectedMimeTypes.includes(file.type) ||
        (isKnownTextExtension && (file.type === '' || file.type === 'application/octet-stream'))
    );

    if (!expectedMimeTypes || !mimeTypeMatches) {
        logger.warn('Blocked suspicious file upload', { fileName: file.name, fileType: file.type, fileExtension });
        throw new ValidationError('Invalid file type or mismatched extension. Allowed: PDF, TXT, MD, JSON, DOC, DOCX');
    }

    // 2. File Size Validation (10MB limit)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
        throw new ValidationError('File too large. Max size is 10MB');
    }

    logger.info('Uploading file', { fileName: file.name, fileType: file.type, userId });

    const buffer = await file.arrayBuffer();
    let content = '';

    // Basic text extraction for text-based files
    if (file.type.includes('text') || file.name.endsWith('.md') || file.name.endsWith('.txt') || file.name.endsWith('.json')) {
        content = new TextDecoder().decode(buffer);
    } else if (file.type === 'application/pdf') {
        try {
            // Dynamically import pdf-parse to avoid build issues if it's treated as server-external
            const pdf = require('pdf-parse');
            const data = await pdf(Buffer.from(buffer));
            content = data.text;
        } catch (error) {
            logger.error('PDF parsing failed', { fileName: file.name, error });
            content = `[PDF Parsing Failed: ${error instanceof Error ? error.message : 'Unknown error'}]`;
        }
    }

    const docId = `doc-${Date.now()}`;
    let storageUrl = `mock-storage://${file.name}`;
    if (hasS3()) {
        try {
            const key = `uploads/${userId}/${docId}/${file.name}`;
            await uploadBuffer(key, Buffer.from(buffer), file.type || 'application/octet-stream');
            storageUrl = key;
        } catch (e) {
            logger.warn('S3 upload failed, using mock URL', { error: e });
        }
    }

    const profileDoc: Record<string, unknown> = {
        id: docId,
        type: 'other',
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        storageUrl,
        vectorized: false,
        chunkCount: 0,
        extractedContext: null,
        uploadedAt: new Date().toISOString(),
        processedAt: null,
        content: content.slice(0, 100000),
    };

    await profileService.addDocument(userId, profileDoc);

    return successResponse({
        document: {
            id: docId,
            name: file.name,
            content: profileDoc.content,
            status: 'ready'
        }
    });
});
