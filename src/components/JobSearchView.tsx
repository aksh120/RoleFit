'use client';

import React from 'react';
import { Search, MapPin, SlidersHorizontal, ArrowRight, Loader2 } from 'lucide-react';
import JobCard from './JobCard';
import type { EnrichedJob } from '@/lib/types';

interface JobSearchViewProps {
  keyword: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  isProcessing: boolean;
  rankedJobs: EnrichedJob[];
  savedJobs: EnrichedJob[];
  onKeywordChange: (v: string) => void;
  onLocationChange: (v: string) => void;
  onJobTypeChange: (v: string) => void;
  onExperienceLevelChange: (v: string) => void;
  onSearch: () => void;
  onToggleSave: (job: EnrichedJob) => void;
  onViewJob: (job: EnrichedJob) => void;
}

export const JobSearchView: React.FC<JobSearchViewProps> = ({
  keyword,
  location,
  jobType,
  experienceLevel,
  isProcessing,
  rankedJobs,
  savedJobs,
  onKeywordChange,
  onLocationChange,
  onJobTypeChange,
  onExperienceLevelChange,
  onSearch,
  onToggleSave,
  onViewJob,
}) => {
  const savedIds = new Set(savedJobs.map((j) => j.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-gray-100 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-gray-950 dark:text-white">Find your next opportunity</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
          Search live job postings and rank them against your resume.
        </p>
      </div>

      {/* Filter Card */}
      <div className="bg-white dark:bg-[#0C121E] rounded-xl border border-gray-200 dark:border-slate-800/80 p-5 shadow-xs space-y-4 transition-colors duration-150">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Keywords</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="e.g. data scientist, react"
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
                className="w-full pl-8 pr-2.5 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#2563EB] dark:focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Location</label>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="e.g. Remote, Berlin"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                className="w-full pl-8 pr-2.5 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#2563EB] dark:focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Job Type</label>
            <select
              value={jobType}
              onChange={(e) => onJobTypeChange(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] dark:focus:border-blue-500 transition-colors"
            >
              <option value="all">All types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Experience</label>
            <select
              value={experienceLevel}
              onChange={(e) => onExperienceLevelChange(e.target.value)}
              className="w-full px-2.5 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] dark:focus:border-blue-500 transition-colors"
            >
              <option value="all">All levels</option>
              <option value="entry">Entry-level</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onSearch}
            disabled={isProcessing}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-medium transition-colors shadow-xs"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Searching live jobs...</span>
              </>
            ) : (
              <>
                <span>Search jobs</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-1">
          <span className="text-xs font-semibold text-gray-700 dark:text-slate-300">
            {rankedJobs.length} live openings found
          </span>
          <span className="text-xs text-gray-400 dark:text-slate-500">
            Ranked by match suitability
          </span>
        </div>

        {rankedJobs.map((job, idx) => (
          <JobCard
            key={job.id}
            job={job}
            rank={idx + 1}
            isSaved={savedIds.has(job.id)}
            onToggleSave={onToggleSave}
            onViewJob={onViewJob}
          />
        ))}
      </div>
    </div>
  );
};

export default JobSearchView;
