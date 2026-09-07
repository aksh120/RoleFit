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
      <div className="pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-950">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your RoleFit preferences and model configurations.
        </p>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-mono">
          General Preferences
        </h2>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Default Number of Top Matches
          </label>
          <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-50">
            {[3, 8, 15].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => onDefaultTopNChange(count)}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  defaultTopN === count
                    ? 'bg-white border border-gray-200 text-[#2563EB] shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {count} roles
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Configuration */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-mono">
            Groq AI Configuration
          </h2>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-100">
            Llama 3.3 70B
          </span>
        </div>

        {/* Informational Banner */}
        <div className="p-3.5 rounded-lg bg-[#EFF6FF] border border-blue-100 text-xs text-gray-700 flex items-start gap-2.5">
          <Info className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-gray-900 block">
              {apiKey ? 'API Key Configured' : 'AI insights fallback enabled'}
            </span>
            <p className="text-gray-600 text-[11px] leading-relaxed">
              Job matching works 100% reliably with or without an API key using local embeddings.
              Providing a Groq API key unlocks live Llama 3.3 70B fit reasoning and tailored resume tips.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Groq API Key
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="gsk_..."
              value={localKey}
              onChange={(e) => setLocalKey(e.target.value)}
              className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#2563EB]"
            />
            <button
              type="button"
              onClick={handleSaveKey}
              className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              {savedMessage ? 'Saved!' : 'Save Key'}
            </button>
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-mono">
          Data Sources
        </h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gray-900 text-white font-bold text-xs flex items-center justify-center">
                RK
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">RemoteOK API</p>
                <p className="text-[11px] text-gray-500">Live remote tech jobs</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              <CheckCircle2 className="h-3 w-3" /> Connected
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#10B981] text-white font-bold text-xs flex items-center justify-center">
                A
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">Arbeitnow API</p>
                <p className="text-[11px] text-gray-500">Global tech listings</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              <CheckCircle2 className="h-3 w-3" /> Connected
            </span>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-2">
        <h2 className="text-sm font-bold text-gray-900">RoleFit v1.0</h2>
        <p className="text-xs text-gray-500 leading-relaxed">
          Semantic resume-to-job matching powered by embeddings and generative AI.
          Built for the Generative AI Developer Intern technical assessment.
        </p>
      </div>
    </div>
  );
};

export default SettingsView;
