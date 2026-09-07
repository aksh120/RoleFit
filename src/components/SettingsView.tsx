'use client';

import React from 'react';
import { Database, Sliders, Shield } from 'lucide-react';

interface SettingsViewProps {
  defaultTopN: number;
  onDefaultTopNChange: (n: number) => void;
  apiKey?: string;
  onApiKeyChange?: (key: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  defaultTopN,
  onDefaultTopNChange,
}) => {
  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div className="pb-4 border-b border-gray-100 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-gray-950 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
          Manage your RoleFit preferences and search parameters.
        </p>
      </div>

      {/* General Settings */}
      <div className="bg-white dark:bg-[#0C121E] rounded-xl border border-gray-200 dark:border-slate-800/80 p-6 space-y-4 transition-colors duration-150">
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-gray-700 dark:text-slate-300" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-slate-100 font-mono">
            General Preferences
          </h2>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">
            Default Number of Top Matches
          </label>
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-slate-700 p-0.5 bg-gray-50 dark:bg-slate-900">
            {[3, 8, 15].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => onDefaultTopNChange(count)}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  defaultTopN === count
                    ? 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-[#2563EB] dark:text-blue-400 shadow-xs'
                    : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {count} roles
              </button>
            ))}
          </div>
          <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-1">
            Controls how many high-relevance jobs are ranked and generated on search.
          </p>
        </div>
      </div>

      {/* Privacy & Processing Status */}
      <div className="bg-white dark:bg-[#0C121E] rounded-xl border border-gray-200 dark:border-slate-800/80 p-6 space-y-4 transition-colors duration-150">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-gray-700 dark:text-slate-300" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-slate-100 font-mono">
            Privacy & Processing
          </h2>
        </div>

        <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
          Resume documents are processed in-memory for vector embedding and match scoring. No candidate resume files are stored on external storage or shared with third parties.
        </p>

        <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 flex items-start gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0 animate-pulse" />
          <div className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed">
            <span className="font-semibold">Semantic Matching Active</span>. Vector cosine similarity and career synthesis pipelines are fully operational.
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-white dark:bg-[#0C121E] rounded-xl border border-gray-200 dark:border-slate-800/80 p-6 space-y-4 transition-colors duration-150">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-gray-700 dark:text-slate-300" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-slate-100 font-mono">
            Data Sources
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-slate-800">
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-slate-100">RemoteOK</p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">Remote tech jobs API feed</p>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
              Connected
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-slate-800">
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-slate-100">Arbeitnow</p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">Global and Indian tech job postings</p>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
              Connected
            </span>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50 text-xs text-gray-600 dark:text-slate-300 space-y-1">
        <p className="font-semibold text-gray-900 dark:text-white">RoleFit</p>
        <p className="text-gray-500 dark:text-slate-400">
          Semantic resume-to-job matching powered by high-dimensional embeddings and AI career synthesis.
        </p>
      </div>
    </div>
  );
};

export default SettingsView;
