import React from 'react';
import { Container } from '../../components/ui/Container';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useLanguage } from '../../hooks/useLanguage';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export const WordPressServicePage: React.FC = () => {
  const { currentLang, isRtl } = useLanguage();

  return (
    <div className="py-20 min-h-[75vh]">
      <Container size="lg">
        <div className="mb-6">
          <Link
            to={`/${currentLang}/services`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-muted hover:text-brand-cyan transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
            <span>{isRtl ? 'العودة للخدمات' : 'Back to Services'}</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-brand-border bg-brand-surface/80 p-8 sm:p-12 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-emerald/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <Badge variant="emerald" dot>
              {isRtl ? 'خدمة متخصصة' : 'DEDICATED SERVICE'}
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-text">
              {isRtl ? 'مواقع ووردبريس وتجارة إلكترونية متطورة' : 'WordPress & WooCommerce Architecture'}
            </h1>

            <p className="text-base sm:text-lg text-brand-muted max-w-2xl leading-relaxed">
              {isRtl
                ? 'مواقع احترافية وسريعة، كتل جوتنبرج مخصصة، تكامل سلس مع بوابات الدفع، ولوحات تحكم واضحة بدون تعقيد. تجربة التجميع التفاعلي ستُنفذ بالكامل في مرحلتها المخصصة.'
                : 'High-performance bespoke WordPress websites, custom Gutenberg blocks, WooCommerce integration, and clean administration. The scroll-driven assembly experience will be fully implemented in its designated phase.'}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded bg-brand-surface-elevated px-3 py-1 font-mono text-xs text-brand-emerald border border-brand-emerald/30">
                Custom PHP Themes
              </span>
              <span className="rounded bg-brand-surface-elevated px-3 py-1 font-mono text-xs text-brand-cyan border border-brand-cyan/30">
                Gutenberg Custom Blocks
              </span>
              <span className="rounded bg-brand-surface-elevated px-3 py-1 font-mono text-xs text-brand-blue border border-brand-blue/30">
                WooCommerce Engine
              </span>
            </div>

            <div className="pt-6">
              <Link to={`/${currentLang}/contact`}>
                <Button variant="emerald" icon={<ArrowUpRight className="h-4 w-4" />}>
                  {isRtl ? 'ابدأ مشروع ووردبريس' : 'Start a WordPress Project'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
