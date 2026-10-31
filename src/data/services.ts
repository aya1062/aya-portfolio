import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'wordpress-websites',
    title: {
      en: 'WordPress Websites',
      ar: 'مواقع ووردبريس',
    },
    shortDescription: {
      en: 'Professional, flexible websites that help businesses establish a strong online presence and manage their content with ease.',
      ar: 'مواقع احترافية بتصميم يناسب هوية مشروعك، وسهلة الإدارة والتحديث، علشان يكون ليك حضور رقمي قوي من غير تعقيد.',
    },
    technologies: ['WordPress', 'Gutenberg', 'ACF Pro', 'Custom PHP Themes', 'SEO Engine'],
    type: 'wordpress',
  },
  {
    id: 'ecommerce',
    title: {
      en: 'E-commerce',
      ar: 'المتاجر الإلكترونية',
    },
    shortDescription: {
      en: 'Online stores designed to make shopping intuitive, product management easier, and the buying journey smoother.',
      ar: 'متاجر إلكترونية بتسهّل على عملائك الوصول للمنتجات وإتمام الطلب، وبتساعدك تدير متجرك بطريقة منظمة ومرنة.',
    },
    technologies: ['WooCommerce', 'Payment Gateways', 'Inventory Sync', 'Performance Optimization'],
    type: 'ecommerce',
  },
  {
    id: 'custom-web-apps',
    title: {
      en: 'Custom Web Applications',
      ar: 'تطبيقات الويب المخصصة',
    },
    shortDescription: {
      en: 'Tailored web applications built around your business processes, from interactive platforms to complete management systems.',
      ar: 'لو مشروعك محتاج أكتر من موقع تقليدي، أقدر أساعدك في بناء نظام أو منصة مخصصة لطبيعة شغلك، بالوظائف اللي تخدم احتياجاتك فعلًا.',
    },
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    type: 'custom',
  },
  {
    id: 'website-maintenance',
    title: {
      en: 'Website Maintenance',
      ar: 'تطوير وصيانة المواقع',
    },
    shortDescription: {
      en: 'Improving existing websites through performance optimization, feature enhancements, troubleshooting, and technical support.',
      ar: 'موقعك موجود بالفعل لكنه محتاج تحسين؟ أساعدك في حل المشكلات التقنية، وتطوير الوظائف، وتحسين الأداء وتجربة الاستخدام.',
    },
    technologies: ['Speed Optimization', 'Security Audits', 'Bug Fixing', 'Feature Additions'],
    type: 'maintenance',
  },
];
