import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { updateDocumentDirection } from '../lib/i18n';
import type { Language } from '../types';

export function useLanguage() {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLang: Language = (i18n.language && i18n.language.startsWith('ar')) ? 'ar' : 'en';
  const isRtl = currentLang === 'ar';

  // Ensure document direction stays in sync
  useEffect(() => {
    updateDocumentDirection(currentLang);
  }, [currentLang]);

  // Synchronize with URL path prefix if URL starts with /en or /ar
  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const urlLang = pathSegments[0];
    if ((urlLang === 'en' || urlLang === 'ar') && urlLang !== currentLang) {
      i18n.changeLanguage(urlLang);
    }
  }, [location.pathname, currentLang, i18n]);

  const switchLanguage = useCallback(
    (newLang: Language) => {
      if (newLang === currentLang) return;

      i18n.changeLanguage(newLang);
      updateDocumentDirection(newLang);

      // Preserve current path when switching language
      const pathSegments = location.pathname.split('/').filter(Boolean);
      let newPath: string;

      if (pathSegments.length > 0 && (pathSegments[0] === 'en' || pathSegments[0] === 'ar')) {
        pathSegments[0] = newLang;
        newPath = `/${pathSegments.join('/')}`;
      } else {
        newPath = `/${newLang}${location.pathname === '/' ? '' : location.pathname}`;
      }

      navigate(`${newPath}${location.search}${location.hash}`, { replace: true });
    },
    [currentLang, i18n, location.pathname, location.search, location.hash, navigate]
  );

  return {
    currentLang,
    isRtl,
    t,
    switchLanguage,
  };
}
