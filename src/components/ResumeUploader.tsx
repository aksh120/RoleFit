'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, Check, X, AlertCircle, Eye, Edit3 } from 'lucide-react';
import { SAMPLE_RESUME_TEXT } from '@/lib/sample-data';

interface ResumeUploaderProps {
  resumeText: string;
  filename: string;
  charCount: number;
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
  const [activeTab, setActiveTab] = useState<'upload' | 'sample' | 'raw'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawInput, setRawInput] = useState(resumeText);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setError(null);
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'docx', 'doc', 'txt', 'md'].includes(ext || '')) {
      setError('Supported formats: .pdf, .docx, .txt');
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
        throw new Error(data.error || 'Failed to parse resume text.');
      }

      onTextLoaded(data.text, data.filename, data.charCount);
      setRawInput(data.text);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error extracting resume text.');
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

  const handleLoadSample = () => {
    setError(null);
    onTextLoaded(SAMPLE_RESUME_TEXT, 'alex-chen-ai-engineer.pdf', SAMPLE_RESUME_TEXT.length);
    setRawInput(SAMPLE_RESUME_TEXT);
  };

  const handleRawSubmit = () => {
    if (rawInput.trim().length < 50) {
      setError('Please provide at least 50 characters of resume text.');
      return;
    }
    setError(null);
    onTextLoaded(rawInput.trim(), 'manual-entry.txt', rawInput.trim().length);
  };

  return (
    <div className="rounded-xl border border-white/[0.08] bg-zinc-950/60 p-5">
      {/* Header & Mode Switcher */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-zinc-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 font-mono">
            Candidate Profile
          </span>
        </div>

        {/* Minimal Tab Switcher */}
        <div className="flex items-center p-0.5 rounded-lg bg-zinc-900 border border-white/[0.06] text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'upload'
                ? 'bg-zinc-800 text-zinc-100 font-medium'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            File
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('sample');
              handleLoadSample();
            }}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'sample'
                ? 'bg-zinc-800 text-zinc-100 font-medium'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Sample
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('raw')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'raw'
                ? 'bg-zinc-800 text-zinc-100 font-medium'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Raw
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-3 p-3 rounded-lg bg-red-950/30 border border-red-900/40 text-xs text-red-300 flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-200">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Mode Views */}
      <div className="mt-4">
        {activeTab === 'upload' && !resumeText && (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              dragActive
                ? 'border-zinc-400 bg-zinc-900/60'
                : 'border-white/[0.12] hover:border-white/[0.24] bg-zinc-900/20 hover:bg-zinc-900/40'
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
            <Upload className="h-5 w-5 text-zinc-400 mx-auto mb-2" />
            <p className="text-xs font-medium text-zinc-200">
              Click to browse or drop PDF / DOCX
            </p>
            <p className="text-[11px] text-zinc-500 mt-1 font-mono">
              Max 10MB • Text selectable files only
            </p>
          </div>
        )}

        {activeTab === 'raw' && (
          <div className="space-y-2">
            <textarea
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="Paste candidate resume text or markdown here..."
              rows={6}
              className="w-full p-3 rounded-lg bg-zinc-900/80 border border-white/[0.08] text-xs text-zinc-200 font-mono placeholder-zinc-600 focus:outline-none focus:border-zinc-500 leading-relaxed resize-none"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleRawSubmit}
                className="px-3 py-1.5 rounded-md text-xs font-medium bg-zinc-100 text-zinc-900 hover:bg-white transition-colors"
              >
                Apply Text
              </button>
            </div>
          </div>
        )}

        {/* Loaded Document State */}
        {resumeText && activeTab !== 'raw' && (
          <div className="p-3.5 rounded-lg bg-zinc-900/40 border border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 rounded bg-zinc-800 border border-white/[0.08] flex items-center justify-center text-zinc-300 shrink-0">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-zinc-200 truncate">{filename}</p>
                  <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
                    {charCount.toLocaleString()} chars • ~{Math.round(charCount / 6)} words
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('raw')}
                  className="p-1.5 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                  title="View / Edit Text"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={onClear}
                  className="p-1.5 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                  title="Clear resume"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;
