/**
 * S3-compatible storage (MinIO, R2, AWS S3). No Firebase.
 * Set S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY (or AWS_*).
 */

import { S3Client, PutObjectCommand, HeadBucketCommand, CreateBucketCommand } from '@aws-sdk/client-s3';

const endpoint = process.env.S3_ENDPOINT || process.env.R2_ENDPOINT;
const bucket = process.env.S3_BUCKET || process.env.R2_BUCKET;
const accessKey = process.env.S3_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY || process.env.AWS_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID;
const secretKey = process.env.S3_SECRET_ACCESS_KEY || process.env.S3_SECRET_KEY || process.env.AWS_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCESS_KEY;

function getClient(): S3Client | null {
  if (!bucket || !accessKey || !secretKey) return null;
  return new S3Client({
    region: process.env.S3_REGION || process.env.AWS_REGION || 'auto',
    endpoint: endpoint || undefined,
    credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
    forcePathStyle: !!endpoint,
  });
}

let bucketEnsured = false;

async function ensureBucket(client: S3Client): Promise<void> {
  if (bucketEnsured || !bucket) return;
  try {
    await client.send(new HeadBucketCommand({ Bucket: bucket }));
  } catch {
    await client.send(new CreateBucketCommand({ Bucket: bucket }));
  }
  bucketEnsured = true;
}

/**
 * Upload a buffer to S3. Key will be prefix/filename.
 * Returns the object key (or full URL if S3_PUBLIC_URL is set).
 */
export async function uploadBuffer(
  key: string,
  body: Buffer | Uint8Array,
  contentType?: string
): Promise<string> {
  const client = getClient();
  if (!client) throw new Error('S3 not configured (set S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY)');

  await ensureBucket(client);
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType || 'application/octet-stream',
    })
  );

  const publicUrl = process.env.S3_PUBLIC_URL || process.env.R2_PUBLIC_URL;
  if (publicUrl) {
    const base = publicUrl.replace(/\/$/, '');
    return `${base}/${key}`;
  }
  return key;
}

export function hasS3(): boolean {
  return !!(bucket && accessKey && secretKey);
}
