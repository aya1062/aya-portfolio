import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { ArrowUpRight } from 'lucide-react';

interface Scene06Props {
  isRtl: boolean;
  currentLang: string;
}

export const Scene06Closing: React.FC<Scene06Props> = ({ isRtl, currentLang }) => {
  return (
    <section
      id="services-scene-06"
      aria-label={isRtl ? 'خاتمة الخدمات وتواصل' : 'Services Closing CTA'}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-brand-bg py-20 lg:py-28"
    >
      {/* Background Aurora composite glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
        <div className="w-[500px] h-[320px] rounded-full bg-brand-cyan/8 blur-[100px]" />
        <div className="w-[350px] h-[220px] rounded-full bg-brand-emerald/7 blur-[90px] -translate-y-6" />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/30 bg-brand-surface/70 font-mono text-xs text-brand-cyan mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
          <span>{isRtl ? 'جاهز للبدء؟' : 'READY TO START?'}</span>
        </div>

        {/* Headline strictly matching prompt */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-text leading-tight mb-6">
          {isRtl ? (
            <>
              عندك فكرة؟
              <br />
              <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-emerald bg-clip-text text-transparent">
                خلينا نحولها لحاجة حقيقية.
              </span>
            </>
          ) : (
            <>
              Have an idea in mind?
              <br />
              <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-emerald bg-clip-text text-transparent">
                Let's build it.
              </span>
            </>
          )}
        </h2>

        <p className="text-brand-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          {isRtl
            ? 'سواء كان مشروعك يحتاج موقع ووردبريس أو تطبيق ويب مخصص، شاركني فكرتك ولنبدأ في التخطيط والتنفيذ.'
            : "Whether you need a custom WordPress site or a tailored web application, tell me what you're planning and let's discuss how to bring it to life."}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link to={`/${currentLang}/contact`}>
            <Button
              variant="primary"
              size="lg"
              isGlowing
              icon={<ArrowUpRight className={cn('h-5 w-5', isRtl && 'rotate-[-90deg]')} />}
              iconPosition={isRtl ? 'left' : 'right'}
            >
              {isRtl ? 'تواصل معي' : "Let's Talk"}
            </Button>
          </Link>

          <Link to={`/${currentLang}/portfolio`}>
            <Button variant="outline" size="lg">
              {isRtl ? 'استكشف أعمالي' : 'Explore My Work'}
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

