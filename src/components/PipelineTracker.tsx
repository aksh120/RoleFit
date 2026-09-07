'use client';

import React from 'react';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import type { PipelineStage } from '@/lib/types';

interface PipelineTrackerProps {
  currentStage: PipelineStage;
  stageMessage?: string;
}

const STAGES = [
  { id: 'parsing', label: 'Parse Resume' },
  { id: 'fetching_jobs', label: 'Ingest APIs' },
  { id: 'ranking', label: 'Cosine Rank' },
  { id: 'generating_insights', label: 'LLM Reason' },
];

export const PipelineTracker: React.FC<PipelineTrackerProps> = ({
  currentStage,
  stageMessage,
}) => {
  if (currentStage === 'idle') return null;

  const stageOrder: PipelineStage[] = [
    'parsing',
    'fetching_jobs',
    'ranking',
    'generating_insights',
    'completed',
  ];
  const currentIndex = stageOrder.indexOf(currentStage);

  return (
    <div className="rounded-lg border border-white/[0.08] bg-zinc-950/40 p-3 text-xs font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {/* Step Sequence */}
        <div className="flex items-center gap-1 sm:gap-2">
          {STAGES.map((st, idx) => {
            const isDone = currentIndex > idx || currentStage === 'completed';
            const isCurrent = currentStage === st.id;

            return (
              <React.Fragment key={st.id}>
                <div
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] ${
                    isCurrent
                      ? 'bg-zinc-800 text-zinc-100 font-medium'
                      : isDone
                      ? 'text-zinc-400'
                      : 'text-zinc-600'
                  }`}
                >
                  {isCurrent && <Loader2 className="h-3 w-3 animate-spin text-zinc-400" />}
                  {isDone && <Check className="h-3 w-3 text-emerald-500" />}
                  <span>{st.label}</span>
                </div>
                {idx < STAGES.length - 1 && (
                  <span className="text-zinc-600 text-[10px]">→</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Message */}
        {stageMessage && (
          <div className="text-[11px] text-zinc-400 truncate max-w-md">
            {stageMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default PipelineTracker;
