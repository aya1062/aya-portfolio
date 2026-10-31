import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import { BrowserFrame } from '../ui/BrowserFrame';
import { 
  Sparkles, 
  Code2, 
  Layers, 
  Globe2, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft,
  Calendar, 
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { cn } from '../../lib/utils';
import gsap from 'gsap';

export type Stage = 1 | 2 | 3 | 4;

interface StageInfo {
  id: Stage;
  labelKey: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  url: string;
  windowTitle: string;
}

export const CodeToWebsite: React.FC = () => {
  const { t } = useTranslation();
  const { isRtl } = useLanguage();
  const [stage, setStage] = useState<Stage>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const sparkNodeRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isTransitioningRef = useRef<boolean>(false);
  const userManuallyControlledRef = useRef<boolean>(false);

  const stages: StageInfo[] = [
    {
      id: 1,
      labelKey: 'hero.interactive.stepIdea',
      icon: Sparkles,
      color: 'text-brand-blue',
      url: 'concept://project-requirements',
      windowTitle: isRtl ? '٠١ — الفكرة والهدف' : '01 — The Project Idea',
    },
    {
      id: 2,
      labelKey: 'hero.interactive.stepCode',
      icon: Code2,
      color: 'text-brand-cyan',
      url: 'editor://src/App.tsx',
      windowTitle: isRtl ? '٠٢ — بناء المنطق والكود' : '02 — Code & Logic',
    },
    {
      id: 3,
      labelKey: 'hero.interactive.stepUI',
      icon: Layers,
      color: 'text-brand-emerald',
      url: 'wireframe://ui-layout',
      windowTitle: isRtl ? '٠٣ — تصميم الواجهة' : '03 — Interface Structure',
    },
    {
      id: 4,
      labelKey: 'hero.interactive.stepLaunch',
      icon: Globe2,
      color: 'text-brand-cyan',
      url: 'demo://lamar-park.preview',
      windowTitle: isRtl ? '٠٤ — نموذج عملي متكامل' : '04 — Interactive Project Preview',
    },
  ];

  const currentStageInfo = stages[stage - 1];

  // Transition controller: reliably handles transitions and kills overlapping timelines
  const runStageTransition = useCallback((targetStage: Stage) => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setStage(targetStage);
      return;
    }

    if (!canvasRef.current) {
      setStage(targetStage);
      return;
    }

    // Kill any existing GSAP timeline to avoid conflict
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    isTransitioningRef.current = true;
    setStage(targetStage);

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        isTransitioningRef.current = false;
      },
    });

    timelineRef.current = tl;

    // Morph the central spark position & pulse
    if (sparkNodeRef.current) {
      let targetCoords = { x: 0, y: 0, scale: 1, opacity: 1 };
      if (targetStage === 1) {
        targetCoords = { x: 0, y: 0, scale: 1.25, opacity: 1 };
      } else if (targetStage === 2) {
        targetCoords = { x: isRtl ? 140 : -140, y: -110, scale: 0.85, opacity: 0.9 };
      } else if (targetStage === 3) {
        targetCoords = { x: isRtl ? -120 : 120, y: -80, scale: 0.9, opacity: 0.85 };
      } else if (targetStage === 4) {
        targetCoords = { x: isRtl ? -140 : 140, y: 90, scale: 1.1, opacity: 1 };
      }

      tl.to(
        sparkNodeRef.current,
        {
          x: targetCoords.x,
          y: targetCoords.y,
          scale: targetCoords.scale,
          duration: 0.65,
          ease: 'power3.out',
        },
        0
      );
    }

    // Morph the panel contents
    tl.fromTo(
      '.stage-content-active',
      { opacity: 0, scale: 0.98, filter: 'blur(3px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' },
      0.1
    );
  }, [isRtl]);

  // Intentional manual interactions: immediately stops autoplay
  const goToStage = (newStage: Stage) => {
    if (newStage === stage || isTransitioningRef.current) return;
    userManuallyControlledRef.current = true;
    setIsPlaying(false);
    runStageTransition(newStage);
  };

  const handleNext = () => {
    if (isTransitioningRef.current) return;
    userManuallyControlledRef.current = true;
    setIsPlaying(false);
    const next = stage === 4 ? 1 : ((stage + 1) as Stage);
    runStageTransition(next);
  };

  const handlePrev = () => {
    if (isTransitioningRef.current) return;
    userManuallyControlledRef.current = true;
    setIsPlaying(false);
    const prev = stage === 1 ? 4 : ((stage - 1) as Stage);
    runStageTransition(prev);
  };

  // Toggle play button: allows user to re-enable autoplay if they wish
  const togglePlay = () => {
    const nextPlayState = !isPlaying;
    setIsPlaying(nextPlayState);
    if (nextPlayState) {
      userManuallyControlledRef.current = false;
    }
  };

  // Autoplay cycle: pauses if hovered or if user took manual control
  useEffect(() => {
    if (!isPlaying || isHovered || userManuallyControlledRef.current) return;

    const timer = setInterval(() => {
      setStage((prev) => {
        const next = prev === 4 ? 1 : ((prev + 1) as Stage);
        runStageTransition(next);
        return next;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, runStageTransition]);

  // Clean up GSAP timelines on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-xl mx-auto select-none"
    >
      {/* ================= CONNECTED STAGE PROGRESS TRACK ================= */}
      <div className="mb-3.5 relative">
        {/* Subtle connecting progress track line */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[2px] bg-brand-border/40 z-0">
          <div
            className="h-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-emerald transition-all duration-700 ease-out"
            style={{ width: `${((stage - 1) / 3) * 100}%` }}
          />
        </div>

        {/* Stage Navigation Pills */}
        <div className="relative z-10 flex items-center justify-between gap-1 sm:gap-2">
          {stages.map((s) => {
            const Icon = s.icon;
            const isActive = stage === s.id;
            const isCompleted = stage > s.id;

            return (
              <button
                key={s.id}
                onClick={() => goToStage(s.id)}
                className={cn(
                  'group relative flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 sm:px-3 py-1.5 text-xs font-mono transition-all duration-300 backdrop-blur-md cursor-pointer',
                  isActive
                    ? 'bg-brand-surface-elevated text-brand-text border border-brand-cyan/70 shadow-[0_0_15px_rgba(34,211,238,0.3)] scale-[1.02]'
                    : isCompleted
                    ? 'bg-brand-surface/90 text-brand-cyan border border-brand-cyan/30 hover:border-brand-cyan/60'
                    : 'bg-brand-surface/70 text-brand-muted hover:text-brand-text hover:bg-brand-surface-elevated/60 border border-brand-border/60'
                )}
                aria-label={`Jump to ${t(s.labelKey)}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <div
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded-full transition-colors',
                    isActive ? 'bg-brand-cyan/20' : 'bg-transparent'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110',
                      isActive ? s.color : 'text-brand-muted'
                    )}
                  />
                </div>
                <span className="text-[11px] font-medium tracking-wide">
                  {t(s.labelKey)}
                </span>
              </button>
            );
          })}

          {/* Auto-cycle play/pause */}
          <button
            onClick={togglePlay}
            className="flex items-center gap-1 rounded-full border border-brand-border/70 bg-brand-surface/80 px-2 py-1 text-[10px] font-mono text-brand-muted hover:border-brand-cyan/40 hover:text-brand-text transition-colors ml-1 rtl:mr-1 rtl:ml-0 cursor-pointer"
            title={isPlaying ? 'Pause Auto-cycle' : 'Start Auto-cycle'}
            aria-label="Toggle auto animation cycle"
          >
            {isPlaying ? (
              <Pause className="h-3 w-3 text-brand-cyan animate-pulse" />
            ) : (
              <Play className="h-3 w-3 text-brand-emerald" />
            )}
          </button>
        </div>
      </div>

      {/* ================= BROWSER FRAME MOCKUP ================= */}
      <BrowserFrame
        url={currentStageInfo.url}
        title={currentStageInfo.windowTitle}
        badge={stage === 4 ? t('hero.interactive.badgeLive') : `STAGE 0${stage}`}
        showAuroraHalo={true}
      >
        <div
          ref={canvasRef}
          className="relative min-h-[380px] sm:min-h-[410px] flex flex-col justify-between p-5 md:p-6 bg-gradient-to-b from-[#091117] via-[#070D12] to-[#0A141A] font-sans overflow-hidden"
        >
          {/* Background Atmospheric Light Glare (Changes color hue per stage) */}
          <div
            className={cn(
              'pointer-events-none absolute -inset-10 transition-all duration-1000 blur-3xl opacity-20',
              stage === 1 && 'bg-radial-gradient from-brand-blue to-transparent',
              stage === 2 && 'bg-radial-gradient from-brand-cyan to-transparent',
              stage === 3 && 'bg-radial-gradient from-brand-emerald to-transparent',
              stage === 4 && 'bg-radial-gradient from-brand-cyan via-brand-emerald to-transparent'
            )}
          />

          {/* Continuous Architectural SVG Grid Overlay */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="hero-mini-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(38, 58, 67, 0.4)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-mini-grid)" />
          </svg>

          {/* ================= THE MORPHING ANCHOR SPARK ================= */}
          <div
            ref={sparkNodeRef}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-transform duration-700 ease-out"
          >
            <div className="relative flex items-center justify-center">
              {/* Outer pulsing rings */}
              <div
                className={cn(
                  'absolute rounded-full transition-all duration-700',
                  stage === 1
                    ? 'h-36 w-36 border border-brand-cyan/30 animate-ping opacity-30'
                    : 'h-10 w-10 border border-brand-cyan/20 opacity-20'
                )}
              />
              <div
                className={cn(
                  'absolute rounded-full transition-all duration-700',
                  stage === 1
                    ? 'h-24 w-24 border border-brand-blue/40 animate-pulse'
                    : 'h-6 w-6 border border-brand-cyan/30'
                )}
              />
              <div
                className={cn(
                  'rounded-full transition-all duration-500 shadow-[0_0_25px_currentColor]',
                  stage === 1
                    ? 'h-11 w-11 bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-emerald text-brand-cyan border border-white/70'
                    : stage === 2
                    ? 'h-3.5 w-3.5 bg-brand-cyan text-brand-cyan shadow-[0_0_12px_#22D3EE]'
                    : stage === 3
                    ? 'h-3 w-3 bg-brand-emerald text-brand-emerald shadow-[0_0_12px_#34D399]'
                    : 'h-3.5 w-3.5 bg-brand-emerald text-brand-emerald shadow-[0_0_16px_#34D399]'
                )}
              >
                {stage === 1 && (
                  <Sparkles className="h-5 w-5 text-[#070D12] m-auto mt-2.5 animate-spin" style={{ animationDuration: '10s' }} />
                )}
              </div>
            </div>
          </div>

          {/* ================= CONTINUOUS STAGE CANVAS ================= */}
          <div className="stage-content-active relative z-10 flex-1 flex flex-col justify-between">
            {/* ---------------- STAGE 1: SPARK (IDEA FORMATION) ---------------- */}
            {stage === 1 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-6">
                <div className="space-y-2 max-w-sm pt-20">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-cyan/40 bg-brand-cyan/10 px-3 py-0.5 text-xs font-mono text-brand-cyan">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
                    {isRtl ? 'نقطة الانطلاق والتصور' : 'THE ORIGIN SPARK'}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-brand-text">
                    {isRtl ? 'كل مشروع عظيم بيبدأ بفكرة' : 'Every great project begins with a spark.'}
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {isRtl
                      ? 'رؤية مجردة وفهم عميق لاحتياجات الناس قبل كتابة سطر كود واحد.'
                      : 'An unformed vision that transforms into rigorous logic, architecture, and living user interfaces.'}
                  </p>
                </div>

                {/* Constellation Vector Connectors */}
                <div className="grid grid-cols-4 gap-2 text-[10px] font-mono text-brand-muted/80 pt-4 border-t border-brand-border/40 w-full">
                  <div className="flex flex-col items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                    <span>01 Logic</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                    <span>02 Purpose</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald" />
                    <span>03 Canvas</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                    <span>04 Impact</span>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- STAGE 2: LOGIC (CODE EDITOR) ---------------- */}
            {stage === 2 && (
              <div className="flex flex-col space-y-3 font-mono text-xs">
                {/* File Header */}
                <div className="flex items-center justify-between border-b border-brand-border/60 pb-2.5">
                  <div className="flex items-center gap-2 text-brand-cyan">
                    <Code2 className="h-3.5 w-3.5" />
                    <span className="text-[11px] font-semibold">AyaStory.tsx</span>
                    <span className="text-[10px] text-brand-muted/70">(TypeScript / React)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-brand-emerald">
                    <Cpu className="h-3 w-3" />
                    <span>MERN + WordPress Stack</span>
                  </div>
                </div>

                {/* Code Window with Syntax Highlighting */}
                <div className="space-y-1.5 leading-relaxed text-left rounded-lg bg-[#060B0F]/60 p-3 border border-brand-border/40" dir="ltr">
                  <div className="text-brand-muted/50 italic">
                    // {t('hero.interactive.codeComment')}
                  </div>
                  <div>
                    <span className="text-[#F43F5E]">interface</span>{' '}
                    <span className="text-brand-emerald">DigitalExperience</span> {'{'}
                  </div>
                  <div className="pl-4">
                    <span className="text-brand-cyan">clientVision</span>: <span className="text-[#FBBF24]">string</span>;
                  </div>
                  <div className="pl-4">
                    <span className="text-brand-cyan">architecture</span>: <span className="text-[#A78BFA]">'MERN'</span> | <span className="text-[#A78BFA]">'WordPress'</span>;
                  </div>
                  <div className="pl-4">
                    <span className="text-brand-cyan">precision</span>: <span className="text-[#38BDF8]">AccountingStandard</span>;
                  </div>
                  <div>{'}'}</div>
                  <div className="pt-1">
                    <span className="text-[#38BDF8]">export async function</span>{' '}
                    <span className="text-brand-emerald">bringToLife</span>(idea:{' '}
                    <span className="text-brand-cyan">Idea</span>) {'{'}
                  </div>
                  <div className="pl-4 text-brand-text">
                    <span className="text-[#F43F5E]">const</span> platform ={' '}
                    <span className="text-[#38BDF8]">await</span> Aya.<span className="text-[#FBBF24]">engineer</span>({'{'}
                  </div>
                  <div className="pl-8 text-brand-muted">
                    stack: [<span className="text-[#34D399]">'React'</span>, <span className="text-[#34D399]">'Node'</span>, <span className="text-[#34D399]">'MongoDB'</span>],
                  </div>
                  <div className="pl-8 text-brand-muted">
                    design: <span className="text-[#22D3EE]">'Aurora Editorial'</span>,
                  </div>
                  <div className="pl-4">{'}'});</div>
                  <div className="pl-4">
                    <span className="text-[#38BDF8]">return</span> platform.<span className="text-[#FBBF24]">render</span>();
                  </div>
                  <div>{'}'}</div>
                </div>

                {/* Compilation Bar */}
                <div className="flex items-center justify-between rounded bg-[#0A151D] px-3 py-1.5 border border-brand-border/60 text-[10px]">
                  <span className="flex items-center gap-1.5 text-brand-emerald font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald animate-pulse" />
                    TypeScript Clean Build • 0 errors
                  </span>
                  <span className="text-brand-cyan font-mono">Transforming to Canvas →</span>
                </div>
              </div>
            )}

            {/* ---------------- STAGE 3: CANVAS (WIREFRAME BLUEPRINT) ---------------- */}
            {stage === 3 && (
              <div className="flex flex-col space-y-3.5">
                <div className="flex items-center justify-between border-b border-brand-border/60 pb-2">
                  <span className="text-xs font-mono text-brand-emerald flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5" />
                    {isRtl ? 'المخطط الهيكلي والواجهات' : 'Blueprint & System Architecture'}
                  </span>
                  <span className="text-[10px] font-mono text-brand-muted">12-COL FLEX GRID</span>
                </div>

                {/* Wireframe Mockup Representation */}
                <div className="space-y-3 p-3.5 rounded-lg border border-dashed border-brand-cyan/40 bg-brand-surface/40">
                  {/* Wireframe Nav */}
                  <div className="flex items-center justify-between py-1 border-b border-brand-border/40">
                    <div className="h-3 w-20 bg-brand-cyan/50 rounded animate-pulse" />
                    <div className="flex gap-2">
                      <div className="h-2 w-10 bg-brand-border rounded" />
                      <div className="h-2 w-10 bg-brand-border rounded" />
                      <div className="h-2 w-12 bg-brand-cyan/30 rounded" />
                    </div>
                  </div>

                  {/* Wireframe Hero Banner */}
                  <div className="grid grid-cols-3 gap-3 py-2">
                    <div className="col-span-2 space-y-2.5">
                      <div className="h-4 w-3/4 bg-brand-blue/40 rounded" />
                      <div className="h-2.5 w-full bg-brand-border/70 rounded" />
                      <div className="h-2.5 w-4/5 bg-brand-border/70 rounded" />
                      <div className="h-6 w-28 bg-brand-emerald/40 rounded-full mt-2" />
                    </div>
                    <div className="col-span-1 rounded border border-brand-cyan/30 bg-brand-cyan/10 flex items-center justify-center p-2">
                      <div className="h-14 w-14 rounded-full border border-dashed border-brand-cyan/50 animate-spin" style={{ animationDuration: '14s' }} />
                    </div>
                  </div>

                  {/* Wireframe Metric Blocks */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-brand-border/30">
                    <div className="h-9 rounded bg-brand-surface border border-brand-border/60 p-1.5">
                      <div className="h-2 w-8 bg-brand-cyan/40 rounded mb-1" />
                      <div className="h-2 w-12 bg-brand-border rounded" />
                    </div>
                    <div className="h-9 rounded bg-brand-surface border border-brand-border/60 p-1.5">
                      <div className="h-2 w-8 bg-brand-emerald/40 rounded mb-1" />
                      <div className="h-2 w-12 bg-brand-border rounded" />
                    </div>
                    <div className="h-9 rounded bg-brand-surface border border-brand-border/60 p-1.5">
                      <div className="h-2 w-8 bg-brand-blue/40 rounded mb-1" />
                      <div className="h-2 w-12 bg-brand-border rounded" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-brand-muted">
                  <span className="text-brand-muted">Wireframe: Validated</span>
                  <span className="text-brand-emerald">Ready for Polish →</span>
                </div>
              </div>
            )}

            {/* ---------------- STAGE 4: STORY (ILLUSTRATIVE PROTOTYPE) ---------------- */}
            {stage === 4 && (
              <div className="flex flex-col space-y-3">
                {/* Product Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-emerald">
                      {t('hero.interactive.previewSubtitle')}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-brand-text flex items-center gap-1.5">
                      {t('hero.interactive.previewTitle')}
                      <CheckCircle2 className="h-4 w-4 text-brand-cyan" />
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/25">
                    {isRtl ? 'واجهة توضيحية' : 'DEMO PROTOTYPE'}
                  </span>
                </div>

                {/* Showcase Illustrative Card */}
                <div className="relative overflow-hidden rounded-xl border border-brand-cyan/40 bg-gradient-to-br from-brand-surface-elevated to-[#0C1A24] p-4 shadow-xl">
                  {/* Subtle Aurora light sweep in card */}
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-cyan/20 blur-2xl" />

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1 text-[10px] font-mono text-brand-blue uppercase tracking-wider">
                        <Calendar className="h-3 w-3" />
                        <span>Interactive Booking Architecture</span>
                      </div>
                      <div className="text-sm font-semibold text-brand-text">
                        Royal Panoramic Suite (Concept Layout)
                      </div>
                      <div className="text-xs text-brand-muted">
                        Full MERN State Management & MongoDB Sync
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end justify-between gap-2">
                      <div className="text-right">
                        <span className="text-xs font-mono text-brand-cyan">Dynamic Pricing Engine</span>
                      </div>
                      {/* Clearly labeled non-interactive demonstration button */}
                      <button
                        disabled
                        aria-disabled="true"
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-brand-cyan/40 bg-brand-surface/90 px-3.5 py-1 text-xs font-mono text-brand-cyan opacity-80 cursor-default"
                      >
                        <span>{isRtl ? '[عنصر توضيحي]' : '[Demo Component]'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Architecture Indicators */}
                  <div className="mt-3.5 pt-3 border-t border-brand-border/60 flex items-center justify-between text-[10px] font-mono text-brand-muted">
                    <span className="text-brand-muted">
                      Component: RoomReservationCard
                    </span>
                    <span className="text-brand-cyan">
                      {t('hero.interactive.previewMetric')}
                    </span>
                  </div>
                </div>

                {/* Production Stamp */}
                <div className="flex items-center justify-between text-[10px] font-mono text-brand-muted/70 px-1 pt-0.5">
                  <span className="text-brand-muted">Architected by Aya</span>
                  <span className="text-brand-emerald">Node.js + MongoDB API Architecture</span>
                </div>
              </div>
            )}
          </div>

          {/* ================= BOTTOM INTERACTIVE CONTROLS BAR ================= */}
          <div className="mt-3.5 pt-3 border-t border-brand-border/50 flex items-center justify-between text-[11px] font-mono text-brand-muted z-10">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
              <span className="text-[10px] sm:text-[11px]">{t('hero.interactive.triggerPrompt')}</span>
            </span>

            {/* Stepper Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="hover:text-brand-cyan hover:bg-brand-surface rounded p-1 transition-colors cursor-pointer"
                aria-label="Previous Transformation Stage"
              >
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
              </button>
              <span className="text-brand-cyan font-semibold">0{stage} / 04</span>
              <button
                onClick={handleNext}
                className="hover:text-brand-cyan hover:bg-brand-surface rounded p-1 transition-colors cursor-pointer"
                aria-label="Next Transformation Stage"
              >
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
};
