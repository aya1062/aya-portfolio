import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface AboutProgressProps {
  isRtl: boolean;
}

const scenes = ['01', '02', '03', '04', '05', '06'];
const sceneIds = [
  'about-scene-01',
  'about-scene-02',
  'about-scene-03',
  'about-scene-04',
  'about-scene-05',
  'about-scene-06',
];

export const AboutProgress: React.FC<AboutProgressProps> = ({ isRtl }) => {
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sceneIds.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveScene(index);
          }
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const scrollToScene = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label={isRtl ? 'التنقل بين مشاهد الصفحة' : 'Page scene navigation'}
      className={cn(
        'fixed top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3',
        isRtl ? 'left-6' : 'right-6'
      )}
    >
      {scenes.map((label, i) => (
        <button
          key={i}
          onClick={() => scrollToScene(sceneIds[i])}
          aria-label={`${isRtl ? 'مشهد' : 'Scene'} ${label}`}
          className={cn(
            'group relative flex items-center gap-2 transition-all duration-300',
            isRtl ? 'flex-row-reverse' : 'flex-row'
          )}
        >
          {/* Tooltip label */}
          <span
            className={cn(
              'absolute font-mono text-[10px] text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap',
              isRtl ? 'right-6' : 'left-6'
            )}
          >
            {label}
          </span>

          {/* Dot */}
          <span
            className={cn(
              'block rounded-full transition-all duration-300',
              activeScene === i
                ? 'w-2.5 h-2.5 bg-brand-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                : 'w-1.5 h-1.5 bg-brand-border/60 group-hover:bg-brand-muted'
            )}
          />
        </button>
      ))}

      {/* Vertical line connector */}
      <div
        className="absolute top-0 bottom-0 w-px bg-brand-border/20 -z-10"
        aria-hidden="true"
      />
    </nav>
  );
};
