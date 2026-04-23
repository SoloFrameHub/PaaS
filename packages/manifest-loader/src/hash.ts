import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

export async function sha256File(absPath: string): Promise<string> {
  const buf = await readFile(absPath);
  return createHash('sha256').update(buf).digest('hex');
}

export function sha256Buffer(buf: Buffer | string): string {
  return createHash('sha256').update(buf).digest('hex');
}
