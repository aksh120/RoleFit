import { NextRequest, NextResponse } from 'next/server';
import { parseResume, UnsupportedFileTypeError, InsufficientTextError } from '@/lib/resume-parser';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { success: false, error: 'No resume file provided.' },
        { status: 400 }
      );
    }

    const filename = (file as { name?: string }).name || 'uploaded_resume';
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { text, charCount } = await parseResume(buffer, filename);

    return NextResponse.json({
      success: true,
      filename,
      charCount,
      text,
    });
  } catch (error: unknown) {
    if (error instanceof UnsupportedFileTypeError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 415 });
    }
    if (error instanceof InsufficientTextError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 422 });
    }

    const message = error instanceof Error ? error.message : 'Failed to parse resume file';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
