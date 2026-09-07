'use client';

import React, { useState } from 'react';
import { Key, CheckCircle2, AlertCircle, Info, Database } from 'lucide-react';

interface SettingsViewProps {
  apiKey: string;
  defaultTopN: number;
  onApiKeyChange: (key: string) => void;
  onDefaultTopNChange: (n: number) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  apiKey,
  defaultTopN,
  onApiKeyChange,
  onDefaultTopNChange,
}) => {
  const [localKey, setLocalKey] = useState(apiKey);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSaveKey = () => {
    onApiKeyChange(localKey.trim());
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div className="pb-4 border-b border-gray-100 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-gray-950 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
          Manage your RoleFit preferences and model configurations.
        </p>
      </div>

      {/* General Settings */}
      <div className="bg-white dark:bg-[#0C121E] rounded-xl border border-gray-200 dark:border-slate-800/80 p-6 space-y-4 transition-colors duration-150">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-slate-100 font-mono">
          General Preferences
        </h2>

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

      {/* AI Model Settings */}
      <div className="bg-white dark:bg-[#0C121E] rounded-xl border border-gray-200 dark:border-slate-800/80 p-6 space-y-4 transition-colors duration-150">
        <div className="flex items-center gap-2">
          <Key className="h-4 w-4 text-gray-700 dark:text-slate-300" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-slate-100 font-mono">
            Groq API Key (Optional)
          </h2>
        </div>

        <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
          Provide a Groq API key for Llama 3.3 70B reasoning. If omitted, RoleFit uses the server key or generates analytical heuristic breakdowns without failing.
        </p>

        <div className="flex items-center gap-2">
          <input
            type="password"
            placeholder="gsk_..."
            value={localKey}
            onChange={(e) => setLocalKey(e.target.value)}
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 font-mono focus:outline-none focus:border-[#2563EB] dark:focus:border-blue-500 transition-colors"
          />
          <button
            type="button"
            onClick={handleSaveKey}
            className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-medium transition-colors shadow-xs"
          >
            Save Key
          </button>
        </div>

        {savedMessage && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 pt-1">
            <CheckCircle2 className="h-4 w-4" />
            <span>Key saved for this session</span>
          </div>
        )}

        <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 flex items-start gap-2">
          <Info className="h-4 w-4 text-[#2563EB] dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="text-[11px] text-gray-600 dark:text-slate-300 leading-relaxed">
            <span className="font-semibold text-gray-900 dark:text-slate-100">Status: Active</span>. RoleFit operates with zero external keys required for vector cosine similarity rankings.
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
              <p className="text-[11px] text-gray-500 dark:text-slate-400">Global and European tech job postings</p>
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
          Semantic resume-to-job matching powered by high-dimensional embeddings and generative AI.
        </p>
      </div>
    </div>
  );
};

export default SettingsView;
