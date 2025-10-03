'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Language, getTranslations } from '@/lib/translations';

export default function RootPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get language preference from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('language') || 'en';
    redirect(`/${savedLanguage}`);
  }, []);

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

  return null;
}
