import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface Scene01Props {
  isRtl: boolean;
}

export const Scene01Opening: React.FC<Scene01Props> = ({ isRtl }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Split dual world reveal: left slides in from left, right from right
      gsap.fromTo(
        leftPanelRef.current,
        { opacity: 0, x: isRtl ? 35 : -35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftPanelRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        rightPanelRef.current,
        { opacity: 0, x: isRtl ? -35 : 35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightPanelRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  const scrollToWorld = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={sectionRef}
      id="services-scene-01"
      aria-label={isRtl ? 'المقدمة والمساران' : 'Opening: Two Worlds'}
      className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-brand-bg py-20 lg:py-28"
    >
      {/* Aurora Ambient Background Glows */}
      <div
        className="absolute top-10 left-1/4 w-[450px] h-[350px] rounded-full bg-brand-cyan/6 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-1/4 w-[450px] h-[350px] rounded-full bg-brand-emerald/6 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Editorial Headline */}
        <div className={cn('text-center max-w-3xl mx-auto mb-16', isRtl ? 'space-y-4' : 'space-y-4')}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/30 bg-brand-surface/70 font-mono text-xs text-brand-cyan mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
            <span>{isRtl ? 'طريقتان للتطوير — هدف عملي واحد' : 'TWO APPROACHES — ONE PRACTICAL GOAL'}</span>
          </div>

          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-text leading-tight tracking-tight"
          >
            {isRtl ? (
              <>
                طريقتان للبناء،
                <br />
                <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-emerald bg-clip-text text-transparent">
                  وهدف واحد: أن تتحول الأفكار إلى حلول حقيقية.
                </span>
              </>
            ) : (
              <>
                Two ways to build.
                <br />
                <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-emerald bg-clip-text text-transparent">
                  One goal: make ideas work.
                </span>
              </>
            )}
          </h1>

          <p className="text-brand-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {isRtl
              ? 'سواء كنت بحاجة لموقع ووردبريس سهل الإدارة وسريع الإطلاق، أو تطبيق ويب مخصص بالكامل، أساعدك في اختيار وبناء الحل المناسب لاحتياجاتك الواقعية.'
              : 'Whether you need a flexible, content-ready WordPress website or a bespoke full-stack application, I help you build the right tool for your specific goals.'}
          </p>
        </div>

        {/* Cinematic Split Composition: Two Distinct Paths */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* World 1: WordPress */}
          <div
            ref={leftPanelRef}
            onClick={() => scrollToWorld('services-scene-02')}
            className={cn(
              'group relative rounded-3xl border border-brand-emerald/30 bg-gradient-to-b from-brand-surface/90 to-brand-bg/90 p-8 sm:p-10 shadow-xl cursor-pointer',
              'hover:border-brand-emerald/70 transition-all duration-500 overflow-hidden flex flex-col justify-between'
            )}
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-brand-emerald/10 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs px-3 py-1 rounded-full border border-brand-emerald/40 bg-brand-emerald/10 text-brand-emerald font-semibold">
                  WORLD 01
                </span>
                <span className="font-mono text-xs text-brand-muted/70">
                  CMS & Business Platforms
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-3 group-hover:text-brand-emerald transition-colors">
                {isRtl ? 'عالم ووردبريس وحلول الأعمال' : 'WordPress Development'}
              </h2>

              <p className="text-brand-muted text-sm sm:text-base leading-relaxed mb-6">
                {isRtl
                  ? 'مواقع سريعة، مخصصة، وسهلة الإدارة بالكامل، مصممة للشركات، المتاجر الإلكترونية، الفنادق، والعقارات.'
                  : 'Tailored, high-performance websites with intuitive content administration for businesses, e-commerce, hospitality, and real estate.'}
              </p>

              {/* Focus tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  isRtl ? 'مواقع الشركات' : 'Business Sites',
                  isRtl ? 'متاجر إلكترونية' : 'E-Commerce',
                  isRtl ? 'ضيافة وفنادق' : 'Hospitality',
                  isRtl ? 'عقارات' : 'Real Estate',
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border/50 text-brand-text/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-bold text-brand-emerald group-hover:translate-x-1 transition-transform">
              <span>{isRtl ? 'استكشف عالم ووردبريس' : 'Explore WordPress World'}</span>
              <span>&rarr;</span>
            </div>
          </div>

          {/* World 2: MERN & Custom Web Development */}
          <div
            ref={rightPanelRef}
            onClick={() => scrollToWorld('services-scene-03')}
            className={cn(
              'group relative rounded-3xl border border-brand-cyan/30 bg-gradient-to-b from-brand-surface/90 to-brand-bg/90 p-8 sm:p-10 shadow-xl cursor-pointer',
              'hover:border-brand-cyan/70 transition-all duration-500 overflow-hidden flex flex-col justify-between'
            )}
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-brand-cyan/10 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs px-3 py-1 rounded-full border border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan font-semibold">
                  WORLD 02
                </span>
                <span className="font-mono text-xs text-brand-muted/70">
                  Full-Stack Applications
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-3 group-hover:text-brand-cyan transition-colors">
                {isRtl ? 'تطوير تطبيقات الويب المخصصة (MERN)' : 'MERN & Custom Development'}
              </h2>

              <p className="text-brand-muted text-sm sm:text-base leading-relaxed mb-6">
                {isRtl
                  ? 'بناء تطبيقات ويب تفاعلية من الصفر، لوحات تحكم متقدمة، أنظمة حجز وإدارة، وواجهات برمجية قوية.'
                  : 'Engineered from scratch: reactive interfaces, sophisticated admin dashboards, booking engines, and scalable RESTful backends.'}
              </p>

              {/* Focus tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  isRtl ? 'تطبيقات الويب' : 'Web Applications',
                  isRtl ? 'لوحات التحكم' : 'Admin Dashboards',
                  isRtl ? 'أنظمة الحجز' : 'Booking Systems',
                  isRtl ? 'واجهات برمجية' : 'APIs & Backends',
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border/50 text-brand-text/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-bold text-brand-cyan group-hover:translate-x-1 transition-transform">
              <span>{isRtl ? 'استكشف عالم التطوير المخصص' : 'Explore Custom Development'}</span>
              <span>&rarr;</span>
            </div>
          </div>

        </div>

      </div>

      {/* Continuity line */}
      <div className="flex justify-center mt-16" aria-hidden="true">
        <div className="w-px h-10 bg-gradient-to-b from-brand-border/50 via-brand-cyan/40 to-transparent" />
      </div>
    </section>
  );
};

