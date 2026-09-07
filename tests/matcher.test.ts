import { describe, it, expect } from 'vitest';
import { rankJobs, tokenizeAndFilter, computeCosineSimilarity, buildTermFrequencies } from '../src/lib/matcher';
import type { Job } from '../src/lib/types';

describe('Matcher & Vector Similarity Suite', () => {
  const sampleJobs: Job[] = [
    {
      id: 'job-python',
      title: 'Python Machine Learning Engineer',
      company: 'DataTech',
      location: 'Remote',
      tags: ['python', 'machine learning', 'pytorch', 'ai'],
      description: 'Building deep neural networks and NLP models with Python and PyTorch.',
      url: 'https://example.com/ml',
      source: 'RemoteOK',
    },
    {
      id: 'job-react',
      title: 'Senior Frontend Developer',
      company: 'WebStudio',
      location: 'Remote',
      tags: ['react', 'css', 'typescript', 'tailwind'],
      description: 'Developing high performance UI dashboards using React, CSS, and TypeScript.',
      url: 'https://example.com/react',
      source: 'Arbeitnow',
    },
    {
      id: 'job-unrelated',
      title: 'Civil Construction Supervisor',
      company: 'BuildCo',
      location: 'Denver, CO',
      tags: ['concrete', 'safety', 'construction'],
      description: 'Overseeing concrete pouring and physical bridge inspection on work sites.',
      url: 'https://example.com/civil',
      source: 'RemoteOK',
    },
  ];

  it('ranks machine learning role above unrelated roles for ML resume', () => {
    const mlResume = `
      Alex Chen — Machine Learning Engineer
      Expert in Python, PyTorch, Deep Learning, and NLP models.
      Built large-scale neural network architectures and data pipelines.
    `;

    const ranked = rankJobs(mlResume, sampleJobs, 3);

    expect(ranked.length).toBe(3);
    // ML job must be ranked #1
    expect(ranked[0].id).toBe('job-python');
    // Score must be higher than civil construction
    expect(ranked[0].matchScore).toBeGreaterThan(ranked[2].matchScore);
    expect(ranked[2].id).toBe('job-unrelated');
  });

  it('respects topN limit parameter', () => {
    const resume = 'Software engineer skilled in React, Python, TypeScript, and Docker.';
    const ranked = rankJobs(resume, sampleJobs, 2);
    expect(ranked.length).toBe(2);
  });

  it('returns empty array when given empty job pool', () => {
    const resume = 'Software developer';
    const ranked = rankJobs(resume, [], 5);
    expect(ranked).toEqual([]);
  });

  it('computes cosine similarity correctly between identical and orthogonal vectors', () => {
    const textA = 'python typescript docker';
    const tfA = buildTermFrequencies(tokenizeAndFilter(textA));

    // Identical
    const simIdentical = computeCosineSimilarity(tfA, tfA);
    expect(simIdentical).toBeCloseTo(1.0, 5);

    // Completely orthogonal
    const textB = 'concrete construction bridge';
    const tfB = buildTermFrequencies(tokenizeAndFilter(textB));
    const simOrthogonal = computeCosineSimilarity(tfA, tfB);
    expect(simOrthogonal).toBe(0);
  });
});
