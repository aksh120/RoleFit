import { describe, it, expect } from 'vitest';
import {
  normalizeExtractedText,
  parseResume,
  UnsupportedFileTypeError,
  InsufficientTextError,
} from '../src/lib/resume-parser';

describe('Resume Parser Suite', () => {
  it('normalizes CRLF and compresses redundant blank lines', () => {
    const raw = 'First line\r\nSecond line\r\n\r\n\r\n\r\nThird line    with   spaces';
    const normalized = normalizeExtractedText(raw);
    expect(normalized).toBe('First line\nSecond line\n\nThird line with spaces');
  });

  it('rejects unsupported file extensions', async () => {
    const buffer = Buffer.from('some text');
    await expect(parseResume(buffer, 'resume.exe')).rejects.toThrow(UnsupportedFileTypeError);
    await expect(parseResume(buffer, 'photo.png')).rejects.toThrow(UnsupportedFileTypeError);
  });

  it('rejects documents with fewer than 50 characters (scanned image / empty)', async () => {
    const tinyBuffer = Buffer.from('Too short');
    await expect(parseResume(tinyBuffer, 'resume.txt')).rejects.toThrow(InsufficientTextError);
  });

  it('successfully extracts text from valid TXT buffer', async () => {
    const validText = 'John Doe — Full Stack Engineer with over five years of experience building modern web apps.';
    const buffer = Buffer.from(validText);
    const result = await parseResume(buffer, 'resume.txt');
    expect(result.charCount).toBeGreaterThanOrEqual(50);
    expect(result.text).toContain('John Doe');
  });
});
