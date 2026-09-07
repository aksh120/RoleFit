'use client';

import React from 'react';
import {
  FileText,
  Binary,
  Globe2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

interface HowItWorksViewProps {
  onStartMatching: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onStartMatching }) => {
  const steps = [
    {
      num: '01',
      icon: FileText,
      title: 'Resume Parsing & Ingestion',
      badge: 'Local Parsing',
      description:
        'Upload your resume in PDF or DOCX format. RoleFit performs clean server-side text extraction using native binary parsers. We strip non-standard unicode characters, normalize formatting, and compute precise token and word counts without storing your file permanently.',
      points: [
        'Supports standard PDF and Microsoft Word DOCX formats',
        'In-memory extraction with zero permanent document storage',
        'Automatic technical keyword and skill-cluster detection',
      ],
    },
    {
      num: '02',
      icon: Binary,
      title: 'Vector Embeddings & Semantic Representation',
      badge: 'Embedding Layer',
      description:
        'Rather than relying on brittle keyword matching, RoleFit maps your candidate profile into a high-dimensional vector space. Experience with "foundation models" is recognized as closely aligned with "large language models" and "generative AI".',
      points: [
        'Dense semantic vector space representation',
        'Captures contextual hierarchy and seniority indicators',
        'Understands synonymous technologies and modern toolchains',
      ],
    },
    {
      num: '03',
      icon: Globe2,
      title: 'Live Multi-Source Job Ingestion',
      badge: 'Live Data',
      description:
        'RoleFit aggregates live job postings from open developer APIs and remote employment boards including RemoteOK and Arbeitnow. Postings are continuously filtered, deduplicated, and organized into standardized role objects.',
      points: [
        'Real-time queries against active tech employer postings',
        'Automated deduplication across company domains',
        'Normalized employment types (Remote, Full-time, Hybrid)',
      ],
    },
    {
      num: '04',
      icon: Cpu,
      title: 'Cosine Similarity Scoring & Ranking',
      badge: 'Mathematical Ranking',
      description:
        'The candidate resume vector is evaluated against every live job listing using vector cosine similarity. Roles are sorted in descending order of semantic proximity, producing intuitive percentage match scores (0–100%).',
      points: [
        'Normalized dot product calculation over vector magnitudes',
        'Deterministic ranking unaffected by marketing fluff',
        'Adjustable result depth (Top 3, 8, or 15 high-suitability openings)',
      ],
    },
    {
      num: '05',
      icon: Sparkles,
      title: 'LLM Reasoning & Tailored Suggestions',
      badge: 'Groq Llama 3.3 70B',
      description:
        'Top-ranked matches are synthesized by Groq Llama 3.3 70B. RoleFit diagnoses specific requirement gaps and generates concrete, actionable bullet points you can copy directly into your resume to tailor your application.',
      points: [
        'Analytical breakdown: "Why you match" based on proven evidence',
        'Diagnoses up to 3 concrete skill gaps per target role',
        'Actionable, metrics-focused resume editing suggestions',
      ],
    },
  ];

  return (
    <div className="space-y-10 max-w-4xl pb-12 animate-fadeIn">
      {/* Top Header */}
      <div className="border-b border-gray-100 dark:border-slate-800 pb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB] dark:text-blue-400 mb-2">
          ARCHITECTURE & PIPELINE
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight leading-tight">
          How RoleFit Works
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
          From document ingestion to vector cosine similarity and automated LLM skill-gap diagnosis. Here is what happens under the hood.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white dark:bg-[#0C121E] rounded-xl border border-gray-200 dark:border-slate-800/80 p-6 shadow-xs hover:border-gray-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-400 dark:text-slate-500">
                        {step.num}
                      </span>
                      <h2 className="text-base font-bold text-gray-950 dark:text-white">
                        {step.title}
                      </h2>
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200/60 dark:border-slate-700 self-start">
                  {step.badge}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed pl-0 sm:pl-[52px]">
                {step.description}
              </p>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-800/80 pl-0 sm:pl-[52px] grid grid-cols-1 sm:grid-cols-3 gap-2">
                {step.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-slate-400">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Security & Privacy Card */}
      <div className="bg-gradient-to-br from-blue-50/60 via-white to-white dark:from-blue-950/30 dark:via-[#0C121E] dark:to-[#0C121E] rounded-xl border border-blue-100 dark:border-blue-900/50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-[#2563EB] text-white shrink-0 shadow-xs">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-950 dark:text-white">
              Candidate Privacy & Security
            </h3>
            <p className="text-xs text-gray-600 dark:text-slate-300 mt-1 max-w-xl leading-relaxed">
              Your resume is evaluated in-memory. We never sell candidate profiles, distribute contact details to third-party headhunters, or train public models on user data.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onStartMatching}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold transition-colors shrink-0 shadow-xs cursor-pointer"
        >
          <span>Try RoleFit Now</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default HowItWorksView;
