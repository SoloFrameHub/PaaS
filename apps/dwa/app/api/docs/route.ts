import { NextResponse } from 'next/server';
import { generateOpenAPIDocument } from '@/lib/openapi/generator';

let cachedDoc: ReturnType<typeof generateOpenAPIDocument> | null = null;

export async function GET() {
  if (!cachedDoc) {
    cachedDoc = generateOpenAPIDocument();
  }
  return NextResponse.json(cachedDoc, {
    headers: { 'Cache-Control': 'public, max-age=3600' },
  });
}
