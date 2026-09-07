'use client';

import React from 'react';
import { Target, Lightbulb, Code2, Heart, ArrowRight, Github, ExternalLink } from 'lucide-react';

interface AboutViewProps {
  onStartMatching: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onStartMatching }) => {
  const principles = [
    {
      title: 'Editorial & Minimalist',
      desc: 'No neon gradients, bloated dashboards, or deceptive animations. RoleFit is designed with the calm, high-density utility of Linear, Notion, and Raycast.',
    },
    {
      title: 'Explainable AI Over Black Boxes',
      desc: 'Most platforms give you an opaque score. RoleFit explains exactly why you align with a position, identifies your specific skill gaps, and recommends concrete adjustments.',
    },
    {
      title: 'Semantic Vector Proximity',
      desc: 'Outdated ATS systems discard qualified talent because of keyword phrasing discrepancies. RoleFit understands technical context and synonymous skill clusters.',
    },
    {
      title: 'Speed & Graceful Degradation',
      desc: 'Powered by Groq Cloud for sub-400ms inference. If external reasoning keys are unavailable, mathematical vector ranking continues to operate with zero interruption.',
    },
  ];

  const techStack = [
    { name: 'Next.js 14', category: 'Application Framework', detail: 'App Router, Server Actions, TypeScript' },
    { name: 'Groq Cloud', category: 'Inference Engine', detail: 'Llama 3.3 70B Versatile, LPUs' },
    { name: 'Vector Cosine Math', category: 'Ranking Pipeline', detail: 'Normalized dot-product similarity' },
    { name: 'Native Parsers', category: 'Document Ingestion', detail: 'pdf-parse & mammoth in-memory parsing' },
    { name: 'Open APIs', category: 'Live Job Boards', detail: 'RemoteOK & Arbeitnow continuous feeds' },
    { name: 'Tailwind CSS', category: 'Design System', detail: 'Dual-Theme (Editorial Light & Obsidian Dark)' },
  ];

  return (
    <div className="space-y-10 max-w-4xl pb-12 animate-fadeIn">
      {/* Top Header */}
      <div className="border-b border-gray-100 dark:border-slate-800 pb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB] dark:text-blue-400 mb-2">
          THE PLATFORM
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight leading-tight">
          About RoleFit
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
          A career discovery engine built to eliminate recruitment black boxes with transparent semantic matching and actionable candidate guidance.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white dark:bg-[#0C121E] rounded-xl border border-gray-200 dark:border-slate-800/80 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2.5 text-[#2563EB] dark:text-blue-400 mb-3">
          <Target className="h-5 w-5" />
          <h2 className="text-sm font-bold uppercase tracking-wider font-mono">
            Our Purpose
          </h2>
        </div>
        <h3 className="text-xl font-bold text-gray-950 dark:text-white leading-snug">
          Job searching shouldn&apos;t feel like shouting into a void.
        </h3>
        <p className="text-sm text-gray-600 dark:text-slate-300 mt-3 leading-relaxed">
          Every day, millions of qualified candidates submit resumes into algorithmic black boxes, only to receive generic rejections from automated filters that fail to understand synonymous technical terms.
        </p>
        <p className="text-sm text-gray-600 dark:text-slate-300 mt-2.5 leading-relaxed">
          RoleFit bridges that divide. By combining high-dimensional vector similarity with high-speed Llama 3.3 70B reasoning, we give candidates clear, honest insight into where their background shines, what requirements they need to address, and how to tailor their application for maximum impact.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-4 w-4 text-gray-700 dark:text-slate-300" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-slate-100 font-mono">
            Core Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {principles.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0C121E] rounded-xl border border-gray-200 dark:border-slate-800/80 p-5 shadow-xs"
            >
              <h3 className="text-sm font-bold text-gray-950 dark:text-white mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture & Tech Stack */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="h-4 w-4 text-gray-700 dark:text-slate-300" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-slate-100 font-mono">
            Technology Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0C121E] rounded-xl border border-gray-200 dark:border-slate-800/80 p-4"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#2563EB] dark:text-blue-400 font-semibold">
                {tech.category}
              </span>
              <p className="text-sm font-bold text-gray-950 dark:text-white mt-0.5">
                {tech.name}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-1">
                {tech.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Creator & Version Info Card */}
      <div className="p-6 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-950 dark:text-white">RoleFit</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-[#2563EB] dark:text-blue-300">
              Production Release
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            Engineered & Designed by <span className="font-semibold text-gray-800 dark:text-slate-200">Akshat Apoorv</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onStartMatching}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
        >
          <span>Explore Job Matches</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default AboutView;
