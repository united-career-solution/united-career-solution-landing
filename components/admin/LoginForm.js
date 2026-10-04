"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email not found'; // Generic per requirements
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email format is invalid';
    }

    if (!password.trim()) {
      newErrors.password = 'Incorrect password'; // Generic per requirements
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg('');
    
    const validationErrs = validate();
    if (Object.keys(validationErrs).length > 0) {
      setErrors(validationErrs);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg('Login successful');
        localStorage.setItem('admin_token', data.data.token);
        // Add a slight delay to let user see success message before redirecting
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      } else {
        // Handle explicit errors from backend
        if (data.message === 'Email not found') {
          setErrors({ email: 'Email not found' });
        } else if (data.message === 'Incorrect password') {
          setErrors({ password: 'Incorrect password' });
        } else {
          setErrors({ form: data.message || 'Login failed' });
        }
      }
    } catch (err) {
      setErrors({ form: 'An error occurred connecting to the server' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        {errors.password && <span className="error-text">{errors.password}</span>}
      </div>

      {errors.form && <span className="error-text">{errors.form}</span>}
      {successMsg && <div className="success-text">{successMsg}</div>}

      <button type="submit" className="btn-primary" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
