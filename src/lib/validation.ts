export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email);
}

export function isValidName(name: string): boolean {
    return name.trim().length >= 2;
}

// Catches keyboard mashes like "aWdwadawdwa": a handful of keys repeated,
// usually as one long "word". A real note has spaces and more letters.
export function looksLikeKeyboardMash(text: string): boolean {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const distinctLetters = new Set(text.toLowerCase().match(/\p{L}/gu) ?? []).size;
    return distinctLetters < 5 || (words.length < 2 && distinctLetters < 15);
}

export function isValidMessage(message: string): boolean {
    return message.trim().length >= 10 && !looksLikeKeyboardMash(message);
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

    if (data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters');
    } else if (looksLikeKeyboardMash(data.message)) {
        errors.push('Please tell me a little more about what you need, in a few words.');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}
