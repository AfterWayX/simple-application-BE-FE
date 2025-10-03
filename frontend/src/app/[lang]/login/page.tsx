'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Language, getTranslations } from '@/lib/translations';
import { authApi, validateEmail } from '@/lib/auth';

export default function LoginPage() {
  const params = useParams();
  const router = useRouter();
  const currentLanguage = params.lang as Language;
  const t = getTranslations(currentLanguage);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
    setApiError('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = t.auth.validation.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.auth.validation.emailInvalid;
    }

    if (!formData.password) {
      newErrors.password = t.auth.validation.passwordRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      const response = await authApi.login(formData);
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response));
      
      // Show success message
      alert(t.auth.loginSuccess);
      
      // Redirect to home page
      router.push(`/${currentLanguage}`);
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message || t.auth.loginError);
      } else {
        setApiError(t.auth.loginError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '0.5rem'
          }}>
            {t.auth.loginTitle}
          </h1>
          <p style={{
            color: '#666',
            fontSize: '0.9rem'
          }}>
            {t.auth.loginSubtitle}
          </p>
        </div>

        {apiError && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '0.75rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#333'
            }}>
              {t.auth.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: errors.email ? '2px solid #dc3545' : '1px solid #dee2e6',
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div style={{
                color: '#dc3545',
                fontSize: '0.8rem',
                marginTop: '0.25rem'
              }}>
                {errors.email}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#333'
            }}>
              {t.auth.password}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: errors.password ? '2px solid #dc3545' : '1px solid #dee2e6',
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
            />
            {errors.password && (
              <div style={{
                color: '#dc3545',
                fontSize: '0.8rem',
                marginTop: '0.25rem'
              }}>
                {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: isLoading ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              marginBottom: '1rem'
            }}
          >
            {isLoading ? 'Signing in...' : t.auth.loginButton}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          {t.auth.dontHaveAccount}{' '}
          <Link 
            href={`/${currentLanguage}/register`}
            style={{
              color: '#007bff',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            {t.auth.signUpLink}
          </Link>
        </div>
      </div>
    </div>
  );
}
