'use client';

import React, { useRef, useState } from 'react';
import { FileText, CheckCircle2, X, UploadCloud } from 'lucide-react';
import { SAMPLE_RESUME_TEXT } from '@/lib/sample-data';

interface ResumeUploaderProps {
  resumeText: string;
  filename: string;
  charCount: number;
  wordCount?: number;
  isLoading: boolean;
  onTextLoaded: (text: string, filename: string, charCount: number) => void;
  onClear: () => void;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  resumeText,
  filename,
  charCount,
  isLoading,
  onTextLoaded,
  onClear,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const words = resumeText ? resumeText.trim().split(/\s+/).length : 532;

  const handleFileUpload = async (file: File) => {
    setError(null);
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'docx', 'doc', 'txt'].includes(ext || '')) {
      setError('Please upload a PDF or DOCX document.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to extract text from file.');
      }

      onTextLoaded(data.text, data.filename, data.charCount);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChooseFileClick = () => {
    // If user clicks choose file and doesn't select, or to support instant demo test:
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between h-full shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
      <div>
        {/* Card Header */}
        <div className="mb-4">
          <h2 className="text-[16px] font-bold text-gray-950">
            Upload your resume
          </h2>
          <p className="text-[12px] text-gray-500 mt-0.5">
            PDF or DOCX (max 10MB)
          </p>
        </div>

        {error && (
          <div className="mb-3 p-2.5 rounded-lg bg-red-50 text-red-700 text-xs border border-red-100 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-500">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Upload Drop Zone Box */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50/50'
              : 'border-gray-200 bg-gray-50/40 hover:bg-gray-50/80'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,.txt"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />

          <div className="flex flex-col items-center justify-center gap-2">
            <FileText className="h-7 w-7 text-gray-700 stroke-[1.75]" />
            <span className="text-[13px] font-semibold text-gray-900">
              Upload your resume
            </span>
            <p className="text-[11px] text-gray-400 -mt-1">
              PDF or DOCX (max 10MB)
            </p>

            <button
              type="button"
              onClick={handleChooseFileClick}
              disabled={isLoading}
              className="mt-1 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[13px] font-medium transition-colors cursor-pointer shadow-sm"
            >
              <UploadCloud className="h-4 w-4" />
              <span>Choose file</span>
            </button>
          </div>
        </div>
      </div>

      {/* Uploaded File Pill Card (Shown when resume is present or default sample) */}
      {resumeText ? (
        <div className="mt-4 flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="h-5 w-5 text-gray-600 shrink-0 stroke-[1.5]" />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 truncate">
                {filename || 'alex-chen-ai-engineer.pdf'}
              </p>
              <p className="text-[11px] text-gray-500">
                {(charCount || 3194).toLocaleString()} characters · {words} words
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 fill-emerald-50" />
            <button
              type="button"
              onClick={onClear}
              className="text-gray-400 hover:text-gray-600 p-0.5 rounded transition-colors"
              title="Remove file"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50">
          <span className="text-[12px] text-gray-400">No resume chosen yet</span>
          <button
            type="button"
            onClick={() => onTextLoaded(SAMPLE_RESUME_TEXT, 'alex-chen-ai-engineer.pdf', SAMPLE_RESUME_TEXT.length)}
            className="text-[12px] font-medium text-[#2563EB] hover:underline"
          >
            Load sample resume
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
