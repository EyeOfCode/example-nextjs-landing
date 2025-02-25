'use client';

import { useTranslation } from '@/providers/i18n-provider';

export const LocaleSwitcherComponent = () => {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="flex gap-4 p-4">
      <div
        className={`cursor-pointer hover:text-blue-500 transition-colors ${locale === 'en' ? 'text-blue-500' : 'text-black'}`}
        onClick={() => setLocale('en')}
      >
        EN
      </div>
      <div>|</div>
      <div
        className={`cursor-pointer hover:text-blue-500 transition-colors ${locale === 'th' ? 'text-blue-500' : 'text-black'}`}
        onClick={() => setLocale('th')}
      >
        TH
      </div>
    </div>
  );
};
