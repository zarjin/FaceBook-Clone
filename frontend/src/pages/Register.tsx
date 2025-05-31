import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { validateRegistrationForm } from '../utils/validation';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import type { UserRegistration } from '../types';

interface RegisterFormData extends UserRegistration {
  confirmPassword: string;
}

export default function Register() {
  const { register, isAuthenticated, isLoading } = useAuth();
  const [submitError, setSubmitError] = useState<string>('');

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<RegisterFormData>({
      initialValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      validate: validateRegistrationForm,
      onSubmit: async (formData) => {
        try {
          setSubmitError('');
          const { confirmPassword, ...userData } = formData;
          await register(userData);
        } catch (error: any) {
          setSubmitError(error.message);
        }
      },
    });

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/feed" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              name="name"
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <Input
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />
          </div>

          {(submitError || errors.submit) && (
            <div className="text-red-600 text-sm text-center">
              {submitError || errors.submit}
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting || isLoading}
            disabled={isSubmitting || isLoading}
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}
