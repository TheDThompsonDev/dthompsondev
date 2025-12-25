/**
 * Shared validation utilities
 * Centralized validation logic to ensure consistency across client and server
 */

/**
 * Email validation regex pattern
 * Matches: any@domain.tld format
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates an email address
 * @param email - The email string to validate
 * @returns true if the email is valid
 */
export function isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email);
}

/**
 * Validates a name field
 * @param name - The name string to validate
 * @returns true if the name is valid (non-empty and at least 2 characters)
 */
export function isValidName(name: string): boolean {
    return name.trim().length >= 2;
}

/**
 * Validates a message field
 * @param message - The message string to validate
 * @returns true if the message is valid (non-empty and at least 10 characters)
 */
export function isValidMessage(message: string): boolean {
    return message.trim().length >= 10;
}

/**
 * Validates all required contact form fields
 * @returns An object with validation results and error messages
 */
export function validateContactForm(data: {
    name: string;
    email: string;
    message: string;
}): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!isValidName(data.name)) {
        errors.push('Name must be at least 2 characters');
    }

    if (!isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!isValidMessage(data.message)) {
        errors.push('Message must be at least 10 characters');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}
