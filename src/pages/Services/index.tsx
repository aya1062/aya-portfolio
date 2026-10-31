import React, { useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Scene01Opening } from './Scene01Opening';
import { Scene02WordPressWorld } from './Scene02WordPressWorld';
import { Scene03MernWorld } from './Scene03MernWorld';
import { Scene04HowIWork } from './Scene04HowIWork';
import { Scene05ChooseDirection } from './Scene05ChooseDirection';
import { Scene06Closing } from './Scene06Closing';

export const ServicesPage: React.FC = () => {
  const { currentLang, isRtl } = useLanguage();

  // Reset scroll and set page title + metadata
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const title = isRtl
      ? 'آية — خدمات تطوير الويب: ووردبريس وتطبيقات MERN'
      : 'Aya — Web Services: WordPress & Custom MERN Development';
    document.title = title;

    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      isRtl
        ? 'طريقتان للبناء، وهدف واحد: تحويل الأفكار إلى حلول حقيقية عبر مواقع ووردبريس الاحترافية وتطبيقات MERN المخصصة.'
        : 'Two ways to build. One goal: make ideas work through tailored WordPress platforms and custom MERN web applications.'
    );

    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
  }, [isRtl, currentLang]);

  return (
    <main
      id="services-main"
      aria-label={isRtl ? 'خدمات تطوير الويب: عالمان' : 'My Craft: Two Worlds'}
      className="relative bg-brand-bg text-brand-text overflow-hidden"
    >
      {/* Scene 01 — Cinematic Split Opening */}
      <Scene01Opening isRtl={isRtl} />

      {/* Scene 02 — WordPress World (Business, E-commerce, Hospitality, Real Estate, Maintenance) */}
      <Scene02WordPressWorld isRtl={isRtl} />

      {/* Scene 03 — MERN & Custom Web Development (Booking, Marketplaces, Dashboards, APIs) */}
      <Scene03MernWorld isRtl={isRtl} />

      {/* Scene 04 — How I Work (Structured 5-step transparent workflow) */}
      <Scene04HowIWork isRtl={isRtl} />

      {/* Scene 05 — Choose Your Direction (Direct paths to filtered portfolio) */}
      <Scene05ChooseDirection isRtl={isRtl} currentLang={currentLang} />

      {/* Scene 06 — Closing & Call to Action */}
      <Scene06Closing isRtl={isRtl} currentLang={currentLang} />
    </main>
  );
};

export default ServicesPage;
