import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface Scene03Props {
  isRtl: boolean;
}

const codeLines = [
  { indent: 0, content: 'const', keyword: true, rest: ' experience = {' },
  { indent: 1, content: 'empathy', keyword: false, rest: ': true,' },
  { indent: 1, content: 'clarity', keyword: false, rest: ': true,' },
  { indent: 1, content: 'purpose', keyword: false, rest: ': "solve real problems",' },
  { indent: 0, content: '};', keyword: false, rest: '' },
  { indent: 0, content: '', keyword: false, rest: '' },
  { indent: 0, content: 'function', keyword: true, rest: ' buildInterface(idea) {' },
  { indent: 1, content: 'return', keyword: true, rest: ' understand(idea)' },
  { indent: 2, content: '.design()', keyword: false, rest: '' },
  { indent: 2, content: '.develop()', keyword: false, rest: '' },
  { indent: 2, content: '.ship();', keyword: false, rest: '' },
  { indent: 0, content: '}', keyword: false, rest: '' },
];

const uiElements = [
  { type: 'navbar', label: 'Navigation' },
  { type: 'hero', label: 'Hero Section' },
  { type: 'cards', label: 'Content Grid' },
  { type: 'cta', label: 'Call to Action' },
];

export const Scene03Discovery: React.FC<Scene03Props> = ({ isRtl }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState(codeLines.length);
  const [showUI, setShowUI] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisibleLines(codeLines.length);
      setShowUI(true);
      return;
    }

    if (!sectionRef.current) return;

    // Start with 0 for animation
    setVisibleLines(0);
    setShowUI(false);

    let typingTimer: ReturnType<typeof setInterval> | null = null;

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

      // ScrollTrigger for progressive typing + UI reveal
      ScrollTrigger.create({
        trigger: editorRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          let line = 0;
          typingTimer = setInterval(() => {
            line++;
            setVisibleLines(line);
            if (line >= codeLines.length) {
              if (typingTimer) clearInterval(typingTimer);
              setTimeout(() => {
                setShowUI(true);
                gsap.fromTo(
                  '.s3-ui-element',
                  { opacity: 0, y: 12, scale: 0.98 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: 'power2.out',
                  }
                );
              }, 400);
            }
          }, 90);
        },
      });
    }, sectionRef);

    return () => {
      if (typingTimer) clearInterval(typingTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-scene-03"
      aria-label={isRtl ? 'الاكتشاف' : 'The Discovery'}
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-brand-bg py-16 lg:py-24"
    >
      {/* Ambient glow - blue center */}
      <div
        className="absolute top-1/2 right-0 w-[450px] h-[450px] rounded-full bg-brand-blue/8 blur-[120px] pointer-events-none -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Copy */}
          <div className={cn('space-y-6', isRtl ? 'text-right order-1 lg:order-1' : 'text-left order-2 lg:order-1')}>
            <div className={cn('flex items-center gap-3', isRtl ? 'justify-end flex-row-reverse' : '')}>
              <span className="font-mono text-xs text-brand-blue font-bold tracking-[0.2em] uppercase">03</span>
              <span className="w-8 h-px bg-brand-blue/40" />
              <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">
                {isRtl ? 'الاكتشاف' : 'The Discovery'}
              </span>
            </div>

            <h2
              ref={headlineRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight"
            >
              {isRtl ? (
                <>
                  عندما بدأت الأفكار
                  <br />
                  <span className="text-brand-blue">تتحول لتطبيقات عملية.</span>
                </>
              ) : (
                <>
                  When ideas became
                  <br />
                  <span className="text-brand-blue">working software.</span>
                </>
              )}
            </h2>

            <p
              ref={bodyRef}
              className="text-brand-muted text-base sm:text-lg leading-relaxed max-w-lg"
              style={{ direction: isRtl ? 'rtl' : 'ltr' }}
            >
              {isRtl
                ? 'تعلّمت أن البرمجة لا تقتصر على كتابة سطور الأكواد، بل هي فهم حقيقي للمشكلة وبناء حل رقمي مريح وواضح لمن يستخدمه.'
                : "I learned that development is more than syntax. It is about understanding the problem clearly and creating an interface that feels straightforward and reliable to use."}
            </p>

            {/* Workflow steps */}
            <div className={cn('flex flex-wrap gap-2.5 pt-2', isRtl ? 'justify-end' : '')}>
              {[
                { en: '1. Understand', ar: '١. فهم المشكلة' },
                { en: '2. Design', ar: '٢. التصميم' },
                { en: '3. Develop', ar: '٣. التطوير' },
                { en: '4. Ship', ar: '٤. الإطلاق' },
              ].map((tag, i) => (
                <span
                  key={i}
                  className="font-mono text-xs px-3 py-1.5 rounded-full border border-brand-blue/30 text-brand-blue/90 bg-brand-blue/8 backdrop-blur-sm"
                >
                  {isRtl ? tag.ar : tag.en}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Code to UI transformation */}
          <div className={cn('order-1', isRtl ? 'lg:order-2' : 'lg:order-2')}>
            <div className="relative">
              {/* Code editor */}
              <div
                ref={editorRef}
                className={cn(
                  'glass-panel rounded-2xl overflow-hidden border border-brand-border/60 shadow-xl transition-all duration-700',
                  showUI ? 'opacity-35 scale-95 translate-y-2' : 'opacity-100 scale-100'
                )}
              >
                {/* Editor chrome */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-brand-border/40 bg-brand-surface/85">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald/60" />
                  </div>
                  <span className="font-mono text-[11px] text-brand-muted">experience.ts</span>
                  <span className="font-mono text-[10px] text-brand-cyan animate-pulse">●</span>
                </div>

                {/* Code lines */}
                <div className="p-4 space-y-0.5 min-h-[220px] font-mono text-xs leading-6">
                  {codeLines.map((line, i) => (
                    <div
                      key={i}
                      className={cn(
                        'flex items-start gap-3 transition-opacity duration-150',
                        i < visibleLines ? 'opacity-100' : 'opacity-0'
                      )}
                    >
                      <span className="text-brand-muted/40 w-4 text-right shrink-0 select-none">{i + 1}</span>
                      <span>
                        {Array.from({ length: line.indent }).map((_, j) => (
                          <span key={j} className="inline-block w-4" />
                        ))}
                        <span className={line.keyword ? 'text-brand-blue font-semibold' : 'text-brand-cyan'}>
                          {line.content}
                        </span>
                        <span className="text-brand-text/80">{line.rest}</span>
                      </span>
                    </div>
                  ))}
                  {/* Blinking cursor */}
                  {visibleLines > 0 && visibleLines < codeLines.length && (
                    <div className="flex items-center gap-3">
                      <span className="text-brand-muted/40 w-4 text-right shrink-0" />
                      <span className="inline-block w-1.5 h-4 bg-brand-cyan animate-pulse" />
                    </div>
                  )}
                </div>
              </div>

              {/* UI preview overlay */}
              <div
                ref={uiRef}
                className={cn(
                  'rounded-2xl overflow-hidden border border-brand-cyan/40 shadow-2xl transition-all duration-700 bg-brand-bg/95',
                  showUI
                    ? 'relative opacity-100 scale-100 mt-[-180px] sm:mt-[-190px] z-20 pointer-events-auto'
                    : 'hidden pointer-events-none'
                )}
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-brand-border/40 bg-brand-surface/90">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald/60" />
                  </div>
                  <div className="flex-1 mx-3 bg-brand-bg/70 rounded-md px-3 py-1 border border-brand-border/40 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-brand-muted">https://aya.dev/experience</span>
                    <span className="w-2 h-2 rounded-full bg-brand-emerald/80" />
                  </div>
                </div>

                {/* Assembled UI */}
                <div className="p-4 space-y-3">
                  {uiElements.map((el, i) => (
                    <div
                      key={i}
                      className={cn(
                        's3-ui-element rounded-lg border border-brand-border/40 transition-all',
                        el.type === 'navbar' && 'h-8 bg-brand-surface/60 flex items-center px-3 gap-3',
                        el.type === 'hero' && 'h-18 p-3 bg-gradient-to-r from-brand-cyan/10 via-brand-blue/10 to-transparent flex flex-col justify-center gap-1.5',
                        el.type === 'cards' && 'grid grid-cols-3 gap-2 bg-transparent border-0',
                        el.type === 'cta' && 'h-9 bg-brand-cyan/15 border-brand-cyan/30 flex items-center justify-center'
                      )}
                    >
                      {el.type === 'navbar' && (
                        <>
                          <div className="w-10 h-2 rounded bg-brand-cyan/50" />
                          <div className="flex-1" />
                          <div className="w-5 h-2 rounded bg-brand-muted/40" />
                          <div className="w-5 h-2 rounded bg-brand-muted/40" />
                          <div className="w-5 h-2 rounded bg-brand-muted/40" />
                        </>
                      )}
                      {el.type === 'hero' && (
                        <>
                          <div className="w-28 h-2.5 rounded bg-brand-cyan/60" />
                          <div className="w-40 h-2 rounded bg-brand-muted/40" />
                        </>
                      )}
                      {el.type === 'cards' && (
                        <>
                          {[0, 1, 2].map(j => (
                            <div key={j} className="h-14 rounded-lg bg-brand-surface/60 border border-brand-border/40 p-2 flex flex-col justify-between">
                              <div className="w-8 h-2 rounded bg-brand-blue/50" />
                              <div className="w-full h-1.5 rounded bg-brand-muted/30" />
                            </div>
                          ))}
                        </>
                      )}
                      {el.type === 'cta' && (
                        <div className="w-24 h-2.5 rounded bg-brand-cyan/70 font-mono text-[9px] text-center text-brand-bg font-bold flex items-center justify-center">
                          EXPLORE PRODUCT
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continuity spine line to Scene 04 */}
      <div className="flex justify-center mt-12" aria-hidden="true">
        <div className="w-px h-8 bg-gradient-to-b from-brand-blue/40 via-brand-blue/20 to-transparent" />
      </div>
    </section>
  );
};
