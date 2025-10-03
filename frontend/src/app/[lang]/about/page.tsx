'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Language, getTranslations } from '@/lib/translations';

export default function AboutPage() {
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
        marginBottom: '2rem',
        color: '#333',
        textAlign: 'center'
      }}>
        {t.about.title}
      </h1>
      
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '2rem'
        }}>
          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.6',
            marginBottom: '1.5rem',
            color: '#555'
          }}>
            {t.about.description}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          <div style={{
            backgroundColor: '#e7f3ff',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #b3d9ff'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              marginBottom: '1rem',
              color: '#0066cc'
            }}>
              Mission
            </h3>
            <p style={{
              lineHeight: '1.6',
              color: '#555'
            }}>
              {t.about.mission}
            </p>
          </div>

          <div style={{
            backgroundColor: '#f0f8e7',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #c8e6c9'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              marginBottom: '1rem',
              color: '#2e7d32'
            }}>
              Values
            </h3>
            <p style={{
              lineHeight: '1.6',
              color: '#555'
            }}>
              {t.about.values}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
