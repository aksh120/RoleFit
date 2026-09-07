'use client';

import React from 'react';
import { SlidersHorizontal, RotateCcw, Search, MapPin, ArrowRight, Loader2 } from 'lucide-react';

interface SearchControlsProps {
  keyword: string;
  jobType: string;
  experienceLevel: string;
  location: string;
  topN: number;
  isProcessing: boolean;
  canSearch: boolean;
  onKeywordChange: (val: string) => void;
  onJobTypeChange: (val: string) => void;
  onExperienceLevelChange: (val: string) => void;
  onLocationChange: (val: string) => void;
  onTopNChange: (val: number) => void;
  onReset: () => void;
  onSubmit: () => void;
}

export const SearchControls: React.FC<SearchControlsProps> = ({
  keyword,
  jobType,
  experienceLevel,
  location,
  topN,
  isProcessing,
  canSearch,
  onKeywordChange,
  onJobTypeChange,
  onExperienceLevelChange,
  onLocationChange,
  onTopNChange,
  onReset,
  onSubmit,
}) => {
  return (
    <div className="bg-white dark:bg-[#0C121E] rounded-xl border border-gray-200 dark:border-slate-800/80 p-6 flex flex-col justify-between h-full shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-colors duration-150">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-700 dark:text-slate-300" />
              <h2 className="text-[16px] font-bold text-gray-950 dark:text-white">
                Search settings
              </h2>
            </div>
            <p className="text-[12px] text-gray-500 dark:text-slate-400 mt-0.5">
              Fine-tune your search to get more relevant results.
            </p>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#2563EB] dark:text-blue-400 hover:text-[#1D4ED8] dark:hover:text-blue-300 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* 4 Form Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keywords */}
          <div>
            <label className="block text-[12px] font-medium text-gray-700 dark:text-slate-300 mb-1">
              Keywords (optional)
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="e.g. data scientist, python"
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
                className="w-full pl-8 pr-2.5 py-2 text-[12px] rounded-lg border border-gray-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#2563EB] dark:focus:border-blue-500 text-gray-900 dark:text-slate-100 transition-colors"
              />
            </div>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-[12px] font-medium text-gray-700 dark:text-slate-300 mb-1">
              Job type
            </label>
            <select
              value={jobType}
              onChange={(e) => onJobTypeChange(e.target.value)}
              className="w-full px-2.5 py-2 text-[12px] rounded-lg border border-gray-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] dark:focus:border-blue-500 transition-colors"
            >
              <option value="all">All types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-[12px] font-medium text-gray-700 dark:text-slate-300 mb-1">
              Experience level
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => onExperienceLevelChange(e.target.value)}
              className="w-full px-2.5 py-2 text-[12px] rounded-lg border border-gray-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-200 focus:outline-none focus:border-[#2563EB] dark:focus:border-blue-500 transition-colors"
            >
              <option value="all">All levels</option>
              <option value="entry">Entry-level</option>
              <option value="mid">Mid-level (3-5 years)</option>
              <option value="senior">Senior (5+ years)</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[12px] font-medium text-gray-700 dark:text-slate-300 mb-1">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="e.g. Remote, Berlin"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                className="w-full pl-8 pr-2.5 py-2 text-[12px] rounded-lg border border-gray-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#2563EB] dark:focus:border-blue-500 text-gray-900 dark:text-slate-100 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Results Count & Find CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-6">
        <div>
          <span className="block text-[12px] font-medium text-gray-700 dark:text-slate-300 mb-1.5">
            Number of results
          </span>
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-slate-800 p-0.5 bg-white dark:bg-slate-900">
            {[3, 8, 15].map((count) => {
              const active = topN === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => onTopNChange(count)}
                  className={`w-10 h-8 text-[13px] font-medium rounded-md transition-all ${
                    active
                      ? 'bg-[#EFF6FF] dark:bg-blue-950/60 border border-[#2563EB] dark:border-blue-500 text-[#2563EB] dark:text-blue-300 shadow-xs'
                      : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {count}
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Blue Button */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSearch || isProcessing}
          className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-[13px] font-medium text-white transition-colors cursor-pointer shadow-xs ${
            canSearch && !isProcessing
              ? 'bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500'
              : 'bg-gray-300 dark:bg-slate-800 text-gray-500 dark:text-slate-500 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span>Matching Roles...</span>
            </>
          ) : (
            <>
              <span>Find Matching Jobs</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchControls;
