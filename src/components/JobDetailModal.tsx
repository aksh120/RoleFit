'use client';

import React from 'react';
import { X, ExternalLink, MapPin, Briefcase, Minus, ArrowLeft } from 'lucide-react';
import type { EnrichedJob } from '@/lib/types';
import CompanyLogo from './CompanyLogo';

interface JobDetailModalProps {
  job: EnrichedJob | null;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-[#0C121E] w-full max-w-2xl rounded-xl border border-gray-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-150">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/60 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to matches</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Job Overview */}
          <div className="flex items-start gap-4">
            <CompanyLogo company={job.company} size={48} />
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                {job.matchScore.toFixed(0)}% Match
              </span>
              <h2 className="text-xl font-bold text-gray-950 dark:text-white mt-1.5">{job.title}</h2>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400 mt-0.5">{job.company}</p>

              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location || 'Remote'}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  {job.remote ? 'Remote' : 'Full-time'}
                </span>
                <span>Source: {job.source}</span>
              </div>
            </div>
          </div>

          {/* Primary External Application CTA */}
          <div>
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-medium transition-colors shadow-xs"
            >
              <span>View original posting on {job.source}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* AI Intelligence Sections */}
          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-slate-800">
            {/* Why You Match */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-slate-100 mb-1.5">
                Why you&apos;re a match
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed bg-blue-50/50 dark:bg-blue-950/30 p-3.5 rounded-lg border border-blue-100/70 dark:border-blue-900/50">
                {job.insights?.match_explanation ||
                  `Your background aligns well with the core responsibilities at ${job.company}.`}
              </p>
            </div>

            {/* Skill Gaps */}
            {job.insights?.skill_gaps && job.insights.skill_gaps.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-slate-100 mb-1.5">
                  Skill gaps to address
                </h3>
                <ul className="space-y-1.5 bg-gray-50 dark:bg-slate-900/60 p-3.5 rounded-lg border border-gray-100 dark:border-slate-800">
                  {job.insights.skill_gaps.map((gap, i) => (
                    <li key={i} className="text-xs text-gray-600 dark:text-slate-300 flex items-start gap-1.5">
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
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-slate-100 mb-1.5">
                  Recommended resume adjustments
                </h3>
                <ul className="space-y-1.5 bg-gray-50 dark:bg-slate-900/60 p-3.5 rounded-lg border border-gray-100 dark:border-slate-800">
                  {job.insights.resume_tips.map((tip: string, i: number) => (
                    <li key={i} className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Matched Skills */}
            {job.tags && job.tags.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-slate-100 mb-1.5">
                  Matched & Relevant Skills
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Job Description Raw */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-slate-100 mb-1.5">
                About this role
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed bg-gray-50/50 dark:bg-slate-900/40 p-3.5 rounded-lg border border-gray-100 dark:border-slate-800">
                {job.description || 'No direct description provided by job source.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;
