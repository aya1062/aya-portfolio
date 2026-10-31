import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/Home';
import { AboutPage } from './pages/About';
import { ServicesPage } from './pages/Services';
import { WordPressServicePage } from './pages/Services/WordPressService';
import { CustomDevServicePage } from './pages/Services/CustomDevService';
import { PortfolioPage } from './pages/Portfolio';
import { CaseStudyPage } from './pages/CaseStudy';
import { ContactPage } from './pages/Contact';
import { updateDocumentDirection } from './lib/i18n';
import i18n from './lib/i18n';

// Language wrapper to ensure i18n state and HTML direction match the route param
const LanguageRouteWrapper: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();

  useEffect(() => {
    const validLang = lang === 'ar' ? 'ar' : 'en';
    if (i18n.language !== validLang) {
      i18n.changeLanguage(validLang);
    }
    updateDocumentDirection(validLang);
  }, [lang, location.pathname]);

  if (lang !== 'en' && lang !== 'ar') {
    return <Navigate to="/en" replace />;
  }

  return <Layout />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root Redirect to /en */}
        <Route path="/" element={<Navigate to="/en" replace />} />

        {/* Localized Routes */}
        <Route path="/:lang" element={<LanguageRouteWrapper />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/wordpress" element={<WordPressServicePage />} />
          <Route path="services/custom-development" element={<CustomDevServicePage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="portfolio/:slug" element={<CaseStudyPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Global Fallback */}
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
