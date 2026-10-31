import React from 'react';
import { cn } from '../../lib/utils';
import { Lightbulb, FileCheck2, Compass, Cpu, Rocket } from 'lucide-react';

interface Scene04Props {
  isRtl: boolean;
}

const steps = [
  {
    num: '01',
    icon: Lightbulb,
    titleEn: 'Understand the Idea',
    titleAr: 'فهم الفكرة والهدف التجاري',
    descEn: 'We start by unpacking what makes your project unique: the audience you serve, the core problem being solved, and what concrete success looks like.',
    descAr: 'نبدأ بجلسة نقاش عميقة لفهم مشروعك: من هم عملاؤك، ما القيمة الحقيقية التي تقدمها لهم، وما هو الهدف الذي تريد للموقع تحقيقه على أرض الواقع.',
    deliverableEn: 'Discovery Notes & Strategic Objectives',
    deliverableAr: 'رؤية واضحة وتحديد للأهداف الأساسية للمشروع',
    color: 'cyan' as const,
  },
  {
    num: '02',
    icon: FileCheck2,
    titleEn: 'Define the Requirements',
    titleAr: 'تحديد الاحتياجات والمتطلبات التقنية',
    descEn: 'Choosing between WordPress or custom MERN based strictly on your functional needs, budget, timeline, and scaling expectations — with zero fluff.',
    descAr: 'نختار بوضوح المسار التقني الأنسب (ووردبريس أو برمجة مخصصة بالكامل) وفقاً لاحتياجاتك وميزانيتك وطبيعة بياناتك، دون تعقيد غير مبرر.',
    deliverableEn: 'Technical Scope & Feature Blueprint',
    deliverableAr: 'وثيقة واضحة بنطاق العمل والميزات التقنية المطلوبة',
    color: 'blue' as const,
  },
  {
    num: '03',
    icon: Compass,
    titleEn: 'Plan the Experience',
    titleAr: 'تخطيط تجربة المستخدم وتصميم الهيكل',
    descEn: 'Mapping intuitive navigation flows, wireframes, and responsive layouts to ensure visitors find clarity and take action without friction.',
    descAr: 'تصميم هيكل التنقل وتجربة التصفح لضمان أن كل زائر يجد ما يبحث عنه بسهولة، ويكون مسار التفاعل والحجز أو الشراء في غاية الوضوح.',
    deliverableEn: 'UX Flows & Interactive Prototypes',
    deliverableAr: 'مخططات تجربة المستخدم وهيكل الصفحات التفاعلي',
    color: 'emerald' as const,
  },
  {
    num: '04',
    icon: Cpu,
    titleEn: 'Build and Test Rigorously',
    titleAr: 'البناء البرمجي والاختبار الدقيق',
    descEn: 'Writing clean, performant code, integrating custom features, and testing across screen sizes, browsers, and mobile devices before anything goes live.',
    descAr: 'كتابة شفرة برمجية نظيفة وسريعة، وربط الوظائف البرمجية، واختبار الأداء والاستجابة على كافة أحجام الشاشات والمتصفحات بعناية.',
    deliverableEn: 'Staging Preview & Quality Assurance',
    deliverableAr: 'نسخة تجريبية للاختبار والتأكد من سلاسة كل ميزة',
    color: 'cyan' as const,
  },
  {
    num: '05',
    icon: Rocket,
    titleEn: 'Deliver and Improve',
    titleAr: 'الإطلاق والدعم المستمر للتطوير',
    descEn: 'Smooth deployment to production, client walkthrough for content management, and ongoing support to ensure the website continues to perform.',
    descAr: 'إطلاق الموقع بشكل رسمي، وشرح مبسط لطريقة إدارة المحتوى بنفسك، مع دعم فني ومتابعة لضمان استقرار وسرعة الموقع على المدى الطويل.',
    deliverableEn: 'Live Production Site & Training Guide',
    deliverableAr: 'إطلاق مباشر ودليل تدريبي لإدارة موقعك بسهولة',
    color: 'emerald' as const,
  },
];

const colorStyles = {
  cyan: {
    border: 'border-brand-cyan/40',
    num: 'text-brand-cyan',
    badge: 'border-brand-cyan/30 text-brand-cyan bg-brand-cyan/10',
    iconBg: 'bg-brand-cyan/10 text-brand-cyan',
  },
  blue: {
    border: 'border-brand-blue/40',
    num: 'text-brand-blue',
    badge: 'border-brand-blue/30 text-brand-blue bg-brand-blue/10',
    iconBg: 'bg-brand-blue/10 text-brand-blue',
  },
  emerald: {
    border: 'border-brand-emerald/40',
    num: 'text-brand-emerald',
    badge: 'border-brand-emerald/30 text-brand-emerald bg-brand-emerald/10',
    iconBg: 'bg-brand-emerald/10 text-brand-emerald',
  },
};

export const Scene04HowIWork: React.FC<Scene04Props> = ({ isRtl }) => {
  return (
    <section
      id="services-scene-04"
      aria-label={isRtl ? 'منهجية العمل' : 'How I Work'}
      className="relative overflow-hidden bg-brand-bg py-20 lg:py-28"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={cn('mb-14 max-w-2xl', isRtl ? 'text-right ml-auto' : 'text-left')}>
          <div className={cn('flex items-center gap-3 mb-4', isRtl ? 'justify-end flex-row-reverse' : '')}>
            <span className="font-mono text-xs text-brand-blue font-bold tracking-[0.2em] uppercase">04</span>
            <span className="w-8 h-px bg-brand-blue/40" />
            <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">
              {isRtl ? 'منهجية العمل' : 'How I Work'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight">
            {isRtl ? (
              <>
                خطوات واضحة…
                <br />
                <span className="text-brand-blue">من الفكرة الأولى وحتى الإطلاق الناجح.</span>
              </>
            ) : (
              <>
                A structured path.
                <br />
                <span className="text-brand-blue">From initial spark to confident launch.</span>
              </>
            )}
          </h2>
          <p className="text-brand-muted text-base mt-3 leading-relaxed">
            {isRtl
              ? 'الوضوح في التواصل أساس كل عمل ناجح. إليك الخطوات الخمس التي نتبعها معاً لتحويل متطلباتك إلى موقع حقيقي يعمل بثبات وسرعة.'
              : 'Clear communication from start to finish. Here is how I collaborate with you to turn your requirements into a working website.'}
          </p>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          
          {/* Subtle connecting datum line (hidden on mobile) */}
          <div
            className="hidden md:block absolute top-7 left-8 right-8 h-px bg-gradient-to-r from-brand-cyan/30 via-brand-blue/30 to-brand-emerald/30 -z-10"
            aria-hidden="true"
          />

          {steps.map((step) => {
            const c = colorStyles[step.color];
            const StepIcon = step.icon;

            return (
              <div
                key={step.num}
                className={cn(
                  'glass-panel rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 hover:border-brand-cyan/60 hover:bg-brand-surface/80',
                  c.border,
                  isRtl ? 'text-right' : 'text-left'
                )}
              >
                <div>
                  {/* Step header: icon + number */}
                  <div className={cn('flex items-center justify-between mb-4', isRtl && 'flex-row-reverse')}>
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center font-bold', c.iconBg)}>
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <span className={cn('font-mono font-bold text-sm', c.num)}>
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-brand-text mb-2">
                    {isRtl ? step.titleAr : step.titleEn}
                  </h3>

                  <p className="text-xs text-brand-muted leading-relaxed mb-4">
                    {isRtl ? step.descAr : step.descEn}
                  </p>
                </div>

                {/* Deliverable Pill */}
                <div className="pt-3 border-t border-brand-border/30">
                  <span className="block font-mono text-[9px] text-brand-muted uppercase mb-1">
                    {isRtl ? 'المخرجات الملموسة:' : 'Deliverable:'}
                  </span>
                  <span className={cn('block font-mono text-[10px] font-semibold leading-tight', c.num)}>
                    {isRtl ? step.deliverableAr : step.deliverableEn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Continuity line */}
      <div className="flex justify-center mt-16" aria-hidden="true">
        <div className="w-px h-10 bg-gradient-to-b from-brand-blue/40 via-brand-emerald/40 to-transparent" />
      </div>
    </section>
  );
};
