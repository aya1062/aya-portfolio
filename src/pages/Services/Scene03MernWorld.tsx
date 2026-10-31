import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Database, Server, Smartphone, ShieldCheck, ArrowRight, Code2 } from 'lucide-react';

interface Scene03Props {
  isRtl: boolean;
}

interface MernCapability {
  id: string;
  titleEn: string;
  titleAr: string;
  tagEn: string;
  tagAr: string;
  descEn: string;
  descAr: string;
  frontend: string;
  backend: string;
  database: string;
  apiSample: string;
}

const capabilities: MernCapability[] = [
  {
    id: 'booking',
    titleEn: 'Booking & Hospitality Systems',
    titleAr: 'أنظمة الحجوزات وإدارة الإقامة',
    tagEn: 'Supported by Lamar Park Case Study',
    tagAr: 'مستندة لواقع مشروع لامار بارك',
    descEn: 'Full-cycle booking infrastructure featuring dynamic availability checks, room configuration models, reservation statuses, and automated price calculation.',
    descAr: 'بنية متكاملة لإدارة الحجوزات، تشمل التحقق الفوري من توافر الوحدات، وإدارة حالات الحجز، وحساب الأسعار الديناميكية بدقة.',
    frontend: 'React & Tailwind &bull; Interactive Date & Room Selectors',
    backend: 'Express.js &bull; Availability Conflict & Price Middleware',
    database: 'MongoDB &bull; Reservation & Room Collections with Date Indexing',
    apiSample: 'POST /api/bookings/verify { roomId, dateRange, guests }',
  },
  {
    id: 'marketplace',
    titleEn: 'Role-Based Service Marketplaces',
    titleAr: 'منصات الخدمات متعددة المستخدمين',
    tagEn: 'Supported by HIXA Case Study',
    tagAr: 'مستندة لواقع مشروع هيكسا',
    descEn: 'Multi-sided platforms coordinating client inquiries, engineering project milestones, role-specific views, and structured team communications.',
    descAr: 'منصات تنظم تدفقات العمل بين أطراف متعددة، مع واجهات مخصصة لكل نوع مستخدم، ونظام تتبع للمراحل التنفيذية للمشاريع.',
    frontend: 'React & TypeScript &bull; Role-Specific Portals (Client / Provider)',
    backend: 'Node.js & Express &bull; Project State Orchestration & RBAC',
    database: 'MongoDB &bull; Projects, Milestones & Message Threads',
    apiSample: 'PATCH /api/projects/:id/milestones { status: "review" }',
  },
  {
    id: 'dashboard',
    titleEn: 'Custom Admin & Operations Dashboards',
    titleAr: 'لوحات التحكم وإدارة العمليات',
    tagEn: 'Production Operational Tooling',
    tagAr: 'أدوات إدارة تشغيلية حقيقية',
    descEn: 'Clean, data-dense internal control panels that allow business managers to monitor operations, manage records, and export reports without clutter.',
    descAr: 'واجهات تحكم داخلية منظمة تمكّن أصحاب الأعمال من إدارة البيانات، وتحديث الحالات التشغيلية، ومتابعة الأنشطة بمرونة تامة.',
    frontend: 'React & Tailwind &bull; Filterable Tables & Modals',
    backend: 'Node.js &bull; Paginated REST API with JWT Auth',
    database: 'MongoDB &bull; Aggregation Pipelines for Record Summaries',
    apiSample: 'GET /api/admin/records?page=1&limit=25&status=active',
  },
  {
    id: 'api',
    titleEn: 'RESTful API & Backend Engineering',
    titleAr: 'تطوير الواجهات البرمجية وقواعد البيانات',
    tagEn: 'Scalable Architecture',
    tagAr: 'بنية برمجية معيارية',
    descEn: 'Strictly typed APIs with data validation, error handling middleware, JWT authentication, and optimized database indexing.',
    descAr: 'بناء واجهات برمجية آمنة ومنظمة مع طبقات تحقق دقيقة من البيانات (Data Validation)، وتوثيق آمن، واستعلامات قواعد بيانات سريعة.',
    frontend: 'Axios / Fetch &bull; Optimistic UI & Error Boundaries',
    backend: 'Express.js &bull; Async Middleware & CORS Security',
    database: 'MongoDB & Mongoose &bull; Schema Validation & Indexes',
    apiSample: 'POST /api/auth/verify-session { token: "Bearer eyJhb..." }',
  },
];

export const Scene03MernWorld: React.FC<Scene03Props> = ({ isRtl }) => {
  const [activeTab, setActiveTab] = useState<string>('booking');
  const [isSimulatingData, setIsSimulatingData] = useState<boolean>(false);
  const [dataFlowStep, setDataFlowStep] = useState<number>(3); // 1: Client, 2: API, 3: DB

  const current = capabilities.find((c) => c.id === activeTab) || capabilities[0];

  const handleSimulateFlow = () => {
    setIsSimulatingData(true);
    setDataFlowStep(1);
    setTimeout(() => setDataFlowStep(2), 600);
    setTimeout(() => setDataFlowStep(3), 1200);
    setTimeout(() => setIsSimulatingData(false), 1800);
  };

  return (
    <section
      id="services-scene-03"
      aria-label={isRtl ? 'عالم التطوير المخصص MERN' : 'MERN & Custom Development World'}
      className="relative overflow-hidden bg-brand-bg py-20 lg:py-28"
    >
      {/* Background Tech Circuit / Ambient Light */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[450px] rounded-full bg-brand-blue/6 blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={cn('mb-12 max-w-2xl', isRtl ? 'text-right ml-auto' : 'text-left')}>
          <div className={cn('flex items-center gap-3 mb-4', isRtl ? 'justify-end flex-row-reverse' : '')}>
            <span className="font-mono text-xs text-brand-cyan font-bold tracking-[0.2em] uppercase">03</span>
            <span className="w-8 h-px bg-brand-cyan/40" />
            <span className="font-mono text-xs text-brand-muted uppercase tracking-widest">
              {isRtl ? 'عالم التطوير المخصص' : 'Custom Web Development'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text leading-tight">
            {isRtl ? (
              <>
                تطبيقات ويب مخصصة (MERN)…
                <br />
                <span className="text-brand-cyan">مصممة لخدمة مسار عملك بدقة.</span>
              </>
            ) : (
              <>
                Custom Web Applications (MERN).
                <br />
                <span className="text-brand-cyan">Tailored to your specific workflows.</span>
              </>
            )}
          </h2>
          <p className="text-brand-muted text-base mt-3 leading-relaxed">
            {isRtl
              ? 'عندما تتطلب فكرتك وظائف تفاعلية أو قواعد بيانات مخصصة تتجاوز إمكانيات المنصات الجاهزة، أطور تطبيقات متكاملة باستخدام React وNode.js وMongoDB تلبي متطلباتك بوضوح وبدون تعقيد زائد.'
              : 'When your project requires custom functionality and database structures beyond standard platforms, I build tailored full-stack solutions using React, Node.js, Express, and MongoDB.'}
          </p>
        </div>

        {/* Capability Selection Tabs */}
        <div className={cn('flex flex-wrap gap-2.5 mb-10 pb-4 border-b border-brand-border/30', isRtl && 'justify-end')}>
          {capabilities.map((cap) => {
            const isActive = cap.id === activeTab;
            return (
              <button
                key={cap.id}
                onClick={() => setActiveTab(cap.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-mono transition-all duration-300',
                  isActive
                    ? 'border-brand-cyan bg-brand-cyan/15 text-brand-cyan font-semibold shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                    : 'border-brand-border/50 bg-brand-surface/40 text-brand-muted hover:border-brand-cyan/40 hover:text-brand-text'
                )}
              >
                <span>{isRtl ? cap.titleAr : cap.titleEn}</span>
              </button>
            );
          })}
        </div>

        {/* Full-Stack Layer Architecture & Data Flow Visualization */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left: Capability Context & Architectural Scope */}
          <div className={cn('lg:col-span-5 space-y-6 flex flex-col justify-between', isRtl ? 'text-right' : 'text-left')}>
            <div className="space-y-4">
              <span className="inline-block font-mono text-[11px] px-3 py-1 rounded-full border border-brand-cyan/30 text-brand-cyan bg-brand-cyan/10">
                {isRtl ? current.tagAr : current.tagEn}
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold text-brand-text">
                {isRtl ? current.titleAr : current.titleEn}
              </h3>

              <p className="text-brand-muted text-base leading-relaxed">
                {isRtl ? current.descAr : current.descEn}
              </p>
            </div>

            {/* Live API Sample Card */}
            <div className="rounded-xl border border-brand-border/40 bg-brand-surface/60 p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-brand-muted">
                <span className="flex items-center gap-1.5 text-brand-cyan">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>REST API Endpoint</span>
                </span>
                <span className="text-brand-emerald">JSON Response</span>
              </div>
              <div className="bg-brand-bg/90 p-3 rounded-lg border border-brand-border/30 font-mono text-xs text-brand-text overflow-x-auto">
                <code>{current.apiSample}</code>
              </div>
            </div>

            {/* Interactive Data Flow Simulation Trigger */}
            <button
              onClick={handleSimulateFlow}
              disabled={isSimulatingData}
              className={cn(
                'w-full py-3 px-4 rounded-xl border font-mono text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2',
                isSimulatingData
                  ? 'border-brand-cyan bg-brand-cyan/20 text-brand-cyan animate-pulse'
                  : 'border-brand-cyan/40 bg-brand-surface hover:bg-brand-cyan/10 text-brand-text hover:border-brand-cyan'
              )}
            >
              <span>{isSimulatingData ? (isRtl ? 'جارٍ محاكاة تدفق البيانات...' : 'Simulating Data Flow...') : (isRtl ? 'اضغط لاختبار تدفق البيانات بين الطبقات' : 'Trigger Layer Data Flow')}</span>
              <ArrowRight className={cn('w-4 h-4', isRtl && 'rotate-180')} />
            </button>
          </div>

          {/* Right: Architectural Full-Stack Layer Diagram */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl border border-brand-border/60 p-6 sm:p-8 shadow-2xl relative space-y-4">
              
              {/* Layer 1: Client & UI Layer */}
              <div
                className={cn(
                  'p-4 rounded-xl border transition-all duration-300 relative',
                  dataFlowStep === 1
                    ? 'border-brand-cyan bg-brand-cyan/10 shadow-[0_0_20px_rgba(34,211,238,0.15)] scale-[1.01]'
                    : 'border-brand-border/40 bg-brand-surface/50'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 font-mono text-xs font-bold text-brand-cyan">
                    <Smartphone className="w-4 h-4" />
                    <span>01 &bull; CLIENT / UI LAYER</span>
                  </div>
                  <span className="text-[10px] font-mono text-brand-muted">React + TypeScript</span>
                </div>
                <p className="text-xs text-brand-text/90 font-mono">
                  {current.frontend}
                </p>
              </div>

              {/* Connecting Flow Indicator 1 -> 2 */}
              <div className="flex justify-center items-center py-0.5">
                <div className={cn('w-0.5 h-5 transition-colors duration-300', dataFlowStep >= 2 ? 'bg-brand-cyan' : 'bg-brand-border/40')} />
              </div>

              {/* Layer 2: API Gateway & Controller Layer */}
              <div
                className={cn(
                  'p-4 rounded-xl border transition-all duration-300 relative',
                  dataFlowStep === 2
                    ? 'border-brand-blue bg-brand-blue/10 shadow-[0_0_20px_rgba(56,189,248,0.15)] scale-[1.01]'
                    : 'border-brand-border/40 bg-brand-surface/50'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 font-mono text-xs font-bold text-brand-blue">
                    <Server className="w-4 h-4" />
                    <span>02 &bull; API & CONTROLLER LAYER</span>
                  </div>
                  <span className="text-[10px] font-mono text-brand-muted">Node.js + Express</span>
                </div>
                <p className="text-xs text-brand-text/90 font-mono">
                  {current.backend}
                </p>
              </div>

              {/* Connecting Flow Indicator 2 -> 3 */}
              <div className="flex justify-center items-center py-0.5">
                <div className={cn('w-0.5 h-5 transition-colors duration-300', dataFlowStep === 3 ? 'bg-brand-emerald' : 'bg-brand-border/40')} />
              </div>

              {/* Layer 3: Database & Persistence Layer */}
              <div
                className={cn(
                  'p-4 rounded-xl border transition-all duration-300 relative',
                  dataFlowStep === 3
                    ? 'border-brand-emerald bg-brand-emerald/10 shadow-[0_0_20px_rgba(52,211,153,0.15)] scale-[1.01]'
                    : 'border-brand-border/40 bg-brand-surface/50'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 font-mono text-xs font-bold text-brand-emerald">
                    <Database className="w-4 h-4" />
                    <span>03 &bull; PERSISTENCE & SCHEMAS</span>
                  </div>
                  <span className="text-[10px] font-mono text-brand-muted">MongoDB + Mongoose</span>
                </div>
                <p className="text-xs text-brand-text/90 font-mono">
                  {current.database}
                </p>
              </div>

              {/* Security & Reliability Badge */}
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-brand-muted border-t border-brand-border/30">
                <span className="flex items-center gap-1.5 text-brand-emerald">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'بنية محمية ومعزولة' : 'Encrypted & Validated'}</span>
                </span>
                <span>{isRtl ? 'أداء موثوق بدون تعقيد غير ضروري' : 'Zero Bloat &bull; Production Ready'}</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Continuity line */}
      <div className="flex justify-center mt-16" aria-hidden="true">
        <div className="w-px h-10 bg-gradient-to-b from-brand-cyan/40 via-brand-blue/40 to-transparent" />
      </div>
    </section>
  );
};
