import Groq from 'groq-sdk';
import type { AIInsights, Job } from './types';

/**
 * Extracts and parses a JSON object from raw LLM output, handling markdown fences,
 * commentary, or stray text.
 */
export function extractJsonFromResponse(raw: string): AIInsights | null {
  if (!raw) return null;

  try {
    // 1. Direct parse attempt
    return JSON.parse(raw.trim());
  } catch {
    // 2. Look for code block ```json ... ```
    const codeFenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (codeFenceMatch && codeFenceMatch[1]) {
      try {
        return JSON.parse(codeFenceMatch[1].trim());
      } catch {
        // continue to regex
      }
    }

    // 3. Extract the first outermost {...} block
    const firstBrace = raw.indexOf('{');
    const lastBrace = raw.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      try {
        const candidate = raw.slice(firstBrace, lastBrace + 1);
        return JSON.parse(candidate);
      } catch {
        // failed parse
      }
    }

    return null;
  }
}

/**
 * Fallback insight generator when LLM API is unavailable, unconfigured, or rate limited.
 */
export function generateFallbackInsights(job: Job, resumeSnippet: string): AIInsights {
  const jobTitle = job.title || 'Role';
  const company = job.company || 'the team';

  // Basic heuristic analysis of tags
  const tags = job.tags.slice(0, 3);
  const tagList = tags.length > 0 ? tags.join(', ') : 'modern tech stacks';

  return {
    match_explanation: `Your technical background aligns well with the ${jobTitle} position at ${company}. Relevant experience with related technologies provides a foundation for the requirements of this role.`,
    skill_gaps: [
      `Deep proficiency in ${tags[0] || 'core specialized tooling'} expected by ${company}`,
      `Proven domain experience with high-scale ${tags[1] || 'production deployment architecture'}`,
      `Hands-on familiarity with ${tags[2] || 'team-specific operational workflows'}`
    ].slice(0, Math.max(1, Math.min(3, tags.length || 2))),
    resume_tips: [
      `Quantify relevant project achievements that directly emphasize ${tags[0] || 'key engineering metrics'} and performance impact.`,
      `Highlight prior collaboration or cross-functional ownership similar to the environment at ${company}.`,
      `Tailor your skills section to mirror the exact technical nomenclature used in the ${jobTitle} description.`
    ],
  };
}

/**
 * Calls Groq Llama 3.3 70B to generate tailored match explanation, skill gaps, and resume tips.
 */
export async function generateJobInsights(
  resumeText: string,
  job: Job,
  apiKey?: string
): Promise<{ insights: AIInsights; isDegraded: boolean }> {
  const activeKey = apiKey || process.env.GROQ_API_KEY;

  if (!activeKey) {
    return {
      insights: generateFallbackInsights(job, resumeText),
      isDegraded: true,
    };
  }

  const truncatedResume = resumeText.slice(0, 3000);
  const truncatedJobDesc = job.description.slice(0, 2000);
  const jobDetails = `Job Title: ${job.title}\nCompany: ${job.company}\nLocation: ${job.location}\nTags: ${job.tags.join(', ')}\nDescription: ${truncatedJobDesc}`;

  const prompt = `You are an expert technical recruiter and resume strategist. Analyze this candidate's resume against the target job posting.

Candidate Resume:
"""
${truncatedResume}
"""

Target Job Posting:
"""
${jobDetails}
"""

Evaluate candidate fit rigorously.
Respond ONLY with a valid, raw JSON object matching exactly this schema, with no markdown fences, no formatting, and no commentary:
{
  "match_explanation": "2-3 crisp sentences explaining specifically why the candidate is or is not a strong fit for this exact role.",
  "skill_gaps": ["Up to 3 specific technical skills or domain requirements mentioned in the posting that the resume does not demonstrate"],
  "resume_tips": ["Up to 3 actionable, high-impact resume bullet revision suggestions tailored to this specific job description"]
}`;

  try {
    const groq = new Groq({ apiKey: activeKey });
    const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

    let completion;
    try {
      completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model,
        temperature: 0.2,
        max_tokens: 600,
        response_format: { type: 'json_object' },
      });
    } catch (err: unknown) {
      // If 70B model fails or is rate limited, try instant 8B model
      console.warn(`Groq primary model failed (${model}), falling back to llama-3.1-8b-instant`, err);
      completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.1-8b-instant',
        temperature: 0.2,
        max_tokens: 600,
        response_format: { type: 'json_object' },
      });
    }

    const rawContent = completion.choices[0]?.message?.content || '';
    const parsed = extractJsonFromResponse(rawContent);

    if (
      parsed &&
      typeof parsed.match_explanation === 'string' &&
      Array.isArray(parsed.skill_gaps) &&
      Array.isArray(parsed.resume_tips)
    ) {
      return {
        insights: {
          match_explanation: parsed.match_explanation.trim(),
          skill_gaps: parsed.skill_gaps.map((s) => String(s).trim()).slice(0, 3),
          resume_tips: parsed.resume_tips.map((s) => String(s).trim()).slice(0, 3),
        },
        isDegraded: false,
      };
    }

    // Fallback if parsing was malformed
    return {
      insights: generateFallbackInsights(job, resumeText),
      isDegraded: true,
    };
  } catch (err) {
    console.error('Groq insight generation failed:', err);
    return {
      insights: generateFallbackInsights(job, resumeText),
      isDegraded: true,
    };
  }
}
