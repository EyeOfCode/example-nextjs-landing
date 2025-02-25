export const getStoredLocale = () => {
  return typeof window !== 'undefined'
    ? localStorage.getItem('locale') || 'en'
    : 'en';
};

export const saveLocale = (locale: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale);
  }
};
