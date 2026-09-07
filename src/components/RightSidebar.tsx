'use client';

import React from 'react';
import { FileText, Sparkles, CheckCircle2, Globe2 } from 'lucide-react';

interface RightSidebarProps {
  filename?: string;
  charCount?: number;
  wordCount?: number;
  onViewResume?: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  filename = 'alex-chen-ai-engineer.pdf',
  charCount = 3194,
  wordCount = 532,
  onViewResume,
}) => {
  const detectedSkills = [
    'Python',
    'Machine Learning',
    'Data Analysis',
    'SQL',
    'Deep Learning',
    'Statistics',
    'AWS',
  ];

  return (
    <aside className="space-y-4">
      {/* Card 1: Your Resume */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[14px] font-bold text-gray-950">Your Resume</h3>
          <button
            type="button"
            onClick={onViewResume}
            className="text-[12px] font-medium text-[#2563EB] hover:underline cursor-pointer"
          >
            View
          </button>
        </div>

        {/* File Snippet */}
        <div className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-100 bg-gray-50/60 mb-3.5">
          <FileText className="h-5 w-5 text-gray-600 shrink-0 stroke-[1.5]" />
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-gray-900 truncate">
              {filename}
            </p>
            <p className="text-[11px] text-gray-500">
              {charCount.toLocaleString()} characters · {wordCount} words
            </p>
          </div>
        </div>

        {/* Skills Detected */}
        <div>
          <span className="block text-[12px] font-medium text-gray-700 mb-2">
            Top skills detected
          </span>
          <div className="flex flex-wrap gap-1.5">
            {detectedSkills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-700 border border-gray-200/60"
              >
                {skill}
              </span>
            ))}
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-500 border border-gray-200/60">
              +3
            </span>
          </div>
        </div>
      </div>

      {/* Card 2: Get AI-powered insights */}
      <div className="bg-[#EFF6FF] rounded-xl border border-blue-100 p-5">
        <div className="flex items-center gap-2 mb-1.5 text-[#2563EB]">
          <Sparkles className="h-4 w-4 fill-[#2563EB]" />
          <h3 className="text-[14px] font-bold text-gray-950">
            Get AI-powered insights
          </h3>
        </div>
        <p className="text-[12px] text-gray-600 leading-relaxed mb-3.5">
          Each job includes a personalized explanation, skill gaps, and resume improvement tips.
        </p>

        {/* Checklist */}
        <ul className="space-y-2 text-[12px] text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
            <span>Why you&apos;re a good (or not so good) fit</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
            <span>Top 3 skill gaps for each role</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
            <span>Actionable resume editing suggestions</span>
          </li>
        </ul>
      </div>

      {/* Card 3: Data sources */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
        <div className="mb-3">
          <h3 className="text-[14px] font-bold text-gray-950">Data sources</h3>
          <p className="text-[11px] text-gray-500">
            Live job postings from trusted sources
          </p>
        </div>

        <div className="space-y-3">
          {/* RemoteOK */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gray-950 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
              RK
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-900 leading-snug">
                RemoteOK
              </p>
              <p className="text-[11px] text-gray-500">Remote jobs worldwide</p>
            </div>
          </div>

          {/* Arbeitnow */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#10B981] text-white font-bold text-[13px] flex items-center justify-center shrink-0">
              A
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-900 leading-snug">
                Arbeitnow
              </p>
              <p className="text-[11px] text-gray-500">Global tech jobs</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
