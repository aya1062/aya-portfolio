import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface Scene02Props {
  isRtl: boolean;
}

interface TransformStep {
  id: number;
  dataLabel: string;
  dataValue: string;
  symbol: string;
  codeKeyword: string;
  codeIdentifier: string;
  codeValue: string;
  explanationEn: string;
  explanationAr: string;
}

const steps: TransformStep[] = [
  {
    id: 1,
    dataLabel: 'Account',
    dataValue: 'Revenue: 42,500',
    symbol: 'const',
    codeKeyword: 'const',
    codeIdentifier: 'monthlyRevenue',
    codeValue: '= 42_500;',
    explanationEn: 'Static entries become defined variables',
    explanationAr: 'البيانات الثابتة تصبح متغيرات برمجية',
  },
  {
    id: 2,
    dataLabel: 'Formula',
    dataValue: '=SUM(B2:B12)',
    symbol: '=>',
    codeKeyword: 'const',
    codeIdentifier: 'calculateTotal',
    codeValue: '= (items) => items.reduce(...);',
    explanationEn: 'Formulas evolve into reusable algorithms',
    explanationAr: 'المعادلات تتحول إلى خوارزميات قابلة لإعادة الاستخدام',
  },
  {
    id: 3,
    dataLabel: 'Audit Check',
    dataValue: 'Assets == Liab + Equity',
    symbol: '===',
    codeKeyword: 'if',
    codeIdentifier: '(!isBalanced)',
    codeValue: 'throw new AuditError();',
    explanationEn: 'Financial controls become robust validation logic',
    explanationAr: 'قواعد التدقيق تصبح منطق تحقق قوي ومحكم',
  },
  {
    id: 4,
    dataLabel: 'Deliverable',
    dataValue: 'Financial Statement',
    symbol: '{}',
    codeKeyword: 'return',
    codeIdentifier: 'renderExperience',
    codeValue: '({ insights, data });',
    explanationEn: 'Reports transform into interactive user interfaces',
    explanationAr: 'التقارير تتحول إلى تجارب رقمية تفاعلية',
  },
];

export const Scene02Shift: React.FC<Scene02Props> = ({ isRtl }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const transformBoxRef = useRef<HTMLDivElement>(null);
  const svgLinesRef = useRef<SVGSVGElement>(null);

  // Fallback state for non-motion / accessibility
  const [activeStage, setActiveStage] = useState<number>(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setActiveStage(3); // show mature code stage directly
      return;
    }

    if (!sectionRef.current || !transformBoxRef.current) return;

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

      // SVG morph path animation
      gsap.fromTo(
        '.s2-morph-line',
        { strokeDashoffset: 500 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: transformBoxRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Connected Data-to-Code Scrub Timeline
      const scrubTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: transformBoxRef.current,
          start: 'top 65%',
          end: 'bottom 45%',
          scrub: 1.0,
          onUpdate: (self) => {
            const stepIdx = Math.min(3, Math.floor(self.progress * 4));
            setActiveStage(stepIdx);
          },
        },
      });

      // 1. Grid lines reorganize into code guides
      scrubTimeline.to('.s2-table-grid', {
        opacity: 0.2,
        borderColor: 'rgba(56, 189, 248, 0.4)',
        duration: 0.3,
      });

      // 2. Spreadsheet header morphs to Code Editor tabs
      scrubTimeline.to('.s2-excel-header', {
        opacity: 0,
        y: -10,
        duration: 0.2,
      }, 0.1);

      scrubTimeline.fromTo('.s2-code-header', {
        opacity: 0,
        y: 10,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.2,
      }, 0.25);

      // 3. Staggered row transform: data row dissolves, symbol illuminates, code line crystallizes
      steps.forEach((_, i) => {
        const startPoint = 0.2 + i * 0.18;

        scrubTimeline.to(`.s2-data-row-${i}`, {
          opacity: 0.15,
          x: isRtl ? 15 : -15,
          duration: 0.25,
        }, startPoint);

        scrubTimeline.fromTo(`.s2-symbol-${i}`, {
          scale: 0.5,
          opacity: 0,
        }, {
          scale: 1,
          opacity: 1,
          color: '#22d3ee',
          duration: 0.2,
        }, startPoint + 0.08);

        scrubTimeline.fromTo(`.s2-code-row-${i}`, {
          opacity: 0,
          x: isRtl ? -15 : 15,
        }, {
          opacity: 1,
          x: 0,
          duration: 0.25,
        }, startPoint + 0.15);
      });

      // 4. Final code editor aura glow
      scrubTimeline.to('.s2-editor-glow', {
        opacity: 1,
        duration: 0.3,
      }, 0.85);

    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <section
      ref={sectionRef}
      id="about-scene-02"
      aria-label={isRtl ? 'التحول' : 'The Shift'}
      className="relative overflow-hidden bg-brand-bg py-16 lg:py-24"
    >
      {/* Background SVG connecting guides */}
      <svg
        ref={svgLinesRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          className="s2-morph-line"
          d="M 50,0 Q 200,200 400,300 T 800,600"
          stroke="url(#s2-gradient)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="500"
          strokeDashoffset="500"
        />
        <defs>
          <linearGradient id="s2-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-brand-emerald/6 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Narrative text */}
          <div className={cn('space-y-6', isRtl ? 'text-right order-2 lg:order-2' : 'text-left order-2 lg:order-1')}>
            <div className={cn('flex items-center gap-3', isRtl ? 'justify-end flex-row-reverse' : '')}>
              <span className="font-mono text-xs text-brand-emerald font-bold tracking-[0.2em] uppercase">02</span>
              <span className="w-8 h-px bg-brand-emerald/40" />
              <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">
                {isRtl ? 'التحول' : 'The Shift'}
              </span>
            </div>

            <h2
              ref={headlineRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight"
            >
              {isRtl ? (
                <>
                  وبعدها اكتشفت
                  <br />
                  <span className="text-brand-emerald">عالمًا جديدًا</span>
                  <br />
                  لصناعة الحلول.
                </>
              ) : (
                <>
                  Then I discovered
                  <br />
                  <span className="text-brand-emerald">another way</span>
                  <br />
                  to build solutions.
                </>
              )}
            </h2>

            <p
              ref={bodyRef}
              className="text-brand-muted text-base sm:text-lg leading-relaxed max-w-lg"
              style={{ direction: isRtl ? 'rtl' : 'ltr' }}
            >
              {isRtl
                ? 'مع البرمجة، وجدت مساحة يلتقي فيها التفكير المنطقي مع الإبداع العملي — حيث تتحول متطلبات العمل من مجرد أرقام وحسابات إلى أدوات رقمية مفيدة.'
                : 'Programming gave me a space where analytical thinking could meet practical creativity — turning business logic into tools people can actually use.'}
            </p>

            {/* Micro transformation badge */}
            <div className={cn('pt-2 flex flex-col gap-2', isRtl ? 'items-end' : 'items-start')}>
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-brand-emerald/30 bg-brand-surface/60 backdrop-blur-sm">
                <span className="font-mono text-xs text-brand-muted">
                  {isRtl ? 'جداول البيانات' : 'Spreadsheets'}
                </span>
                <span className="text-brand-emerald font-mono text-xs">&rarr;</span>
                <span className="font-mono text-xs text-brand-cyan font-semibold">
                  {isRtl ? 'كود برمجي عملي' : 'Working Code'}
                </span>
              </div>
              <p className="font-mono text-[11px] text-brand-muted/70">
                {isRtl
                  ? `المرحلة الحالية: ${steps[activeStage]?.explanationAr}`
                  : `Active evolution: ${steps[activeStage]?.explanationEn}`}
              </p>
            </div>
          </div>

          {/* Right: Signature Data-to-Code Morph Panel */}
          <div className={cn('order-1', isRtl ? 'lg:order-1' : 'lg:order-2')}>
            <div
              ref={transformBoxRef}
              className="relative glass-panel rounded-2xl border border-brand-border/60 shadow-2xl overflow-hidden transition-all duration-300"
            >
              {/* Header swap: Spreadsheet chrome vs IDE tabs */}
              <div className="relative h-12 border-b border-brand-border/40 bg-brand-surface/90 px-4 flex items-center justify-between">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald/60" />
                </div>

                {/* Overlapping Headers */}
                <div className="relative flex-1 mx-4 h-6 flex items-center justify-center">
                  <span className="s2-excel-header absolute font-mono text-[11px] text-brand-muted tracking-wide flex items-center gap-2">
                    <span className="text-brand-emerald font-bold">XLS</span> audit_log.csv
                  </span>
                  <span className="s2-code-header absolute font-mono text-[11px] text-brand-cyan tracking-wide flex items-center gap-2 opacity-0">
                    <span className="text-brand-blue font-bold">TS</span> solutionEngine.ts
                  </span>
                </div>

                <div className="font-mono text-[10px] text-brand-muted bg-brand-bg/70 px-2 py-0.5 rounded border border-brand-border/30">
                  {isRtl ? 'تحوّل مباشر' : 'Live Morph'}
                </div>
              </div>

              {/* Transformation Stage Container */}
              <div className="s2-table-grid p-4 sm:p-6 space-y-4 relative min-h-[300px] border-b border-brand-border/20">
                {steps.map((step, i) => (
                  <div
                    key={step.id}
                    className="relative grid grid-cols-12 gap-2 items-center py-2 border-b border-brand-border/15 last:border-b-0"
                  >
                    {/* Left: Original Accounting Data */}
                    <div className={cn('s2-data-row-' + i, 'col-span-5 flex flex-col font-mono')}>
                      <span className="text-[10px] text-brand-muted/70 uppercase tracking-widest">{step.dataLabel}</span>
                      <span className="text-xs font-semibold text-brand-text truncate">{step.dataValue}</span>
                    </div>

                    {/* Center: Morphing programming operator symbol */}
                    <div className="col-span-2 flex justify-center">
                      <span
                        className={cn(
                          's2-symbol-' + i,
                          'inline-block px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-brand-surface/80 border border-brand-border/40 text-brand-muted'
                        )}
                      >
                        {step.symbol}
                      </span>
                    </div>

                    {/* Right: Crystallized Code Line */}
                    <div className={cn('s2-code-row-' + i, 'col-span-5 flex flex-col font-mono text-left opacity-0')}>
                      <span className="text-[10px] text-brand-blue font-semibold">{step.codeKeyword}</span>
                      <div className="text-xs truncate">
                        <span className="text-brand-cyan font-medium">{step.codeIdentifier} </span>
                        <span className="text-brand-text/80">{step.codeValue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom footer status */}
              <div className="px-4 py-2.5 bg-brand-surface/50 flex items-center justify-between font-mono text-[11px]">
                <div className="flex items-center gap-2 text-brand-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                  <span>{isRtl ? 'منطق الأعمال متكامل' : 'Business Logic &rarr; Code'}</span>
                </div>
                <span className="text-brand-cyan text-[10px] font-semibold">
                  UTF-8 &bull; TypeScript
                </span>
              </div>

              {/* Edge glow */}
              <div
                className="s2-editor-glow absolute inset-0 pointer-events-none rounded-2xl border border-brand-cyan/30 shadow-[0_0_25px_rgba(34,211,238,0.15)] opacity-0 transition-opacity"
                aria-hidden="true"
              />
            </div>

            {/* Scroll indicator for the transformation */}
            <p className="text-center font-mono text-[10px] text-brand-muted/60 mt-3 uppercase tracking-widest">
              {isRtl ? 'مرر للأسفل لرؤية تحول البيانات لكود' : 'Scroll down to observe data-to-code morph'}
            </p>
          </div>
        </div>
      </div>

      {/* Continuity spine line to Scene 03 */}
      <div className="flex justify-center mt-12" aria-hidden="true">
        <div className="w-px h-8 bg-gradient-to-b from-brand-emerald/40 via-brand-emerald/20 to-transparent" />
      </div>
    </section>
  );
};
