'use client';

import React from 'react';
import { Home, FileText, Search, Bookmark, Settings, HelpCircle, Info } from 'lucide-react';

export type NavTab = 'home' | 'resumes' | 'search' | 'saved' | 'settings';

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
  const navItems = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'resumes' as NavTab, label: 'My Resumes', icon: FileText },
    { id: 'search' as NavTab, label: 'Job Search', icon: Search },
    { id: 'saved' as NavTab, label: 'Saved Jobs', icon: Bookmark, badge: savedJobsCount > 0 ? savedJobsCount : undefined },
    { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-white text-gray-900">
      {/* Fixed Left Sidebar (212px) */}
      <aside className="w-[212px] shrink-0 border-r border-gray-200 bg-white flex flex-col justify-between h-screen sticky top-0 px-4 py-5 z-40 select-none">
        <div>
          {/* Top Brand Logo */}
          <div className="flex items-center gap-2 px-2 mb-6">
            <span className="text-[19px] font-bold tracking-tight text-gray-950 font-sans">
              RoleFit
            </span>
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">
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
                      ? 'bg-[#EFF6FF] text-[#2563EB]'
                      : 'text-gray-700 hover:text-gray-950 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-[#2563EB]' : 'text-gray-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-blue-100 text-[#2563EB]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Promotional / Editorial Card */}
        <div className="p-3.5 rounded-xl border border-blue-100/80 bg-gradient-to-br from-blue-50/70 via-blue-50/40 to-white relative overflow-hidden">
          <p className="text-[13px] font-semibold text-gray-900 leading-snug">
            Better opportunities start with a better resume.
          </p>
          <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
            AI-powered insights. Real job opportunities.
          </p>
          {/* Subtle soft decorative wave */}
          <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-blue-200/30 blur-sm pointer-events-none" />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Top Minimal Navigation Bar */}
        <header className="h-14 border-b border-gray-100 px-6 sm:px-10 flex items-center justify-end gap-5 text-[13px] text-gray-600">
          <button
            onClick={() => onTabChange('settings')}
            className="hover:text-gray-900 transition-colors"
          >
            How it works
          </button>
          <button
            onClick={() => onTabChange('settings')}
            className="hover:text-gray-900 transition-colors"
          >
            About
          </button>
          <div className="h-3.5 w-px bg-gray-200" />
          {/* User Avatar Circle */}
          <div className="h-8 w-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700 select-none">
            N
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
