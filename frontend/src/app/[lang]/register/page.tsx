'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Language, getTranslations } from '@/lib/translations';
import { authApi, validateEmail, validatePassword, validateName } from '@/lib/auth';

export default function RegisterPage() {
  const params = useParams();
  const router = useRouter();
  const currentLanguage = params.lang as Language;
  const t = getTranslations(currentLanguage);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (!formData.name) {
      newErrors.name = t.auth.validation.nameRequired;
    } else if (!validateName(formData.name)) {
      newErrors.name = t.auth.validation.nameMinLength;
    }

    if (!formData.email) {
      newErrors.email = t.auth.validation.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.auth.validation.emailInvalid;
    }

    if (!formData.password) {
      newErrors.password = t.auth.validation.passwordRequired;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = t.auth.validation.passwordMinLength;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t.auth.validation.confirmPasswordRequired;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.auth.validation.passwordsMatch;
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
      const response = await authApi.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response));
      
      // Show success message
      alert(t.auth.registerSuccess);
      
      // Redirect to home page
      router.push(`/${currentLanguage}`);
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message || t.auth.registerError);
      } else {
        setApiError(t.auth.registerError);
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
            {t.auth.registerTitle}
          </h1>
          <p style={{
            color: '#666',
            fontSize: '0.9rem'
          }}>
            {t.auth.registerSubtitle}
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
            <label htmlFor="name" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#333'
            }}>
              {t.auth.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: errors.name ? '2px solid #dc3545' : '1px solid #dee2e6',
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your name"
            />
            {errors.name && (
              <div style={{
                color: '#dc3545',
                fontSize: '0.8rem',
                marginTop: '0.25rem'
              }}>
                {errors.name}
              </div>
            )}
          </div>

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

          <div style={{ marginBottom: '1rem' }}>
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

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="confirmPassword" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#333'
            }}>
              {t.auth.confirmPassword}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: errors.confirmPassword ? '2px solid #dc3545' : '1px solid #dee2e6',
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <div style={{
                color: '#dc3545',
                fontSize: '0.8rem',
                marginTop: '0.25rem'
              }}>
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: isLoading ? '#6c757d' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              marginBottom: '1rem'
            }}
          >
            {isLoading ? 'Creating account...' : t.auth.registerButton}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          {t.auth.alreadyHaveAccount}{' '}
          <Link 
            href={`/${currentLanguage}/login`}
            style={{
              color: '#007bff',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            {t.auth.signInLink}
          </Link>
        </div>
      </div>
    </div>
  );
}
