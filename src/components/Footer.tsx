'use client';

import React from 'react';
import {
  Github,
  CheckCircle2,
  ExternalLink,
  Shield,
  FileText,
  Search,
  Bookmark,
  Settings,
  Sparkles,
  ArrowUp,
} from 'lucide-react';
import { RoleFitLogo } from './RoleFitLogo';
import type { NavTab } from './AppShell';

interface FooterProps {
  onTabChange: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-gray-200 dark:border-slate-800/80 bg-gray-50/50 dark:bg-[#070B12] text-gray-600 dark:text-slate-400 mt-20 transition-colors duration-150">
      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Col 1: Brand & Identity (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <button
              type="button"
              onClick={() => onTabChange('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <RoleFitLogo size={30} />
              <span className="text-xl font-bold tracking-tight text-gray-950 dark:text-white font-sans group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
                RoleFit
              </span>
            </button>

            <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Semantic career discovery engine built to eliminate recruitment black boxes. Evaluates resumes against live technical job postings using high-dimensional vector embeddings, deterministic cosine similarity, and explainable skill gap diagnostics.
            </p>

            {/* System Telemetry Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-xs shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-gray-900 dark:text-slate-200 text-[11px]">
                All Systems Operational
              </span>
              <span className="text-gray-300 dark:text-slate-700">•</span>
              <span className="text-[11px] text-gray-500 dark:text-slate-400">
                2 Live API Feeds
              </span>
            </div>

            {/* GitHub & Source Action */}
            <div className="pt-2">
              <a
                href="https://github.com/aksh120/RoleFit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>github.com/aksh120/RoleFit</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Col 2: Platform & Features */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-slate-200 font-mono">
              Platform
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('home')}
                  className="hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Semantic Matcher
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('search')}
                  className="hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Job Search Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('resumes')}
                  className="hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  My Resumes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('saved')}
                  className="hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Saved Positions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('settings')}
                  className="hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Preferences & Parameters
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Engineering & Architecture */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-slate-200 font-mono">
              Architecture
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('how-it-works')}
                  className="hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('about')}
                  className="hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Technology Stack
                </button>
              </li>
              <li>
                <span className="text-gray-500 dark:text-slate-500">
                  Vector Cosine Math (0-100%)
                </span>
              </li>
              <li>
                <span className="text-gray-500 dark:text-slate-500">
                  In-Memory PDF/DOCX Parser
                </span>
              </li>
              <li>
                <span className="text-gray-500 dark:text-slate-500">
                  Vitest Suite (17 Unit Tests)
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Integrations */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-slate-200 font-mono">
              Integrations & Trust
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://remoteok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-gray-950 dark:hover:text-white transition-colors"
                >
                  <span>RemoteOK API Feed</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.arbeitnow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-gray-950 dark:hover:text-white transition-colors"
                >
                  <span>Arbeitnow API Feed</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <span className="text-gray-500 dark:text-slate-500">
                  Zero Data Retention Policy
                </span>
              </li>
              <li>
                <span className="text-gray-500 dark:text-slate-500">
                  Bengaluru & Indian Tech Hubs
                </span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTabChange('about')}
                  className="hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  About RoleFit
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Privacy Guarantee Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#0C121E] border border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">
                Candidate Privacy Guarantee
              </p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">
                Resumes are parsed strictly in-memory. No candidate resumes are written to disk or shared with external recruiters.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
              Open Source (MIT)
            </span>
          </div>
        </div>

        {/* Sub-Footer Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-slate-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-center sm:text-left">
            <span>© 2026 RoleFit. Engineered & Designed by Akshat Apoorv.</span>
            <span className="hidden sm:inline">•</span>
            <span>Built for candidates & software engineers.</span>
          </div>

          {/* Right Action / Scroll to Top */}
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-gray-400 dark:text-slate-500">
              Next.js 14 • TypeScript • Tailwind CSS
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors shadow-2xs"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
