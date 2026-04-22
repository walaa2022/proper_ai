"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/lib/translations';

type LanguageType = 'EN' | 'AR';

interface LanguageContextType {
  lang: LanguageType;
  setLang: (lang: LanguageType) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageType>('EN');

  useEffect(() => {
    // Load from local storage if available
    const saved = localStorage.getItem('prop_ai_lang') as LanguageType;
    if (saved) setLangState(saved);
  }, []);

  // Keep <html lang> and dir in sync whenever language changes (including initial load)
  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
    document.documentElement.dir = lang === 'AR' ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = (newLang: LanguageType) => {
    setLangState(newLang);
    localStorage.setItem('prop_ai_lang', newLang);
    document.documentElement.lang = newLang.toLowerCase();
    document.documentElement.dir = newLang === 'AR' ? 'rtl' : 'ltr';
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div className={lang === 'AR' ? 'rtl' : 'ltr'} style={{ direction: lang === 'AR' ? 'rtl' : 'ltr' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
