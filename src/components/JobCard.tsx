'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Briefcase,
  BarChart2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Copy,
  Check,
  Minus,
} from 'lucide-react';
import type { EnrichedJob } from '@/lib/types';
import CompanyLogo from './CompanyLogo';

interface JobCardProps {
  job: EnrichedJob;
  rank: number;
  isSaved?: boolean;
  onToggleSave?: (job: EnrichedJob) => void;
  onViewJob?: (job: EnrichedJob) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  rank,
  isSaved = false,
  onToggleSave,
  onViewJob,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1800);
    } catch {
      // ignore
    }
  };

  const scoreNum = Math.round(job.matchScore);
  const explanation =
    job.insights?.match_explanation ||
    `Your technical background aligns well with the ${job.title} position at ${job.company}. Relevant skills provide a solid foundation for this role.`;

  return (
    <article className="bg-white dark:bg-[#0C121E] rounded-xl border border-gray-200 dark:border-slate-800/80 p-5 transition-all hover:shadow-[0_2px_6px_0_rgba(0,0,0,0.04)] dark:hover:border-slate-700 relative">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
        {/* Left + Center Block */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          {/* Rank Badge */}
          <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 font-bold text-[12px] flex items-center justify-center shrink-0 select-none">
            #{rank}
          </div>

          {/* Company Logo */}
          <CompanyLogo company={job.company} size={40} />

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-bold text-gray-950 dark:text-white truncate leading-snug">
              {job.title}
            </h3>
            <p className="text-[13px] font-medium text-gray-600 dark:text-slate-400 mt-0.5">
              {job.company}
            </p>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-[12px] text-gray-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-gray-400 dark:text-slate-500" />
                {job.location || 'Remote'}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5 text-gray-400 dark:text-slate-500" />
                {job.remote ? 'Full-time / Remote' : 'Full-time'}
              </span>
              <span className="flex items-center gap-1">
                <BarChart2 className="h-3.5 w-3.5 text-gray-400 dark:text-slate-500" />
                3-5 years
              </span>
            </div>

            {/* Tags Row */}
            {job.tags && job.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                {job.tags.slice(0, 4).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 dark:bg-slate-800/80 text-gray-600 dark:text-slate-300 border border-transparent dark:border-slate-700/50 lowercase"
                  >
                    {tag}
                  </span>
                ))}
                {job.tags.length > 4 && (
                  <span className="px-1.5 py-0.5 rounded text-[11px] font-medium bg-gray-100 dark:bg-slate-800/80 text-gray-500 dark:text-slate-400">
                    +{job.tags.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* AI Summary Snippet */}
            <p className="text-[12px] text-gray-600 dark:text-slate-300 leading-relaxed mt-2.5">
              {explanation}
            </p>
          </div>
        </div>

        {/* Right Action Block */}
        <div className="flex lg:flex-col items-end justify-between lg:justify-start gap-3 shrink-0 w-full lg:w-44 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100 dark:border-slate-800">
          {/* Match Score */}
          <div className="text-right">
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-2xl font-extrabold text-gray-950 dark:text-white font-sans tracking-tight">
                {scoreNum}%
              </span>
              <span className="text-[12px] font-medium text-gray-500 dark:text-slate-400">match</span>
            </div>
            {/* Thin Horizontal Progress Bar */}
            <div className="w-28 h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-[#10B981] dark:bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(10, scoreNum))}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-1">
            <button
              type="button"
              onClick={() => onToggleSave?.(job)}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-400 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              title={isSaved ? 'Remove from saved' : 'Save job'}
            >
              <Bookmark
                className={`h-4 w-4 ${
                  isSaved
                    ? 'fill-[#2563EB] dark:fill-blue-400 text-[#2563EB] dark:text-blue-400'
                    : 'text-gray-400 dark:text-slate-400'
                }`}
              />
            </button>

            <button
              type="button"
              onClick={() => (onViewJob ? onViewJob(job) : window.open(job.url, '_blank'))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#2563EB] dark:border-blue-500 text-[#2563EB] dark:text-blue-400 hover:bg-[#EFF6FF] dark:hover:bg-blue-950/50 text-[12px] font-medium transition-colors cursor-pointer"
            >
              <span>View Job</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Toggle Chevron at bottom center */}
      <div className="mt-3 pt-2 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-[11px] font-medium text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 flex items-center gap-1 transition-colors"
        >
          <span>{expanded ? 'Hide match breakdown' : 'Why you match & suggestions'}</span>
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>

        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-medium text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300"
        >
          Source: {job.source}
        </a>
      </div>

      {/* Expanded Accordion Details */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800/80 space-y-3.5 text-xs animate-fadeIn">
          {/* Why This Matches */}
          <div>
            <span className="font-semibold text-gray-900 dark:text-slate-100 block mb-1">
              Why this matches
            </span>
            <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
              {job.insights?.match_explanation || explanation}
            </p>
          </div>

          {/* Requirement Gaps */}
          {job.insights?.skill_gaps && job.insights.skill_gaps.length > 0 && (
            <div>
              <span className="font-semibold text-gray-900 dark:text-slate-100 block mb-1">
                Requirement gaps
              </span>
              <ul className="space-y-1">
                {job.insights.skill_gaps.map((gap, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-gray-600 dark:text-slate-300">
                    <Minus className="h-3.5 w-3.5 text-gray-400 dark:text-slate-500 shrink-0 mt-0.5" />
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resume Suggestions */}
          {job.insights?.resume_tips && job.insights.resume_tips.length > 0 && (
            <div>
              <span className="font-semibold text-gray-900 dark:text-slate-100 block mb-1">
                Resume suggestions
              </span>
              <ul className="space-y-2">
                {job.insights.resume_tips.map((suggestion: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-start justify-between gap-2 p-2.5 rounded-lg bg-gray-50 dark:bg-slate-900/80 border border-gray-100 dark:border-slate-800 text-gray-700 dark:text-slate-200"
                  >
                    <span>{suggestion}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(suggestion, idx)}
                      className="p-1 rounded text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-200 shrink-0"
                      title="Copy suggestion"
                    >
                      {copiedIndex === idx ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default JobCard;
