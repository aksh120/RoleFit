'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import ResumeUploader from '@/components/ResumeUploader';
import SearchControls from '@/components/SearchControls';
import PipelineTracker from '@/components/PipelineTracker';
import JobCard from '@/components/JobCard';
import type { EnrichedJob, PipelineStage, Job, AIInsights } from '@/lib/types';
import { AlertCircle, Info, Inbox } from 'lucide-react';

export default function Home() {
  // Resume state
  const [resumeText, setResumeText] = useState<string>('');
  const [resumeFilename, setResumeFilename] = useState<string>('');
  const [resumeCharCount, setResumeCharCount] = useState<number>(0);

  // Search & Filter state
  const [keyword, setKeyword] = useState<string>('');
  const [topN, setTopN] = useState<number>(8);
  const [customApiKey, setCustomApiKey] = useState<string>('');

  // Pipeline Execution state
  const [stage, setStage] = useState<PipelineStage>('idle');
  const [stageMessage, setStageMessage] = useState<string>('');
  const [rankedJobs, setRankedJobs] = useState<EnrichedJob[]>([]);
  const [totalPoolCount, setTotalPoolCount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const handleResumeLoaded = (text: string, filename: string, charCount: number) => {
    setResumeText(text);
    setResumeFilename(filename);
    setResumeCharCount(charCount);
    setErrorMessage(null);
  };

  const handleResumeClear = () => {
    setResumeText('');
    setResumeFilename('');
    setResumeCharCount(0);
    setRankedJobs([]);
    setStage('idle');
    setErrorMessage(null);
    setWarningMessage(null);
  };

  const handleRunPipeline = async () => {
    if (!resumeText || resumeText.length < 50) {
      setErrorMessage('Please provide a resume with at least 50 characters of selectable text.');
      return;
    }

    setErrorMessage(null);
    setWarningMessage(null);
    setRankedJobs([]);

    try {
      // Stage 1: Ingestion
      setStage('fetching_jobs');
      setStageMessage('Querying RemoteOK & Arbeitnow APIs...');

      const queryParam = keyword.trim() ? `?keyword=${encodeURIComponent(keyword.trim())}` : '';
      const jobsRes = await fetch(`/api/jobs${queryParam}`);
      const jobsData = await jobsRes.json();

      if (!jobsRes.ok || !jobsData.success || !Array.isArray(jobsData.jobs)) {
        throw new Error(jobsData.error || 'Failed to fetch job board data.');
      }

      const allJobs: Job[] = jobsData.jobs;
      setTotalPoolCount(allJobs.length);

      if (allJobs.length === 0) {
        setStage('completed');
        setStageMessage('0 active postings matched search filter.');
        return;
      }

      // Stage 2: Ranking
      setStage('ranking');
      setStageMessage(`Ranking ${allJobs.length} active roles via vector cosine similarity...`);

      const matchRes = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jobs: allJobs,
          topN,
        }),
      });

      const matchData = await matchRes.json();
      if (!matchRes.ok || !matchData.success) {
        throw new Error(matchData.error || 'Matching calculation failed.');
      }

      const shortlisted: EnrichedJob[] = matchData.rankedJobs.map(
        (j: Job & { matchScore: number; matchedSkills?: string[] }) => ({
          ...j,
          isAiLoading: true,
        })
      );

      setRankedJobs(shortlisted);

      // Stage 3: LLM Reasoning
      setStage('generating_insights');
      setStageMessage(`Invoking Llama 3.3 70B for ${shortlisted.length} shortlisted roles...`);

      let hasDegradedInsights = false;

      const enriched = await Promise.all(
        shortlisted.map(async (item) => {
          try {
            const insRes = await fetch('/api/insights', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                resumeText,
                job: item,
                apiKey: customApiKey.trim() || undefined,
              }),
            });
            const insData = await insRes.json();

            if (insData.isDegraded) {
              hasDegradedInsights = true;
            }

            return {
              ...item,
              insights: insData.insights as AIInsights,
              isAiLoading: false,
            };
          } catch (e) {
            console.error('Insight error for', item.id, e);
            return {
              ...item,
              isAiLoading: false,
            };
          }
        })
      );

      setRankedJobs(enriched);
      setStage('completed');
      setStageMessage(`Completed analysis on top ${enriched.length} matching roles.`);

      if (hasDegradedInsights && !customApiKey) {
        setWarningMessage(
          'Notice: Using fallback heuristics because GROQ_API_KEY is not set in .env. Enter a key above for live Groq Llama 3.3 generation.'
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Execution error.';
      setStage('error');
      setStageMessage('Pipeline failed.');
      setErrorMessage(msg);
    }
  };

  const isProcessing = stage !== 'idle' && stage !== 'completed' && stage !== 'error';
  const canSearch = Boolean(resumeText && resumeText.length >= 50);

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#f4f4f5]">
      <Header poolCount={totalPoolCount} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Notice & Error Banners */}
        {warningMessage && (
          <div className="p-3 rounded-lg bg-zinc-900 border border-white/[0.08] text-zinc-300 text-xs flex items-center justify-between gap-3 font-mono">
            <div className="flex items-center gap-2">
              <Info className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span>{warningMessage}</span>
            </div>
            <button
              onClick={() => setWarningMessage(null)}
              className="text-zinc-500 hover:text-zinc-300"
            >
              ✕
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-950/30 border border-red-900/40 text-red-300 text-xs flex items-center justify-between gap-3 font-mono">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-200"
            >
              ✕
            </button>
          </div>
        )}

        {/* Pipeline Execution Telemetry */}
        <PipelineTracker currentStage={stage} stageMessage={stageMessage} />

        {/* 2-Column Split Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Candidate Workbench (Sticky on desktop) */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
            <ResumeUploader
              resumeText={resumeText}
              filename={resumeFilename}
              charCount={resumeCharCount}
              isLoading={isProcessing}
              onTextLoaded={handleResumeLoaded}
              onClear={handleResumeClear}
            />

            <SearchControls
              keyword={keyword}
              topN={topN}
              customApiKey={customApiKey}
              isProcessing={isProcessing}
              canSearch={canSearch}
              onKeywordChange={setKeyword}
              onTopNChange={setTopN}
              onCustomApiKeyChange={setCustomApiKey}
              onSubmit={handleRunPipeline}
            />
          </div>

          {/* Right Column: Ranked Job Feed */}
          <div className="lg:col-span-7 space-y-4">
            {/* Feed Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 font-mono">
                  Ranked Opportunities
                </span>
                {rankedJobs.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded bg-zinc-900 border border-white/[0.06] text-[11px] font-mono text-zinc-400">
                    {rankedJobs.length} roles
                  </span>
                )}
              </div>
              <span className="text-[11px] font-mono text-zinc-500">
                Sorted by Vector Cosine Similarity
              </span>
            </div>

            {/* Job Cards List */}
            {rankedJobs.length > 0 ? (
              <div className="space-y-4">
                {rankedJobs.map((job, idx) => (
                  <JobCard key={job.id} job={job} rank={idx + 1} />
                ))}
              </div>
            ) : stage === 'completed' && rankedJobs.length === 0 ? (
              <div className="p-12 rounded-xl border border-white/[0.06] bg-zinc-950/40 text-center space-y-2">
                <Inbox className="h-8 w-8 text-zinc-600 mx-auto" />
                <p className="text-xs font-medium text-zinc-300">No matching postings</p>
                <p className="text-[11px] font-mono text-zinc-500 max-w-sm mx-auto">
                  No live postings matched &quot;{keyword}&quot;. Try broadening keywords or clearing filters.
                </p>
              </div>
            ) : (
              /* Idle Initial State */
              <div className="p-10 rounded-xl border border-white/[0.06] bg-zinc-950/30 text-center space-y-2">
                <p className="text-xs font-medium text-zinc-300">Ready for Analysis</p>
                <p className="text-[11px] font-mono text-zinc-500 max-w-sm mx-auto">
                  Upload a candidate resume or click &quot;Sample&quot; on the left, then click &quot;Rank Postings&quot; to ingest live roles and compute fit.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Minimalist Footer */}
      <footer className="w-full border-t border-white/[0.06] py-5 mt-16 text-xs font-mono text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>RoleFit — Generative AI Developer Intern Assessment</span>
          <span>Next.js 15 • Groq Llama 3.3 70B • RemoteOK • Arbeitnow</span>
        </div>
      </footer>
    </div>
  );
}
