import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AuroraGlow } from '../../components/ui/AuroraGlow';
import { BrandLogo } from '../../components/ui/BrandLogo';
import { CodeToWebsite } from '../../components/storytelling/CodeToWebsite';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { currentLang, isRtl } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightVisualRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // GSAP 2-second Staggered Entrance Animation with cleanup
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Left column stagger reveal
      tl.fromTo(
        '.hero-stagger-item',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.1 },
        0.1
      );

      // Right column visual reveal with scale
      tl.fromTo(
        rightVisualRef.current,
        { opacity: 0, scale: 0.95, y: 18 },
        { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power2.out' },
        0.25
      );

      // Single scroll indicator entrance
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.1
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Subtle 3D Parallax Tilt Effect on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const moveX = (clientX / innerWidth - 0.5) * 16;
    const moveY = (clientY / innerHeight - 0.5) * 16;

    if (rightVisualRef.current) {
      gsap.to(rightVisualRef.current, {
        x: moveX,
        y: moveY,
        rotateY: moveX * 0.25,
        rotateX: -moveY * 0.25,
        duration: 0.9,
        ease: 'power1.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (rightVisualRef.current) {
      gsap.to(rightVisualRef.current, {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between pt-4 sm:pt-8 pb-10 sm:pb-14 overflow-hidden"
      aria-label="Aya Portfolio Hero Section"
    >
      {/* Dynamic Aurora Ambient Lighting */}
      <AuroraGlow
        variant="cyan"
        size="lg"
        intensity="subtle"
        className="top-6 -left-36"
      />
      <AuroraGlow
        variant="emerald"
        size="md"
        intensity="subtle"
        className="bottom-6 -right-24"
      />
      <AuroraGlow
        variant="blue"
        size="xl"
        intensity="subtle"
        className="top-1/4 right-1/4"
      />

      <Container size="xl" className="my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center py-4">
          {/* ================= LEFT COLUMN: EDITORIAL INTRODUCTION ================= */}
          <div
            ref={leftContentRef}
            className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6 z-10"
          >
            {/* Eyebrow Badge */}
            <div className="hero-stagger-item">
              <Badge variant="cyan" dot className="border-brand-cyan/40 bg-brand-surface/90 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                {t('hero.eyebrow')}
              </Badge>
            </div>

            {/* Main Brand Title & Editorial Headline */}
            <div className="hero-stagger-item space-y-3">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <h1 className="flex items-center">
                  <span className="sr-only">{t('hero.mainHeading')}</span>
                  <BrandLogo className="h-12 sm:h-16 lg:h-20 w-auto drop-shadow-[0_0_25px_rgba(34,211,238,0.25)]" />
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-emerald/40 bg-brand-surface/80 px-3 py-1 text-xs font-mono text-brand-emerald backdrop-blur-sm shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald animate-pulse" />
                  MERN & WordPress
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-emerald bg-clip-text text-transparent">
                  {t('hero.headline')}
                </span>
              </h2>
            </div>

            {/* Supporting Editorial Paragraph */}
            <p className="hero-stagger-item text-base sm:text-lg text-brand-muted leading-relaxed max-w-xl font-normal">
              {t('hero.supportingText')}
            </p>

            {/* Specialized Capabilities Badges */}
            <div className="hero-stagger-item flex flex-wrap items-center gap-2 pt-1">
              <span className="rounded-md border border-brand-border bg-brand-surface/70 px-2.5 py-1 text-xs font-mono text-brand-muted">
                {isRtl ? 'تطبيقات MERN' : 'MERN Stack'}
              </span>
              <span className="rounded-md border border-brand-border bg-brand-surface/70 px-2.5 py-1 text-xs font-mono text-brand-muted">
                {isRtl ? 'مواقع ووردبريس' : 'WordPress Development'}
              </span>
              <span className="rounded-md border border-brand-border bg-brand-surface/70 px-2.5 py-1 text-xs font-mono text-brand-muted">
                {isRtl ? 'دقة تحليلية' : 'Analytical Thinking'}
              </span>
            </div>

            {/* Call to Action Cluster */}
            <div className="hero-stagger-item flex flex-wrap items-center gap-3.5 pt-3 w-full sm:w-auto">
              {/* Primary CTA */}
              <Link to={`/${currentLang}/portfolio`} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)]"
                  icon={<ArrowUpRight className="h-4 w-4" />}
                >
                  {t('hero.primaryCta')}
                </Button>
              </Link>

              {/* Secondary CTA */}
              <Link to={`/${currentLang}/contact`} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto hover:border-brand-emerald/60 hover:text-brand-emerald"
                  icon={<Sparkles className="h-4 w-4 text-brand-emerald" />}
                >
                  {t('hero.secondaryCta')}
                </Button>
              </Link>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: SEAMLESS TRANSFORMATION ENGINE ================= */}
          <div
            ref={rightVisualRef}
            className="lg:col-span-5 flex justify-center w-full z-10 [perspective:1000px]"
          >
            <CodeToWebsite />
          </div>
        </div>
      </Container>

      {/* ================= SINGLE CLEAR SCROLL INDICATOR ================= */}
      <div
        ref={scrollIndicatorRef}
        className="mt-6 sm:mt-10 flex flex-col items-center justify-center gap-2 text-center z-10"
      >
        <a
          href="#the-story"
          className="group inline-flex flex-col items-center gap-2 text-brand-muted hover:text-brand-cyan transition-colors"
          aria-label={t('hero.scrollIndicator')}
        >
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-brand-muted/80 group-hover:text-brand-cyan transition-colors">
            {t('hero.scrollIndicator')}
          </span>
          <div className="flex h-7 w-4.5 items-start justify-center rounded-full border border-brand-border/80 p-1 group-hover:border-brand-cyan transition-colors">
            <div className="h-1.5 w-1 rounded-full bg-brand-cyan animate-bounce" />
          </div>
        </a>
      </div>

      {/* Transition Anchor for Phase 3 */}
      <div id="the-story" className="relative h-1 w-full" aria-hidden="true" />
    </section>
  );
};
