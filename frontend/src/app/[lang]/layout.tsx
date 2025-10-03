'use client';

import { useEffect, useState } from 'react';
import { Language, getAvailableLanguages } from '@/lib/translations';
import Header from '@/components/Header';

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const [mounted, setMounted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    setMounted(true);
    
    // Validate language parameter
    const availableLanguages = getAvailableLanguages();
    const lang = params.lang as Language;
    
    if (availableLanguages.includes(lang)) {
      setCurrentLanguage(lang);
      localStorage.setItem('language', lang);
    } else {
      // Redirect to default language if invalid
      const savedLanguage = localStorage.getItem('language') || 'en';
      window.location.href = `/${savedLanguage}`;
    }
  }, [params.lang]);

  if (!mounted) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Header currentLanguage={currentLanguage} />
      <main className="container">
        {children}
      </main>
    </div>
  );
}
