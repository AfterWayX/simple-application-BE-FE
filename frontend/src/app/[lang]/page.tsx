'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Language, getTranslations } from '@/lib/translations';

export default function HomePage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    setMounted(true);
    setCurrentLanguage(params.lang as Language);
  }, [params.lang]);

  if (!mounted) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  const t = getTranslations(currentLanguage);

  return (
    <div>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '1rem',
        color: '#333',
        textAlign: 'center'
      }}>
        {t.home.title}
      </h1>
      
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <p style={{
          fontSize: '1.2rem',
          lineHeight: '1.6',
          marginBottom: '2rem',
          color: '#555',
          textAlign: 'center'
        }}>
          {t.home.description}
        </p>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#007bff'
          }}>
            {t.home.welcomeMessage}
          </h2>
        </div>
      </div>
    </div>
  );
}
