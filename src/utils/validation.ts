/**
 * Enhanced Validation Utilities with Zod Integration
 * Provides comprehensive validation with schema-based approach and performance optimizations
 */

import React from 'react';
import { z } from 'zod';
import { VALIDATION_PATTERNS } from '../config';

// Zod schemas for type-safe validation
export const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters long')
  .max(50, 'Name must be no more than 50 characters long')
  .regex(VALIDATION_PATTERNS.name, 'Please enter a valid name');

export const emailSchema = z.string()
  .regex(VALIDATION_PATTERNS.email, 'Please enter a valid email address');

export const phoneSchema = z.string()
  .regex(VALIDATION_PATTERNS.phone, 'Please enter a valid phone number')
  .refine((val: string) => val.replace(/\D/g, '').length >= 10, 'Please enter a valid 10-digit phone number');

export const pincodeSchema = z.string()
  .regex(VALIDATION_PATTERNS.pincode, 'Please enter a valid 6-digit pincode');

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
  .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
  .regex(/(?=.*\d)/, 'Password must contain at least one number')
  .regex(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character');

export const subjectSchema = z.string()
  .min(3, 'Subject must be at least 3 characters long')
  .max(100, 'Subject must be no more than 100 characters long');

export const messageSchema = z.string()
  .min(10, 'Message must be at least 10 characters long')
  .max(500, 'Message must be no more than 500 characters long');

// Combined form schemas
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subject: subjectSchema,
  message: messageSchema,
});

export const admissionFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  pincode: pincodeSchema,
  message: messageSchema.optional(),
});

// Legacy validation interfaces for backward compatibility
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

// Memoized validation cache
const validationCache = new Map<string, ValidationResult>();

/**
 * Enhanced field validation with caching and Zod integration
 */
export const validateField = (value: string, rules: ValidationRule): ValidationResult => {
  // Create cache key
  const cacheKey = `${value}-${JSON.stringify(rules)}`;
  
  // Check cache first
  if (validationCache.has(cacheKey)) {
    return validationCache.get(cacheKey)!;
  }

  let result: ValidationResult;

  try {
    // Required validation
    if (rules.required && (!value || value.trim() === '')) {
      result = { isValid: false, error: 'This field is required' };
      validationCache.set(cacheKey, result);
      return result;
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim() === '') {
      result = { isValid: true, error: null };
      validationCache.set(cacheKey, result);
      return result;
    }

    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      result = {
        isValid: false,
        error: `Must be at least ${rules.minLength} characters long`
      };
      validationCache.set(cacheKey, result);
      return result;
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      result = {
        isValid: false,
        error: `Must be no more than ${rules.maxLength} characters long`
      };
      validationCache.set(cacheKey, result);
      return result;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      result = {
        isValid: false,
        error: 'Please enter a valid value'
      };
      validationCache.set(cacheKey, result);
      return result;
    }

    // Custom validation
    if (rules.custom) {
      const customError = rules.custom(value);
      if (customError) {
        result = { isValid: false, error: customError };
        validationCache.set(cacheKey, result);
        return result;
      }
    }

    result = { isValid: true, error: null };
  } catch (error) {
    result = {
      isValid: false,
      error: 'Validation failed. Please try again.'
    };
  }

  // Cache the result
  validationCache.set(cacheKey, result);
  
  // Limit cache size to prevent memory leaks
  if (validationCache.size > 1000) {
    const firstKey = validationCache.keys().next().value;
    if (firstKey) {
      validationCache.delete(firstKey);
    }
  }

  return result;
};

/**
 * Zod-based validation for enhanced type safety
 */
export const validateWithZod = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } => {
  try {
    const result = schema.safeParse(data);
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      const errors = result.error.issues.map((err: any) => err.message);
      return { success: false, errors };
    }
  } catch (error) {
    return {
      success: false,
      errors: ['Validation failed. Please try again.']
    };
  }
};

/**
 * Validate an entire form object against validation rules
 */
export const validateForm = (formData: Record<string, string>, rules: ValidationRules): Record<string, ValidationResult> => {
  const errors: Record<string, ValidationResult> = {};

  Object.keys(rules).forEach(field => {
    const value = formData[field] || '';
    errors[field] = validateField(value, rules[field]);
  });

  return errors;
};

/**
 * Check if a form has any validation errors
 */
export const hasValidationErrors = (errors: Record<string, ValidationResult>): boolean => {
  return Object.values(errors).some(error => !error.isValid);
};

/**
 * Get first error message from validation results
 */
export const getFirstError = (errors: Record<string, ValidationResult>): string | null => {
  const errorEntry = Object.values(errors).find(error => !error.isValid);
  return errorEntry ? errorEntry.error : null;
};

/**
 * Enhanced common validation rules with Zod schemas
 */
export const commonValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: VALIDATION_PATTERNS.name
  },
  email: {
    required: true,
    pattern: VALIDATION_PATTERNS.email
  },
  phone: {
    required: true,
    pattern: VALIDATION_PATTERNS.phone,
    custom: (value: string) => {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length < 10) {
        return 'Please enter a valid 10-digit phone number';
      }
      return null;
    }
  },
  pincode: {
    required: true,
    pattern: VALIDATION_PATTERNS.pincode
  },
  password: {
    required: true,
    minLength: 8,
    pattern: VALIDATION_PATTERNS.password,
    custom: (value: string) => {
      if (!/(?=.*[a-z])/.test(value)) {
        return 'Password must contain at least one lowercase letter';
      }
      if (!/(?=.*[A-Z])/.test(value)) {
        return 'Password must contain at least one uppercase letter';
      }
      if (!/(?=.*\d)/.test(value)) {
        return 'Password must contain at least one number';
      }
      if (!/(?=.*[@$!%*?&])/.test(value)) {
        return 'Password must contain at least one special character';
      }
      return null;
    }
  },
  subject: {
    required: true,
    minLength: 3,
    maxLength: 100
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 500
  }
};

/**
 * Enhanced input sanitization with comprehensive XSS protection
 */
export const sanitizeInput = (input: string | null | undefined): string => {
  if (!input) return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+=/gi, '');
};

/**
 * Enhanced file validation with security checks
 */
export const validateFile = (
  file: File | null, 
  maxSize: number = 10 * 1024 * 1024, 
  allowedTypes: string[] = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
): ValidationResult => {
  if (!file) {
    return {
      isValid: false,
      error: 'Please select a file'
    };
  }

  // Check file size
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`
    };
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed'
    };
  }

  // Check file name for suspicious patterns
  const fileName = file.name.toLowerCase();
  if (fileName.includes('script') || fileName.includes('exec') || fileName.includes('.exe')) {
    return {
      isValid: false,
      error: 'Invalid file name'
    };
  }

  return { isValid: true, error: null };
};

/**
 * Enhanced validation hook with performance optimizations
 */
export const useValidation = (formData: Record<string, string>, rules: ValidationRules) => {
  const [errors, setErrors] = React.useState<Record<string, ValidationResult>>({});

  // Debounced validation to prevent excessive re-renders
  const debouncedValidation = React.useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (data: Record<string, string>, ruleSet: ValidationRules) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const newErrors = validateForm(data, ruleSet);
          setErrors(newErrors);
        }, 300);
      };
    })(),
    []
  );

  React.useEffect(() => {
    debouncedValidation(formData, rules);
  }, [formData, rules, debouncedValidation]);

  const validateSingleField = React.useCallback((field: string, value: string) => {
    const fieldError = validateField(value, rules[field]);
    setErrors(prev => ({
      ...prev,
      [field]: fieldError
    }));
    return fieldError;
  }, [rules]);

  const clearErrors = React.useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = React.useCallback((field: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: { isValid: true, error: null }
    }));
  }, []);

  // Cleanup function
  React.useEffect(() => {
    return () => {
      validationCache.clear();
    };
  }, []);

  return {
    errors,
    validateField: validateSingleField,
    clearErrors,
    clearFieldError,
    hasErrors: hasValidationErrors(errors),
    firstError: getFirstError(errors)
  };
};
