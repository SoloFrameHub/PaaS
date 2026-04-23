import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const demoRequestSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  organization: z.string().min(2, 'Organization name required'),
  role: z.string().min(2, 'Role required'),
  organizationType: z.enum(['practice', 'employer', 'platform', 'university', 'other']),
  phone: z.string().optional(),
  message: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = demoRequestSchema.parse(body)

    // Trigger n8n workflow via webhook
    const n8nWebhookUrl = `${process.env.N8N_URL}/webhook/demo-request`

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.N8N_API_KEY}`,
      },
      body: JSON.stringify({
        ...validatedData,
        requestedAt: new Date().toISOString(),
        source: 'digitalwellness.academy',
      }),
    })

    if (!response.ok) {
      console.error('n8n workflow failed:', await response.text())
      throw new Error('Failed to process demo request')
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: 'Demo account created successfully! Check your email for login credentials.',
      data: result,
    })
  } catch (error: any) {
    console.error('Demo request error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Failed to process demo request' },
      { status: 500 }
    )
  }
}
