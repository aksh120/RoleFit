import { NextRequest, NextResponse } from 'next/server';
import { generateJobInsights } from '@/lib/generator';
import type { Job } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeText, job, apiKey } = body as {
      resumeText?: string;
      job?: Job;
      apiKey?: string;
    };

    if (!resumeText || !job) {
      return NextResponse.json(
        { success: false, error: 'Both resumeText and job object are required.' },
        { status: 400 }
      );
    }

    const { insights, isDegraded } = await generateJobInsights(resumeText, job, apiKey);

    return NextResponse.json({
      success: true,
      jobId: job.id,
      insights,
      isDegraded,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Insight generation failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
