import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { BrandLogo } from '../ui/BrandLogo';
import { Menu, X, Globe, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { currentLang, isRtl, switchLanguage } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for navbar blur enhancement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMobileMenuOpen(false);
  }

  const navLinks = [
    { name: t('nav.home'), href: `/${currentLang}` },
    { name: t('nav.about'), href: `/${currentLang}/about` },
    { name: t('nav.services'), href: `/${currentLang}/services` },
    { name: t('nav.work'), href: `/${currentLang}/portfolio` },
    { name: t('nav.process'), href: `/${currentLang}#process` },
    { name: t('nav.contact'), href: `/${currentLang}/contact` },
  ];

  const handleLangToggle = () => {
    const nextLang = currentLang === 'en' ? 'ar' : 'en';
    switchLanguage(nextLang);
  };

  const isActiveLink = (href: string) => {
    if (href.includes('#')) return false;
    return location.pathname === href;
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#070D12]/80 backdrop-blur-md border-b border-brand-border/60 py-3.5 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      )}
    >
      <Container size="xl">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to={`/${currentLang}`}
            className="group flex items-center outline-none py-1"
            aria-label={currentLang === 'ar' ? 'الصفحة الرئيسية — آية ستوديو ويب' : 'Home — AYA Web Studio'}
          >
            <BrandLogo className="group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.4)] transition-all duration-300" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-brand-border/70 bg-brand-surface/70 px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 rounded-full',
                    active
                      ? 'text-brand-cyan bg-brand-cyan/10 font-semibold shadow-[0_0_10px_rgba(34,211,238,0.15)]'
                      : 'text-brand-muted hover:text-brand-text hover:bg-brand-surface-elevated/50'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster: Language Switcher + Contact CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={handleLangToggle}
              className="group flex items-center gap-1.5 rounded-full border border-brand-border bg-brand-surface px-3 py-1.5 text-xs font-medium text-brand-text transition-all duration-200 hover:border-brand-cyan/50 hover:bg-brand-surface-elevated"
              aria-label={`Switch language to ${currentLang === 'en' ? 'Arabic' : 'English'}`}
            >
              <Globe className="h-3.5 w-3.5 text-brand-cyan transition-transform duration-300 group-hover:rotate-45" />
              <span>{t('nav.switchLang')}</span>
            </button>

            {/* Contact CTA */}
            <Link to={`/${currentLang}/contact`}>
              <Button
                size="sm"
                variant="primary"
                icon={<ArrowUpRight className="h-3.5 w-3.5" />}
              >
                {t('nav.letsTalk')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleLangToggle}
              className="flex items-center gap-1 rounded-md border border-brand-border bg-brand-surface px-2.5 py-1.5 text-xs font-medium text-brand-text"
              aria-label="Switch Language"
            >
              <Globe className="h-3.5 w-3.5 text-brand-cyan" />
              <span>{currentLang === 'en' ? 'عربي' : 'EN'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-brand-border bg-brand-surface p-2 text-brand-text hover:border-brand-cyan"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-brand-cyan" />
              ) : (
                <Menu className="h-5 w-5 text-brand-cyan" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={cn(
              'mt-3 rounded-2xl border border-brand-border bg-brand-surface/95 p-5 shadow-2xl backdrop-blur-xl md:hidden transition-all duration-300 animate-fadeIn',
              isRtl ? 'text-right' : 'text-left'
            )}
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                    isActiveLink(link.href)
                      ? 'bg-brand-cyan/15 text-brand-cyan font-semibold'
                      : 'text-brand-muted hover:bg-brand-surface-elevated hover:text-brand-text'
                  )}
                >
                  {link.name}
                </Link>
              ))}

              <div className="mt-3 pt-3 border-t border-brand-border/70 flex flex-col gap-2">
                <Link to={`/${currentLang}/contact`} className="w-full">
                  <Button
                    size="md"
                    variant="primary"
                    className="w-full"
                    icon={<ArrowUpRight className="h-4 w-4" />}
                  >
                    {t('nav.letsTalk')}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};
