import type { FormErrors, UserRegistration, UserLogin } from '../types';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation - at least 6 characters
const MIN_PASSWORD_LENGTH = 6;

// Name validation - at least 2 characters
const MIN_NAME_LENGTH = 2;

export const validateEmail = (email: string): string => {
  if (!email) {
    return 'Email is required';
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
  }
  return '';
};

export const validateName = (name: string): string => {
  if (!name) {
    return 'Name is required';
  }
  if (name.trim().length < MIN_NAME_LENGTH) {
    return `Name must be at least ${MIN_NAME_LENGTH} characters long`;
  }
  return '';
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
};

export const validateRegistrationForm = (values: UserRegistration & { confirmPassword?: string }): FormErrors => {
  const errors: FormErrors = {};

  const nameError = validateName(values.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  if (values.confirmPassword !== undefined) {
    const confirmPasswordError = validateConfirmPassword(values.password, values.confirmPassword);
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  }

  return errors;
};

export const validateLoginForm = (values: UserLogin): FormErrors => {
  const errors: FormErrors = {};

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validatePostText = (text: string): string => {
  if (!text || text.trim().length === 0) {
    return 'Post text is required';
  }
  if (text.length > 500) {
    return 'Post text cannot exceed 500 characters';
  }
  return '';
};

export const validateFileSize = (file: File, maxSizeMB: number = 5): string => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return `File size cannot exceed ${maxSizeMB}MB`;
  }
  return '';
};

export const validateImageFile = (file: File): string => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  
  if (!allowedTypes.includes(file.type)) {
    return 'Please select a valid image file (JPEG, PNG, or GIF)';
  }
  
  const sizeError = validateFileSize(file);
  if (sizeError) return sizeError;
  
  return '';
};
