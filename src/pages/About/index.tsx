import React, { useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Scene01Beginning } from './Scene01Beginning';
import { Scene02Shift } from './Scene02Shift';
import { Scene03Discovery } from './Scene03Discovery';
import { Scene04Growth } from './Scene04Growth';
import { Scene05Mindset } from './Scene05Mindset';
import { Scene06NextChapter } from './Scene06NextChapter';
import { AboutProgress } from './AboutProgress';

export const AboutPage: React.FC = () => {
  const { isRtl, currentLang } = useLanguage();

  // Reset scroll + set page title & metadata
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const title = isRtl
      ? 'آية — من الأرقام إلى الكود | تطوير مواقع الويب'
      : 'Aya — From Numbers to Code | Web Developer';
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      isRtl
        ? 'اكتشف رحلة آية من المحاسبة إلى تطوير الويب — قصة جمعت بين التفكير المنطقي والإبداع التقني لبناء تجارب رقمية مميزة.'
        : "Discover Aya's journey from accounting into web development — a story of analytical thinking meeting creative engineering."
    );

    // HTML dir + lang
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
  }, [isRtl, currentLang]);

  return (
    <>
      {/* Page-level scene progress indicator */}
      <AboutProgress isRtl={isRtl} />

      {/* The six narrative scenes — rendered as a continuous, cinematic journey */}
      <main
        id="about-main"
        aria-label={isRtl ? 'قصة آية: من الأرقام إلى الكود' : "Aya's Story: From Numbers to Code"}
        className="relative bg-brand-bg text-brand-text overflow-hidden"
      >
        {/* 01 — The Beginning: accounting roots */}
        <Scene01Beginning isRtl={isRtl} />

        {/* 02 — The Shift: connected data-to-code transformation */}
        <Scene02Shift isRtl={isRtl} />

        {/* 03 — The Discovery: code typing into assembled UI */}
        <Scene03Discovery isRtl={isRtl} />

        {/* 04 — The Growth: sticky immersive timeline */}
        <Scene04Growth isRtl={isRtl} />

        {/* 05 — The Mindset: three large editorial stacking panels */}
        <Scene05Mindset isRtl={isRtl} />

        {/* 06 — The Next Chapter: refined finale + CTA */}
        <Scene06NextChapter isRtl={isRtl} />
      </main>
    </>
  );
};

export default AboutPage;
