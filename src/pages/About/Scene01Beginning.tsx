import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface Scene01Props {
  isRtl: boolean;
}

const numbers = ['0', '1', '∑', '4', '2', '∫', '7', '0', '9', '$', '3', '8', '%', '2', '5'];
const rows = [
  ['Revenue', '142,500', '↑ 12%'],
  ['Expenses', '98,200', '↓ 3%'],
  ['Net Profit', '44,300', '↑ 8%'],
  ['Assets', '210,000', '↑ 5%'],
  ['Liabilities', '87,400', '↓ 2%'],
];

export const Scene01Beginning: React.FC<Scene01Props> = ({ isRtl }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Floating ambient numbers
      gsap.to('.s1-number', {
        y: 'random(-16, 16)',
        x: 'random(-8, 8)',
        opacity: 'random(0.08, 0.22)',
        duration: 'random(3.5, 6)',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.3, from: 'random' },
        ease: 'sine.inOut',
      });

      // Data grid rows stagger in on scroll
      gsap.fromTo(
        '.s1-row',
        { opacity: 0, x: isRtl ? 24 : -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Headline kinetic reveal
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

      // Body text reveal
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

      // Aurora motif line initialization
      gsap.fromTo(
        '.s1-aurora-spine',
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <section
      ref={sectionRef}
      id="about-scene-01"
      aria-label={isRtl ? 'البداية' : 'The Beginning'}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-bg py-16 lg:py-24"
    >
      {/* Background ambient number cloud */}
      <div
        ref={numbersRef}
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {numbers.map((n, i) => (
          <span
            key={i}
            className={cn(
              's1-number absolute font-mono text-brand-cyan/10 font-bold',
              i % 3 === 0 ? 'text-4xl' : i % 3 === 1 ? 'text-2xl' : 'text-lg'
            )}
            style={{
              left: `${(i * 7.3 + 5) % 95}%`,
              top: `${(i * 11.7 + 8) % 88}%`,
              opacity: 0.08 + (i % 5) * 0.03,
            }}
          >
            {n}
          </span>
        ))}
      </div>

      {/* Top aurora accent - subtle glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[350px] rounded-full bg-brand-cyan/8 blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn('grid lg:grid-cols-2 gap-12 lg:gap-16 items-center')}>
          
          {/* Visual: Abstract financial data sheet */}
          <div className={cn('order-2', isRtl ? 'lg:order-2' : 'lg:order-1')}>
            <div ref={gridRef} className="glass-panel rounded-2xl overflow-hidden border border-brand-border/60 shadow-xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-brand-border/40 bg-brand-surface/85">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald/60" />
                </div>
                <span className="font-mono text-xs text-brand-muted ml-3">
                  financial_analysis.xlsx
                </span>
                <span className="ml-auto font-mono text-[10px] text-brand-cyan/70 bg-brand-cyan/10 px-2 py-0.5 rounded">
                  v1.0
                </span>
              </div>

              {/* Column headers */}
              <div className="grid grid-cols-3 px-4 py-2 border-b border-brand-border/30 bg-brand-surface/50">
                {['Account', 'Amount', 'Change'].map((h, i) => (
                  <span key={i} className="font-mono text-[10px] text-brand-muted uppercase tracking-widest text-right">
                    {h}
                  </span>
                ))}
              </div>

              {/* Data rows */}
              <div className="divide-y divide-brand-border/20">
                {rows.map((row, i) => (
                  <div
                    key={i}
                    className={cn(
                      's1-row grid grid-cols-3 px-4 py-3 transition-colors hover:bg-brand-surface/40',
                      i === 2 && 'bg-brand-cyan/5'
                    )}
                  >
                    <span className="font-mono text-xs text-brand-muted">{row[0]}</span>
                    <span className={cn('font-mono text-xs text-right font-semibold', i === 2 ? 'text-brand-cyan' : 'text-brand-text')}>
                      {row[1]}
                    </span>
                    <span
                      className={cn(
                        'font-mono text-xs text-right font-medium',
                        row[2].includes('↑') ? 'text-brand-emerald' : 'text-red-400'
                      )}
                    >
                      {row[2]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom formula bar */}
              <div className="px-4 py-2.5 border-t border-brand-border/40 bg-brand-bg/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-brand-cyan font-semibold">fx</span>
                  <span className="font-mono text-[11px] text-brand-muted/80">
                    =SUM(B2:B6) &rarr; NPV(0.08, C2:C6)
                  </span>
                </div>
                <span className="font-mono text-[10px] text-brand-emerald">BALANCED</span>
              </div>
            </div>

            {/* Connecting Aurora data indicators */}
            <div className="flex items-center justify-center gap-3 mt-4" aria-hidden="true">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-brand-cyan/40" />
              <div className="flex gap-1.5">
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    className="block w-1.5 h-1.5 rounded-full bg-brand-cyan/50"
                  />
                ))}
              </div>
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-brand-cyan/40" />
            </div>
          </div>

          {/* Copy section */}
          <div className={cn('order-1 space-y-6', isRtl ? 'lg:order-1 text-right' : 'lg:order-2 text-left')}>
            {/* Scene badge */}
            <div className={cn('flex items-center gap-3', isRtl ? 'justify-end flex-row-reverse' : '')}>
              <span className="font-mono text-xs text-brand-cyan font-bold tracking-[0.2em] uppercase">01</span>
              <span className="w-8 h-px bg-brand-cyan/40" />
              <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">
                {isRtl ? 'البداية' : 'The Beginning'}
              </span>
            </div>

            <h2
              ref={headlineRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight"
            >
              {isRtl ? (
                <>
                  قبل سطور الكود،
                  <br />
                  <span className="text-brand-cyan">كانت الأرقام</span>
                  <br />
                  بداية الحكاية.
                </>
              ) : (
                <>
                  Before the code,
                  <br />
                  <span className="text-brand-cyan">there were numbers.</span>
                </>
              )}
            </h2>

            <p
              ref={bodyRef}
              className="text-brand-muted text-base sm:text-lg leading-relaxed max-w-lg"
              style={{ direction: isRtl ? 'rtl' : 'ltr' }}
            >
              {isRtl
                ? 'بدأت رحلتي مع المحاسبة، وهناك تعلّمت أن أنظر لما وراء الأرقام، وأفهم كيف تسير الأعمال، وأبحث عن الوضوح وسط التفاصيل.'
                : 'My journey began in accounting, where I learned to look beyond numbers, understand how businesses work, and find clarity in complex details.'}
            </p>

            {/* Structured pillars from accounting */}
            <div className={cn('grid grid-cols-3 gap-3 pt-2 max-w-sm', isRtl ? 'ml-auto' : '')}>
              {[
                { label: isRtl ? 'المنطق' : 'Logic', value: '∑', desc: isRtl ? 'تفكير تحليلي' : 'Analytical' },
                { label: isRtl ? 'الدقة' : 'Precision', value: '±', desc: isRtl ? 'انتباه للتفاصيل' : 'Exactitude' },
                { label: isRtl ? 'الوضوح' : 'Clarity', value: 'fx', desc: isRtl ? 'حلول منظمة' : 'Structure' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-brand-border/40 bg-brand-surface/40 p-3 text-center transition-colors hover:border-brand-cyan/40 hover:bg-brand-surface/70"
                >
                  <span className="block font-mono text-base text-brand-cyan font-bold mb-1">{item.value}</span>
                  <span className="block font-semibold text-xs text-brand-text mb-0.5">{item.label}</span>
                  <span className="block font-mono text-[9px] text-brand-muted">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Continuity spine line to Scene 02 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center" aria-hidden="true">
        <div className="s1-aurora-spine w-px h-10 bg-gradient-to-b from-brand-cyan/50 via-brand-cyan/20 to-transparent origin-top" />
      </div>
    </section>
  );
};
