import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

interface Scene06Props {
  isRtl: boolean;
}

export const Scene06NextChapter: React.FC<Scene06Props> = ({ isRtl }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const auroraGlowRef = useRef<HTMLDivElement>(null);
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'en';

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Gentle Aurora breathe
      gsap.to(auroraGlowRef.current, {
        scale: 1.1,
        opacity: 0.8,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 36 },
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

      // Body reveal
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA reveal
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subtle Aurora guide motif
      gsap.fromTo(
        '.s6-aurora-spine',
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-scene-06"
      aria-label={isRtl ? 'الفصل القادم' : 'The Next Chapter'}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-bg py-20 lg:py-28"
    >
      {/* Controlled, refined Aurora composite glow */}
      <div
        ref={auroraGlowRef}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-[500px] h-[350px] rounded-full bg-brand-cyan/8 blur-[100px]" />
        <div className="w-[350px] h-[250px] rounded-full bg-brand-emerald/7 blur-[90px] -translate-y-8" />
      </div>

      {/* Narrative closing connection to Scene 01 numbers */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10" aria-hidden="true">
        <span className="absolute top-12 left-10 font-mono text-2xl text-brand-cyan font-bold">∑</span>
        <span className="absolute bottom-16 right-16 font-mono text-2xl text-brand-emerald font-bold">&lt;/&gt;</span>
        <span className="absolute top-1/3 right-12 font-mono text-xl text-brand-blue font-bold">01</span>
        <span className="absolute bottom-1/3 left-14 font-mono text-xl text-brand-cyan font-bold">06</span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Scene Badge */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-brand-cyan/50" />
          <span className="font-mono text-xs text-brand-cyan font-bold tracking-[0.25em] uppercase">06</span>
          <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">
            {isRtl ? 'الفصل القادم' : 'The Next Chapter'}
          </span>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-brand-cyan/50" />
        </div>

        {/* Main Headline (Preserved verbatim as required) */}
        <h2
          ref={headlineRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-text leading-tight mb-6"
        >
          {isRtl ? (
            <>
              وحكايتي
              <br />
              <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-emerald bg-clip-text text-transparent">
                لسه بتتكتب.
              </span>
            </>
          ) : (
            <>
              My story is still
              <br />
              <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-emerald bg-clip-text text-transparent">
                being written.
              </span>
            </>
          )}
        </h2>

        {/* Supporting Copy */}
        <p
          ref={bodyRef}
          className="text-brand-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{ direction: isRtl ? 'rtl' : 'ltr' }}
        >
          {isRtl
            ? 'ومن أجمل فصولها، المشاريع اللي شاركت في تحويل أفكارها لواقع رقمي متقن ومؤثر.'
            : "And some of my favorite chapters are the projects I've helped bring to life through clean code and thoughtful design."}
        </p>

        {/* Refined CTA container with subtle Aurora transition aura */}
        <div
          ref={ctaRef}
          className="relative inline-flex flex-col sm:flex-row gap-4 items-center justify-center p-2 rounded-2xl"
        >
          {/* Subtle Aurora light transition around the CTA */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-cyan/15 via-brand-blue/15 to-brand-emerald/15 blur-lg pointer-events-none"
            aria-hidden="true"
          />

          <Link to={`/${currentLang}/portfolio`} className="relative z-10">
            <Button
              variant="primary"
              size="lg"
              isGlowing
              icon={<ArrowUpRight className={cn('h-5 w-5', isRtl && 'rotate-[-90deg]')} />}
              iconPosition={isRtl ? 'left' : 'right'}
            >
              {isRtl ? 'استكشف أعمالي' : 'Explore My Work'}
            </Button>
          </Link>

          <Link to={`/${currentLang}/contact`} className="relative z-10">
            <Button variant="outline" size="lg">
              {isRtl ? 'تواصل معي' : "Let's Connect"}
            </Button>
          </Link>
        </div>

        {/* Narrative closing connection datum */}
        <div className="mt-16 flex items-center justify-center gap-3" aria-hidden="true">
          <div className="s6-aurora-spine flex-1 max-w-[100px] h-px bg-gradient-to-r from-transparent to-brand-cyan/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan/70 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
          <div className="s6-aurora-spine flex-1 max-w-[100px] h-px bg-gradient-to-l from-transparent to-brand-cyan/40" />
        </div>
      </div>
    </section>
  );
};
