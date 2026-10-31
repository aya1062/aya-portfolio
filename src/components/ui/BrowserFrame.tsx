import React from 'react';
import { cn } from '../../lib/utils';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface BrowserFrameProps {
  children: React.ReactNode;
  className?: string;
  url?: string;
  title?: string;
  badge?: string;
  showAuroraHalo?: boolean;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  children,
  className,
  url = 'https://aya.studio/experience',
  title = 'Aya Creative Studio',
  badge,
  showAuroraHalo = true,
}) => {
  return (
    <div className={cn('relative group', className)}>
      {/* Aurora Ambient Halo */}
      {showAuroraHalo && (
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-cyan/20 via-brand-blue/20 to-brand-emerald/20 opacity-40 blur-xl transition-all duration-700 group-hover:opacity-75" />
      )}

      {/* Frame Container */}
      <div className="relative rounded-xl border border-brand-border bg-brand-surface/90 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-brand-cyan/40">
        {/* Browser Top Navigation Bar */}
        <div className="flex items-center justify-between border-b border-brand-border/80 bg-brand-surface-elevated/70 px-4 py-3">
          {/* Mac-style Traffic Light Window Controls */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#EF4444]/70 border border-[#EF4444]" />
            <span className="h-3 w-3 rounded-full bg-[#F59E0B]/70 border border-[#F59E0B]" />
            <span className="h-3 w-3 rounded-full bg-[#10B981]/70 border border-[#10B981]" />
          </div>

          {/* Browser Address Bar */}
          <div className="flex items-center gap-2 rounded-md bg-[#0B1318] px-3.5 py-1 text-xs font-mono text-brand-muted border border-brand-border/60 max-w-xs md:max-w-md w-full justify-center mx-2 truncate">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-emerald shrink-0" />
            <span className="text-brand-cyan/80 select-all truncate">{url}</span>
          </div>

          {/* Optional status or title badge */}
          <div className="flex items-center gap-2">
            {badge ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/20">
                <Sparkles className="h-2.5 w-2.5" />
                {badge}
              </span>
            ) : (
              <span className="text-[11px] font-mono text-brand-muted hidden sm:inline">
                {title}
              </span>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative bg-[#070D12]/95">{children}</div>
      </div>
    </div>
  );
};
