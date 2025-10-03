'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Language, getTranslations } from '@/lib/translations';
import { useState, useEffect } from 'react';
import { AuthResponse } from '@/lib/auth';

interface HeaderProps {
  currentLanguage: Language;
}

export default function Header({ currentLanguage }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<AuthResponse | null>(null);
  const t = getTranslations(currentLanguage);

  useEffect(() => {
    setMounted(true);

    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const switchLanguage = (newLanguage: Language) => {
    // Store language preference in localStorage
    localStorage.setItem('language', newLanguage);

    // Navigate to the same page with new language
    const newPath = pathname.replace(`/${currentLanguage}`, `/${newLanguage}`);
    router.push(newPath);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push(`/${currentLanguage}`);
  };

  if (!mounted) {
    return null;
  }

  return (
    <header style={{
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link
          href={`/${currentLanguage}`}
          style={{
            textDecoration: 'none',
            color: '#007bff',
            fontWeight: '500'
          }}
        >
          {t.header.home}
        </Link>
        <Link
          href={`/${currentLanguage}/about`}
          style={{
            textDecoration: 'none',
            color: '#007bff',
            fontWeight: '500'
          }}
        >
          {t.header.about}
        </Link>
      </nav>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: '#6c757d' }}>
          {t.language.switchTo}:
        </span>
        <button
          onClick={() => switchLanguage('en')}
          style={{
            padding: '0.25rem 0.5rem',
            border: currentLanguage === 'en' ? '2px solid #007bff' : '1px solid #dee2e6',
            backgroundColor: currentLanguage === 'en' ? '#e7f3ff' : 'white',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {t.language.english}
        </button>
        <button
          onClick={() => switchLanguage('ro')}
          style={{
            padding: '0.25rem 0.5rem',
            border: currentLanguage === 'ro' ? '2px solid #007bff' : '1px solid #dee2e6',
            backgroundColor: currentLanguage === 'ro' ? '#e7f3ff' : 'white',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {t.language.romanian}
        </button>
        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                Welcome, {user.name}!
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '0.25rem 0.5rem',
                  border: '1px solid #dc3545',
                  backgroundColor: 'transparent',
                  color: '#dc3545',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {t.auth.logout}
              </button>
            </div>
          ) : (
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
              <Link
                href={`/${currentLanguage}/login`}
                style={{
                  textDecoration: 'none',
                  color: '#007bff',
                  fontWeight: '500',
                  fontSize: '0.9rem'
                }}
              >
                {t.auth.login}
              </Link>
              <span style={{ color: '#dee2e6' }}>|</span>
              <Link
                href={`/${currentLanguage}/register`}
                style={{
                  textDecoration: 'none',
                  color: '#28a745',
                  fontWeight: '500',
                  fontSize: '0.9rem'
                }}
              >
                {t.auth.register}
              </Link>
            </div>
          )}
        </div>
      </div>


    </header>
  );
}
