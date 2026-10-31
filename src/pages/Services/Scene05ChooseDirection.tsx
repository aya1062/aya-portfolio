import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { ArrowUpRight, Compass, Code, Layout } from 'lucide-react';

interface Scene05Props {
  isRtl: boolean;
  currentLang: string;
}

export const Scene05ChooseDirection: React.FC<Scene05Props> = ({ isRtl, currentLang }) => {
  return (
    <section
      id="services-scene-05"
      aria-label={isRtl ? 'اختر مسارك' : 'Choose Your Direction'}
      className="relative overflow-hidden bg-brand-bg py-20 lg:py-24"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={cn('text-center max-w-2xl mx-auto mb-14', isRtl ? 'space-y-3' : 'space-y-3')}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-emerald/40 bg-brand-surface/70 font-mono text-xs text-brand-emerald">
            <Compass className="w-3.5 h-3.5" />
            <span>{isRtl ? 'وجهتك التالية' : 'CHOOSE YOUR DIRECTION'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight">
            {isRtl ? (
              <>
                جاهز تشوف المشاريع؟
                <br />
                <span className="text-brand-cyan">اختر المسار الأنسب لطبيعة فكرتك.</span>
              </>
            ) : (
              <>
                Ready to see the work?
                <br />
                <span className="text-brand-cyan">Choose the path that fits your vision.</span>
              </>
            )}
          </h2>
          <p className="text-brand-muted text-base">
            {isRtl
              ? 'تصفح المشاريع التي قمت بتطويرها واكتشف كيفية عملها على أرض الواقع.'
              : "Explore the projects I've built and see how they work in practice."}
          </p>
        </div>

        {/* Dual Path Cards */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Path 1: WordPress Projects */}
          <div
            className={cn(
              'rounded-3xl border border-brand-emerald/40 bg-gradient-to-b from-brand-surface/90 to-brand-bg/90 p-8 sm:p-10 shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-brand-emerald hover:shadow-[0_0_30px_rgba(52,211,153,0.12)]',
              isRtl ? 'text-right' : 'text-left'
            )}
          >
            <div>
              <div className={cn('flex items-center gap-3 mb-6', isRtl && 'flex-row-reverse')}>
                <div className="w-12 h-12 rounded-2xl bg-brand-emerald/15 border border-brand-emerald/40 flex items-center justify-center text-brand-emerald">
                  <Layout className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs text-brand-emerald uppercase tracking-wider block font-semibold">
                    PATH 01
                  </span>
                  <h3 className="text-2xl font-bold text-brand-text">
                    {isRtl ? 'مشاريع ووردبريس' : 'WordPress Projects'}
                  </h3>
                </div>
              </div>

              <p className="text-brand-muted text-sm sm:text-base leading-relaxed mb-6">
                {isRtl
                  ? 'استكشف مواقع الشركات، المتاجر الإلكترونية، وحلول المحتوى المخصصة التي تجمع بين سرعة الأداء وسهولة الإدارة المستقلة.'
                  : 'Explore tailored business sites, WooCommerce setups, and content engines built for speed and complete operational autonomy.'}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {['Custom Gutenberg', 'WooCommerce', 'High PageSpeed', 'Client Autonomy'].map((tag, i) => (
                  <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-brand-surface border border-brand-border/40 text-brand-text/90">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link to={`/${currentLang}/portfolio?type=wordpress`} className="w-full">
              <Button
                variant="secondary"
                size="lg"
                className="w-full border-brand-emerald/40 hover:bg-brand-emerald/15 text-brand-emerald"
                icon={<ArrowUpRight className={cn('h-5 w-5', isRtl && 'rotate-[-90deg]')} />}
                iconPosition={isRtl ? 'left' : 'right'}
              >
                {isRtl ? 'استكشف مشاريع ووردبريس' : 'Explore WordPress Projects'}
              </Button>
            </Link>
          </div>

          {/* Path 2: Custom Development Projects */}
          <div
            className={cn(
              'rounded-3xl border border-brand-cyan/40 bg-gradient-to-b from-brand-surface/90 to-brand-bg/90 p-8 sm:p-10 shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-brand-cyan hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]',
              isRtl ? 'text-right' : 'text-left'
            )}
          >
            <div>
              <div className={cn('flex items-center gap-3 mb-6', isRtl && 'flex-row-reverse')}>
                <div className="w-12 h-12 rounded-2xl bg-brand-cyan/15 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan">
                  <Code className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs text-brand-cyan uppercase tracking-wider block font-semibold">
                    PATH 02
                  </span>
                  <h3 className="text-2xl font-bold text-brand-text">
                    {isRtl ? 'مشاريع التطوير المخصص (MERN)' : 'Custom Web Projects'}
                  </h3>
                </div>
              </div>

              <p className="text-brand-muted text-sm sm:text-base leading-relaxed mb-6">
                {isRtl
                  ? 'اكتشف دراسات حالة حقيقية (مثل لامار بارك وهيكسا) التي بنيت فيها أنظمة حجز معقدة، بوابات خدمات، وقواعد بيانات ديناميكية.'
                  : 'Review authentic case studies like Lamar Park and HIXA featuring tailored booking flows, multi-role portals, and reactive UI architectures.'}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {['React / TypeScript', 'Node.js & Express', 'MongoDB Schemas', 'Role-Based Access'].map((tag, i) => (
                  <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-brand-surface border border-brand-border/40 text-brand-text/90">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link to={`/${currentLang}/portfolio?type=mern`} className="w-full">
              <Button
                variant="primary"
                size="lg"
                isGlowing
                className="w-full"
                icon={<ArrowUpRight className={cn('h-5 w-5', isRtl && 'rotate-[-90deg]')} />}
                iconPosition={isRtl ? 'left' : 'right'}
              >
                {isRtl ? 'استكشف مشاريع MERN المخصصة' : 'Explore Custom Development'}
              </Button>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

