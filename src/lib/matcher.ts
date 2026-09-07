import type { Job, MatchResult } from './types';

/**
 * Standard stop words to filter out common noise tokens.
 */
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'cannot', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for',
  'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him',
  'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more',
  'most', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our',
  'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some', 'such', 'than',
  'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this',
  'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when',
  'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your', 'yours', 'yourself',
  'role', 'job', 'work', 'experience', 'team', 'years', 'looking', 'opportunity', 'skills', 'responsibilities'
]);

/**
 * Tokenizes text into word unigrams and bigrams, ignoring stop words and symbols.
 */
export function tokenizeAndFilter(text: string): string[] {
  const clean = text.toLowerCase().replace(/[^a-z0-9+#.-]/g, ' ');
  const rawTokens = clean.split(/\s+/).filter((t) => t.length >= 2 && !STOP_WORDS.has(t));

  const tokens: string[] = [...rawTokens];
  // Add 2-word n-grams for technical phrases (e.g. "machine learning", "next js", "full stack")
  for (let i = 0; i < rawTokens.length - 1; i++) {
    tokens.push(`${rawTokens[i]} ${rawTokens[i + 1]}`);
  }

  return tokens;
}

/**
 * Builds a term frequency map from a list of tokens.
 */
export function buildTermFrequencies(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }
  return tf;
}

/**
 * Computes cosine similarity between two frequency vectors.
 * Returns a value between 0.0 and 1.0.
 */
export function computeCosineSimilarity(
  tfA: Map<string, number>,
  tfB: Map<string, number>,
  weights?: Map<string, number>
): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const [term, freqA] of tfA.entries()) {
    const weight = weights?.get(term) || 1.0;
    const weightedFreqA = freqA * weight;
    normA += weightedFreqA * weightedFreqA;

    if (tfB.has(term)) {
      const freqB = tfB.get(term)!;
      const weightedFreqB = freqB * weight;
      dotProduct += weightedFreqA * weightedFreqB;
    }
  }

  for (const [term, freqB] of tfB.entries()) {
    const weight = weights?.get(term) || 1.0;
    const weightedFreqB = freqB * weight;
    normB += weightedFreqB * weightedFreqB;
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Creates a concatenated document string for a job, up to 2000 chars.
 */
export function prepareJobText(job: Job): string {
  const tagsText = job.tags.join(' ');
  const fullText = `${job.title} ${job.company} ${tagsText} ${job.description}`;
  return fullText.slice(0, 2500);
}

/**
 * Finds key matching skill terms between resume and job.
 */
export function extractMatchedSkills(resumeTokens: Set<string>, jobTokens: Set<string>): string[] {
  const matched: string[] = [];
  const knownTechKeywords = [
    'python', 'javascript', 'typescript', 'react', 'next.js', 'node.js', 'vue', 'angular',
    'docker', 'kubernetes', 'aws', 'gcp', 'azure', 'sql', 'postgresql', 'mongodb', 'graphql',
    'rest', 'api', 'ci/cd', 'git', 'linux', 'tailwind', 'css', 'html', 'pytorch', 'tensorflow',
    'machine learning', 'artificial intelligence', 'genai', 'llm', 'nlp', 'fastapi', 'flask',
    'django', 'redis', 'kafka', 'golang', 'rust', 'c++', 'java', 'spring', 'agile', 'scrum'
  ];

  for (const tech of knownTechKeywords) {
    if (resumeTokens.has(tech) && jobTokens.has(tech)) {
      matched.push(tech);
    }
  }

  return matched.slice(0, 6);
}

/**
 * Ranks jobs against a resume using cosine similarity on term-frequency vectors.
 * Returns top N jobs sorted descending by matchScore (0.0 to 100.0).
 */
export function rankJobs(
  resumeText: string,
  jobs: Job[],
  topN: number = 8
): MatchResult[] {
  if (!jobs || jobs.length === 0) {
    return [];
  }

  const resumeTokens = tokenizeAndFilter(resumeText);
  const resumeTF = buildTermFrequencies(resumeTokens);
  const resumeTokenSet = new Set(resumeTokens);

  // Compute Inverse Document Frequencies (IDF) across the job pool
  const docFreq = new Map<string, number>();
  const jobTFs: Map<string, number>[] = [];
  const jobTokenSets: Set<string>[] = [];

  for (const job of jobs) {
    const jobTokens = tokenizeAndFilter(prepareJobText(job));
    const jobTF = buildTermFrequencies(jobTokens);
    jobTFs.push(jobTF);
    jobTokenSets.push(new Set(jobTokens));

    const uniqueInJob = new Set(jobTokens);
    for (const term of uniqueInJob) {
      docFreq.set(term, (docFreq.get(term) || 0) + 1);
    }
  }

  // Calculate IDF weights: idf = ln((N + 1) / (df + 1)) + 1
  const totalDocs = jobs.length;
  const idfWeights = new Map<string, number>();
  for (const [term, df] of docFreq.entries()) {
    idfWeights.set(term, Math.log((totalDocs + 1) / (df + 1)) + 1);
  }

  // Calculate similarity for each job
  const results: MatchResult[] = jobs.map((job, idx) => {
    const jobTF = jobTFs[idx];
    const rawSimilarity = computeCosineSimilarity(resumeTF, jobTF, idfWeights);

    // Apply soft sigmoid/min-max scaling to present realistic 0-100% human score
    // Pure TF-IDF cosine on long documents often yields 0.15 - 0.65; we normalize to 40% - 98%
    let scaledScore = 0;
    if (rawSimilarity > 0) {
      scaledScore = Math.min(99.4, Math.max(30.0, (rawSimilarity * 125) + 20));
    }
    const matchScore = Number(scaledScore.toFixed(1));

    const matchedSkills = extractMatchedSkills(resumeTokenSet, jobTokenSets[idx]);

    return {
      ...job,
      matchScore,
      matchedSkills,
    };
  });

  // Sort descending by matchScore
  results.sort((a, b) => b.matchScore - a.matchScore);

  // Return top N
  return results.slice(0, Math.max(1, topN));
}
