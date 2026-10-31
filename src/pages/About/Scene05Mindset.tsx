import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface Scene05Props {
  isRtl: boolean;
}

const BusinessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

const DetailsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const PurposeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const principles = [
  {
    id: 1,
    num: '01',
    Icon: BusinessIcon,
    titleEn: 'Understanding the Business',
    titleAr: 'فهم المشروع واحتياجاته',
    taglineEn: 'Technology works best when it solves the right problem.',
    taglineAr: 'التكنولوجيا تعمل بأفضل كفاءة عندما تحل المشكلة الصحيحة.',
    descEn: 'Before writing a single line of code, I make sure I deeply understand the business context, the target audience, and the practical goals of the project.',
    descAr: 'قبل كتابة أي سطر كود، أحرص على فهم طبيعة المشروع وسياقه التجاري، واحتياجات جمهوره المستهدف وأهدافه الواقعية.',
    inPracticeEn: 'Translating business logic into sound technical architecture and frictionless user flows.',
    inPracticeAr: 'تحويل منطق الأعمال إلى بنية تقنية متماسكة وتدفقات مستخدم مريحة.',
    color: 'cyan' as const,
  },
  {
    id: 2,
    num: '02',
    Icon: DetailsIcon,
    titleEn: 'Thinking Through the Details',
    titleAr: 'الاهتمام بالتفاصيل الدقيقة',
    taglineEn: 'Every small decision shapes the complete experience.',
    taglineAr: 'كل تفصيلة صغيرة تصنع فارقًا في التجربة الشاملة.',
    descEn: 'From micro-interactions and loading states to font scaling, contrast, and responsive nuances — details are not distractions, they make an interface feel intentional and reliable.',
    descAr: 'من الحركات الدقيقة وحالات التحميل إلى تناسق الخطوط والتباين والاستجابة للشاشات — التفاصيل ليست كماليات، بل هي ما يمنح الموقع مصداقيته وسلاسته.',
    inPracticeEn: 'Pixel-level precision, accessible contrasts, and smooth feedback across every breakpoint.',
    inPracticeAr: 'دقة عالية في القياسات، وتوافق مع معايير الوصول، واستجابة مرنة على كافة الشاشات.',
    color: 'blue' as const,
  },
  {
    id: 3,
    num: '03',
    Icon: PurposeIcon,
    titleEn: 'Building With Purpose',
    titleAr: 'التنفيذ بهدف وقيمة حقيقية',
    taglineEn: 'Beauty without functionality is merely decoration.',
    taglineAr: 'المظهر الجميل يكتمل عندما يخدم وظيفة حقيقية بكفاءة.',
    descEn: 'A visually stunning interface matters, but durability, clean architecture, performance, and SEO matter just as much. I build products designed to last and deliver tangible results.',
    descAr: 'التصميم الجذاب مهم جدًا، لكن الأهم أن يعمل بكفاءة، وبنية كود نظيفة، وسرعة فائقة، وقابلية للتوسع والتطوير المستمر.',
    inPracticeEn: 'Clean, maintainable codebases built with modern standards and zero fluff.',
    inPracticeAr: 'شفرة برمجية منظمة وقابلة للصيانة، خالية من التعقيد الزائد ومبنية وفق أحدث المعايير.',
    color: 'emerald' as const,
  },
];

const colorConfig = {
  cyan: {
    border: 'border-brand-cyan/30',
    hoverBorder: 'hover:border-brand-cyan/60',
    text: 'text-brand-cyan',
    iconBg: 'bg-brand-cyan/10 text-brand-cyan',
    num: 'text-brand-cyan/10',
    line: 'bg-brand-cyan/50',
    tag: 'border-brand-cyan/30 text-brand-cyan bg-brand-cyan/8',
    glow: 'shadow-[0_8px_30px_rgba(34,211,238,0.06)]',
  },
  blue: {
    border: 'border-brand-blue/30',
    hoverBorder: 'hover:border-brand-blue/60',
    text: 'text-brand-blue',
    iconBg: 'bg-brand-blue/10 text-brand-blue',
    num: 'text-brand-blue/10',
    line: 'bg-brand-blue/50',
    tag: 'border-brand-blue/30 text-brand-blue bg-brand-blue/8',
    glow: 'shadow-[0_8px_30px_rgba(56,189,248,0.06)]',
  },
  emerald: {
    border: 'border-brand-emerald/30',
    hoverBorder: 'hover:border-brand-emerald/60',
    text: 'text-brand-emerald',
    iconBg: 'bg-brand-emerald/10 text-brand-emerald',
    num: 'text-brand-emerald/10',
    line: 'bg-brand-emerald/50',
    tag: 'border-brand-emerald/30 text-brand-emerald bg-brand-emerald/8',
    glow: 'shadow-[0_8px_30px_rgba(52,211,153,0.06)]',
  },
};

export const Scene05Mindset: React.FC<Scene05Props> = ({ isRtl }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

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

      // Stacking editorial panels scroll reveal
      principles.forEach((_, i) => {
        gsap.fromTo(
          `.s5-editorial-panel-${i}`,
          {
            opacity: 0,
            y: 36,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: `.s5-editorial-panel-${i}`,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-scene-05"
      aria-label={isRtl ? 'المنهجية' : 'The Mindset'}
      className="relative overflow-hidden bg-brand-bg py-16 lg:py-24"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-brand-blue/5 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className={cn('mb-14 max-w-2xl', isRtl ? 'text-right ml-auto' : 'text-left')}>
          <div className={cn('flex items-center gap-3 mb-4', isRtl ? 'justify-end flex-row-reverse' : '')}>
            <span className="font-mono text-xs text-brand-blue font-bold tracking-[0.2em] uppercase">05</span>
            <span className="w-8 h-px bg-brand-blue/40" />
            <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">
              {isRtl ? 'المنهجية والركائز' : 'The Mindset'}
            </span>
          </div>

          <h2
            ref={headlineRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight"
          >
            {isRtl ? (
              <>
                إيه اللي بحرص
                <br />
                <span className="text-brand-blue">أقدمه في كل مشروع؟</span>
              </>
            ) : (
              <>
                What I bring to
                <br />
                <span className="text-brand-blue">every single project.</span>
              </>
            )}
          </h2>
        </div>

        {/* Three Large Editorial Stacking Panels */}
        <div className="space-y-8">
          {principles.map((p, i) => {
            const c = colorConfig[p.color];

            return (
              <div
                key={p.id}
                className={cn(
                  `s5-editorial-panel-${i} relative glass-panel rounded-3xl border p-6 sm:p-10 transition-all duration-500 overflow-hidden`,
                  c.border,
                  c.hoverBorder,
                  c.glow
                )}
              >
                {/* Large watermark numeral background */}
                <div
                  className={cn(
                    'absolute top-4 font-mono font-black text-8xl sm:text-9xl select-none pointer-events-none transition-opacity duration-300',
                    c.num,
                    isRtl ? 'left-6' : 'right-6'
                  )}
                  aria-hidden="true"
                >
                  {p.num}
                </div>

                <div className="relative z-10 grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  
                  {/* Left Column: Icon + Title + Tagline */}
                  <div className={cn('lg:col-span-5 space-y-4', isRtl ? 'text-right' : 'text-left')}>
                    <div className={cn('flex items-center gap-4', isRtl && 'flex-row-reverse')}>
                      <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center border border-brand-border/40', c.iconBg)}>
                        <p.Icon />
                      </div>
                      <span className={cn('font-mono text-xs px-2.5 py-1 rounded-full border', c.tag)}>
                        {isRtl ? `الركيزة ${p.num}` : `Principle ${p.num}`}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-brand-text">
                      {isRtl ? p.titleAr : p.titleEn}
                    </h3>

                    <p className={cn('text-sm sm:text-base font-medium leading-relaxed', c.text)}>
                      {isRtl ? p.taglineAr : p.taglineEn}
                    </p>

                    {/* Accent datum line */}
                    <div className={cn('h-0.5 w-16 rounded-full', c.line, isRtl && 'mr-0 ml-auto')} />
                  </div>

                  {/* Right Column: Detailed narrative & Application in practice */}
                  <div className={cn('lg:col-span-7 space-y-5', isRtl ? 'text-right' : 'text-left')}>
                    <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
                      {isRtl ? p.descAr : p.descEn}
                    </p>

                    <div className="rounded-xl border border-brand-border/30 bg-brand-surface/40 p-4 space-y-1.5">
                      <span className="block font-mono text-[11px] text-brand-muted uppercase tracking-wider">
                        {isRtl ? 'التطبيق العملي في الكود والتصميم:' : 'Applied in Execution:'}
                      </span>
                      <p className="text-brand-text/90 text-xs sm:text-sm leading-relaxed">
                        {isRtl ? p.inPracticeAr : p.inPracticeEn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continuity spine line to Scene 06 */}
      <div className="flex justify-center mt-12" aria-hidden="true">
        <div className="w-px h-8 bg-gradient-to-b from-brand-blue/40 via-brand-blue/20 to-transparent" />
      </div>
    </section>
  );
};
