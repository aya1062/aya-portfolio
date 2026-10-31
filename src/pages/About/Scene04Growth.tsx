import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface Scene04Props {
  isRtl: boolean;
}

interface Milestone {
  id: number;
  labelEn: string;
  labelAr: string;
  descEn: string;
  descAr: string;
  icon: string;
  color: 'cyan' | 'blue' | 'emerald';
  tagEn: string;
  tagAr: string;
  skills: string[];
}

const milestones: Milestone[] = [
  {
    id: 1,
    labelEn: 'Accounting & Business Foundations',
    labelAr: 'المحاسبة وأساسيات الأعمال',
    descEn: 'Structured thinking, attention to detail, and deep understanding of financial workflows and how businesses operate.',
    descAr: 'التفكير المنظّم، والانتباه الدقيق للتفاصيل، وفهم عميق للتدفقات المالية وكيفية إدارة الأعمال.',
    icon: '∑',
    color: 'cyan',
    tagEn: 'Foundation',
    tagAr: 'الأساس',
    skills: ['Analytical Logic', 'Financial Data', 'Precision', 'Business Workflows'],
  },
  {
    id: 2,
    labelEn: 'Discovering Programming',
    labelAr: 'اكتشاف البرمجة',
    descEn: 'Found a creative outlet that naturally matched my analytical nature — transforming abstract logic into tangible tools.',
    descAr: 'وجدت المساحة التي يلتقي فيها التفكير المنطقي بالإبداع — وتحويل المنطق المجرد إلى حلول ملموسة.',
    icon: '</>',
    color: 'blue',
    tagEn: 'The Spark',
    tagAr: 'الشرارة',
    skills: ['Algorithms', 'HTML / CSS', 'JavaScript Basics', 'Problem Solving'],
  },
  {
    id: 3,
    labelEn: 'ITI — Front-End & Cross-Platform Track',
    labelAr: 'ITI — مسار الفرونت إند والتطبيقات',
    descEn: 'Intensive structured training in modern front-end engineering, software design patterns, and cross-platform architecture.',
    descAr: 'تدريب مكثّف ومنظّم على تطوير الواجهات الأمامية الحديثة، وأنماط التصميم البرمجي، وهندسة التطبيقات.',
    icon: '◈',
    color: 'emerald',
    tagEn: 'Intensive Training',
    tagAr: 'التدريب الاحترافي',
    skills: ['Modern JavaScript (ES6+)', 'TypeScript', 'Responsive Design', 'Git Workflows'],
  },
  {
    id: 4,
    labelEn: 'WordPress Development',
    labelAr: 'تطوير ووردبريس وحلول المحتوى',
    descEn: 'Architected client-ready solutions, custom themes, and gained invaluable experience shipping real products for real users.',
    descAr: 'بنيت مواقع احترافية وقوالب مخصصة للعملاء، واكتسبت خبرة عملية في تسليم مشاريع متكاملة لمستخدمين حقيقيين.',
    icon: 'WP',
    color: 'cyan',
    tagEn: 'Client Delivery',
    tagAr: 'مشاريع العملاء',
    skills: ['CMS Architecture', 'Custom Theming', 'Client Communication', 'SEO & Performance'],
  },
  {
    id: 5,
    labelEn: 'MERN Stack Development',
    labelAr: 'تطوير MERN Stack الكامل',
    descEn: 'Full-stack engineering — database modeling, RESTful APIs, state orchestration, and reactive interfaces.',
    descAr: 'هندسة الستاك الكامل — من نمذجة قواعد البيانات وواجهات REST البرمجية إلى إدارة الحالة والواجهات التفاعلية.',
    icon: '⬡',
    color: 'blue',
    tagEn: 'Full-Stack',
    tagAr: 'فول ستاك',
    skills: ['React & Next.js', 'Node.js & Express', 'MongoDB & State', 'Tailwind CSS'],
  },
  {
    id: 6,
    labelEn: 'Building Real-World Projects',
    labelAr: 'بناء منتجات ومشاريع حقيقية',
    descEn: 'Synthesizing technical precision with business acumen to create purposeful, accessible, and high-impact digital experiences.',
    descAr: 'دمج الدقة التقنية مع الفهم التجاري لبناء تجارب رقمية ذات أثر حقيقي وقيمة مستدامة للعميل والمستخدم.',
    icon: '▲',
    color: 'emerald',
    tagEn: 'Today & Beyond',
    tagAr: 'اليوم والمستقبل',
    skills: ['Creative Engineering', 'Micro-Interactions', 'Scalable Architecture', 'GSAP Motion'],
  },
];

const colorConfig = {
  cyan: {
    border: 'border-brand-cyan/40',
    activeBorder: 'border-brand-cyan',
    bg: 'bg-brand-cyan/10',
    activeBg: 'bg-brand-cyan/15',
    text: 'text-brand-cyan',
    dot: 'bg-brand-cyan shadow-[0_0_12px_rgba(34,211,238,0.8)]',
    tag: 'border-brand-cyan/40 text-brand-cyan bg-brand-cyan/10',
    accentGrad: 'from-brand-cyan via-brand-blue to-transparent',
  },
  blue: {
    border: 'border-brand-blue/40',
    activeBorder: 'border-brand-blue',
    bg: 'bg-brand-blue/10',
    activeBg: 'bg-brand-blue/15',
    text: 'text-brand-blue',
    dot: 'bg-brand-blue shadow-[0_0_12px_rgba(56,189,248,0.8)]',
    tag: 'border-brand-blue/40 text-brand-blue bg-brand-blue/10',
    accentGrad: 'from-brand-blue via-brand-cyan to-transparent',
  },
  emerald: {
    border: 'border-brand-emerald/40',
    activeBorder: 'border-brand-emerald',
    bg: 'bg-brand-emerald/10',
    activeBg: 'bg-brand-emerald/15',
    text: 'text-brand-emerald',
    dot: 'bg-brand-emerald shadow-[0_0_12px_rgba(52,211,153,0.8)]',
    tag: 'border-brand-emerald/40 text-brand-emerald bg-brand-emerald/10',
    accentGrad: 'from-brand-emerald via-brand-cyan to-transparent',
  },
};

export const Scene04Growth: React.FC<Scene04Props> = ({ isRtl }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [activeMilestone, setActiveMilestone] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setActiveMilestone(0);
      return;
    }

    if (!sectionRef.current) return;

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

      // Milestone cards stagger reveal & active state triggers
      milestones.forEach((_, i) => {
        gsap.fromTo(
          `.s4-card-${i}`,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: `.s4-card-${i}`,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        ScrollTrigger.create({
          trigger: `.s4-card-${i}`,
          start: 'top 65%',
          end: 'bottom 45%',
          onEnter: () => setActiveMilestone(i),
          onEnterBack: () => setActiveMilestone(i),
        });
      });

      // Progress rail fill linked to scroll
      gsap.fromTo(
        '.s4-rail-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: '.s4-timeline-container',
            start: 'top 70%',
            end: 'bottom 35%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl]);

  const currentMilestone = milestones[activeMilestone];
  const activeColor = colorConfig[currentMilestone.color];

  return (
    <section
      ref={sectionRef}
      id="about-scene-04"
      aria-label={isRtl ? 'النمو' : 'The Growth'}
      className="relative overflow-hidden bg-brand-bg py-16 lg:py-24"
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-1/4 left-10 w-[400px] h-[400px] rounded-full bg-brand-cyan/6 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-brand-emerald/6 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className={cn('mb-12 max-w-2xl', isRtl ? 'text-right ml-auto' : 'text-left')}>
          <div className={cn('flex items-center gap-3 mb-4', isRtl ? 'justify-end flex-row-reverse' : '')}>
            <span className="font-mono text-xs text-brand-emerald font-bold tracking-[0.2em] uppercase">04</span>
            <span className="w-8 h-px bg-brand-emerald/40" />
            <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">
              {isRtl ? 'النمو والمسار' : 'The Growth'}
            </span>
          </div>

          <h2
            ref={headlineRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight"
          >
            {isRtl ? (
              <>
                أتعلّم، وأجرّب، وأبني…
                <br />
                <span className="text-brand-emerald">وأتطور مع كل خطوة.</span>
              </>
            ) : (
              <>
                Learning.
                <span className="text-brand-blue"> Building.</span>
                <br />
                <span className="text-brand-emerald">Evolving with purpose.</span>
              </>
            )}
          </h2>
        </div>

        {/* Sticky Split Grid on Desktop, Vertical on Mobile */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start s4-timeline-container">

          {/* Desktop Sticky Showcase Panel */}
          <div
            className={cn(
              'hidden lg:block lg:col-span-5 sticky top-28',
              isRtl ? 'lg:order-2 text-right' : 'lg:order-1 text-left'
            )}
          >
            <div className="glass-panel rounded-2xl border border-brand-border/60 p-6 sm:p-8 shadow-xl relative overflow-hidden">
              {/* Header status */}
              <div className={cn('flex items-center justify-between mb-6 pb-4 border-b border-brand-border/30', isRtl && 'flex-row-reverse')}>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-brand-cyan">
                    STAGE {String(currentMilestone.id).padStart(2, '0')} / 06
                  </span>
                </div>
                <span className={cn('font-mono text-[11px] px-2.5 py-0.5 rounded-full border', activeColor.tag)}>
                  {isRtl ? currentMilestone.tagAr : currentMilestone.tagEn}
                </span>
              </div>

              {/* Active icon showcase */}
              <div className={cn('flex items-center gap-4 mb-5', isRtl && 'flex-row-reverse')}>
                <div
                  className={cn(
                    'w-16 h-16 rounded-2xl border-2 flex items-center justify-center font-mono text-xl font-bold transition-all duration-300',
                    activeColor.activeBorder,
                    activeColor.activeBg,
                    activeColor.text,
                    'shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                  )}
                >
                  {currentMilestone.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-text">
                    {isRtl ? currentMilestone.labelAr : currentMilestone.labelEn}
                  </h3>
                  <span className="font-mono text-xs text-brand-muted">
                    {isRtl ? 'المحطة النشطة' : 'Current Focus'}
                  </span>
                </div>
              </div>

              {/* In-depth narrative */}
              <p className="text-brand-muted text-sm sm:text-base leading-relaxed mb-6">
                {isRtl ? currentMilestone.descAr : currentMilestone.descEn}
              </p>

              {/* Skills and competencies */}
              <div className="space-y-2">
                <span className="block font-mono text-[10px] text-brand-muted/80 uppercase tracking-widest">
                  {isRtl ? 'المهارات والركائز المكتسبة:' : 'Key Competencies:'}
                </span>
                <div className={cn('flex flex-wrap gap-1.5', isRtl && 'justify-end')}>
                  {currentMilestone.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="font-mono text-xs px-2.5 py-1 rounded-md bg-brand-surface/70 border border-brand-border/40 text-brand-text/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini progress bar inside panel */}
              <div className="mt-6 pt-4 border-t border-brand-border/30">
                <div className="w-full bg-brand-surface/80 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-emerald transition-all duration-300"
                    style={{ width: `${(currentMilestone.id / milestones.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Milestone Cards */}
          <div
            className={cn(
              'lg:col-span-7 relative',
              isRtl ? 'lg:order-1' : 'lg:order-2'
            )}
          >
            {/* Vertical timeline rail */}
            <div
              className={cn(
                'absolute top-4 bottom-4 w-0.5 bg-brand-border/30',
                isRtl ? 'right-5 sm:right-6' : 'left-5 sm:left-6'
              )}
              aria-hidden="true"
            >
              <div
                className="s4-rail-fill absolute top-0 inset-x-0 bg-gradient-to-b from-brand-cyan via-brand-blue to-brand-emerald origin-top"
                style={{ height: '100%' }}
              />
            </div>

            {/* Milestones list */}
            <div className="space-y-6">
              {milestones.map((m, i) => {
                const c = colorConfig[m.color];
                const isActive = activeMilestone === i;

                return (
                  <div
                    key={m.id}
                    onClick={() => setActiveMilestone(i)}
                    className={cn(
                      `s4-card-${i} relative flex items-start gap-4 sm:gap-6 cursor-pointer group transition-all duration-300`,
                      isRtl ? 'flex-row-reverse text-right pr-2 sm:pr-3' : 'pl-2 sm:pl-3 text-left'
                    )}
                  >
                    {/* Node indicator on the rail */}
                    <div
                      className={cn(
                        'relative z-10 shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-all duration-300',
                        isActive
                          ? [c.activeBorder, c.activeBg, c.text, 'scale-110 shadow-lg']
                          : 'border-brand-border/50 bg-brand-surface text-brand-muted hover:border-brand-muted'
                      )}
                    >
                      {m.icon}
                    </div>

                    {/* Milestone content card with clear contrast */}
                    <div
                      className={cn(
                        'flex-1 glass-panel rounded-2xl border p-4 sm:p-5 transition-all duration-300',
                        isActive
                          ? [c.border, c.bg, 'shadow-md translate-y-[-2px]']
                          : 'border-brand-border/30 bg-brand-surface/30 hover:bg-brand-surface/60 hover:border-brand-border/60'
                      )}
                    >
                      <div className={cn('flex items-center justify-between gap-2 mb-2', isRtl && 'flex-row-reverse')}>
                        <span className="font-mono text-[11px] text-brand-muted">
                          0{m.id}
                        </span>
                        <span
                          className={cn(
                            'font-mono text-[10px] px-2 py-0.5 rounded-full border font-medium',
                            isActive ? c.tag : 'border-brand-border/30 text-brand-muted/80 bg-brand-surface/50'
                          )}
                        >
                          {isRtl ? m.tagAr : m.tagEn}
                        </span>
                      </div>

                      <h3
                        className={cn(
                          'text-base sm:text-lg font-bold mb-1.5 transition-colors',
                          isActive ? c.text : 'text-brand-text'
                        )}
                      >
                        {isRtl ? m.labelAr : m.labelEn}
                      </h3>

                      <p className="text-brand-muted text-xs sm:text-sm leading-relaxed mb-3">
                        {isRtl ? m.descAr : m.descEn}
                      </p>

                      {/* Mobile skills preview */}
                      <div className={cn('flex flex-wrap gap-1.5 lg:hidden', isRtl && 'justify-end')}>
                        {m.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="font-mono text-[10px] px-2 py-0.5 rounded bg-brand-surface/60 border border-brand-border/30 text-brand-muted"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Continuity spine line to Scene 05 */}
      <div className="flex justify-center mt-12" aria-hidden="true">
        <div className="w-px h-8 bg-gradient-to-b from-brand-emerald/40 via-brand-emerald/20 to-transparent" />
      </div>
    </section>
  );
};
