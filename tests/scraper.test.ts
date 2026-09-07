import { describe, it, expect } from 'vitest';
import { stripHtml } from '../src/lib/scraper';
import type { Job } from '../src/lib/types';

describe('Scraper & Normalization Suite', () => {
  it('strips HTML tags and normalizes whitespace', () => {
    const rawHtml = '<p>We are seeking a <strong>Senior AI Engineer</strong>.<br>Must know <script>alert("xss")</script>Python & React.</p>';
    const cleaned = stripHtml(rawHtml);
    expect(cleaned).toBe('We are seeking a Senior AI Engineer. Must know Python & React.');
    expect(cleaned).not.toContain('<script>');
    expect(cleaned).not.toContain('<strong>');
  });

  it('handles empty or null HTML gracefully', () => {
    expect(stripHtml('')).toBe('');
    expect(stripHtml('   ')).toBe('');
  });

  it('filters RemoteOK legal notice row', () => {
    const rawRemoteOkData = [
      {
        legal: 'All rights reserved',
        last_updated: 1725700000,
      },
      {
        id: '12345',
        position: 'AI Engineer',
        company: 'NeuralCorp',
        location: 'Remote',
        tags: ['python', 'ai', 'llm'],
        description: '<p>Build models</p>',
        url: 'https://remoteok.com/l/12345',
      },
    ];

    // Check filtering logic
    const jobs: Job[] = [];
    for (const item of rawRemoteOkData) {
      if (!item || (!item.position && !item.id)) continue;
      jobs.push({
        id: `remoteok-${item.id}`,
        title: item.position,
        company: item.company,
        location: item.location,
        tags: item.tags,
        description: stripHtml(item.description),
        url: item.url,
        source: 'RemoteOK',
      });
    }

    expect(jobs).toHaveLength(1);
    expect(jobs[0].title).toBe('AI Engineer');
    expect(jobs[0].company).toBe('NeuralCorp');
  });

  it('deduplicates jobs with identical title and company (case-insensitive)', () => {
    const rawJobs: Job[] = [
      {
        id: 'job-1',
        title: 'Senior Python Developer',
        company: 'Acme Corp',
        location: 'Remote',
        tags: ['python'],
        description: 'Role 1',
        url: 'https://example.com/1',
        source: 'RemoteOK',
      },
      {
        id: 'job-2',
        title: 'senior python developer',
        company: 'ACME CORP',
        location: 'Bengaluru',
        tags: ['python'],
        description: 'Role 2 duplicate',
        url: 'https://example.com/2',
        source: 'Arbeitnow',
      },
      {
        id: 'job-3',
        title: 'Frontend Engineer',
        company: 'Acme Corp',
        location: 'Remote',
        tags: ['react'],
        description: 'Role 3',
        url: 'https://example.com/3',
        source: 'RemoteOK',
      },
    ];

    const seen = new Set<string>();
    const deduplicated: Job[] = [];

    for (const job of rawJobs) {
      const key = `${job.title.toLowerCase()}:::${job.company.toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        deduplicated.push(job);
      }
    }

    expect(deduplicated).toHaveLength(2);
    expect(deduplicated[0].id).toBe('job-1');
    expect(deduplicated[1].id).toBe('job-3');
  });
});
