import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { AuroraGlow } from '../ui/AuroraGlow';
import { 
  Sparkles, 
  Network, 
  Layers, 
  Compass, 
  CheckCircle2, 
  Laptop,
  Palette,
  Database,
  Code
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StoryOfAnIdea: React.FC = () => {
  const { t } = useTranslation();

  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Utilize gsap.matchMedia for responsive, robust ScrollTrigger lifecycle
    const mm = gsap.matchMedia();

    // 1. Reduced Motion Preference
    mm.add('(prefers-reduced-motion: reduce)', () => {
      // In reduced-motion mode, ensure all scenes render cleanly without pinning
      gsap.set('.story-scene-1, .story-scene-2, .story-scene-3, .story-scene-4', {
        opacity: 1,
        scale: 1,
        position: 'relative',
        display: 'block',
      });
      gsap.set('.story-final-statement', { opacity: 1, y: 0 });
    });

    // 2. Desktop Pinned Scrubbing (>= 1024px)
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      if (!sectionRef.current || !pinContainerRef.current) return;

      // Master scrubbed timeline pinned to viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2400',
          pin: pinContainerRef.current,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Initial visual states
      gsap.set('.story-scene-1', { opacity: 1, scale: 1, zIndex: 10 });
      gsap.set('.story-scene-2', { opacity: 0, scale: 0.95, zIndex: 9 });
      gsap.set('.story-scene-3', { opacity: 0, scale: 0.95, zIndex: 8 });
      gsap.set('.story-scene-4', { opacity: 0, scale: 0.95, zIndex: 7 });
      gsap.set('.story-final-statement', { opacity: 0, y: 25 });

      // Step 1 -> Step 2: IDEA to VISION
      tl.to('.story-scene-1', { opacity: 0, scale: 1.04, duration: 1 })
        .to('.story-indicator-1', { opacity: 0.4 }, '<')
        .fromTo(
          '.story-scene-2',
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 1.2, zIndex: 10 },
          '-=0.4'
        )
        .to('.story-indicator-2', { opacity: 1 }, '<')
        .fromTo(
          '.vision-line',
          { strokeDashoffset: 400 },
          { strokeDashoffset: 0, duration: 1.4, stagger: 0.15 },
          '-=0.8'
        );

      // Step 2 -> Step 3: VISION to SHAPE (Wireframe Assembly)
      tl.to('.story-scene-2', { opacity: 0, scale: 1.04, duration: 1 })
        .to('.story-indicator-2', { opacity: 0.4 }, '<')
        .fromTo(
          '.story-scene-3',
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 1.2, zIndex: 10 },
          '-=0.4'
        )
        .to('.story-indicator-3', { opacity: 1 }, '<')
        .fromTo(
          '.wireframe-elem',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          '-=0.7'
        );

      // Step 3 -> Step 4: SHAPE to EXPERIENCE (Living Digital Experience)
      tl.to('.story-scene-3', { opacity: 0, scale: 1.04, duration: 1 })
        .to('.story-indicator-3', { opacity: 0.4 }, '<')
        .fromTo(
          '.story-scene-4',
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 1.2, zIndex: 10 },
          '-=0.4'
        )
        .to('.story-indicator-4', { opacity: 1 }, '<')
        .fromTo(
          '.experience-elem',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
          '-=0.6'
        )
        .fromTo(
          '.story-final-statement',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.3'
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#070D12] text-brand-text overflow-hidden select-none border-t border-brand-border/40"
      aria-label="The Story of an Idea"
    >
      {/* Background Aurora Ambient Atmosphere */}
      <AuroraGlow
        variant="cyan"
        size="xl"
        intensity="subtle"
        className="top-1/4 -left-60 pointer-events-none"
      />
      <AuroraGlow
        variant="emerald"
        size="lg"
        intensity="subtle"
        className="bottom-1/4 -right-40 pointer-events-none"
      />

      {/* ================= DESKTOP PINNED STORYTELLING STAGE ================= */}
      <div
        ref={pinContainerRef}
        className="hidden lg:flex flex-col justify-between h-screen w-full py-8 px-6 xl:px-16 relative overflow-hidden"
      >
        {/* Top Header & Continuous Progress Track */}
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="cyan" dot>
                {t('story.tagline')}
              </Badge>
              <span className="text-xs font-mono text-brand-muted hidden sm:inline">
                SCENE 02 — THE GENESIS
              </span>
            </div>

            {/* Stage Indicators */}
            <div className="flex items-center gap-6 text-xs font-mono">
              <span className="story-indicator-1 text-brand-blue font-semibold transition-opacity duration-300">
                {t('story.progress_idea')}
              </span>
              <span className="text-brand-border">•</span>
              <span className="story-indicator-2 text-brand-cyan opacity-40 font-semibold transition-opacity duration-300">
                {t('story.progress_vision')}
              </span>
              <span className="text-brand-border">•</span>
              <span className="story-indicator-3 text-brand-emerald opacity-40 font-semibold transition-opacity duration-300">
                {t('story.progress_shape')}
              </span>
              <span className="text-brand-border">•</span>
              <span className="story-indicator-4 text-brand-cyan opacity-40 font-semibold transition-opacity duration-300">
                {t('story.progress_experience')}
              </span>
            </div>
          </div>

          {/* Continuous Scroll Scrub Progress Bar */}
          <div className="w-full h-[2px] bg-brand-border/50 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-0 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-emerald transition-all ease-out"
            />
          </div>
        </div>

        {/* Central Expansive Visual Canvas (Substantial Viewport Presence) */}
        <div className="relative w-full max-w-7xl mx-auto flex-1 my-4 flex items-center justify-center">
          {/* ================= SCENE 1: THE IDEA ================= */}
          <div className="story-scene-1 absolute inset-0 flex flex-col lg:flex-row items-center justify-between gap-12 z-10 pointer-events-none">
            {/* Left Headline */}
            <div className="lg:w-5/12 space-y-4">
              <span className="inline-block text-xs font-mono tracking-widest text-brand-blue uppercase">
                Phase 01 // The Origin
              </span>
              <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-brand-text leading-tight">
                {t('story.scene1_headline')}
              </h2>
              <p className="text-base text-brand-muted leading-relaxed max-w-md">
                {t('story.scene1_sub')}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-brand-cyan/80">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-ping" />
                <span>Scroll to trace the vision →</span>
              </div>
            </div>

            {/* Right Expansive Graphic: Glowing Aurora Point & Radial Universe */}
            <div className="lg:w-7/12 h-[420px] xl:h-[480px] w-full relative flex items-center justify-center rounded-2xl border border-brand-border/60 bg-gradient-to-b from-[#091118]/80 to-[#070D12] backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-tech-grid opacity-30" />
              <div className="absolute h-96 w-96 rounded-full border border-brand-blue/20 animate-pulse" />
              <div className="absolute h-64 w-64 rounded-full border border-brand-cyan/25 animate-ping opacity-20" />
              <div className="absolute h-40 w-40 rounded-full bg-brand-cyan/15 blur-2xl animate-glow-breathe" />

              {/* Central Glowing Spark */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-emerald shadow-[0_0_50px_rgba(34,211,238,0.9)] border-2 border-white/80">
                  <Sparkles className="h-10 w-10 text-[#070D12] animate-spin" style={{ animationDuration: '10s' }} />
                </div>
                <div className="rounded-full border border-brand-cyan/40 bg-brand-surface/90 px-4 py-1.5 text-xs font-mono text-brand-cyan backdrop-blur-md">
                  CORE_IDEA.init()
                </div>
              </div>
            </div>
          </div>

          {/* ================= SCENE 2: THE VISION ================= */}
          <div className="story-scene-2 absolute inset-0 flex flex-col lg:flex-row items-center justify-between gap-12 z-10 pointer-events-none opacity-0">
            {/* Left Headline */}
            <div className="lg:w-5/12 space-y-4">
              <span className="inline-block text-xs font-mono tracking-widest text-brand-cyan uppercase">
                Phase 02 // Structural Clarity
              </span>
              <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-brand-text leading-tight">
                {t('story.scene2_headline')}
              </h2>
              <p className="text-base text-brand-muted leading-relaxed max-w-md">
                {t('story.scene2_sub')}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-brand-emerald/80">
                <Network className="h-4 w-4" />
                <span>Lines of logic taking form</span>
              </div>
            </div>

            {/* Right Expansive Graphic: Connected SVG Architecture Grid */}
            <div className="lg:w-7/12 h-[420px] xl:h-[480px] w-full relative rounded-2xl border border-brand-border/60 bg-gradient-to-b from-[#091118]/80 to-[#070D12] backdrop-blur-xl overflow-hidden shadow-2xl p-6 flex flex-col justify-between">
              <div className="absolute inset-0 bg-tech-grid opacity-30" />

              {/* Connecting Vector Lines Overlay */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#38BDF8" strokeWidth="2" strokeDasharray="400" className="vision-line" opacity="0.6" />
                <line x1="80%" y1="30%" x2="50%" y2="50%" stroke="#22D3EE" strokeWidth="2" strokeDasharray="400" className="vision-line" opacity="0.6" />
                <line x1="30%" y1="80%" x2="50%" y2="50%" stroke="#34D399" strokeWidth="2" strokeDasharray="400" className="vision-line" opacity="0.6" />
                <line x1="70%" y1="80%" x2="50%" y2="50%" stroke="#38BDF8" strokeWidth="2" strokeDasharray="400" className="vision-line" opacity="0.6" />
              </svg>

              {/* Connected Architectural Nodes */}
              <div className="relative z-10 flex justify-between">
                <div className="flex items-center gap-2 rounded-lg border border-brand-blue/50 bg-brand-surface/90 px-3.5 py-2 text-xs font-mono text-brand-blue shadow-lg">
                  <Palette className="h-4 w-4 text-brand-cyan" />
                  <span>Creative Direction</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-brand-cyan/50 bg-brand-surface/90 px-3.5 py-2 text-xs font-mono text-brand-cyan shadow-lg">
                  <Compass className="h-4 w-4 text-brand-emerald" />
                  <span>User Journey Map</span>
                </div>
              </div>

              {/* Central Convergence Hub */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-2xl border border-brand-cyan bg-brand-surface-elevated/90 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                  <Network className="h-8 w-8 text-brand-cyan animate-pulse" />
                </div>
                <span className="mt-2 text-[11px] font-mono text-brand-muted">Architectural Synthesis</span>
              </div>

              <div className="relative z-10 flex justify-between">
                <div className="flex items-center gap-2 rounded-lg border border-brand-emerald/50 bg-brand-surface/90 px-3.5 py-2 text-xs font-mono text-brand-emerald shadow-lg">
                  <Database className="h-4 w-4 text-brand-emerald" />
                  <span>Data & Schema Architecture</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-brand-blue/50 bg-brand-surface/90 px-3.5 py-2 text-xs font-mono text-brand-blue shadow-lg">
                  <Code className="h-4 w-4 text-brand-blue" />
                  <span>Component Taxonomy</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= SCENE 3: THE SHAPE (WIREFRAME ASSEMBLY) ================= */}
          <div className="story-scene-3 absolute inset-0 flex flex-col lg:flex-row items-center justify-between gap-12 z-10 pointer-events-none opacity-0">
            {/* Left Headline */}
            <div className="lg:w-5/12 space-y-4">
              <span className="inline-block text-xs font-mono tracking-widest text-brand-emerald uppercase">
                Phase 03 // Blueprint & Wireframe
              </span>
              <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-brand-text leading-tight">
                {t('story.scene3_headline')}
              </h2>
              <p className="text-base text-brand-muted leading-relaxed max-w-md">
                {t('story.scene3_sub')}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-brand-emerald">
                <Layers className="h-4 w-4" />
                <span>Responsive 12-Column Blueprint Assembly</span>
              </div>
            </div>

            {/* Right Expansive Graphic: Large High-Fidelity Website Wireframe */}
            <div className="lg:w-7/12 h-[420px] xl:h-[480px] w-full relative rounded-2xl border border-dashed border-brand-cyan/50 bg-[#070D12]/90 backdrop-blur-xl p-5 flex flex-col justify-between shadow-2xl overflow-hidden">
              <div className="absolute top-2 right-4 text-[10px] font-mono text-brand-cyan/40">
                BLUEPRINT // REVISION 1.0
              </div>

              {/* Wireframe Navigation Bar */}
              <div className="wireframe-elem flex items-center justify-between py-2 border-b border-brand-border/60">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-brand-cyan/40 animate-pulse" />
                  <div className="h-3 w-20 bg-brand-border/80 rounded" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-12 bg-brand-border/60 rounded" />
                  <div className="h-2.5 w-12 bg-brand-border/60 rounded" />
                  <div className="h-6 w-16 bg-brand-cyan/30 rounded-full" />
                </div>
              </div>

              {/* Wireframe Hero Showcase Section */}
              <div className="wireframe-elem grid grid-cols-12 gap-4 py-3 my-auto items-center">
                <div className="col-span-7 space-y-2.5">
                  <div className="h-3 w-24 bg-brand-emerald/40 rounded-full" />
                  <div className="h-6 w-full bg-brand-border/90 rounded" />
                  <div className="h-6 w-4/5 bg-brand-border/70 rounded" />
                  <div className="h-3 w-full bg-brand-border/40 rounded" />
                  <div className="flex gap-2 pt-2">
                    <div className="h-8 w-28 bg-brand-cyan/40 rounded-full" />
                    <div className="h-8 w-24 bg-brand-border/40 rounded-full" />
                  </div>
                </div>
                <div className="col-span-5 h-36 rounded-xl border border-dashed border-brand-cyan/40 bg-brand-surface/60 flex flex-col items-center justify-center p-2 text-center">
                  <Laptop className="h-8 w-8 text-brand-cyan/50 mb-1" />
                  <span className="text-[10px] font-mono text-brand-muted">HERO_MEDIA_HOLDER</span>
                </div>
              </div>

              {/* Wireframe Feature Columns */}
              <div className="wireframe-elem grid grid-cols-3 gap-3 pt-3 border-t border-brand-border/40">
                <div className="rounded-lg border border-brand-border/60 bg-brand-surface/40 p-2.5 space-y-1.5">
                  <div className="h-2.5 w-10 bg-brand-cyan/40 rounded" />
                  <div className="h-2 w-full bg-brand-border/60 rounded" />
                  <div className="h-2 w-2/3 bg-brand-border/40 rounded" />
                </div>
                <div className="rounded-lg border border-brand-border/60 bg-brand-surface/40 p-2.5 space-y-1.5">
                  <div className="h-2.5 w-10 bg-brand-emerald/40 rounded" />
                  <div className="h-2 w-full bg-brand-border/60 rounded" />
                  <div className="h-2 w-2/3 bg-brand-border/40 rounded" />
                </div>
                <div className="rounded-lg border border-brand-border/60 bg-brand-surface/40 p-2.5 space-y-1.5">
                  <div className="h-2.5 w-10 bg-brand-blue/40 rounded" />
                  <div className="h-2 w-full bg-brand-border/60 rounded" />
                  <div className="h-2 w-2/3 bg-brand-border/40 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* ================= SCENE 4: THE EXPERIENCE (LIVING DIGITAL PRODUCT) ================= */}
          <div className="story-scene-4 absolute inset-0 flex flex-col lg:flex-row items-center justify-between gap-12 z-10 pointer-events-none opacity-0">
            {/* Left Headline */}
            <div className="lg:w-5/12 space-y-4">
              <span className="inline-block text-xs font-mono tracking-widest text-brand-cyan uppercase">
                Phase 04 // Living Experience
              </span>
              <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-brand-text leading-tight">
                {t('story.scene4_headline')}
              </h2>
              <p className="text-base text-brand-muted leading-relaxed max-w-md">
                {t('story.scene4_sub')}
              </p>

              {/* The Grand Resolution Statement */}
              <div className="story-final-statement pt-4 border-t border-brand-border/60 space-y-1">
                <div className="text-lg xl:text-xl font-extrabold text-brand-text">
                  {t('story.final_statement')}
                </div>
                <div className="text-sm font-semibold bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-emerald bg-clip-text text-transparent">
                  {t('story.final_statement_sub')}
                </div>
              </div>
            </div>

            {/* Right Expansive Graphic: Polished, Glowing Living Interface */}
            <div className="lg:w-7/12 h-[420px] xl:h-[480px] w-full relative rounded-2xl border border-brand-cyan/40 bg-gradient-to-b from-brand-surface-elevated via-[#0E1B23] to-[#070D12] backdrop-blur-xl p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(34,211,238,0.2)] overflow-hidden">
              {/* Aurora background bloom */}
              <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-brand-cyan/20 blur-3xl" />
              <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-brand-emerald/15 blur-3xl" />

              {/* Polished Glass Navigation */}
              <div className="experience-elem relative z-10 flex items-center justify-between py-2 border-b border-brand-border/60">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-brand-cyan to-brand-emerald text-[#070D12] font-mono text-xs font-bold">
                    A
                  </div>
                  <span className="text-xs font-bold tracking-wider text-brand-text">
                    AYA DIGITAL
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-brand-muted hidden sm:inline">Architecture</span>
                  <span className="text-brand-muted hidden sm:inline">Exhibition</span>
                  <span className="rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-2.5 py-0.5 font-mono text-brand-cyan text-[10px]">
                    Concept Preview
                  </span>
                </div>
              </div>

              {/* Polished Hero Card */}
              <div className="experience-elem relative z-10 grid grid-cols-12 gap-4 py-3 my-auto items-center">
                <div className="col-span-7 space-y-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-emerald/40 bg-brand-emerald/10 px-2.5 py-0.5 text-[10px] font-mono text-brand-emerald">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald animate-pulse" />
                    EXPERIENCE ACTIVE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-brand-text leading-tight">
                    Crafting Tomorrow's Digital Standard
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Thoughtful design, performance engineering, and deep commercial purpose woven into one seamless platform.
                  </p>
                </div>

                <div className="col-span-5 h-40 rounded-xl border border-brand-cyan/30 bg-gradient-to-tr from-brand-surface to-[#162732] p-3 flex flex-col justify-between shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] font-mono text-brand-cyan">
                    <span>INTERFACE PROTOTYPE</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-emerald" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-brand-text">
                      Modular Architecture
                    </div>
                    <div className="text-[10px] text-brand-muted">
                      Full MERN Architecture & Micro-Interactions
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-brand-emerald border-t border-brand-border/40 pt-1.5">
                    <span>Component Architecture</span>
                  </div>
                </div>
              </div>

              {/* Polished Features Grid */}
              <div className="experience-elem relative z-10 grid grid-cols-3 gap-3 pt-3 border-t border-brand-border/40 text-xs">
                <div className="rounded-lg border border-brand-border/80 bg-brand-surface/70 p-2.5 space-y-1">
                  <div className="font-semibold text-brand-cyan text-[11px]">01 Architecture</div>
                  <div className="text-[10px] text-brand-muted leading-snug">Solid structural foundations</div>
                </div>
                <div className="rounded-lg border border-brand-border/80 bg-brand-surface/70 p-2.5 space-y-1">
                  <div className="font-semibold text-brand-emerald text-[11px]">02 Usability</div>
                  <div className="text-[10px] text-brand-muted leading-snug">Frictionless client journeys</div>
                </div>
                <div className="rounded-lg border border-brand-border/80 bg-brand-surface/70 p-2.5 space-y-1">
                  <div className="font-semibold text-brand-blue text-[11px]">03 Evolution</div>
                  <div className="text-[10px] text-brand-muted leading-snug">Built to scale effortlessly</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Coordinates */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono text-brand-muted/70 z-20">
          <span>CHAPTER 02 // HOW AN IDEA BECOMES CODE</span>
          <span className="text-brand-cyan">AYA &bull; WEB DEVELOPER</span>
        </div>
      </div>

      {/* ================= MOBILE SIMPLIFIED VERTICAL STORYTELLING ================= */}
      <div className="lg:hidden py-16 px-4 sm:px-6 space-y-16">
        <Container size="sm">
          {/* Header */}
          <div className="text-center space-y-2 mb-10">
            <Badge variant="cyan" dot>
              {t('story.tagline')}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
              {t('story.scene1_headline')}
            </h2>
          </div>

          {/* Scene 1 Mobile */}
          <div className="rounded-2xl border border-brand-border bg-brand-surface/80 p-6 space-y-4 backdrop-blur-md">
            <span className="text-xs font-mono text-brand-blue uppercase">
              {t('story.progress_idea')}
            </span>
            <h3 className="text-xl font-bold text-brand-text">
              {t('story.scene1_headline')}
            </h3>
            <p className="text-sm text-brand-muted">
              {t('story.scene1_sub')}
            </p>
            <div className="flex h-36 items-center justify-center rounded-xl bg-[#091118] border border-brand-cyan/20 relative">
              <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-emerald shadow-[0_0_25px_rgba(34,211,238,0.8)] flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-[#070D12]" />
              </div>
            </div>
          </div>

          {/* Scene 2 Mobile */}
          <div className="rounded-2xl border border-brand-border bg-brand-surface/80 p-6 space-y-4 backdrop-blur-md mt-8">
            <span className="text-xs font-mono text-brand-cyan uppercase">
              {t('story.progress_vision')}
            </span>
            <h3 className="text-xl font-bold text-brand-text">
              {t('story.scene2_headline')}
            </h3>
            <p className="text-sm text-brand-muted">
              {t('story.scene2_sub')}
            </p>
            <div className="flex h-36 items-center justify-center rounded-xl bg-[#091118] border border-brand-cyan/20 p-4">
              <Network className="h-10 w-10 text-brand-cyan animate-pulse" />
            </div>
          </div>

          {/* Scene 3 Mobile */}
          <div className="rounded-2xl border border-brand-border bg-brand-surface/80 p-6 space-y-4 backdrop-blur-md mt-8">
            <span className="text-xs font-mono text-brand-emerald uppercase">
              {t('story.progress_shape')}
            </span>
            <h3 className="text-xl font-bold text-brand-text">
              {t('story.scene3_headline')}
            </h3>
            <p className="text-sm text-brand-muted">
              {t('story.scene3_sub')}
            </p>
            <div className="rounded-xl bg-[#091118] border border-dashed border-brand-cyan/30 p-4 space-y-2">
              <div className="h-3 w-20 bg-brand-cyan/40 rounded" />
              <div className="h-10 bg-brand-surface border border-brand-border/40 rounded" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-8 bg-brand-surface border border-brand-border/40 rounded" />
                <div className="h-8 bg-brand-surface border border-brand-border/40 rounded" />
              </div>
            </div>
          </div>

          {/* Scene 4 Mobile */}
          <div className="rounded-2xl border border-brand-cyan/40 bg-gradient-to-b from-brand-surface-elevated to-[#0E1B23] p-6 space-y-4 backdrop-blur-md mt-8 shadow-xl">
            <span className="text-xs font-mono text-brand-cyan uppercase">
              {t('story.progress_experience')}
            </span>
            <h3 className="text-xl font-bold text-brand-text">
              {t('story.scene4_headline')}
            </h3>
            <p className="text-sm text-brand-muted">
              {t('story.scene4_sub')}
            </p>
            <div className="rounded-xl border border-brand-cyan/40 bg-[#070D12] p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-brand-text">
                <span>Living Platform Prototype</span>
                <span className="text-brand-emerald font-mono">Active</span>
              </div>
              <div className="text-xs text-brand-muted">
                Crafted to turn business goals into an unforgettable user experience.
              </div>
            </div>

            {/* Final Statement Mobile */}
            <div className="pt-4 border-t border-brand-border/60 text-center space-y-1">
              <div className="text-base font-bold text-brand-text">
                {t('story.final_statement')}
              </div>
              <div className="text-xs font-semibold bg-gradient-to-r from-brand-cyan to-brand-emerald bg-clip-text text-transparent">
                {t('story.final_statement_sub')}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};
