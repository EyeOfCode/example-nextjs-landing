'use client';

import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react';
import { getStoredLocale, saveLocale } from '@/utils/storage';

type I18nContextType = {
  t: (key: string) => string;
  locale: string;
  setLocale: (lang: string) => void;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
}

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    const storedLocale = getStoredLocale();
    setLocale(storedLocale);

    // ใช้ fetch() แทนการ import() ไฟล์ JSON
    fetch(`/locales/${storedLocale}.json`)
      .then((response) => response.json())
      .then((data) => setTranslations(data))
      .catch(() => console.error('Translation file not found!'));
  }, []);

  const changeLocale = (lang: string) => {
    setLocale(lang);
    saveLocale(lang);

    fetch(`/locales/${lang}.json`)
      .then((response) => response.json())
      .then((data) => setTranslations(data))
      .catch(() => console.error('Translation file not found!'));
  };

  const t = (key: string) => translations[key] || key;

  return (
    <I18nContext.Provider value={{ t, locale, setLocale: changeLocale }}>
      {children}
    </I18nContext.Provider>
  );
}
