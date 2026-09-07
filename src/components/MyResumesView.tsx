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
      name: 'alex-chen-ai-engineer.pdf',
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
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-950">My Resumes</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage the resumes you use for job matching.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('To upload a new resume file, switch to Home tab and use the file uploader.')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-colors cursor-pointer shadow-xs"
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
                  ? 'border-[#2563EB] bg-[#EFF6FF]/40 shadow-xs'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-gray-700 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 truncate max-w-xs">
                      {resume.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {resume.wordCount} words · {resume.lastUsed}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(resume.id)}
                  className="text-gray-400 hover:text-red-500 p-1"
                  title="Delete resume"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  Uploaded: {resume.uploadDate}
                </span>

                <button
                  type="button"
                  onClick={() => onSelectResume(resume.text, resume.name, resume.text.length)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isSelected
                      ? 'bg-blue-100 text-[#2563EB] font-semibold flex items-center gap-1'
                      : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Active for matching</span>
                    </>
                  ) : (
                    <span>Use for matching</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyResumesView;
