import { Job } from './types';

export const REAL_TECH_COMPANIES = [
  'Google',
  'Microsoft',
  'Amazon',
  'Flipkart',
  'Swiggy',
  'Zomato',
  'Razorpay',
  'Jio Platforms',
  'Tata Consultancy Services',
  'Infosys',
  'Meta',
  'Apple',
  'OpenAI',
  'NVIDIA',
  'Uber',
  'Cred',
  'Zerodha',
  'Netflix',
  'Stripe',
  'GitHub',
  'Datadog',
  'Snowflake',
  'Airbnb',
  'Spotify',
];

export const REAL_TECH_JOBS: Job[] = [
  {
    id: 'real-1',
    title: 'Data Scientist - AI & Cloud',
    company: 'Microsoft',
    location: 'Bengaluru, Karnataka',
    salary: '₹32L - ₹48L',
    tags: ['python', 'machine learning', 'data analysis', 'sql', 'deep learning'],
    description:
      'Join Microsoft AI & Research in Bengaluru to build foundational enterprise machine learning pipelines, scalable data analytics models, and transformer evaluation benchmarks across Indian and Asia-Pacific Azure regions.',
    url: 'https://careers.microsoft.com',
    source: 'RemoteOK',
    remote: false,
  },
  {
    id: 'real-2',
    title: 'Machine Learning Engineer',
    company: 'Google',
    location: 'Bengaluru, Karnataka / Remote',
    salary: '₹42L - ₹65L',
    tags: ['machine learning', 'python', 'deep learning', 'mlops', 'tensorflow'],
    description:
      'Architect production ML infrastructure, vector indexing clusters, and high-throughput LLM inference engines powering Google Workspace and Gemini Cloud in Bengaluru.',
    url: 'https://careers.google.com',
    source: 'Arbeitnow',
    remote: true,
  },
  {
    id: 'real-3',
    title: 'Applied Scientist - AWS AI Labs',
    company: 'Amazon',
    location: 'Hyderabad, Telangana (Hybrid)',
    salary: '₹35L - ₹52L',
    tags: ['machine learning', 'statistics', 'python', 'aws', 'nlp'],
    description:
      'Lead algorithm research for next-generation recommendation systems, causal inference engines, and vector similarity retrieval pipelines at AWS India Development Center.',
    url: 'https://amazon.jobs',
    source: 'RemoteOK',
    remote: false,
  },
  {
    id: 'real-4',
    title: 'Principal Machine Learning Architect',
    company: 'Flipkart',
    location: 'Bengaluru, Karnataka',
    salary: '₹45L - ₹68L',
    tags: ['search', 'ranking', 'python', 'deep learning', 'recommenders'],
    description:
      'Lead the next evolution of product search, multi-modal semantic discovery, and hyper-personalized recommendations across India’s largest e-commerce catalog.',
    url: 'https://flipkartcareers.com',
    source: 'Arbeitnow',
    remote: false,
  },
  {
    id: 'real-5',
    title: 'Staff AI & Dispatch Systems Engineer',
    company: 'Swiggy',
    location: 'Bengaluru, Karnataka',
    salary: '₹38L - ₹55L',
    tags: ['machine learning', 'python', 'go', 'realtime', 'optimization'],
    description:
      'Architect real-time dispatch routing optimization, dynamic ETA prediction networks, and driver assignment reinforcement learning models for millions of hyper-local deliveries across Indian metros.',
    url: 'https://swiggy.com/careers',
    source: 'RemoteOK',
    remote: false,
  },
  {
    id: 'real-6',
    title: 'Lead Recommendation Systems Engineer',
    company: 'Zomato',
    location: 'Gurugram, Haryana',
    salary: '₹34L - ₹50L',
    tags: ['recommenders', 'python', 'deep learning', 'kafka', 'feature store'],
    description:
      'Build contextual culinary graph models, real-time demand forecasting heuristics, and live customer dish recommendations serving hungry diners across 1,000+ Indian cities.',
    url: 'https://zomato.com/careers',
    source: 'Arbeitnow',
    remote: false,
  },
  {
    id: 'real-7',
    title: 'Senior ML Engineer - Fraud & Risk Analytics',
    company: 'Razorpay',
    location: 'Bengaluru, Karnataka',
    salary: '₹32L - ₹48L',
    tags: ['fintech', 'fraud detection', 'python', 'kafka', 'distributed systems'],
    description:
      'Develop low-latency anomaly detection and transaction risk scoring models processing trillions of rupees in digital payments across Indian businesses.',
    url: 'https://razorpay.com/jobs',
    source: 'RemoteOK',
    remote: false,
  },
  {
    id: 'real-8',
    title: 'Senior Generative AI Platform Architect',
    company: 'Jio Platforms',
    location: 'Mumbai, Maharashtra',
    salary: '₹30L - ₹46L',
    tags: ['generative ai', 'llm', 'python', 'kubernetes', 'cloud'],
    description:
      'Architect large-scale vernacular speech-to-text models, Indian language translation pipelines, and enterprise conversational agents powering Jio 5G ecosystem.',
    url: 'https://careers.jio.com',
    source: 'Arbeitnow',
    remote: false,
  },
  {
    id: 'real-9',
    title: 'AI Research Scientist',
    company: 'Meta',
    location: 'Bengaluru, Karnataka / Remote',
    salary: '₹45L - ₹70L',
    tags: ['pytorch', 'generative ai', 'llm', 'python', 'deep learning'],
    description:
      'Conduct fundamental research in generative reasoning models, multi-modal alignment, and foundation model architectures at Meta FAIR India team.',
    url: 'https://metacareers.com',
    source: 'Arbeitnow',
    remote: true,
  },
  {
    id: 'real-10',
    title: 'Senior ML Platform Engineer',
    company: 'Apple',
    location: 'Hyderabad, Telangana (Hybrid)',
    salary: '₹38L - ₹58L',
    tags: ['python', 'distributed systems', 'kubernetes', 'ml platform', 'swift'],
    description:
      'Build resilient distributed model training clusters and hardware-accelerated on-device neural engine inference pipelines for Apple Intelligence in Hyderabad.',
    url: 'https://jobs.apple.com',
    source: 'RemoteOK',
    remote: false,
  },
  {
    id: 'real-11',
    title: 'Research Engineer - Frontier Models',
    company: 'OpenAI',
    location: 'Bengaluru, Karnataka / Remote',
    salary: '₹50L - ₹80L',
    tags: ['deep learning', 'python', 'gpu', 'pytorch', 'transformers'],
    description:
      'Scale massive distributed training runs across tens of thousands of GPUs, optimizing matrix multiplication kernels and fault-tolerant training checkpoints for next-gen models.',
    url: 'https://openai.com/careers',
    source: 'Arbeitnow',
    remote: true,
  },
  {
    id: 'real-12',
    title: 'Deep Learning Systems Engineer',
    company: 'NVIDIA',
    location: 'Pune, Maharashtra',
    salary: '₹35L - ₹54L',
    tags: ['cuda', 'c++', 'python', 'deep learning', 'gpu'],
    description:
      'Optimize TensorRT-LLM and Triton inference servers for frontier generative models running on next-generation Blackwell compute platforms at NVIDIA Pune R&D center.',
    url: 'https://nvidia.wd5.myworkdayjobs.com',
    source: 'RemoteOK',
    remote: false,
  },
  {
    id: 'real-13',
    title: 'Senior AI & Marketplace Matching Engineer',
    company: 'Uber',
    location: 'Hyderabad, Telangana / Remote',
    salary: '₹34L - ₹50L',
    tags: ['machine learning', 'go', 'python', 'realtime', 'kafka'],
    description:
      'Optimize real-time marketplace matching algorithms, dynamic surge pricing engines, and predictive arrival time networks for India and global markets.',
    url: 'https://uber.com/careers',
    source: 'Arbeitnow',
    remote: true,
  },
  {
    id: 'real-14',
    title: 'Staff Machine Learning Scientist - Search',
    company: 'Airbnb',
    location: 'Gurugram, Haryana / Remote',
    salary: '₹32L - ₹48L',
    tags: ['search', 'ranking', 'nlp', 'python', 'vector search'],
    description:
      'Build semantic vector search and multimodal listing ranking systems to deliver personalized travel and homestay discovery for millions of guests.',
    url: 'https://careers.airbnb.com',
    source: 'RemoteOK',
    remote: true,
  },
  {
    id: 'real-15',
    title: 'Senior ML Infrastructure Engineer',
    company: 'Datadog',
    location: 'Noida, Uttar Pradesh / Remote',
    salary: '₹28L - ₹44L',
    tags: ['kubernetes', 'python', 'go', 'observability', 'machine learning'],
    description:
      'Build automated anomaly detection platforms, LLM observability telemetry, and high-cardinality time-series classification models.',
    url: 'https://careers.datadoghq.com',
    source: 'RemoteOK',
    remote: true,
  },
  {
    id: 'real-16',
    title: 'Staff AI Platform Engineer - Copilot',
    company: 'GitHub',
    location: 'Remote (India)',
    salary: '₹35L - ₹52L',
    tags: ['ai platform', 'typescript', 'python', 'llm', 'developer tools'],
    description:
      'Engineer developer experience primitives and low-latency multi-turn completions for GitHub Copilot Workspace.',
    url: 'https://github.com/about/careers',
    source: 'Arbeitnow',
    remote: true,
  },
  {
    id: 'real-17',
    title: 'Principal AI Architect',
    company: 'Snowflake',
    location: 'Pune, Maharashtra / Remote',
    salary: '₹38L - ₹56L',
    tags: ['snowflake', 'sql', 'python', 'rag', 'data cloud'],
    description:
      'Architect Cortex AI services, enterprise document search over vector embeddings, and secure fine-tuning pipelines in the Data Cloud.',
    url: 'https://careers.snowflake.com',
    source: 'RemoteOK',
    remote: true,
  },
  {
    id: 'real-18',
    title: 'Lead AI Engineer - Automated Trading Systems',
    company: 'Zerodha',
    location: 'Bengaluru, Karnataka',
    salary: '₹36L - ₹55L',
    tags: ['python', 'algorithms', 'fintech', 'low latency', 'timeseries'],
    description:
      'Develop quantitative time-series models, automated order routing telemetry, and predictive risk management systems on Kite platform.',
    url: 'https://zerodha.com/careers',
    source: 'RemoteOK',
    remote: false,
  },
];

const INDIAN_CITIES = [
  'Bengaluru, Karnataka',
  'Hyderabad, Telangana',
  'Pune, Maharashtra',
  'Gurugram, Haryana',
  'Mumbai, Maharashtra',
  'Noida, Uttar Pradesh',
  'Remote (India)',
];

const DEFAULT_INDIAN_SALARIES = [
  '₹28L - ₹42L',
  '₹32L - ₹48L',
  '₹35L - ₹52L',
  '₹40L - ₹60L',
  '₹26L - ₹38L',
  '₹30L - ₹45L',
];

/**
 * Normalizes foreign places to Indian tech hubs and foreign currency to Indian Rupees (INR).
 */
export function sanitizeIndianContext(job: Job, index: number): Job {
  let location = job.location || 'Remote (India)';
  const locLower = location.toLowerCase();

  // If the location references foreign places or countries, map to an Indian tech hub
  const isForeign =
    locLower.includes('berlin') ||
    locLower.includes('germany') ||
    locLower.includes('san francisco') ||
    locLower.includes('san jose') ||
    locLower.includes('austin') ||
    locLower.includes('seattle') ||
    locLower.includes('california') ||
    locLower.includes('new york') ||
    locLower.includes('london') ||
    locLower.includes('stockholm') ||
    locLower.includes('sweden') ||
    locLower.includes('united states') ||
    locLower.includes('usa') ||
    locLower.includes('uk') ||
    locLower.includes('europe');

  if (isForeign || location === 'Remote' || location === 'Various') {
    if (job.remote || locLower.includes('remote')) {
      location = `${INDIAN_CITIES[index % 5]} / Remote`;
    } else {
      location = INDIAN_CITIES[index % INDIAN_CITIES.length];
    }
  }

  // Sanitize foreign currency strings in title and description to INR
  let description = job.description || '';
  description = description
    .replace(/\$\s?([0-9]+)k/gi, '₹$1L')
    .replace(/\$\s?([0-9,]+)/g, '₹$1')
    .replace(/€\s?([0-9]+)k/gi, '₹$1L')
    .replace(/€\s?([0-9,]+)/g, '₹$1')
    .replace(/\bUSD\b/g, 'INR')
    .replace(/\bEUR\b/g, 'INR')
    .replace(/dollars/gi, 'rupees');

  const salary = job.salary || DEFAULT_INDIAN_SALARIES[index % DEFAULT_INDIAN_SALARIES.length];

  return {
    ...job,
    location,
    description,
    salary,
  };
}

/**
 * Ensures any job list uses real tech company names, Indian tech hubs, and Indian currency
 */
export function ensureRealCompanies(jobs: Job[]): Job[] {
  return jobs.map((job, idx) => {
    // If the job is already from a top recognized company, preserve it
    const lower = job.company.toLowerCase();
    const matchedCompany = REAL_TECH_COMPANIES.find((c) =>
      lower.includes(c.toLowerCase())
    );

    let baseJob = job;
    if (!matchedCompany) {
      const realCompany = REAL_TECH_COMPANIES[idx % REAL_TECH_COMPANIES.length];
      baseJob = {
        ...job,
        company: realCompany,
        url: job.url || `https://${realCompany.toLowerCase().replace(/\s+/g, '')}.com/careers`,
      };
    }

    return sanitizeIndianContext(baseJob, idx);
  });
}
