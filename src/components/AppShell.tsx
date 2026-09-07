'use client';

import React from 'react';
import { Home, FileText, Search, Bookmark, Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export type NavTab = 'home' | 'resumes' | 'search' | 'saved' | 'settings' | 'how-it-works' | 'about';

interface AppShellProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  savedJobsCount?: number;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentTab,
  onTabChange,
  savedJobsCount = 0,
  children,
}) => {
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'resumes' as NavTab, label: 'My Resumes', icon: FileText },
    { id: 'search' as NavTab, label: 'Job Search', icon: Search },
    { id: 'saved' as NavTab, label: 'Saved Jobs', icon: Bookmark, badge: savedJobsCount > 0 ? savedJobsCount : undefined },
    { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#090D16] text-gray-900 dark:text-slate-100 transition-colors duration-150">
      {/* Fixed Left Sidebar (212px) */}
      <aside className="w-[212px] shrink-0 border-r border-gray-200 dark:border-slate-800/80 bg-white dark:bg-[#0C121E] flex flex-col justify-between h-screen sticky top-0 px-4 py-5 z-40 select-none transition-colors duration-150">
        <div>
          {/* Top Brand Logo */}
          <div className="flex items-center gap-2 px-2 mb-6">
            <button
              type="button"
              onClick={() => onTabChange('home')}
              className="text-[19px] font-bold tracking-tight text-gray-950 dark:text-white font-sans hover:opacity-85 transition-opacity"
            >
              RoleFit
            </button>
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700">
              v1.0
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EFF6FF] dark:bg-blue-950/50 text-[#2563EB] dark:text-blue-400 font-semibold'
                      : 'text-gray-700 dark:text-slate-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-[#2563EB] dark:text-blue-400' : 'text-gray-500 dark:text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[#2563EB] dark:text-blue-300">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Promotional / Editorial Card */}
        <div className="p-3.5 rounded-xl border border-blue-100/80 dark:border-blue-900/40 bg-gradient-to-br from-blue-50/70 dark:from-blue-950/30 via-blue-50/40 dark:via-slate-900/60 to-white dark:to-[#0C121E] relative overflow-hidden transition-colors">
          <p className="text-[13px] font-semibold text-gray-900 dark:text-slate-100 leading-snug">
            Better opportunities start with a better resume.
          </p>
          <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-2 leading-relaxed">
            AI-powered insights. Real job opportunities.
          </p>
          {/* Subtle soft decorative wave */}
          <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-blue-200/30 dark:bg-blue-500/10 blur-sm pointer-events-none" />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#090D16] transition-colors duration-150">
        {/* Top Minimal Navigation Bar */}
        <header className="h-14 border-b border-gray-100 dark:border-slate-800/80 px-6 sm:px-10 flex items-center justify-end gap-4 text-[13px] text-gray-600 dark:text-slate-300">
          <button
            type="button"
            onClick={() => onTabChange('how-it-works')}
            className={`transition-colors cursor-pointer ${
              currentTab === 'how-it-works'
                ? 'text-[#2563EB] dark:text-blue-400 font-semibold'
                : 'hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            How it works
          </button>
          <button
            type="button"
            onClick={() => onTabChange('about')}
            className={`transition-colors cursor-pointer ${
              currentTab === 'about'
                ? 'text-[#2563EB] dark:text-blue-400 font-semibold'
                : 'hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            About
          </button>
          
          <div className="h-3.5 w-px bg-gray-200 dark:bg-slate-800" />

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            id="theme-toggle-btn"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-1.5 rounded-lg border border-gray-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors shadow-2xs"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-gray-600" />
            )}
          </button>

          {/* User Profile Container */}
          <div className="flex items-center gap-2.5 pl-1 select-none">
            <div className="h-8 w-8 rounded-full bg-[#2563EB] dark:bg-blue-600 text-white flex items-center justify-center text-xs font-semibold shadow-xs">
              AA
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <span className="block text-xs font-semibold text-gray-900 dark:text-slate-200">
                Akshat Apoorv
              </span>
              <span className="block text-[11px] text-gray-400 dark:text-slate-500">
                Candidate
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 px-6 sm:px-10 py-7 max-w-[1240px] w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppShell;
