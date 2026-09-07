import * as cheerio from 'cheerio';
import type { Job } from './types';

/**
 * Strips HTML tags and normalizes whitespace from rich job descriptions.
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  try {
    // Replace breaks and block boundaries with spaces to prevent words from merging
    const spaced = html
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<\/(p|div|li|tr|h[1-6])>/gi, ' ')
      .replace(/<(p|div|li|tr|h[1-6])[^>]*>/gi, ' ');
    const $ = cheerio.load(spaced);
    // Remove script, style, and iframe tags if present
    $('script, style, iframe, noscript').remove();
    const text = $.text() || '';
    return text.replace(/\s+/g, ' ').trim();
  } catch {
    // Regex fallback if Cheerio fails
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }
}

/**
 * Fetches and normalizes jobs from RemoteOK API.
 */
export async function fetchRemoteOkJobs(): Promise<{ jobs: Job[]; error?: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch('https://remoteok.com/api', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return { jobs: [], error: `RemoteOK returned HTTP ${res.status}` };
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      return { jobs: [], error: 'RemoteOK response is not an array' };
    }

    const jobs: Job[] = [];
    for (const item of data) {
      // RemoteOK includes a legal / notice item that lacks 'position' or 'id'
      if (!item || (!item.position && !item.id)) {
        continue;
      }

      const id = String(item.id || item.slug || `remoteok-${Math.random()}`);
      const title = String(item.position || 'Untitled Position').trim();
      const company = String(item.company || 'Unknown Company').trim();
      const location = String(item.location || 'Remote').trim();
      const tags = Array.isArray(item.tags)
        ? item.tags.map((t: unknown) => String(t).toLowerCase().trim()).filter(Boolean)
        : [];
      const description = stripHtml(String(item.description || ''));
      const url = item.url
        ? (item.url.startsWith('http') ? item.url : `https://remoteok.com${item.url}`)
        : `https://remoteok.com/l/${id}`;

      jobs.push({
        id: `remoteok-${id}`,
        title,
        company,
        location: location || 'Remote',
        tags,
        description,
        url,
        source: 'RemoteOK',
        remote: true,
      });
    }

    return { jobs };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { jobs: [], error: `RemoteOK fetch failed: ${message}` };
  }
}

/**
 * Fetches and normalizes jobs from Arbeitnow API.
 */
export async function fetchArbeitnowJobs(): Promise<{ jobs: Job[]; error?: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch('https://www.arbeitnow.com/api/job-board-api', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return { jobs: [], error: `Arbeitnow returned HTTP ${res.status}` };
    }

    const data = await res.json();
    const items = Array.isArray(data?.data) ? data.data : [];

    const jobs: Job[] = [];
    for (const item of items) {
      if (!item || !item.title) continue;

      const id = String(item.slug || `arbeitnow-${Math.random()}`);
      const title = String(item.title || 'Untitled Position').trim();
      const company = String(item.company_name || 'Unknown Company').trim();
      const location = String(item.location || (item.remote ? 'Remote' : 'Various')).trim();
      
      const rawTags: unknown[] = [
        ...(Array.isArray(item.tags) ? item.tags : []),
        ...(Array.isArray(item.job_types) ? item.job_types : []),
      ];
      const tags = Array.from(
        new Set(rawTags.map((t) => String(t).toLowerCase().trim()).filter(Boolean))
      );
      const description = stripHtml(String(item.description || ''));
      const url = String(item.url || `https://www.arbeitnow.com/jobs/${id}`);

      jobs.push({
        id: `arbeitnow-${id}`,
        title,
        company,
        location: location || 'Remote',
        tags,
        description,
        url,
        source: 'Arbeitnow',
        remote: Boolean(item.remote),
      });
    }

    return { jobs };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { jobs: [], error: `Arbeitnow fetch failed: ${message}` };
  }
}

/**
 * Combines, deduplicates, and filters jobs from both APIs.
 */
export async function getAggregatedJobs(options?: {
  keyword?: string;
}): Promise<{
  jobs: Job[];
  sources: {
    remoteOk: { count: number; error?: string };
    arbeitnow: { count: number; error?: string };
  };
}> {
  // Parallel fetch with isolated fault tolerance
  const [remoteOkResult, arbeitnowResult] = await Promise.all([
    fetchRemoteOkJobs(),
    fetchArbeitnowJobs(),
  ]);

  const rawJobs = [...remoteOkResult.jobs, ...arbeitnowResult.jobs];

  // Deduplicate on (title.toLowerCase(), company.toLowerCase())
  const seen = new Set<string>();
  const deduplicated: Job[] = [];

  for (const job of rawJobs) {
    const key = `${job.title.toLowerCase()}:::${job.company.toLowerCase()}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(job);
    }
  }

  // Keyword filter if provided
  let filtered = deduplicated;
  if (options?.keyword && options.keyword.trim()) {
    const query = options.keyword.toLowerCase().trim();
    const queryTokens = query.split(/\s+/).filter(Boolean);

    filtered = deduplicated.filter((job) => {
      const searchTarget = `${job.title} ${job.company} ${job.location} ${job.tags.join(' ')} ${job.description}`.toLowerCase();
      return queryTokens.every((token) => searchTarget.includes(token));
    });
  }

  return {
    jobs: filtered,
    sources: {
      remoteOk: {
        count: remoteOkResult.jobs.length,
        error: remoteOkResult.error,
      },
      arbeitnow: {
        count: arbeitnowResult.jobs.length,
        error: arbeitnowResult.error,
      },
    },
  };
}
