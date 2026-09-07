import type { Metadata, Viewport } from 'next';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'RoleFit — Semantic Job Matching & AI Career Engine',
  description:
    'Match resumes against live job postings from RemoteOK and Arbeitnow, ranked by semantic vector cosine similarity with Groq Llama 3.3 70B analysis.',
  keywords: ['Resume Matcher', 'Job Search', 'Generative AI', 'Llama 3.3', 'Groq', 'Career AI', 'Vector Search'],
  authors: [{ name: 'RoleFit Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
