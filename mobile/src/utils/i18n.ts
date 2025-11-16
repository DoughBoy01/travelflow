/**
 * Internationalization Utilities
 * i18n helper functions (placeholder for future i18n implementation)
 */

/**
 * Supported languages
 */
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  zh: '中文',
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

/**
 * Translation keys (placeholder structure)
 * In production, use a library like react-i18next
 */
const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    'feedback.title': 'Share Feedback',
    'feedback.emoji.prompt': 'How was your experience?',
    'feedback.rating.prompt': 'Rate your experience',
    'feedback.text.placeholder': 'Tell us more...',
    'feedback.submit': 'Submit',
    'feedback.cancel': 'Cancel',
    'feedback.success': 'Thank you for your feedback!',
    'feedback.error': 'Failed to submit feedback',
    'points.earned': 'You earned {points} points!',
    'badge.unlocked': 'Badge Unlocked!',
    'rewards.title': 'Rewards',
    'impact.title': 'Your Impact',
  },
  es: {
    'feedback.title': 'Compartir Comentarios',
    'feedback.emoji.prompt': '¿Cómo fue tu experiencia?',
    'feedback.rating.prompt': 'Califica tu experiencia',
    'feedback.text.placeholder': 'Cuéntanos más...',
    'feedback.submit': 'Enviar',
    'feedback.cancel': 'Cancelar',
    'feedback.success': '¡Gracias por tus comentarios!',
    'feedback.error': 'Error al enviar comentarios',
    'points.earned': '¡Ganaste {points} puntos!',
    'badge.unlocked': '¡Insignia Desbloqueada!',
    'rewards.title': 'Recompensas',
    'impact.title': 'Tu Impacto',
  },
  // Add more languages as needed
  fr: {},
  de: {},
  ja: {},
  zh: {},
};

/**
 * Current language (can be set via user preferences)
 */
let currentLanguage: SupportedLanguage = 'en';

/**
 * Set current language
 */
export const setLanguage = (language: SupportedLanguage) => {
  currentLanguage = language;
};

/**
 * Get current language
 */
export const getCurrentLanguage = (): SupportedLanguage => {
  return currentLanguage;
};

/**
 * Translate a key
 */
export const t = (key: string, params?: Record<string, string | number>): string => {
  let translation = translations[currentLanguage][key] || translations.en[key] || key;

  // Replace parameters
  if (params) {
    Object.entries(params).forEach(([paramKey, value]) => {
      translation = translation.replace(`{${paramKey}}`, String(value));
    });
  }

  return translation;
};

/**
 * Format date according to locale
 */
export const formatDate = (date: Date | string, format: 'short' | 'long' = 'short'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (format === 'long') {
    return dateObj.toLocaleDateString(currentLanguage, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return dateObj.toLocaleDateString(currentLanguage);
};

/**
 * Format number according to locale
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString(currentLanguage);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  }

  return formatDate(dateObj);
};
