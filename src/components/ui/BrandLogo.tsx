import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { cn } from '../../lib/utils';

export interface BrandLogoProps extends React.SVGProps<SVGSVGElement> {
  lang?: 'en' | 'ar';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  lang,
  className,
  ...props
}) => {
  const { currentLang } = useLanguage();
  const activeLang = lang || currentLang || 'en';
  const isArabic = activeLang === 'ar';

  if (isArabic) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="15 4 570 224"
        aria-label="آية — ستوديو ويب"
        role="img"
        className={cn('h-10 w-auto transition-transform duration-300', className)}
        {...props}
      >
        <g data-brand-logo="ar">
          {/* Cyan Code Brackets: < and /> and > */}
          <g fill="none" stroke="#22D3EE" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
            <path d="M65 48L25 83Q20 88 25 93L65 128" />
            <path d="M498 38L465 142" />
            <path d="M535 48L575 83Q580 88 575 93L535 128" />
          </g>

          {/* White Main Arabic Letterform: آية */}
          <path
            d="M155 82H190Q213 82 213 103V129H157Q133 129 133 106Q133 82 155 82ZM213 129H305Q336 129 336 100V80M409 60V144"
            fill="none"
            stroke="#F4F8FA"
            strokeWidth="23"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Ta' Marbuta Dots */}
          <circle cx="155" cy="53" r="8" fill="#F4F8FA" />
          <circle cx="181" cy="53" r="8" fill="#F4F8FA" />

          {/* Green Ya' Diacritic Bars */}
          <rect x="267" y="153" width="16" height="25" rx="8" fill="#34D399" />
          <rect x="291" y="153" width="16" height="25" rx="8" fill="#34D399" />

          {/* Green Maddah on Alif */}
          <path
            d="M373 38C368 15 399 23 419 15Q434 10 439 4Q444 34 415 36Q391 35 373 44Z"
            fill="#34D399"
          />

          {/* Subtitle: ستوديو ويب */}
          <text
            x="300"
            y="212"
            fontFamily="Alexandria, 'Brand Sans', DejaVu Sans, Arial, sans-serif"
            fontSize="21"
            fontWeight="400"
            fill="#91AAB6"
            textAnchor="middle"
            direction="rtl"
            unicodeBidi="plaintext"
          >
            ستوديو ويب
          </text>
        </g>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="15 25 570 140"
      aria-label="AYA — Web Studio"
      role="img"
      className={cn('h-8 w-auto transition-transform duration-300', className)}
      {...props}
    >
      <g data-brand-logo="en">
        {/* Cyan Code Brackets: < and /> and > */}
        <g fill="none" stroke="#22D3EE" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
          <path d="M65 48L25 83Q20 88 25 93L65 128" />
          <path d="M498 38L465 142" />
          <path d="M535 48L575 83Q580 88 575 93L535 128" />
        </g>

        {/* First Letter 'a' */}
        <path
          transform="translate(0 0)"
          d="M109 58H156Q174 58 174 76V119H125Q105 119 105 100Q105 83 124 83H174"
          fill="none"
          stroke="#F4F8FA"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Letter 'y' */}
        <path
          d="M218 58V88Q218 105 237 105H281M281 58V149"
          fill="none"
          stroke="#F4F8FA"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Green Accents on 'y' */}
        <rect x="220" y="133" width="16" height="27" rx="8" fill="#34D399" />
        <rect x="243" y="126" width="16" height="34" rx="8" fill="#34D399" />

        {/* Second Letter 'a' */}
        <path
          transform="translate(227 0)"
          d="M109 58H156Q174 58 174 76V119H125Q105 119 105 100Q105 83 124 83H174"
          fill="none"
          stroke="#F4F8FA"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

