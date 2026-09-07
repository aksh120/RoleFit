import { NextRequest, NextResponse } from 'next/server';
import { getAggregatedJobs } from '@/lib/scraper';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword') || undefined;

    const { jobs, sources } = await getAggregatedJobs({ keyword });

    return NextResponse.json({
      success: true,
      totalJobs: jobs.length,
      jobs,
      sources,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch job postings';
    return NextResponse.json(
      {
        success: false,
        totalJobs: 0,
        jobs: [],
        sources: {
          remoteOk: { count: 0, error: message },
          arbeitnow: { count: 0, error: message },
        },
        error: message,
      },
      { status: 500 }
    );
  }
}
