import React from 'react';
import { cn } from '../../lib/utils';

interface TechGridProps {
  className?: string;
  dense?: boolean;
  withVignette?: boolean;
  withCrosshairs?: boolean;
}

export const TechGrid: React.FC<TechGridProps> = ({
  className,
  dense = false,
  withVignette = true,
  withCrosshairs = true,
}) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 -z-20 overflow-hidden select-none',
        className
      )}
      aria-hidden="true"
    >
      {/* Base Grid */}
      <div
        className={cn(
          'absolute inset-0 opacity-[0.4]',
          dense ? 'bg-tech-grid-dense' : 'bg-tech-grid'
        )}
      />

      {/* Radial Vignette */}
      {withVignette && <div className="absolute inset-0 bg-radial-vignette" />}

      {/* Subtle Coordinate Crosshairs for Architectural Polish */}
      {withCrosshairs && (
        <>
          <div className="absolute top-12 left-12 text-[10px] font-mono text-brand-cyan/20">
            + 00° 12' 44"
          </div>
          <div className="absolute top-12 right-12 text-[10px] font-mono text-brand-emerald/20">
            + SYS.ONLINE
          </div>
          <div className="absolute bottom-12 left-12 text-[10px] font-mono text-brand-blue/20">
            + MERN // WP
          </div>
          <div className="absolute bottom-12 right-12 text-[10px] font-mono text-brand-cyan/20">
            + AYA.STUDIO
          </div>
        </>
      )}
    </div>
  );
};
