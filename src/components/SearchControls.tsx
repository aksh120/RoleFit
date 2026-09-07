'use client';

import React, { useState } from 'react';
import { Search, Sliders, Key, X, ArrowRight, Loader2 } from 'lucide-react';

interface SearchControlsProps {
  keyword: string;
  topN: number;
  customApiKey: string;
  isProcessing: boolean;
  canSearch: boolean;
  onKeywordChange: (val: string) => void;
  onTopNChange: (val: number) => void;
  onCustomApiKeyChange: (val: string) => void;
  onSubmit: () => void;
}

const COMMON_TAGS = ['AI', 'Full Stack', 'Frontend', 'Python', 'TypeScript', 'Remote'];

export const SearchControls: React.FC<SearchControlsProps> = ({
  keyword,
  topN,
  customApiKey,
  isProcessing,
  canSearch,
  onKeywordChange,
  onTopNChange,
  onCustomApiKeyChange,
  onSubmit,
}) => {
  const [showKeyModal, setShowKeyModal] = useState(false);

  const toggleTag = (tag: string) => {
    if (keyword.toLowerCase().includes(tag.toLowerCase())) {
      const updated = keyword
        .split(' ')
        .filter((t) => t.toLowerCase() !== tag.toLowerCase())
        .join(' ')
        .trim();
      onKeywordChange(updated);
    } else {
      const updated = keyword ? `${keyword} ${tag}` : tag;
      onKeywordChange(updated);
    }
  };

  return (
    <div className="rounded-xl border border-white/[0.08] bg-zinc-950/60 p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-zinc-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 font-mono">
            Search & Ranking Controls
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowKeyModal(!showKeyModal)}
          className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-mono border transition-colors ${
            customApiKey
              ? 'bg-zinc-800 text-zinc-200 border-white/[0.2]'
              : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300 border-white/[0.06]'
          }`}
        >
          <Key className="h-3 w-3" />
          <span>{customApiKey ? 'API Key: Set' : 'Custom Groq Key'}</span>
        </button>
      </div>

      {showKeyModal && (
        <div className="p-3 rounded-lg bg-zinc-900/90 border border-white/[0.08] space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 font-mono text-[11px]">Override Default Groq Key:</span>
            <button
              onClick={() => setShowKeyModal(false)}
              className="text-zinc-500 hover:text-zinc-300"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <input
            type="password"
            placeholder="gsk_..."
            value={customApiKey}
            onChange={(e) => onCustomApiKeyChange(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded bg-zinc-950 border border-white/[0.1] text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-500"
          />
        </div>
      )}

      {/* Keyword Input */}
      <div>
        <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">
          Role / Tech Keyword Filter
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Filter by title, tags, or description..."
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            disabled={isProcessing}
            className="w-full pl-9 pr-8 py-2 rounded-lg bg-zinc-900/60 border border-white/[0.08] text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-white/[0.2] transition-colors"
          />
          {keyword && (
            <button
              type="button"
              onClick={() => onKeywordChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Quick Tag Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          {COMMON_TAGS.map((tag) => {
            const active = keyword.toLowerCase().includes(tag.toLowerCase());
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  active
                    ? 'bg-zinc-100 text-zinc-900 font-medium'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-white/[0.06]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Shortlist Depth & Action */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div>
          <span className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
            Shortlist Depth
          </span>
          <div className="inline-flex rounded-lg p-0.5 bg-zinc-900 border border-white/[0.06] text-xs font-mono">
            {[3, 8, 15].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => onTopNChange(count)}
                disabled={isProcessing}
                className={`px-3 py-1 rounded transition-colors ${
                  topN === count
                    ? 'bg-zinc-800 text-zinc-100 font-medium'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Execute Button */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSearch || isProcessing}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium transition-all ${
            canSearch && !isProcessing
              ? 'bg-zinc-100 text-zinc-950 hover:bg-white active:scale-[0.98]'
              : 'bg-zinc-900 text-zinc-600 border border-white/[0.04] cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-500" />
              <span>Analyzing Postings...</span>
            </>
          ) : (
            <>
              <span>Rank Postings</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchControls;
