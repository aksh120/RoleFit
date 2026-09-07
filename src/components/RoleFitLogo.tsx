'use client';

import React from 'react';

interface RoleFitLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export const RoleFitLogo: React.FC<RoleFitLogoProps> = ({
  size = 28,
  className = '',
  showText = false,
  textClassName = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-label="RoleFit Logo"
      >
        {/* Rounded Base Tile */}
        <rect width="32" height="32" rx="8" fill="#2563EB" />
        
        {/* Subtle geometric depth overlay */}
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="7"
          stroke="white"
          strokeOpacity="0.15"
          strokeWidth="1"
        />

        {/* Precision Target Calipers (The "Fit" Matrix) */}
        <path
          d="M8.5 13.5V8.5H13.5"
          stroke="#93C5FD"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.5 18.5V23.5H18.5"
          stroke="#93C5FD"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Modern Monogram Core (The "Role" Glyph) */}
        <path
          d="M12 23V11H17C18.6569 11 20 12.3431 20 14C20 15.6569 18.6569 17 17 17H12"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 17L20.5 23"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>

      {showText && (
        <span
          className={`font-bold tracking-tight text-gray-950 dark:text-white font-sans ${textClassName}`}
        >
          RoleFit
        </span>
      )}
    </div>
  );
};

export default RoleFitLogo;
