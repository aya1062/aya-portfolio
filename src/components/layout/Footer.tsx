import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import { Container } from '../ui/Container';
import { BrandLogo } from '../ui/BrandLogo';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const currentYear = new Date().getFullYear();

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { currentLang, isRtl } = useLanguage();

  return (
    <footer className="relative border-t border-brand-border/60 bg-[#070D12] pt-16 pb-12 overflow-hidden">
      {/* Subtle Aurora light glow at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-t from-brand-cyan/10 to-transparent blur-2xl" />

      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link
              to={`/${currentLang}`}
              className="inline-block group outline-none"
              aria-label={currentLang === 'ar' ? 'الصفحة الرئيسية — آية ستوديو ويب' : 'Home — AYA Web Studio'}
            >
              <BrandLogo className="h-10 sm:h-11 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.4)] transition-all duration-300" />
            </Link>
            <p className="max-w-md text-sm text-brand-muted leading-relaxed">
              {isRtl
                ? 'معرض الأعمال الشخصي لآية — مطورة مواقع وتطبيقات ويب متخصصة في ووردبريس وحلول MERN العملية.'
                : "Personal portfolio of Aya — Web Developer specializing in custom WordPress sites and practical MERN web applications."}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-emerald/30 bg-brand-emerald/10 px-3 py-1 text-xs text-brand-emerald font-mono">
              <span className="h-2 w-2 rounded-full bg-brand-emerald animate-pulse" />
              <span>{t('hero.status')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-brand-cyan uppercase">
              {isRtl ? 'التنقل' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li>
                <Link to={`/${currentLang}`} className="hover:text-brand-text transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/about`} className="hover:text-brand-text transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/services`} className="hover:text-brand-text transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/portfolio`} className="hover:text-brand-text transition-colors">
                  {t('nav.work')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Specializations & Routes */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-brand-emerald uppercase">
              {isRtl ? 'المسارات التخصصية' : 'Capabilities'}
            </h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li>
                <Link
                  to={`/${currentLang}/services/wordpress`}
                  className="inline-flex items-center gap-1 hover:text-brand-text transition-colors"
                >
                  <span>{t('nav.servicesWordPress')}</span>
                  <ArrowUpRight className="h-3 w-3 text-brand-emerald" />
                </Link>
              </li>
              <li>
                <Link
                  to={`/${currentLang}/services/custom-development`}
                  className="inline-flex items-center gap-1 hover:text-brand-text transition-colors"
                >
                  <span>{t('nav.servicesCustom')}</span>
                  <ArrowUpRight className="h-3 w-3 text-brand-cyan" />
                </Link>
              </li>
              <li>
                <Link
                  to={`/${currentLang}/contact`}
                  className="hover:text-brand-text transition-colors"
                >
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-brand-border/40 pt-6 text-xs text-brand-muted font-mono gap-4">
          <p>© {currentYear} AYA. {t('common.allRightsReserved')}.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-brand-cyan/80">
              <Sparkles className="h-3 w-3" />
              <span>Aurora Design System</span>
            </span>
            <span className="text-brand-border">|</span>
            <span>MERN & WordPress</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
