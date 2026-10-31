import React, { useState } from 'react';
import { Container } from '../../components/ui/Container';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useLanguage } from '../../hooks/useLanguage';
import { Send, CheckCircle2, Mail, Clock, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ContactPage: React.FC = () => {
  const { isRtl } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'wordpress',
    details: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = isRtl ? 'يرجى إدخال اسمك' : 'Please enter your name';
    }
    if (!formData.email.trim()) {
      errs.email = isRtl ? 'يرجى إدخال بريدك الإلكتروني' : 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = isRtl ? 'صيغة البريد الإلكتروني غير صحيحة' : 'Please enter a valid email address';
    }
    if (!formData.details.trim()) {
      errs.details = isRtl ? 'يرجى كتابة نبذة عن المطلوب' : 'Please write a brief about what you need';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
  };

  return (
    <div className="py-20 min-h-[85vh]">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Header & Direct Personal Context */}
          <div className={cn('lg:col-span-5 space-y-6', isRtl ? 'text-right' : 'text-left')}>
            <Badge variant="cyan" dot>
              {isRtl ? 'تواصل معي' : 'GET IN TOUCH'}
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-text leading-tight">
              {isRtl ? (
                <>
                  خلّينا نتكلم
                  <br />
                  <span className="text-brand-cyan">عن فكرة مشروعك.</span>
                </>
              ) : (
                <>
                  Let's talk about
                  <br />
                  <span className="text-brand-cyan">your next project.</span>
                </>
              )}
            </h1>

            <p className="text-base text-brand-muted leading-relaxed">
              {isRtl
                ? 'سواء كنت بحاجة لموقع ووردبريس مخصص، أو تطبيق ويب مبني بتقنيات MERN، أو ترغب في مناقشة فرصة عمل أو استشارة تقنية، يسعدني تواصلك معي وسأرد عليك في أقرب وقت.'
                : 'Whether you need a custom WordPress site, a tailored MERN application, or want to discuss a potential project or role, feel free to reach out. I will respond to you directly.'}
            </p>

            <div className="pt-6 space-y-3.5 text-xs font-mono text-brand-muted border-t border-brand-border/40">
              <div className={cn('flex items-center gap-2.5 text-brand-text/90', isRtl && 'flex-row-reverse')}>
                <Clock className="h-4 w-4 text-brand-cyan shrink-0" />
                <span>{isRtl ? 'رد مباشر خلال 24 إلى 48 ساعة' : 'Direct response within 24–48 hours'}</span>
              </div>
              <div className={cn('flex items-center gap-2.5 text-brand-text/90', isRtl && 'flex-row-reverse')}>
                <MessageSquare className="h-4 w-4 text-brand-emerald shrink-0" />
                <span>{isRtl ? 'نقاش واضح بدون التزامات مبدئية' : 'No-pressure initial consultation'}</span>
              </div>
              <div className={cn('flex items-center gap-2.5 text-brand-text/90', isRtl && 'flex-row-reverse')}>
                <Mail className="h-4 w-4 text-brand-blue shrink-0" />
                <span>{isRtl ? 'تواصل شخصي ومباشر معي' : 'Direct communication with me'}</span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-brand-border bg-brand-surface/80 p-6 sm:p-10 backdrop-blur-xl space-y-5 shadow-2xl shadow-black/40"
            >
              {/* Name */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-text mb-2">
                  {isRtl ? 'الاسم *' : 'Name *'}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={isRtl ? 'اسمك الكريم' : 'Your name'}
                  className={cn(
                    'w-full rounded-lg border bg-brand-surface-elevated/70 px-4 py-3 text-sm text-brand-text placeholder-brand-muted/40 transition-colors focus:outline-none focus:ring-1 focus:ring-brand-cyan',
                    errors.name ? 'border-rose-500' : 'border-brand-border focus:border-brand-cyan'
                  )}
                />
                {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-text mb-2">
                  {isRtl ? 'البريد الإلكتروني *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className={cn(
                    'w-full rounded-lg border bg-brand-surface-elevated/70 px-4 py-3 text-sm text-brand-text placeholder-brand-muted/40 transition-colors focus:outline-none focus:ring-1 focus:ring-brand-cyan',
                    errors.email ? 'border-rose-500' : 'border-brand-border focus:border-brand-cyan'
                  )}
                />
                {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-text mb-2">
                  {isRtl ? 'المجال أو نوع المطلوب' : 'What are you looking for?'}
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full rounded-lg border border-brand-border bg-brand-surface-elevated/70 px-4 py-3 text-sm text-brand-text focus:outline-none focus:border-brand-cyan"
                >
                  <option value="wordpress">{isRtl ? 'موقع ووردبريس أو متجر إلكتروني' : 'WordPress Website or WooCommerce Store'}</option>
                  <option value="mern">{isRtl ? 'تطبيق ويب مخصص (MERN Stack)' : 'Custom Web Application (MERN Stack)'}</option>
                  <option value="maintenance">{isRtl ? 'تحديث موقع حالي أو تحسين السرعة' : 'Website Redesign or Speed Optimization'}</option>
                  <option value="role">{isRtl ? 'فرصة عمل أو تعاون مستقل' : 'Job Opportunity or Collaboration'}</option>
                  <option value="other">{isRtl ? 'استشارة أو استفسار عام' : 'Consultation or General Inquiry'}</option>
                </select>
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-text mb-2">
                  {isRtl ? 'اكتب لي نبذة عن المشروع أو المطلوب *' : 'Tell me a bit about what you need *'}
                </label>
                <textarea
                  rows={4}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder={
                    isRtl
                      ? 'ما هي فكرتك، ما الخدمات المطلوبة، وأي تفاصيل ترغب في مشاركتها...'
                      : 'Tell me about the goals, ideas, and requirements of what you want to build...'
                  }
                  className={cn(
                    'w-full rounded-lg border bg-brand-surface-elevated/70 px-4 py-3 text-sm text-brand-text placeholder-brand-muted/40 transition-colors focus:outline-none focus:ring-1 focus:ring-brand-cyan',
                    errors.details ? 'border-rose-500' : 'border-brand-border focus:border-brand-cyan'
                  )}
                />
                {errors.details && <p className="mt-1 text-xs text-rose-400">{errors.details}</p>}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={<Send className={cn('h-4 w-4', isRtl && 'rotate-180')} />}
                  iconPosition={isRtl ? 'left' : 'right'}
                >
                  {isRtl ? 'إرسال الرسالة' : 'Send Message'}
                </Button>
              </div>

              {/* Clear Submission State */}
              {isSubmitted && (
                <div className="p-4 rounded-xl border border-brand-emerald/40 bg-brand-emerald/10 text-xs font-mono text-brand-text space-y-1">
                  <div className="flex items-center gap-2 text-brand-emerald font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>
                      {isRtl
                        ? 'شكراً لتواصلك! تم استلام رسالتك وسأرد عليك قريباً.'
                        : 'Thank you for reaching out! Your message was received and I will reply soon.'}
                    </span>
                  </div>
                </div>
              )}
            </form>
          </div>

        </div>
      </Container>
    </div>
  );
};
