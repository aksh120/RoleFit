'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  LogIn,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { EditProfileModal, UserProfileData } from './EditProfileModal';
import { LogoutModal } from './LogoutModal';
import type { NavTab } from './AppShell';

interface UserProfileMenuProps {
  onTabChange: (tab: NavTab) => void;
}

const DEFAULT_PROFILE: UserProfileData = {
  name: 'Akshat Apoorv',
  role: 'Candidate',
  email: 'akshat.apoorv@example.com',
  location: 'San Francisco, CA',
  seniority: 'Senior (5+ yrs)',
  bio: 'Full Stack & Generative AI engineer with focus on Next.js, vector search, and LLM systems.',
};

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ onTabChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfileData>(DEFAULT_PROFILE);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  // Load persisted profile from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('rolefit_user_profile');
      if (stored) {
        setProfile(JSON.parse(stored));
      }
      const storedLogin = localStorage.getItem('rolefit_is_logged_in');
      if (storedLogin !== null) {
        setIsLoggedIn(storedLogin === 'true');
      }
    } catch {
      // ignore
    }
  }, []);

  // Close dropdown on outside click or ESC key
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSaveProfile = (updated: UserProfileData) => {
    setProfile(updated);
    try {
      localStorage.setItem('rolefit_user_profile', JSON.stringify(updated));
    } catch {
      // ignore
    }
    showToast('Profile updated successfully');
  };

  const handleConfirmLogout = () => {
    setIsLoggedIn(false);
    try {
      localStorage.setItem('rolefit_is_logged_in', 'false');
    } catch {
      // ignore
    }
    showToast('Logged out of RoleFit');
  };

  const handleLogIn = () => {
    setIsLoggedIn(true);
    try {
      localStorage.setItem('rolefit_is_logged_in', 'true');
    } catch {
      // ignore
    }
    showToast(`Welcome back, ${profile.name}!`);
  };

  // Initials
  const initials = profile.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('') || 'U';

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      {isLoggedIn ? (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          id="user-profile-menu-trigger"
          aria-expanded={isOpen}
          aria-haspopup="true"
          className="flex items-center gap-2 p-1 -m-1 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800/80 transition-all select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 group"
          title="Account menu"
        >
          <div className="h-8 w-8 rounded-full bg-[#2563EB] dark:bg-blue-600 text-white flex items-center justify-center text-xs font-semibold shadow-xs shrink-0 group-hover:opacity-90 transition-opacity">
            {initials}
          </div>
          <div className="hidden sm:block text-left leading-tight pr-1">
            <span className="block text-xs font-semibold text-gray-900 dark:text-slate-200 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
              {profile.name}
            </span>
            <span className="block text-[11px] text-gray-400 dark:text-slate-500">
              {profile.role}
            </span>
          </div>
          <ChevronDown
            className={`h-3.5 w-3.5 text-gray-400 dark:text-slate-500 transition-transform duration-150 ${
              isOpen ? 'rotate-180 text-gray-700 dark:text-slate-300' : ''
            }`}
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleLogIn}
          id="user-profile-login-trigger"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-medium transition-colors shadow-xs"
        >
          <LogIn className="h-3.5 w-3.5" />
          <span>Sign In</span>
        </button>
      )}

      {/* Dropdown Menu */}
      {isOpen && isLoggedIn && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-[#0C121E] border border-gray-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 py-1.5 animate-scaleUp overflow-hidden">
          {/* Identity Header */}
          <div className="px-3.5 py-3 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-[#2563EB] dark:bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-gray-950 dark:text-white truncate">
                  {profile.name}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-slate-400 truncate">
                  {profile.email}
                </p>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                {profile.role}
              </span>
              <span className="text-[10px] text-gray-400 dark:text-slate-500">
                • {profile.seniority}
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="p-1 space-y-0.5">
            {/* Edit Profile */}
            <button
              type="button"
              id="menu-item-edit-profile"
              onClick={() => {
                setIsOpen(false);
                setIsEditModalOpen(true);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-700 dark:text-slate-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800/80 transition-colors text-left group"
            >
              <User className="h-4 w-4 text-gray-400 dark:text-slate-500 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors" />
              <div className="flex-1">
                <span className="font-medium">Edit Profile</span>
                <p className="text-[10px] text-gray-400 dark:text-slate-500">
                  Update candidate details & bio
                </p>
              </div>
            </button>

            {/* Settings */}
            <button
              type="button"
              id="menu-item-settings"
              onClick={() => {
                setIsOpen(false);
                onTabChange('settings');
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-700 dark:text-slate-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800/80 transition-colors text-left group"
            >
              <Settings className="h-4 w-4 text-gray-400 dark:text-slate-500 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors" />
              <div className="flex-1">
                <span className="font-medium">Settings</span>
                <p className="text-[10px] text-gray-400 dark:text-slate-500">
                  Preferences & search parameters
                </p>
              </div>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-slate-800 my-1" />

          {/* Log Out */}
          <div className="p-1">
            <button
              type="button"
              id="menu-item-logout"
              onClick={() => {
                setIsOpen(false);
                setIsLogoutModalOpen(true);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left group"
            >
              <LogOut className="h-4 w-4 text-rose-500 dark:text-rose-400 group-hover:translate-x-0.5 transition-transform" />
              <div className="flex-1">
                <span className="font-medium">Log Out</span>
                <p className="text-[10px] text-rose-400/80 dark:text-rose-400/60">
                  End current session
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Edit Profile Popup Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      {/* Log Out Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        userName={profile.name}
      />

      {/* Floating Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-950 text-white dark:bg-white dark:text-gray-950 text-xs font-medium shadow-2xl border border-gray-800 dark:border-gray-200 animate-slideUp">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;
