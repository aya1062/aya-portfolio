import React from 'react';
import { Container } from '../../components/ui/Container';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useLanguage } from '../../hooks/useLanguage';
import { projects } from '../../data/projects';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export const PortfolioPage: React.FC = () => {
  const { currentLang, isRtl } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeType = searchParams.get('type') || 'all';

  const filterTabs = [
    { id: 'all', labelEn: 'All Projects', labelAr: 'كل المشاريع' },
    { id: 'wordpress', labelEn: 'WordPress Websites', labelAr: 'مواقع ووردبريس' },
    { id: 'mern', labelEn: 'MERN Applications', labelAr: 'تطبيقات MERN' },
  ];

  const handleFilter = (type: string) => {
    if (type === 'all') {
      searchParams.delete('type');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ type });
    }
  };

  const filteredProjects = projects.filter(
    (p) => activeType === 'all' || p.type === activeType
  );

  return (
    <div className="py-20 min-h-[75vh]">
      <Container size="xl">
        <div className="space-y-4 mb-8 max-w-2xl">
          <Badge variant="cyan" dot>
            {isRtl ? 'المشاريع والأعمال' : 'PROJECTS & WORK'}
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-text">
            {isRtl
              ? 'مشاريع قمت بتطويرها. حلول عملية مبنية للاستخدام الفعلي.'
              : 'Selected Projects. Built for real use.'}
          </h1>
          <p className="text-brand-muted">
            {isRtl
              ? 'مجموعة من مواقع ووردبريس وتطبيقات الويب التي طوّرتها، مع التركيز على الكود النظيف، التصميم المتجاوب، والأداء العملي المباشر.'
              : "A collection of web applications and WordPress websites I've built, focusing on clean code, responsive design, and practical functionality."}
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-brand-border/40">
          {filterTabs.map((tab) => {
            const isActive = activeType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleFilter(tab.id)}
                className={cn(
                  'font-mono text-xs px-4 py-2 rounded-full border transition-all duration-200',
                  isActive
                    ? 'border-brand-cyan/60 bg-brand-cyan/15 text-brand-cyan font-semibold shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'border-brand-border/50 bg-brand-surface/40 text-brand-muted hover:border-brand-border hover:text-brand-text'
                )}
              >
                {isRtl ? tab.labelAr : tab.labelEn}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-brand-border bg-brand-surface/70 p-6 sm:p-8 backdrop-blur-md hover:border-brand-cyan/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider">
                    {project.category[currentLang]}
                  </span>
                  <span className="text-xs font-mono text-brand-emerald bg-brand-emerald/10 px-2 py-0.5 rounded border border-brand-emerald/20">
                    {project.type.toUpperCase()}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-brand-text mb-3 group-hover:text-brand-cyan transition-colors">
                  {project.title[currentLang]}
                </h2>

                <p className="text-sm text-brand-muted leading-relaxed mb-6">
                  {project.shortDescription[currentLang]}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6 pt-3 border-t border-brand-border/40">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-brand-surface-elevated px-2.5 py-1 text-xs font-mono text-brand-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link to={`/${currentLang}/portfolio/${project.slug}`}>
                  <Button variant="secondary" size="sm" icon={<ArrowUpRight className="h-3.5 w-3.5" />}>
                    {isRtl ? 'تفاصيل المشروع' : 'View Project Details'}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
