export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email);
}

export function isValidName(name: string): boolean {
    return name.trim().length >= 2;
}

export function isValidMessage(message: string): boolean {
    return message.trim().length >= 10;
}

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
