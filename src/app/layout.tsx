import type { Metadata, Viewport } from 'next';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'RoleFit - Semantic Job Matching & AI Career Engine',
  description:
    'Match resumes against live job postings from RemoteOK and Arbeitnow, ranked by semantic vector cosine similarity with AI career analysis.',
  keywords: ['Resume Matcher', 'Job Search', 'Generative AI', 'Career AI', 'Vector Search'],
  authors: [{ name: 'RoleFit Team' }],
  icons: {
    icon: '/favicon.svg',
  },
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
