'use client';

import React from 'react';
import { X, LogOut, ShieldAlert } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-xs animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Dialog */}
      <div className="relative w-full max-w-sm bg-white dark:bg-[#0C121E] border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 animate-scaleUp">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="h-10 w-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/40 flex items-center justify-center">
              <LogOut className="h-5 w-5" />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-base font-bold text-gray-950 dark:text-white">
              Log out of RoleFit?
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Signed in as <span className="font-semibold text-gray-900 dark:text-slate-200">{userName}</span>. Your saved jobs and candidate preferences will remain preserved on this device.
            </p>
          </div>

          <div className="flex items-center gap-2.5 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-xs font-medium rounded-lg border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              Stay Logged In
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 py-2 text-xs font-medium rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-xs"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
