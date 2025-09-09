import { getTranslation } from '../utils/translations';

export const useTranslation = (language: string) => {
  const t = (key: string) => getTranslation(key, language);
  return { t };
};