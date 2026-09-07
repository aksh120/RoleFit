import { NextRequest, NextResponse } from 'next/server';
import { rankJobs } from '@/lib/matcher';
import type { Job } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeText, jobs, topN } = body as {
      resumeText?: string;
      jobs?: Job[];
      topN?: number;
    };

    if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length < 50) {
      return NextResponse.json(
        { success: false, error: 'Resume text is missing or too short (< 50 characters).' },
        { status: 400 }
      );
    }

    if (!jobs || !Array.isArray(jobs)) {
      return NextResponse.json(
        { success: false, error: 'Jobs array is required for matching.' },
        { status: 400 }
      );
    }

    const n = typeof topN === 'number' && topN > 0 ? topN : 8;
    const rankedJobs = rankJobs(resumeText, jobs, n);

    return NextResponse.json({
      success: true,
      rankedJobs,
      analyzedJobsCount: jobs.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Ranking calculation failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
