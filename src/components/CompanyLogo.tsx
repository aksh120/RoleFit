'use client';

import React, { useState } from 'react';

interface CompanyLogoProps {
  company: string;
  className?: string;
  size?: number;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  company = '',
  className = '',
  size = 40,
}) => {
  const [imgError, setImgError] = useState(false);
  const comp = company.toLowerCase().trim();

  // 1. Microsoft
  if (comp.includes('microsoft')) {
    return (
      <div
        className={`rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center shrink-0 p-2 select-none ${className}`}
        style={{ width: size, height: size }}
        title="Microsoft"
      >
        <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
          <div className="bg-[#F25022] rounded-[1px]" />
          <div className="bg-[#7FBA00] rounded-[1px]" />
          <div className="bg-[#00A4EF] rounded-[1px]" />
          <div className="bg-[#FFB900] rounded-[1px]" />
        </div>
      </div>
    );
  }

  // 2. Google
  if (comp.includes('google')) {
    return (
      <div
        className={`rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center shrink-0 p-2 select-none ${className}`}
        style={{ width: size, height: size }}
        title="Google"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
      </div>
    );
  }

  // 3. Amazon
  if (comp.includes('amazon')) {
    return (
      <div
        className={`rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center shrink-0 p-2 select-none ${className}`}
        style={{ width: size, height: size }}
        title="Amazon"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#FF9900]">
          <path d="M13.88 15.74c-2.42 1.78-5.93 2.73-8.96 2.73-4.26 0-8.1-1.63-11-4.38-.23-.22-.03-.52.25-.35 3.15 1.83 7.02 2.93 11 2.93 2.68 0 5.82-.67 8.35-2.07.41-.23.77.26.36.54v.6zM14.93 14.34c-.31-.4-.68-.86-.68-1.59 0-1.04.81-1.78 1.95-1.78 1.05 0 1.63.68 1.63 1.64 0 .76-.46 1.34-1.12 1.67-.55.28-1.14.36-1.78.06zm7.07 4.16c-.28.36-1.8.84-2.48.97-.21.04-.26-.14-.08-.26 1.16-.83 2.45-1.03 2.45-1.03.24-.04.4.15.11.32z" />
          <path d="M15.42 10.42c-.08-.66-.46-2.14-2.12-2.14-1.5 0-2.3 1.17-2.58 2.14h4.7zm2.46 3.82c-.15.4-.53.64-1 .64-.34 0-.84-.15-1.07-.46l-.1-.13c-1.02.9-2.22 1.14-3.52 1.14-2.34 0-4.04-1.46-4.04-3.78 0-1.83 1.12-3.15 2.67-3.74 1.1-.42 2.68-.49 3.86-.63v-.35c0-.64-.08-1.39-.63-1.85-.53-.45-1.38-.56-2.15-.56-1.44 0-2.73.57-3.03 1.84-.04.2-.21.34-.42.34l-2.04-.19c-.2-.04-.36-.2-.33-.42.49-2.67 2.87-3.67 5.76-3.67 1.48 0 3.39.38 4.54 1.5 1.32 1.25 1.22 2.92 1.22 4.67v3.2c0 .94.38 1.35.73 1.86.15.22.18.47-.03.62l-1.92 1.35c-.17.13-.38.1-.53-.08z" />
        </svg>
      </div>
    );
  }

  // 4. Meta
  if (comp.includes('meta') || comp.includes('facebook')) {
    return (
      <div
        className={`rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center shrink-0 p-2 select-none ${className}`}
        style={{ width: size, height: size }}
        title="Meta"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#0668E1]">
          <path d="M12 7.02c-2.4 0-4.3 1.76-5.5 3.53C5.1 8.35 3.7 7.02 1.9 7.02 0 7.02 0 8.78 0 10.94c0 3.4 2.2 6.04 4.8 6.04 2.4 0 4.1-1.63 5.4-3.4 1.3 1.77 3 3.4 5.4 3.4 2.6 0 4.8-2.64 4.8-6.04 0-2.16 0-3.92-1.9-3.92-1.8 0-3.2 1.33-4.6 3.53-1.2-1.77-3.1-3.53-5.5-3.53zm-5.4 7.63c-1.5 0-2.8-1.55-2.8-3.71 0-1.8.8-3.23 2.1-3.23 1.3 0 2.6 1.77 3.5 3.23-.9 1.96-1.8 3.71-2.8 3.71zm10.8 0c-1 0-1.9-1.75-2.8-3.71.9-1.46 2.2-3.23 3.5-3.23 1.3 0 2.1 1.43 2.1 3.23 0 2.16-1.3 3.71-2.8 3.71z" />
        </svg>
      </div>
    );
  }

  // 5. Apple
  if (comp.includes('apple')) {
    return (
      <div
        className={`rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center shrink-0 p-2 select-none ${className}`}
        style={{ width: size, height: size }}
        title="Apple"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gray-900 dark:fill-white">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.84.94-2.91-.91.04-2.02.61-2.67 1.38-.58.68-1.09 1.77-.95 2.82 1.02.08 2.05-.52 2.68-1.29z" />
        </svg>
      </div>
    );
  }

  // 6. OpenAI
  if (comp.includes('openai')) {
    return (
      <div
        className={`rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center shrink-0 p-2 select-none ${className}`}
        style={{ width: size, height: size }}
        title="OpenAI"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#10A37F] dark:fill-white">
          <path d="M22.28 9.9c-.23-.88-.7-1.68-1.36-2.3a6.04 6.04 0 00-3.69-1.63 6.02 6.02 0 00-4.04-1.95 6.09 6.09 0 00-4.88 2.37 6.07 6.07 0 00-4.32.96A6.09 6.09 0 001.7 10.9a6.04 6.04 0 00.32 4.45 6.03 6.03 0 002.3 2.62 6.05 6.05 0 004.22 1.83c.27 1.5 1.13 2.83 2.42 3.68a6.11 6.11 0 005.15.54 6.06 6.06 0 003.88-2.6 6.03 6.03 0 002.3-2.62 6.08 6.08 0 000-8.9zm-8.87 11.23a4.57 4.57 0 01-2.91-1.05l.15-.09 4.8-2.77c.25-.14.4-.41.4-.7v-6.79l2.03 1.17v5.63a4.59 4.59 0 01-4.47 4.6zm-8.5-4.1a4.55 4.55 0 01-.6-3.04l.15.09 4.8 2.77c.24.14.55.14.8 0l5.88-3.4v2.35l-4.87 2.82a4.58 4.58 0 01-6.16-1.59zm-1.84-8.8c.6-1 1.52-1.74 2.61-2.12v5.72c0 .28.15.55.4.7l5.88 3.39-2.03 1.17-4.87-2.81a4.58 4.58 0 01-1.99-6.05zm14.54 3.03l-5.88-3.4 2.03-1.17 4.87 2.81a4.58 4.58 0 011.99 6.05 4.55 4.55 0 01-2.61 2.12v-5.71a.8.8 0 00-.4-.7zm2.44 6.94a4.58 4.58 0 01-1.83 2.63l-.15-.09-4.8-2.77a.82.82 0 00-.8 0l-5.88 3.4v-2.35l4.87-2.82a4.58 4.58 0 016.16 1.59l.43.4zm-7.66-4.42l-2.69-1.55 2.69-1.55 2.69 1.55-2.69 1.55z" />
        </svg>
      </div>
    );
  }

  // 7. Stripe
  if (comp.includes('stripe')) {
    return (
      <div
        className={`rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center shrink-0 p-2 select-none ${className}`}
        style={{ width: size, height: size }}
        title="Stripe"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#635BFF]">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.97 15.845.546 13.437.546c-5.918 0-9.871 3.064-9.871 8.212 0 5.617 4.794 6.843 8.358 8.169 2.457.915 3.305 1.565 3.305 2.602 0 .979-.844 1.493-2.35 1.493-2.64 0-5.385-1.121-7.23-2.072l-.934 5.568c1.986.974 4.887 1.482 7.74 1.482 6.136 0 10.155-2.946 10.155-8.235 0-5.462-4.492-6.902-8.634-8.716z" />
        </svg>
      </div>
    );
  }

  // 8. Spotify
  if (comp.includes('spotify')) {
    return (
      <div
        className={`rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center shrink-0 p-2 select-none ${className}`}
        style={{ width: size, height: size }}
        title="Spotify"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1DB954]">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308c-.218.358-.684.472-1.042.253-2.857-1.745-6.455-2.14-10.693-1.171-.408.093-.816-.162-.909-.569-.093-.408.162-.816.569-.909 4.636-1.06 8.604-.613 11.822 1.354.358.218.472.684.253 1.042zm1.47-3.26c-.275.447-.862.59-1.31.314-3.27-2.01-8.254-2.593-12.122-1.417-.504.153-1.041-.137-1.194-.64-.153-.503.137-1.04.64-1.194 4.417-1.34 9.907-.692 13.672 1.626.448.276.59.863.314 1.311zm.126-3.41C15.183 8.32 8.73 8.107 5.086 9.215c-.602.183-1.24-.163-1.423-.765-.183-.602.163-1.24.765-1.423 4.208-1.278 11.332-1.03 15.65 1.533.543.322.721 1.025.4 1.568-.323.543-1.026.721-1.569.4z" />
        </svg>
      </div>
    );
  }

  // 9. Netflix
  if (comp.includes('netflix')) {
    return (
      <div
        className={`rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center shrink-0 p-2 select-none ${className}`}
        style={{ width: size, height: size }}
        title="Netflix"
      >
        <span className="text-lg font-black text-[#E50914] tracking-tighter">N</span>
      </div>
    );
  }

  // 10. NVIDIA
  if (comp.includes('nvidia')) {
    return (
      <div
        className={`rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center shrink-0 p-2 select-none ${className}`}
        style={{ width: size, height: size }}
        title="NVIDIA"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#76B900]">
          <path d="M7.742 8.528c0-1.468 1.19-2.658 2.658-2.658 2.766 0 4.148 3.518 2.658 5.485-1.02 1.345-3.084 1.056-4.048-.198a2.64 2.64 0 01-1.268-2.629zm7.04-5.32c-2.18-.767-4.66-.582-6.68.514C5.748 4.98 4.3 7.55 4.3 10.3c0 2.217.93 4.34 2.56 5.86-1.5-1.56-2.31-3.66-2.31-5.86 0-3.32 1.95-6.33 4.96-7.66 2.58-1.14 5.6-.83 7.89.81l-2.62 1.76zm4.78 2.21C16.89 2.97 12.87 2.37 9.53 3.9 5.8 5.6 3.4 9.38 3.4 13.5c0 3.1 1.34 6.07 3.68 8.16-2.02-2.14-3.13-4.99-3.13-7.96 0-4.8 3.12-9.05 7.73-10.5 3.73-1.17 7.84-.28 10.74 2.35l-2.86 1.87z" />
        </svg>
      </div>
    );
  }

  // 11. Uber
  if (comp.includes('uber')) {
    return (
      <div
        className={`rounded-lg bg-gray-950 dark:bg-white text-white dark:text-gray-950 flex items-center justify-center shrink-0 font-bold text-xs select-none ${className}`}
        style={{ width: size, height: size }}
        title="Uber"
      >
        UBER
      </div>
    );
  }

  // 12. Airbnb
  if (comp.includes('airbnb')) {
    return (
      <div
        className={`rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center shrink-0 p-2 select-none ${className}`}
        style={{ width: size, height: size }}
        title="Airbnb"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#FF5A5F]">
          <path d="M12 0C5.7 0 3 4.2 3 7.8c0 4.1 3.5 8.7 9 14.2 5.5-5.5 9-10.1 9-14.2C21 4.2 18.3 0 12 0zm0 16.2c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2 4.2 1.9 4.2 4.2-1.9 4.2-4.2 4.2z" />
        </svg>
      </div>
    );
  }

  // 13. GitHub
  if (comp.includes('github')) {
    return (
      <div
        className={`rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center shrink-0 p-2 select-none ${className}`}
        style={{ width: size, height: size }}
        title="GitHub"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gray-900 dark:fill-white">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      </div>
    );
  }

  // 14. Datadog
  if (comp.includes('datadog')) {
    return (
      <div
        className={`rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center shrink-0 p-2 select-none ${className}`}
        style={{ width: size, height: size }}
        title="Datadog"
      >
        <span className="text-base font-bold text-[#632CA6]">DD</span>
      </div>
    );
  }

  // 15. Snowflake
  if (comp.includes('snowflake')) {
    return (
      <div
        className={`rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center shrink-0 p-2 select-none ${className}`}
        style={{ width: size, height: size }}
        title="Snowflake"
      >
        <span className="text-lg font-bold text-[#29B5E8]">❄</span>
      </div>
    );
  }

  // Default / Online live logo lookup fallback via Google Favicon CDN
  const cleanDomain = comp.replace(/[^a-z0-9]/g, '');
  const faviconUrl = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${cleanDomain}.com&size=128`;

  if (!imgError && cleanDomain.length > 1) {
    return (
      <div
        className={`rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center shrink-0 p-2 overflow-hidden ${className}`}
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={faviconUrl}
          alt={company}
          className="w-5 h-5 object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Fallback initial
  const initial = (company || 'C').charAt(0).toUpperCase();
  return (
    <div
      className={`rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center shrink-0 text-sm font-bold text-gray-700 dark:text-slate-200 ${className}`}
      style={{ width: size, height: size }}
    >
      {initial}
    </div>
  );
};

export default CompanyLogo;
