export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  tags: string[];
  description: string;
  url: string;
  source: 'RemoteOK' | 'Arbeitnow' | string;
  remote?: boolean;
  salary?: string;
}

export interface AIInsights {
  match_explanation: string;
  skill_gaps: string[];
  resume_tips: string[];
}

export interface MatchResult extends Job {
  matchScore: number; // 0.0 to 100.0
  matchedSkills?: string[];
}

export interface EnrichedJob extends MatchResult {
  insights?: AIInsights;
  isAiLoading?: boolean;
}

export type PipelineStage =
  | 'idle'
  | 'parsing'
  | 'fetching_jobs'
  | 'ranking'
  | 'generating_insights'
  | 'completed'
  | 'error';

export interface PipelineStep {
  id: PipelineStage;
  label: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
}

export interface ParseResumeResponse {
  success: boolean;
  filename: string;
  charCount: number;
  text: string;
  error?: string;
}

export interface JobsResponse {
  success: boolean;
  totalJobs: number;
  jobs: Job[];
  sources: {
    remoteOk: { count: number; error?: string };
    arbeitnow: { count: number; error?: string };
  };
}

export interface MatchResponse {
  success: boolean;
  rankedJobs: MatchResult[];
  analyzedJobsCount: number;
  error?: string;
}

export interface InsightsResponse {
  success: boolean;
  jobId: string;
  insights: AIInsights;
  isDegraded?: boolean;
  error?: string;
}
