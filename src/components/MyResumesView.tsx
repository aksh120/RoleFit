'use client';

import React, { useState } from 'react';
import { FileText, Plus, Check, Trash2 } from 'lucide-react';
import { SAMPLE_RESUME_TEXT } from '@/lib/sample-data';

interface ResumeRecord {
  id: string;
  name: string;
  wordCount: number;
  uploadDate: string;
  lastUsed: string;
  text: string;
}

interface MyResumesViewProps {
  currentFilename: string;
  onSelectResume: (text: string, filename: string, charCount: number) => void;
}

export const MyResumesView: React.FC<MyResumesViewProps> = ({
  currentFilename,
  onSelectResume,
}) => {
  const [resumes, setResumes] = useState<ResumeRecord[]>([
    {
      id: '1',
      name: 'akshat-apoorv-resume.pdf',
      wordCount: 532,
      uploadDate: 'Today',
      lastUsed: 'Used today',
      text: SAMPLE_RESUME_TEXT,
    },
    {
      id: '2',
      name: 'akshat-fullstack-dev.docx',
      wordCount: 480,
      uploadDate: 'Yesterday',
      lastUsed: 'Yesterday',
      text: SAMPLE_RESUME_TEXT,
    },
  ]);

  const handleDelete = (id: string) => {
    setResumes(resumes.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-gray-950 dark:text-white">My Resumes</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
            Manage the resumes you use for job matching.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('To upload a new resume file, switch to Home tab and use the file uploader.')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-medium transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Upload new resume</span>
        </button>
      </div>

      {/* Resumes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resumes.map((resume) => {
          const isSelected = currentFilename === resume.name;
          return (
            <div
              key={resume.id}
              className={`p-5 rounded-xl border transition-all ${
                isSelected
                  ? 'border-[#2563EB] dark:border-blue-500 bg-[#EFF6FF]/40 dark:bg-blue-950/30 shadow-xs'
                  : 'border-gray-200 dark:border-slate-800 bg-white dark:bg-[#0C121E] hover:border-gray-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-100 dark:border-slate-700/60 shrink-0">
                    <FileText className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-gray-950 dark:text-white truncate">
                      {resume.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-slate-400">
                      <span>{resume.wordCount} words</span>
                      <span>·</span>
                      <span>{resume.lastUsed}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(resume.id)}
                  className="text-gray-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 p-1 rounded transition-colors"
                  title="Delete resume"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100 dark:border-slate-800">
                <span className="text-[11px] text-gray-400 dark:text-slate-500">
                  Uploaded {resume.uploadDate}
                </span>

                {isSelected ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] dark:text-blue-400 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50">
                    <Check className="h-3.5 w-3.5" />
                    <span>Selected for matching</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onSelectResume(resume.text, resume.name, resume.text.length)
                    }
                    className="text-xs font-medium text-gray-700 dark:text-slate-200 hover:text-gray-950 dark:hover:text-white px-3 py-1 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Use for matching
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyResumesView;
