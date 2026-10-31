import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'lamar-park',
    slug: 'lamar-park',
    title: {
      en: 'Lamar Park',
      ar: 'لامار بارك',
    },
    category: {
      en: 'Hospitality & Booking Platform',
      ar: 'منصة ضيافة وإدارة حجوزات',
    },
    shortDescription: {
      en: 'A web application designed for property showcases and online reservations, featuring room availability checks, pricing management, and booking administration.',
      ar: 'تطبيق ويب لعرض خيارات الإقامة وإدارة الحجوزات، مع أدوات لتنظيم الوحدات والغرف والأسعار ومتابعة حالة الحجوزات.',
    },
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    isFeatured: true,
    type: 'mern',
  },
  {
    id: 'hixa',
    slug: 'hixa',
    title: {
      en: 'HIXA',
      ar: 'هيكسا',
    },
    category: {
      en: 'Engineering Services Platform',
      ar: 'منصة خدمات هندسية',
    },
    shortDescription: {
      en: 'A digital platform connecting engineering service providers with clients, featuring role-based workflows, project milestone tracking, and direct project coordination.',
      ar: 'منصة رقمية لتنظيم الخدمات والمشاريع الهندسية، مع واجهات مخصصة لأطراف العمل وأدوات لإدارة المراحل التنفيذية والتواصل.',
    },
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    isFeatured: true,
    type: 'mern',
  },
  {
    id: 'wp-showcase-1',
    slug: 'wordpress-business-suite',
    title: {
      en: 'Custom WordPress Business Website',
      ar: 'موقع أعمال ووردبريس مخصص',
    },
    category: {
      en: 'WordPress & Content Management',
      ar: 'ووردبريس مخصص وإدارة المحتوى',
    },
    shortDescription: {
      en: 'A custom-built WordPress site developed with bespoke Gutenberg blocks, clean code structure, and fast load times, designed for easy content management.',
      ar: 'موقع ووردبريس مخصص مبني بكتل جوتنبرج مخصصة وهيكل كود نظيف وسريع، يتيح للعميل إدارة وتعديل المحتوى بكل استقلالية وسهولة.',
    },
    technologies: ['WordPress', 'PHP', 'Tailwind CSS', 'ACF Pro'],
    isFeatured: false,
    type: 'wordpress',
  },
];
