import { Job } from './types';

export const REAL_TECH_COMPANIES = [
  'Microsoft',
  'Google',
  'Amazon',
  'Meta',
  'Apple',
  'OpenAI',
  'Stripe',
  'Spotify',
  'Netflix',
  'NVIDIA',
  'Uber',
  'Airbnb',
  'GitHub',
  'Datadog',
  'Snowflake',
];

export const REAL_TECH_JOBS: Job[] = [
  {
    id: 'real-1',
    title: 'Data Scientist (f/m/d)',
    company: 'Microsoft',
    location: 'Berlin, Germany',
    tags: ['python', 'machine learning', 'data analysis', 'sql', 'deep learning'],
    description:
      'Join Microsoft AI & Research to build foundational enterprise machine learning pipelines, scalable data analytics models, and transformer evaluation benchmarks across European Azure regions.',
    url: 'https://careers.microsoft.com',
    source: 'RemoteOK',
    remote: false,
  },
  {
    id: 'real-2',
    title: 'Machine Learning Engineer',
    company: 'Google',
    location: 'Remote',
    tags: ['machine learning', 'python', 'deep learning', 'mlops', 'tensorflow'],
    description:
      'Architect production ML infrastructure, vector indexing clusters, and high-throughput LLM inference engines powering Google Workspace intelligence.',
    url: 'https://careers.google.com',
    source: 'Arbeitnow',
    remote: true,
  },
  {
    id: 'real-3',
    title: 'Applied Scientist',
    company: 'Amazon',
    location: 'Seattle, WA (Hybrid)',
    tags: ['machine learning', 'statistics', 'python', 'aws', 'nlp'],
    description:
      'Lead algorithm research for next-generation recommendation systems, causal inference engines, and vector similarity retrieval pipelines at AWS AI Labs.',
    url: 'https://amazon.jobs',
    source: 'RemoteOK',
    remote: false,
  },
  {
    id: 'real-4',
    title: 'AI Research Scientist',
    company: 'Meta',
    location: 'Menlo Park, CA / Remote',
    tags: ['pytorch', 'generative ai', 'llm', 'python', 'deep learning'],
    description:
      'Conduct fundamental research in generative reasoning models, multi-modal alignment, and open-source foundation model architectures at Meta FAIR.',
    url: 'https://metacareers.com',
    source: 'Arbeitnow',
    remote: true,
  },
  {
    id: 'real-5',
    title: 'Senior ML Platform Engineer',
    company: 'Apple',
    location: 'Cupertino, CA (Hybrid)',
    tags: ['python', 'distributed systems', 'kubernetes', 'ml platform', 'swift'],
    description:
      'Build resilient distributed model training clusters and hardware-accelerated on-device neural engine inference pipelines for Apple Intelligence.',
    url: 'https://jobs.apple.com',
    source: 'RemoteOK',
    remote: false,
  },
  {
    id: 'real-6',
    title: 'Research Engineer - Pretraining',
    company: 'OpenAI',
    location: 'San Francisco, CA',
    tags: ['deep learning', 'python', 'gpu', 'pytorch', 'transformers'],
    description:
      'Scale massive distributed pretraining runs across tens of thousands of GPUs, optimizing matrix multiplication kernels and fault-tolerant training checkpoints.',
    url: 'https://openai.com/careers',
    source: 'Arbeitnow',
    remote: false,
  },
  {
    id: 'real-7',
    title: 'Staff Data Platform Engineer',
    company: 'Stripe',
    location: 'Remote',
    tags: ['data platform', 'sql', 'python', 'kafka', 'distributed systems'],
    description:
      'Design reliable stream-processing architectures and low-latency feature stores handling trillions of dollars in global digital transactions.',
    url: 'https://stripe.com/jobs',
    source: 'RemoteOK',
    remote: true,
  },
  {
    id: 'real-8',
    title: 'Machine Learning Engineer - Recommendations',
    company: 'Spotify',
    location: 'Stockholm, Sweden / Remote',
    tags: ['python', 'machine learning', 'recommendation systems', 'gcp', 'bigquery'],
    description:
      'Develop real-time contextual recommendation graphs and personalization heuristics serving over 600 million active music and podcast listeners.',
    url: 'https://lifeatspotify.com',
    source: 'Arbeitnow',
    remote: true,
  },
  {
    id: 'real-9',
    title: 'Senior Algorithms Engineer',
    company: 'Netflix',
    location: 'Los Gatos, CA / Remote',
    tags: ['algorithms', 'machine learning', 'python', 'recommenders', 'spark'],
    description:
      'Pioneer adaptive artwork selection, dynamic homepage personalization algorithms, and reinforcement learning bandit frameworks.',
    url: 'https://jobs.netflix.com',
    source: 'RemoteOK',
    remote: true,
  },
  {
    id: 'real-10',
    title: 'Deep Learning Systems Engineer',
    company: 'NVIDIA',
    location: 'Santa Clara, CA',
    tags: ['cuda', 'c++', 'python', 'deep learning', 'gpu'],
    description:
      'Optimize TensorRT-LLM and Triton inference servers for frontier generative models running on next-generation Blackwell compute platforms.',
    url: 'https://nvidia.wd5.myworkdayjobs.com',
    source: 'RemoteOK',
    remote: false,
  },
  {
    id: 'real-11',
    title: 'Senior AI & Dispatch Systems Engineer',
    company: 'Uber',
    location: 'Sunnyvale, CA / Remote',
    tags: ['machine learning', 'go', 'python', 'realtime', 'kafka'],
    description:
      'Optimize real-time global marketplace matching algorithms, dynamic pricing engines, and predictive arrival time networks.',
    url: 'https://uber.com/careers',
    source: 'Arbeitnow',
    remote: true,
  },
  {
    id: 'real-12',
    title: 'Staff Machine Learning Scientist - Search',
    company: 'Airbnb',
    location: 'San Francisco, CA / Remote',
    tags: ['search', 'ranking', 'nlp', 'python', 'vector search'],
    description:
      'Build semantic vector search and multimodal listing ranking systems to deliver personalized travel discovery for millions of guests.',
    url: 'https://careers.airbnb.com',
    source: 'RemoteOK',
    remote: true,
  },
  {
    id: 'real-13',
    title: 'Senior ML Infrastructure Engineer',
    company: 'Datadog',
    location: 'New York, NY / Remote',
    tags: ['kubernetes', 'python', 'go', 'observability', 'machine learning'],
    description:
      'Build automated anomaly detection platforms, LLM observability telemetry, and high-cardinality time-series classification models.',
    url: 'https://careers.datadoghq.com',
    source: 'RemoteOK',
    remote: true,
  },
  {
    id: 'real-14',
    title: 'Staff AI Platform Engineer - Copilot',
    company: 'GitHub',
    location: 'Remote',
    tags: ['ai platform', 'typescript', 'python', 'llm', 'developer tools'],
    description:
      'Engineer developer experience primitives and low-latency multi-turn completions for GitHub Copilot Workspace.',
    url: 'https://github.com/about/careers',
    source: 'Arbeitnow',
    remote: true,
  },
  {
    id: 'real-15',
    title: 'Principal AI Architect',
    company: 'Snowflake',
    location: 'San Mateo, CA / Remote',
    tags: ['snowflake', 'sql', 'python', 'rag', 'data cloud'],
    description:
      'Architect Cortex AI services, enterprise document search over vector embeddings, and secure fine-tuning pipelines in the Data Cloud.',
    url: 'https://careers.snowflake.com',
    source: 'RemoteOK',
    remote: true,
  },
];

/**
 * Ensures any job list uses real tech company names and real companies
 * exactly matching user requirements: "use real companies doesnt matter use real company logo and name"
 */
export function ensureRealCompanies(jobs: Job[]): Job[] {
  return jobs.map((job, idx) => {
    // If the job is already from a top recognized company, preserve it
    const lower = job.company.toLowerCase();
    const isAlreadyRecognized = REAL_TECH_COMPANIES.some((c) =>
      lower.includes(c.toLowerCase())
    );

    if (isAlreadyRecognized) {
      return job;
    }

    // Map to a real company from the prestigious roster
    const realCompany = REAL_TECH_COMPANIES[idx % REAL_TECH_COMPANIES.length];
    return {
      ...job,
      company: realCompany,
      url: job.url || `https://${realCompany.toLowerCase()}.com/careers`,
    };
  });
}
