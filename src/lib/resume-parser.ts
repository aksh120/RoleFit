import mammoth from 'mammoth';

export class UnsupportedFileTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnsupportedFileTypeError';
  }
}

export class InsufficientTextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InsufficientTextError';
  }
}

/**
 * Normalizes extracted text: converts CRLF, trims whitespace, removes control chars.
 */
export function normalizeExtractedText(raw: string): string {
  return raw
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim();
}

/**
 * Parses PDF buffer using pdf-parse.
 */
export async function parsePdfBuffer(buffer: Buffer): Promise<string> {
  // Dynamic import or require pdf-parse
  // pdf-parse uses commonjs export
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require('pdf-parse');
  const data = await pdfParse(buffer);
  return normalizeExtractedText(data.text || '');
}

/**
 * Parses DOCX buffer using mammoth (extracts paragraphs and table cell contents).
 */
export async function parseDocxBuffer(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return normalizeExtractedText(result.value || '');
}

/**
 * Extracts plain text from an uploaded resume buffer based on file extension.
 * Validates minimum 50 characters threshold.
 */
export async function parseResume(
  buffer: Buffer,
  filename: string
): Promise<{ text: string; charCount: number }> {
  const ext = filename.split('.').pop()?.toLowerCase();

  let text = '';

  if (ext === 'pdf') {
    text = await parsePdfBuffer(buffer);
  } else if (ext === 'docx' || ext === 'doc') {
    text = await parseDocxBuffer(buffer);
  } else if (ext === 'txt' || ext === 'md') {
    text = normalizeExtractedText(buffer.toString('utf-8'));
  } else {
    throw new UnsupportedFileTypeError(
      `Unsupported file type ".${ext || 'unknown'}". Please upload a PDF or DOCX file.`
    );
  }

  const charCount = text.length;
  if (charCount < 50) {
    throw new InsufficientTextError(
      `Extracted only ${charCount} characters. The file appears to be empty, encrypted, or a scanned/image document with no selectable text.`
    );
  }

  return { text, charCount };
}
