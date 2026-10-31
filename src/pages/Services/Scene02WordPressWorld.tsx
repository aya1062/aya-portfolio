import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { ShoppingBag, Building2, Hotel, Home, RefreshCw, CheckCircle2 } from 'lucide-react';

interface Scene02Props {
  isRtl: boolean;
}

interface WpCategory {
  id: string;
  icon: React.ElementType;
  titleEn: string;
  titleAr: string;
  badgeEn: string;
  badgeAr: string;
  descEn: string;
  descAr: string;
  highlightsEn: string[];
  highlightsAr: string[];
  previewType: 'business' | 'ecommerce' | 'hotel' | 'realestate' | 'maintenance';
}

const wpCategories: WpCategory[] = [
  {
    id: 'business',
    icon: Building2,
    titleEn: 'Business & Corporate Websites',
    titleAr: 'مواقع الشركات والمؤسسات',
    badgeEn: 'Authority & Credibility',
    badgeAr: 'حضور رسمي وموثوق',
    descEn: 'Strategic company websites designed to establish trust, clearly articulate services, and turn visitors into qualified client inquiries.',
    descAr: 'مواقع متكاملة تعكس قوة علامتك التجارية، وتبرز خدماتك بوضوح، وتحوّل الزوار إلى عملاء فعليين بفضل هيكلة تجربة مستخدم مدروسة.',
    highlightsEn: ['Custom Gutenberg Blocks', 'Fast Page Load (<1.2s)', 'Bilingual Arabic & English', 'Lead Capture Workflows'],
    highlightsAr: ['كتل جوتنبرج مخصصة بالكامل', 'سرعة تحميل فائقة (أقل من ثانية ونصف)', 'دعم ثنائي اللغة احترافي (عربي/إنجليزي)', 'مسارات تحويل وتواصل فعالة'],
    previewType: 'business',
  },
  {
    id: 'ecommerce',
    icon: ShoppingBag,
    titleEn: 'E-Commerce Stores (WooCommerce)',
    titleAr: 'المتاجر الإلكترونية المخصصة',
    badgeEn: 'High-Converting Checkout',
    badgeAr: 'تجربة بيع سلسة وسريعة',
    descEn: 'Frictionless online stores optimized for conversions, regional payment gateways, inventory management, and delightful mobile shopping.',
    descAr: 'متاجر إلكترونية مصممة لرفع معدل البيع، متكاملة مع بوابات الدفع المحلية والعالمية، وإدارة مخزون مرنة وسهلة الاستخدام.',
    highlightsEn: ['Seamless Multi-Step Checkout', 'Local Payment Gateways (Mada, Tap)', 'Mobile-First Catalog', 'Order & Inventory Sync'],
    highlightsAr: ['إتمام شراء ميسر بخطوات واضحة', 'تكامل مع بوابات الدفع (مدى، تابل، فيزا)', 'تصفح استثنائي وسريع عبر الجوال', 'إدارة مبسطة للطلبات والمنتجات'],
    previewType: 'ecommerce',
  },
  {
    id: 'hotel',
    icon: Hotel,
    titleEn: 'Hotel & Hospitality Platforms',
    titleAr: 'مواقع الفنادق والضيافة',
    badgeEn: 'Direct Reservations',
    badgeAr: 'حجوزات واستعراض مباشر',
    descEn: 'Captivating visual showcases for boutique hotels, resorts, and vacation rentals with direct booking integrations that bypass high OTA commissions.',
    descAr: 'واجهات استعراض جذابة للفنادق والشقق الفندقية، تتيح استعراض الغرف والمرافق وتلقي طلبات الحجز المباشر دون عمولات وسيطة.',
    highlightsEn: ['Date-Picker & Room Filter', 'Room Spec Comparisons', 'High-Res Visual Galleries', 'Interactive Amenities Grid'],
    highlightsAr: ['محدد تواريخ وفلترة للغرف', 'استعراض مواصفات ومزايا الأجنحة', 'معارض صور عالية الدقة بدون بطء', 'خريطة مرافق وخدمات تفاعلية'],
    previewType: 'hotel',
  },
  {
    id: 'realestate',
    icon: Home,
    titleEn: 'Real Estate & Property Portals',
    titleAr: 'مواقع العقارات والمجمعات السكنية',
    badgeEn: 'Interactive Listings',
    badgeAr: 'استعراض وتصفية متقدمة',
    descEn: 'Modern property platforms featuring dynamic filters, floor-plan showcases, neighborhood highlights, and seamless WhatsApp inquiry routing.',
    descAr: 'منصات عقارية متطورة توفر فلترة متقدمة للوحدات، واستعراض المخططات والمواقع، مع إمكانية التواصل الفوري عبر الواتساب.',
    highlightsEn: ['Dynamic Property Filtering', 'Floor Plan & Virtual Showcase', 'Location & Amenity Maps', 'Instant WhatsApp Inquiries'],
    highlightsAr: ['تصفية متطورة حسب المساحة والسعر', 'استعراض المخططات الهندسية', 'خرائط الخدمات والأحياء المحيطة', 'تواصل مباشر لحجز المعاينة'],
    previewType: 'realestate',
  },
  {
    id: 'maintenance',
    icon: RefreshCw,
    titleEn: 'Website Redesign & Modernization',
    titleAr: 'إعادة التطوير والصيانة الدورية',
    badgeEn: 'Speed & Security Boost',
    badgeAr: 'تحسين السرعة والأمان',
    descEn: 'Transform legacy, slow, or cluttered WordPress sites into lightning-fast, secure, and modern digital assets with ongoing care.',
    descAr: 'تحديث المواقع القديمة أو البطيئة بالكامل، وتنظيف الأكواد، وتسريع الأداء إلى درجات قياسية في Google PageSpeed مع حماية دورية.',
    highlightsEn: ['Core Web Vitals Optimization', 'Security Hardening & Cleanups', 'Theme & Plugin Refactoring', 'Regular Automated Backups'],
    highlightsAr: ['تحسين مؤشرات أداء الويب الأساسية', 'تعزيز الحماية ضد الثغرات', 'إعادة هيكلة القوالب والإضافات', 'نسخ احتياطي دوري ومراقبة مستمرة'],
    previewType: 'maintenance',
  },
];

export const Scene02WordPressWorld: React.FC<Scene02Props> = ({ isRtl }) => {
  const [activeCategory, setActiveCategory] = useState<string>('business');

  const current = wpCategories.find((c) => c.id === activeCategory) || wpCategories[0];
  const IconComponent = current.icon;

  return (
    <section
      id="services-scene-02"
      aria-label={isRtl ? 'عالم ووردبريس' : 'WordPress World'}
      className="relative overflow-hidden bg-brand-bg py-20 lg:py-28"
    >
      {/* Background Subtle Tech Motif */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-1/3 left-0 w-[500px] h-[400px] rounded-full bg-brand-emerald/5 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={cn('mb-12 max-w-2xl', isRtl ? 'text-right ml-auto' : 'text-left')}>
          <div className={cn('flex items-center gap-3 mb-4', isRtl ? 'justify-end flex-row-reverse' : '')}>
            <span className="font-mono text-xs text-brand-emerald font-bold tracking-[0.2em] uppercase">02</span>
            <span className="w-8 h-px bg-brand-emerald/40" />
            <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">
              {isRtl ? 'عالم ووردبريس' : 'WordPress World'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight">
            {isRtl ? (
              <>
                مواقع ووردبريس مخصصة…
                <br />
                <span className="text-brand-emerald">سريعة وسهلة الإدارة بالكامل.</span>
              </>
            ) : (
              <>
                Custom WordPress Solutions.
                <br />
                <span className="text-brand-emerald">Built for speed and easy management.</span>
              </>
            )}
          </h2>
          <p className="text-brand-muted text-base mt-3 leading-relaxed">
            {isRtl
              ? 'أبني مواقع ووردبريس خفيفة وسريعة باستخدام كتل جوتنبرج مخصصة وهيكل كود نظيف، مما يتيح لك إدارة محتواك بنفسك بكل سهولة واستقلالية وبدون بطء.'
              : 'I build lightweight, clean WordPress websites using custom Gutenberg blocks and structured themes, allowing you to manage your content with complete independence.'}
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className={cn('flex flex-wrap gap-2.5 mb-10 pb-4 border-b border-brand-border/30', isRtl && 'justify-end')}>
          {wpCategories.map((cat) => {
            const isActive = cat.id === activeCategory;
            const CatIcon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-mono transition-all duration-300',
                  isActive
                    ? 'border-brand-emerald bg-brand-emerald/15 text-brand-emerald font-semibold shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                    : 'border-brand-border/50 bg-brand-surface/40 text-brand-muted hover:border-brand-emerald/40 hover:text-brand-text'
                )}
              >
                <CatIcon className="w-4 h-4 shrink-0" />
                <span>{isRtl ? cat.titleAr : cat.titleEn}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Grid: Editorial Value Narrative + Live Layered Mockup */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Narrative & Concrete Features */}
          <div className={cn('lg:col-span-5 space-y-6', isRtl ? 'text-right lg:order-2' : 'text-left lg:order-1')}>
            <div className={cn('inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-emerald/40 bg-brand-emerald/10 font-mono text-xs text-brand-emerald', isRtl && 'flex-row-reverse')}>
              <IconComponent className="w-3.5 h-3.5" />
              <span>{isRtl ? current.badgeAr : current.badgeEn}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-brand-text">
              {isRtl ? current.titleAr : current.titleEn}
            </h3>

            <p className="text-brand-muted text-base leading-relaxed">
              {isRtl ? current.descAr : current.descEn}
            </p>

            <div className="space-y-3 pt-2">
              <span className="block font-mono text-[11px] text-brand-muted uppercase tracking-wider">
                {isRtl ? 'ما يميز هذا الحل:' : 'Key Technical Capabilities:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(isRtl ? current.highlightsAr : current.highlightsEn).map((item, idx) => (
                  <div key={idx} className={cn('flex items-start gap-2', isRtl && 'flex-row-reverse')}>
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                    <span className="text-xs text-brand-text/90 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Large Distinct Browser Mockup Preview */}
          <div className={cn('lg:col-span-7', isRtl ? 'lg:order-1' : 'lg:order-2')}>
            <div className="glass-panel rounded-2xl border border-brand-border/60 shadow-2xl overflow-hidden bg-brand-surface/90">
              
              {/* Browser Chrome Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-brand-border/40 bg-brand-surface">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald/60" />
                </div>
                <div className="flex-1 max-w-xs mx-4 bg-brand-bg/80 rounded-md px-3 py-1 border border-brand-border/30 text-center font-mono text-[11px] text-brand-muted truncate">
                  https://preview.aya.dev/wp/{current.id}
                </div>
                <div className="font-mono text-[10px] text-brand-emerald bg-brand-emerald/10 px-2 py-0.5 rounded border border-brand-emerald/30">
                  WordPress &bull; Gutenberg
                </div>
              </div>

              {/* Dynamic Distinct Preview Renderings */}
              <div className="p-5 sm:p-7 min-h-[340px] flex flex-col justify-between">
                
                {/* 1. Business Layout Preview */}
                {current.previewType === 'business' && (
                  <div className="space-y-4">
                    <div className="h-28 rounded-xl bg-gradient-to-r from-brand-emerald/15 via-brand-cyan/10 to-transparent p-5 flex flex-col justify-center border border-brand-border/40">
                      <div className="w-16 h-2 rounded bg-brand-emerald/60 mb-2" />
                      <div className="w-48 h-4 rounded bg-brand-text/90 mb-2 font-bold text-xs flex items-center">
                        Acme Consulting & Advisory
                      </div>
                      <div className="w-64 h-2 rounded bg-brand-muted/40" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-3 rounded-lg border border-brand-border/30 bg-brand-surface/50">
                          <div className="w-6 h-6 rounded bg-brand-emerald/20 mb-2" />
                          <div className="w-16 h-2 rounded bg-brand-text/80 mb-1" />
                          <div className="w-full h-1.5 rounded bg-brand-muted/30" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. E-Commerce Layout Preview */}
                {current.previewType === 'ecommerce' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-brand-border/30">
                      <div className="w-24 h-3 rounded bg-brand-emerald/60 font-bold text-[10px] flex items-center">
                        BOUTIQUE STORE
                      </div>
                      <div className="flex gap-2">
                        <div className="px-2 py-1 rounded bg-brand-surface border border-brand-border text-[10px] font-mono text-brand-cyan">
                          Cart (2 items)
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-lg border border-brand-border/40 overflow-hidden bg-brand-surface/60">
                          <div className="h-16 bg-gradient-to-b from-brand-emerald/10 to-brand-cyan/10 flex items-center justify-center font-mono text-[10px] text-brand-muted">
                            Product #{i}
                          </div>
                          <div className="p-2 space-y-1">
                            <div className="w-16 h-2 rounded bg-brand-text/80" />
                            <div className="flex justify-between items-center text-[10px] text-brand-emerald font-mono">
                              <span>$120.00</span>
                              <span className="w-4 h-4 rounded bg-brand-emerald/20 flex items-center justify-center">+</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Hotel Layout Preview */}
                {current.previewType === 'hotel' && (
                  <div className="space-y-4">
                    <div className="h-28 rounded-xl bg-gradient-to-r from-brand-emerald/20 via-brand-surface to-brand-bg p-4 flex flex-col justify-end border border-brand-border/40 relative overflow-hidden">
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-brand-bg/80 border border-brand-border text-[9px] font-mono text-brand-cyan">
                        5-Star Hospitality
                      </div>
                      <div className="w-36 h-3 rounded bg-brand-text font-bold text-xs" />
                      <div className="w-24 h-2 rounded bg-brand-muted/50 mt-1" />
                    </div>
                    {/* Booking Bar Mockup */}
                    <div className="p-3 rounded-lg border border-brand-emerald/40 bg-brand-emerald/5 grid grid-cols-4 gap-2 items-center text-center font-mono text-[9px]">
                      <div className="border-r border-brand-border/30 pr-1">
                        <span className="text-brand-muted block">CHECK-IN</span>
                        <span className="text-brand-text font-bold">14 NOV</span>
                      </div>
                      <div className="border-r border-brand-border/30 pr-1">
                        <span className="text-brand-muted block">CHECK-OUT</span>
                        <span className="text-brand-text font-bold">18 NOV</span>
                      </div>
                      <div className="border-r border-brand-border/30 pr-1">
                        <span className="text-brand-muted block">GUESTS</span>
                        <span className="text-brand-text font-bold">2 ADULTS</span>
                      </div>
                      <div className="bg-brand-emerald text-brand-bg font-bold py-1 rounded">
                        RESERVE
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Real Estate Layout Preview */}
                {current.previewType === 'realestate' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-brand-bg/70 border border-brand-border/30 font-mono text-[10px]">
                      <div className="bg-brand-surface rounded p-1 text-center text-brand-cyan">All Properties</div>
                      <div className="p-1 text-center text-brand-muted">Villas (12)</div>
                      <div className="p-1 text-center text-brand-muted">Duplexes (8)</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2].map((i) => (
                        <div key={i} className="rounded-xl border border-brand-border/40 overflow-hidden bg-brand-surface/50">
                          <div className="h-16 bg-gradient-to-tr from-brand-emerald/15 to-brand-blue/15 p-2 flex justify-between items-start">
                            <span className="px-1.5 py-0.5 rounded bg-brand-bg/80 text-[8px] font-mono text-brand-emerald">Featured</span>
                            <span className="text-[10px] font-mono font-bold text-brand-text">$450,000</span>
                          </div>
                          <div className="p-2 space-y-1 font-mono text-[10px]">
                            <div className="text-brand-text font-semibold">Luxury Horizon Villa {i}</div>
                            <div className="text-brand-muted text-[9px] flex gap-2">
                              <span>4 Beds</span> &bull; <span>3 Baths</span> &bull; <span>380m²</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Maintenance / Redesign Layout Preview */}
                {current.previewType === 'maintenance' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                        <span className="font-mono text-[10px] text-red-400 block mb-1">LEGACY STATE</span>
                        <div className="text-xl font-bold font-mono text-red-400">42 / 100</div>
                        <p className="text-[10px] text-brand-muted mt-1">Slow load (4.8s), bloated theme</p>
                      </div>
                      <div className="p-4 rounded-xl border border-brand-emerald/40 bg-brand-emerald/10">
                        <span className="font-mono text-[10px] text-brand-emerald block mb-1">AFTER OPTIMIZATION</span>
                        <div className="text-xl font-bold font-mono text-brand-emerald">98 / 100</div>
                        <p className="text-[10px] text-brand-emerald/80 mt-1">Instant load (0.9s), hardened security</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border border-brand-border/30 bg-brand-surface/60 flex items-center justify-between font-mono text-[11px]">
                      <span className="text-brand-text">Core Web Vitals Status</span>
                      <span className="text-brand-emerald font-bold">&bull; ALL PASS</span>
                    </div>
                  </div>
                )}

                {/* Bottom preview footer bar */}
                <div className="pt-3 border-t border-brand-border/30 flex items-center justify-between text-[11px] font-mono text-brand-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                    <span>{isRtl ? 'بنية مخصصة بالكامل' : 'Production-Ready Architecture'}</span>
                  </span>
                  <span className="text-brand-emerald">{isRtl ? 'عرض تفاعلي' : 'Interactive Preview'}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Continuity line */}
      <div className="flex justify-center mt-16" aria-hidden="true">
        <div className="w-px h-10 bg-gradient-to-b from-brand-emerald/40 via-brand-cyan/40 to-transparent" />
      </div>
    </section>
  );
};

