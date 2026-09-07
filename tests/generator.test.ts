import { describe, it, expect } from 'vitest';
import { extractJsonFromResponse, generateFallbackInsights } from '../src/lib/generator';
import type { Job } from '../src/lib/types';

describe('Generator & JSON Recovery Suite', () => {
  const sampleJob: Job = {
    id: 'test-1',
    title: 'AI Solutions Engineer',
    company: 'Anthropic Partner',
    location: 'Remote',
    tags: ['python', 'llm', 'rag'],
    description: 'Build RAG solutions.',
    url: 'https://example.com',
    source: 'RemoteOK',
  };

  it('parses pristine JSON response directly', () => {
    const raw = JSON.stringify({
      match_explanation: 'Strong candidate with extensive LLM and Python expertise.',
      skill_gaps: ['Requires deeper production Kubernetes experience.'],
      resume_tips: ['Add quantifiable metric on RAG query latency reduction.'],
    });

    const parsed = extractJsonFromResponse(raw);
    expect(parsed).not.toBeNull();
    expect(parsed?.match_explanation).toContain('Strong candidate');
    expect(parsed?.skill_gaps).toHaveLength(1);
    expect(parsed?.resume_tips).toHaveLength(1);
  });

  it('recovers JSON wrapped in markdown code fences', () => {
    const wrapped = `
Here is my structured evaluation of the candidate:

\`\`\`json
{
  "match_explanation": "Solid engineering background matching Python requirements.",
  "skill_gaps": ["No explicit mention of LangGraph."],
  "resume_tips": ["Mention specific LLM frameworks used in project section."]
}
\`\`\`

Let me know if you need more details!
    `;

    const parsed = extractJsonFromResponse(wrapped);
    expect(parsed).not.toBeNull();
    expect(parsed?.match_explanation).toBe('Solid engineering background matching Python requirements.');
    expect(parsed?.skill_gaps[0]).toBe('No explicit mention of LangGraph.');
  });

  it('recovers JSON wrapped in conversational prose without code fences', () => {
    const conversational = `
Certainly! { "match_explanation": "Great candidate fit.", "skill_gaps": ["None"], "resume_tips": ["Submit as-is"] } I hope this helps you!
    `;

    const parsed = extractJsonFromResponse(conversational);
    expect(parsed).not.toBeNull();
    expect(parsed?.match_explanation).toBe('Great candidate fit.');
    expect(parsed?.skill_gaps).toEqual(['None']);
  });

  it('returns null for completely unparseable string', () => {
    const junk = 'This candidate is great but I refuse to format JSON.';
    const parsed = extractJsonFromResponse(junk);
    expect(parsed).toBeNull();
  });

  it('generates valid fallback insights when LLM is unavailable', () => {
    const fallback = generateFallbackInsights(sampleJob, 'Akshat Apoorv resume');
    expect(fallback.match_explanation).toBeTruthy();
    expect(fallback.skill_gaps.length).toBeGreaterThanOrEqual(1);
    expect(fallback.resume_tips.length).toBeGreaterThanOrEqual(1);
    expect(fallback.match_explanation).toContain('AI Solutions Engineer');
  });
});
