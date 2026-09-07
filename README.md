# RoleFit - AI Job Match & Resume Optimization Engine

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Llama 3.3 70B](https://img.shields.io/badge/LLM-Llama_3.3_70B_via_Groq-f97316)](https://groq.com/)
[![Vitest](https://img.shields.io/badge/Tests-Vitest_Passing-emerald)](https://vitest.dev/)

> **Generative AI Developer Intern - Build Sprint Submission**  
> **Candidate:** Akshat Apoorv  
> **Date:** September 7, 2026  

---

## 1. Product Overview

**RoleFit** is an intelligent career acceleration platform that takes a candidate's resume (PDF or DOCX), aggregates live job postings from public job boards (**RemoteOK** and **Arbeitnow**), ranks them by semantic vector fit, and uses an ultra-low-latency Generative AI LLM (**Llama 3.3 70B via Groq**) to explain *why* each match fits, diagnose specific skill gaps, and provide tailored resume bullet edits.

### Why This is Generative AI (Not Just Search)
Embedding similarity and keyword search only tell you *how close* a resume and a job description are in vector space. They cannot tell you:
- **Why** the candidate aligns with or diverges from the hiring manager's requirements.
- **What critical domain skills** are implied in the posting but missing from the candidate's CV.
- **How to edit** specific resume bullet points to highlight relevant achievements.

The Generative AI reasoning layer evaluates the candidate's actual background against specific job criteria, turning raw similarity numbers into actionable career intelligence.

---

## 2. Technical Architecture & 4-Stage Pipeline

RoleFit follows a decoupled 4-stage pipeline designed for speed, zero-cost ranking, and graceful fault tolerance:

```
[Candidate Resume (PDF/DOCX)]
              │
              ▼
   Stage 1: Resume Parser (/api/parse-resume)
   - Multi-format buffer extraction (pdf-parse / mammoth)
   - Whitespace normalization & 50-character minimum verification
              │
              ▼
   Stage 2: Live Job Ingestion (/api/jobs)
   - Ingests RemoteOK (skips meta notice, custom User-Agent)
   - Ingests Arbeitnow API
   - HTML stripping via Cheerio, unified schema, deduplication & keyword filter
              │
              ▼
   Stage 3: Vector Embedding & Cosine Similarity Ranking (/api/match)
   - N-gram tokenization & Inverse Document Frequency (IDF) weighting
   - Normalized Cosine Similarity Dot-Product:
       sim(u, v) = (u · v) / (||u|| ||v||)
   - Ranks entire job pool and extracts top N (default: 8)
              │
              ▼
   Stage 4: Generative AI Reasoning (/api/insights)
   - Invoked ONLY on shortlisted top N jobs (minimizes latency & token cost)
   - Groq Llama 3.3 70B Versatile (with 8B instant fallback)
   - Generates JSON: Fit Explanation, Skill Gaps, and Tailored Resume Tips
   - Markdown code-fence regex recovery & fallback heuristics
              │
              ▼
   [Interactive Next.js Dashboard UI]
   - Color-tiered match badges (Emerald 80%+, Sky 65%+, Amber <65%)
   - 1-Click "Copy Bullet" action for resume suggestions
   - Direct link to live postings
```

---

## 3. Tech Stack & Engineering Rationale

| Layer | Choice | Rationale |
|---|---|---|
| **Framework** | **Next.js 15 (App Router) + React 19** | Modern full-stack architecture with server-side API routes, zero CORS issues, fast compilation, and seamless Vercel deployment. |
| **Styling** | **Tailwind CSS + Glassmorphism** | Custom dark/light design system with sleek glass panels, responsive grids, and micro-animations following modern design standards. |
| **Job APIs** | **RemoteOK + Arbeitnow** | Free, public, no-auth-key-required JSON APIs. Provides live listings without fragile HTML scraping. |
| **Resume Parsing** | `pdf-parse` + `mammoth` | In-memory buffer parsing for PDF and DOCX documents with strict error boundaries. |
| **HTML Sanitization** | `cheerio` | Strips script, style, and HTML markup from API descriptions before vectorization. |
| **Vector Ranking** | **TF-IDF N-Gram Cosine Similarity** | Runs locally in Node.js in milliseconds with zero external API calls or weight download delays. |
| **Generative LLM** | **Groq API (`llama-3.3-70b-versatile`)** | 280+ tokens/sec inference speed allows instantaneous generation of match insights across shortlisted jobs. Fallback to `llama-3.1-8b-instant`. |
| **Testing** | **Vitest** | Fast, isolated unit test suite validating parsing, normalization, ranking order, and LLM JSON extraction without external network calls. |

---

## 4. Key Features

- **Multi-Format Resume Support**: Upload PDF or DOCX files with automatic character validation and text preview.
- **1-Click Sample Resume**: Built-in realistic AI/Software Engineer profile allows evaluators to test the full pipeline in a single click.
- **Live Aggregation & Deduplication**: Fetches real postings, removes duplicate listings across boards, and filters by keywords (e.g. "Frontend", "Python", "AI / ML").
- **Visual Pipeline Tracker**: Real-time animated 4-step progress indicator showing exact pipeline execution state.
- **Interactive Match Cards**:
  - Score meter with color-coded confidence tiers.
  - Matched skills pills extracted between resume and job description.
  - LLM-generated **Fit Rationale**.
  - **Skill Gaps** diagnosing what the hiring manager needs that your resume lacks.
  - **Tailored Resume Bullet Suggestions** with a 1-click clipboard copy button.
  - Direct application links opening official job postings in a new tab.
- **Graceful Degradation**: If `GROQ_API_KEY` is not provided, ranking and search continue to operate 100% reliably with visible warning banners and heuristic fallback insights.

---

## 5. Local Setup & Quickstart

### Prerequisites
- Node.js 18.x, 20.x, 22.x, or 23.x
- npm 9.x+

### Installation
```bash
# 1. Clone repository
git clone https://github.com/aksh120/RoleFit.git
cd RoleFit

# 2. Install dependencies
npm install

# 3. (Optional) Set up your Groq API key for live Llama 3.3 70B generation
cp .env.example .env.local
# Add your GROQ_API_KEY=gsk_...
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Test Suite
```bash
npm test
```
Runs the full Vitest suite offline with zero network dependencies.

---

## 6. Deployment (Vercel)

RoleFit is optimized for zero-configuration deployment to **Vercel**:

1. Push your repository to GitHub.
2. Import the repository in the [Vercel Dashboard](https://vercel.com).
3. Under **Environment Variables**, add:
   - `GROQ_API_KEY`: Your Groq API key (optional; app degrades gracefully if omitted).
   - `GROQ_MODEL`: `llama-3.3-70b-versatile` (default).
4. Click **Deploy**.

---

## 7. Project Structure

```
RoleFit/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── parse-resume/route.ts   # PDF/DOCX multipart parser endpoint
│   │   │   ├── jobs/route.ts           # Aggregated job ingestion endpoint
│   │   │   ├── match/route.ts          # Vector similarity ranking endpoint
│   │   │   └── insights/route.ts       # Groq Llama 3.3 70B reasoning endpoint
│   │   ├── globals.css                 # Custom glassmorphism, scrollbars & themes
│   │   ├── layout.tsx                  # Root layout & SEO metadata
│   │   └── page.tsx                    # Main reactive dashboard
│   ├── components/
│   │   ├── Header.tsx                  # Brand header, model status & GitHub links
│   │   ├── ResumeUploader.tsx          # Drag & drop upload + sample resume loader
│   │   ├── SearchControls.tsx          # Keyword filter, tag chips & topN slider
│   │   ├── PipelineTracker.tsx         # 4-stage visual execution progress
│   │   └── JobCard.tsx                 # Match score, AI insights & copyable tips
│   └── lib/
│       ├── types.ts                    # TypeScript data contracts
│       ├── scraper.ts                  # RemoteOK + Arbeitnow ingestion & sanitization
│       ├── resume-parser.ts            # Buffer-based PDF & DOCX text extractor
│       ├── matcher.ts                  # N-gram TF-IDF cosine similarity engine
│       ├── generator.ts                # Groq LLM integration & JSON recovery
│       └── sample-data.ts              # Pre-loaded sample candidate resume
├── tests/
│   ├── scraper.test.ts                 # Tests HTML stripping, notice skipping & dedup
│   ├── matcher.test.ts                 # Tests ranking order & cosine similarity
│   ├── generator.test.ts               # Tests LLM JSON recovery & fallbacks
│   └── resume-parser.test.ts           # Tests length checks & format validation
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── README.md
```

---

## 8. License

MIT License. Built for the Generative AI Developer Intern technical assessment.
