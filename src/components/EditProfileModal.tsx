'use client';

import React, { useState, useEffect } from 'react';
import { X, User, Mail, MapPin, Briefcase, Check, Sparkles } from 'lucide-react';

export interface UserProfileData {
  name: string;
  role: string;
  email: string;
  location: string;
  seniority: string;
  bio: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfileData;
  onSave: (updated: UserProfileData) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState<UserProfileData>(profile);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFormData(profile);
    setIsSaved(false);
  }, [profile, isOpen]);

  if (!isOpen) return null;

  // Calculate initials from name
  const initials = formData.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('') || 'U';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-xs animate-fadeIn">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0C121E] border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
              <User className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-950 dark:text-white">
                Edit Profile
              </h2>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Manage your candidate identity and search preferences.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Avatar Preview Row */}
          <div className="flex items-center gap-4 p-3.5 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800">
            <div className="h-12 w-12 rounded-full bg-[#2563EB] dark:bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
              {initials}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">
                Profile Avatar Preview
              </p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">
                Initials update dynamically based on your full name.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="h-3.5 w-3.5 absolute left-3 top-2.5 text-gray-400 dark:text-slate-500" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Akshat Apoorv"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:border-[#2563EB] dark:focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Candidate Role / Title */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">
                Role / Title
              </label>
              <div className="relative">
                <Briefcase className="h-3.5 w-3.5 absolute left-3 top-2.5 text-gray-400 dark:text-slate-500" />
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Candidate or AI Engineer"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:border-[#2563EB] dark:focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="h-3.5 w-3.5 absolute left-3 top-2.5 text-gray-400 dark:text-slate-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. akshat@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:border-[#2563EB] dark:focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">
                Target Location
              </label>
              <div className="relative">
                <MapPin className="h-3.5 w-3.5 absolute left-3 top-2.5 text-gray-400 dark:text-slate-500" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Bengaluru, India / Remote"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:border-[#2563EB] dark:focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Seniority Level */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">
              Experience Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Entry / Junior', 'Mid-Level', 'Senior (5+ yrs)'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({ ...formData, seniority: level })}
                  className={`py-1.5 px-3 text-xs font-medium rounded-lg border transition-colors ${
                    formData.seniority === level
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-[#2563EB] dark:border-blue-500 text-[#2563EB] dark:text-blue-400'
                      : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Short Bio */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">
              Career Headline / Bio
            </label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Brief summary of your background and technical interests..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:border-[#2563EB] dark:focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaved}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg text-white transition-colors shadow-xs ${
                isSaved
                  ? 'bg-emerald-600 hover:bg-emerald-600'
                  : 'bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Profile Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
