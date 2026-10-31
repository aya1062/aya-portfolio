export type Language = 'en' | 'ar';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface Project {
  id: string;
  slug: string;
  title: LocalizedString;
  category: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription?: LocalizedString;
  challenge?: LocalizedString;
  role?: LocalizedString;
  approach?: LocalizedString;
  features?: LocalizedString[];
  technologies: string[];
  metrics?: { label: LocalizedString; value: string }[];
  isFeatured: boolean;
  type: 'mern' | 'wordpress' | 'custom';
  links?: {
    live?: string;
    github?: string;
  };
}

export interface Service {
  id: string;
  title: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription?: LocalizedString;
  features?: LocalizedString[];
  technologies: string[];
  type: 'wordpress' | 'ecommerce' | 'custom' | 'maintenance';
}

export interface TimelineMilestone {
  step: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
}
