'use client';

import React, { useState } from 'react';
import { ExternalLink, ArrowUpRight, Copy, Check, Minus, Loader2 } from 'lucide-react';
import type { EnrichedJob } from '@/lib/types';

interface JobCardProps {
  job: EnrichedJob;
  rank: number;
}

export const JobCard: React.FC<JobCardProps> = ({ job, rank }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyTip = async (tip: string, index: number) => {
    try {
      await navigator.clipboard.writeText(tip);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <article className="rounded-xl border border-white/[0.08] hover:border-white/[0.18] bg-zinc-950/50 p-5 transition-colors flex flex-col justify-between">
      <div className="space-y-4">
        {/* Top Meta Bar */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-zinc-500">#{rank}</span>
            <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/[0.06] text-zinc-400">
              {job.source.toLowerCase()}
            </span>
            {job.remote && (
              <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/[0.06] text-zinc-400">
                remote
              </span>
            )}
          </div>

          {/* Match Score Indicator */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded font-mono text-xs border border-white/[0.1] bg-zinc-900 text-zinc-200">
            <span className="font-semibold">{job.matchScore.toFixed(1)}%</span>
            <span className="text-[10px] text-zinc-500">match</span>
          </div>
        </div>

        {/* Title & Organization */}
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 tracking-tight leading-snug">
            {job.title}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5 font-mono">
            <span>{job.company}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">{job.location}</span>
          </p>
        </div>

        {/* Matched Skills Chips */}
        {job.matchedSkills && job.matchedSkills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {job.matchedSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-zinc-900 text-zinc-300 border border-white/[0.06]"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* AI Analysis Section */}
        <div className="pt-3 border-t border-white/[0.06]">
          {job.isAiLoading ? (
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 py-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Generating fit analysis...</span>
            </div>
          ) : job.insights ? (
            <div className="space-y-3 text-xs">
              {/* Fit Rationale */}
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                  Fit Evaluation
                </span>
                <p className="text-zinc-300 text-xs leading-relaxed">
                  {job.insights.match_explanation}
                </p>
              </div>

              {/* Skill Gaps */}
              {job.insights.skill_gaps && job.insights.skill_gaps.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                    Requirement Delta
                  </span>
                  <ul className="space-y-1">
                    {job.insights.skill_gaps.map((gap, idx) => (
                      <li key={idx} className="text-zinc-400 flex items-start gap-1.5 text-xs">
                        <Minus className="h-3 w-3 text-zinc-500 shrink-0 mt-0.5" />
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Resume Bullet Adjustments */}
              {job.insights.resume_tips && job.insights.resume_tips.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                    Resume Adjustments
                  </span>
                  <div className="space-y-1.5">
                    {job.insights.resume_tips.map((tip, idx) => (
                      <div
                        key={idx}
                        className="group flex items-start justify-between gap-2 p-2 rounded bg-zinc-900/60 border border-white/[0.04] text-zinc-300"
                      >
                        <span className="text-xs leading-relaxed flex-1">{tip}</span>
                        <button
                          type="button"
                          onClick={() => copyTip(tip, idx)}
                          className="shrink-0 p-1 rounded hover:bg-zinc-800 text-zinc-500 hover:text-zinc-200 transition-colors"
                          title="Copy adjustment to clipboard"
                        >
                          {copiedIndex === idx ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* External Link */}
      <div className="mt-4 pt-3 border-t border-white/[0.06]">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <span>View posting on {job.source.toLowerCase()}</span>
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
};

export default JobCard;
