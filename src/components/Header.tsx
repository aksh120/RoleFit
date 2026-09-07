'use client';

import React from 'react';
import { Github, Circle } from 'lucide-react';
import { RoleFitLogo } from './RoleFitLogo';

interface HeaderProps {
  poolCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ poolCount = 0 }) => {
  return (
    <header className="w-full border-b border-white/[0.08] bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand & Version */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <RoleFitLogo size={22} />
            <span className="text-sm font-semibold tracking-tight text-zinc-100">
              RoleFit
            </span>
          </div>
          <span className="hidden sm:inline-block text-xs text-zinc-500 font-mono">
            /
          </span>
          <span className="hidden sm:inline-block text-xs text-zinc-400">
            Semantic Resume-to-Job Matching Engine
          </span>
        </div>

        {/* Telemetry & Actions */}
        <div className="flex items-center gap-3 text-xs font-mono">
          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900/80 border border-white/[0.08] text-zinc-400">
            <Circle className="h-2 w-2 fill-emerald-500 text-emerald-500 animate-pulse" />
            <span>{poolCount > 0 ? `${poolCount} postings live` : 'APIs connected'}</span>
          </div>

          {/* Model Tag */}
          <div className="hidden md:flex items-center px-2.5 py-1 rounded-md bg-zinc-900/80 border border-white/[0.08] text-zinc-400">
            <span>ai-ranked</span>
          </div>

          {/* GitHub Source */}
          <a
            href="https://github.com/aksh120/RoleFit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-white/[0.08] transition-colors"
            title="View GitHub Repository"
          >
            <Github className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Source</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
