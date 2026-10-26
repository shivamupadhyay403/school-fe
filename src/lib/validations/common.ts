import { z } from 'zod';

/**
 * Shared password rules.
 * Reuse this schema in registration, password changes,
 * and password reset forms.
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password cannot exceed 128 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

/**
 * For login: accept a username, email address, or
 * Indian mobile number in one field.
 */
export const loginIdentifierSchema = z
  .string()
  .trim()
  .min(1, 'Username, email, or mobile number is required')
  .max(254, 'Input is too long')
  .refine((value) => {
    // Email-like input
    if (value.includes('@')) {
      return z.string().email().safeParse(value).success;
    }
    // Indian mobile: optional +91 or 0 prefix, then 10 digits.
    if (/^[+\d][\d\s()-]*$/.test(value)) {
      const normalized = value.replace(/[\s()-]/g, '');
      return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(normalized);
    }

    // Username: 3–30 characters; letters, numbers,
    // underscore, dot and hyphen.
    return /^[a-zA-Z0-9_.-]{3,30}$/.test(value);
  }, 'Enter a valid username, email address, or Indian mobile number');

/**
 * Reusable field schemas.
 */
export const usernameSchema = z
  .string()
  .trim()
  .min(3, 'Username must be at least 3 characters')
  .max(30, 'Username cannot exceed 30 characters')
  .regex(/^[a-zA-Z0-9_.-]+$/, 'Use only letters, numbers, dots, underscores, and hyphens');

export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email address is required')
  .email('Enter a valid email address');

export const indianMobileSchema = z
  .string()
  .trim()
  .min(1, 'Mobile number is required')
  .transform((value) => value.replace(/[\s()-]/g, ''))
  .refine((value) => {
    const digits = value.replace(/^\+/, '');
    const national =
      digits.startsWith('91') && digits.length === 12
        ? digits.slice(2)
        : digits.startsWith('0') && digits.length === 11
          ? digits.slice(1)
          : digits;

    return /^[6-9]\d{9}$/.test(national);
  }, 'Enter a valid Indian mobile number')
  .transform((value) => {
    const digits = value.replace(/^\+/, '');
    if (digits.startsWith('91') && digits.length === 12) {
      return digits.slice(2);
    }
    if (digits.startsWith('0') && digits.length === 11) {
      return digits.slice(1);
    }
    return digits;
  });

export const nameSchema = z
  .string()
  .trim()
  .min(1, 'This field is required')
  .max(50, 'Must not exceed 50 characters')
  .regex(/^[\p{L}\p{M} .'-]+$/u, 'Enter a valid name');
