import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useLanguage } from '../../hooks/useLanguage';
import { projects } from '../../data/projects';
import { ArrowLeft, ArrowUpRight, FolderX } from 'lucide-react';

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { currentLang, isRtl } = useLanguage();

  const project = projects.find((p) => p.slug === slug);

  // Not Found State for invalid project slugs
  if (!project) {
    return (
      <div className="py-24 min-h-[75vh] flex items-center">
        <Container size="sm">
          <div className="rounded-2xl border border-brand-border bg-brand-surface/80 p-8 sm:p-12 text-center space-y-6 backdrop-blur-xl">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                <FolderX className="h-8 w-8" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-text">
                {isRtl ? 'المشروع غير موجود' : 'Project Not Found'}
              </h1>
              <p className="text-sm text-brand-muted max-w-md mx-auto">
                {isRtl
                  ? 'لم يتم العثور على المشروع المطلوب. يمكنك تصفح باقي المشاريع المتاحة في معرض أعمالي.'
                  : 'The requested project could not be found. You can browse all available projects in my portfolio.'}
              </p>
            </div>
            <div>
              <Link to={`/${currentLang}/portfolio`}>
                <Button variant="primary" icon={<ArrowLeft className="h-4 w-4 rtl:rotate-180" />} iconPosition="left">
                  {isRtl ? 'العودة للمشاريع' : 'Back to Projects'}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-20 min-h-[80vh]">
      <Container size="lg">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to={`/${currentLang}/portfolio`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-muted hover:text-brand-cyan transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
            <span>{isRtl ? 'العودة للمشاريع' : 'Back to Projects'}</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-3">
            <Badge variant="cyan" dot>
              {project.category[currentLang]}
            </Badge>
            <span className="text-xs font-mono text-brand-emerald">
              {project.technologies.join(' • ')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-text">
            {project.title[currentLang]}
          </h1>

          <p className="text-lg text-brand-muted leading-relaxed max-w-3xl">
            {project.shortDescription[currentLang]}
          </p>
        </div>

        {/* Structured Sections Blueprint */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="rounded-xl border border-brand-border bg-brand-surface/60 p-6 space-y-2">
            <h2 className="text-xs font-mono text-brand-cyan uppercase tracking-wider">
              {isRtl ? '01 — الهدف والتحدي' : '01 — The Goal'}
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed">
              {isRtl
                ? 'فهم متطلبات المشروع وتحويلها إلى هيكل تقني واضح يسهل على المستخدمين إنجاز مهامهم وعلى الإدارة متابعة العمليات.'
                : 'Understanding the practical requirements and creating a clear digital structure that serves both end-users and administrators.'}
            </p>
          </div>

          <div className="rounded-xl border border-brand-border bg-brand-surface/60 p-6 space-y-2">
            <h2 className="text-xs font-mono text-brand-emerald uppercase tracking-wider">
              {isRtl ? '02 — دوري في المشروع' : '02 — My Role'}
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed">
              {isRtl
                ? 'تطوير الواجهات الأمامية التفاعلية، وبناء النماذج وقواعد البيانات، وربط واجهات برمجة التطبيقات (APIs).'
                : 'Developing the interactive frontend, setting up database models, and integrating responsive REST APIs.'}
            </p>
          </div>

          <div className="rounded-xl border border-brand-border bg-brand-surface/60 p-6 space-y-2">
            <h2 className="text-xs font-mono text-brand-blue uppercase tracking-wider">
              {isRtl ? '03 — أسلوب التنفيذ' : '03 — Implementation'}
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed">
              {isRtl
                ? 'الاعتماد على بنية كود نظيفة ومنظمة بدون تعقيدات زائدة، لضمان استقرار وسرعة الأداء وسهولة التطوير المستقبلي.'
                : 'Writing clean, modular code with minimal dependencies to ensure solid performance and straightforward future maintenance.'}
            </p>
          </div>
        </div>

        {/* Case Study Callout */}
        <div className="p-8 rounded-2xl border border-brand-border bg-brand-surface-elevated/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-brand-text">
              {isRtl ? 'عجبك أسلوب العمل وحابب نبدأ في مشروعك؟' : 'Interested in working together on a project?'}
            </h3>
            <p className="text-xs text-brand-muted">
              {isRtl ? 'يسعدني مناقشة فكرتك ومتطلباتك التقنية.' : "Let's discuss your requirements and how I can help."}
            </p>
          </div>

          <Link to={`/${currentLang}/contact`}>
            <Button variant="primary" icon={<ArrowUpRight className="h-4 w-4" />}>
              {isRtl ? 'تواصل معي' : "Get in Touch"}
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};
