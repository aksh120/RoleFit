'use client';

import React from 'react';
import { Bookmark } from 'lucide-react';
import JobCard from './JobCard';
import type { EnrichedJob } from '@/lib/types';

interface SavedJobsViewProps {
  savedJobs: EnrichedJob[];
  onToggleSave: (job: EnrichedJob) => void;
  onViewJob: (job: EnrichedJob) => void;
}

export const SavedJobsView: React.FC<SavedJobsViewProps> = ({
  savedJobs,
  onToggleSave,
  onViewJob,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-950">Saved Jobs</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Keep track of opportunities you want to revisit.
        </p>
      </div>

      {savedJobs.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center max-w-lg mx-auto my-12">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
            <Bookmark className="h-6 w-6 stroke-[1.5]" />
          </div>
          <h3 className="text-base font-bold text-gray-900">No saved jobs yet</h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Bookmark opportunities from your matches to keep track of them here.
          </p>
        </div>
      ) : (
        /* List */
        <div className="space-y-4">
          {savedJobs.map((job, idx) => (
            <JobCard
              key={job.id}
              job={job}
              rank={idx + 1}
              isSaved={true}
              onToggleSave={onToggleSave}
              onViewJob={onViewJob}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobsView;
