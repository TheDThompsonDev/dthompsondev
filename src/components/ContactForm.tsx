'use client';

import { useState, useRef } from 'react';
import { isValidEmail, isValidName, isValidMessage } from '@/lib/validation';
import { FloatingLabelInput } from './FloatingLabelInput';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLFormElement>(null);

  const messageMaxLength = 1000;
  const messageLength = formData.message.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Regular fetch - BotID automatically attaches verification headers
      // when BotIdClient component is mounted in layout
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle non-JSON responses gracefully (e.g., 405 with empty body)
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch {
          // JSON parsing failed - response body might be empty or malformed
          throw new Error(`Server returned ${response.status} with invalid response`);
        }
      } else {
        // Response is not JSON (could be HTML error page or empty)
        if (!response.ok) {
          throw new Error(`Server returned ${response.status} ${response.statusText}`);
        }
        data = { success: true };
      }

      if (!response.ok) {
        throw new Error(data.error || `Failed to send message (${response.status})`);
      }

      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setTouchedFields(new Set());

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Limit message length
    if (name === 'message' && value.length > messageMaxLength) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Mark field as touched
    setTouchedFields(prev => new Set(prev).add(name));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const getFieldValidation = (fieldName: string, value: string) => {
    if (!touchedFields.has(fieldName) || focusedField === fieldName) return null;

    switch (fieldName) {
      case 'name':
        return isValidName(value) ? 'valid' : 'invalid';
      case 'email':
        return isValidEmail(value) ? 'valid' : 'invalid';
      case 'message':
        return isValidMessage(value) ? 'valid' : 'invalid';
      default:
        return null;
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
      <div className="grid md:grid-cols-2 gap-3 sm:gap-6">
        <FloatingLabelInput
          id="name"
          name="name"
          type="text"
          label="Your Name"
          value={formData.name}
          required
          ariaLabel="Your full name"
          validation={getFieldValidation('name', formData.name)}
          onChange={handleChange}
          onFocus={() => handleFocus('name')}
          onBlur={handleBlur}
        />


        <FloatingLabelInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          value={formData.email}
          required
          ariaLabel="Your email address"
          validation={getFieldValidation('email', formData.email)}
          onChange={handleChange}
          onFocus={() => handleFocus('email')}
          onBlur={handleBlur}
        />
      </div>

      {/* Company Field with Floating Label */}
      <div className="relative group">
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          onFocus={() => handleFocus('company')}
          onBlur={handleBlur}
          className={`
            peer w-full px-4 sm:px-5 py-3 sm:py-4 pt-5 sm:pt-6 rounded-xl border-2 
            bg-white/80 backdrop-blur-sm
            transition-all duration-300
            text-[#153230] text-sm sm:text-base font-medium
            placeholder-transparent
            focus:outline-none focus:ring-4 focus:ring-[#4D7DA3]/20
            border-[#E2F3F2] focus:border-[#4D7DA3] hover:border-[#4D7DA3]/50
          `}
          placeholder="Company Name"
          aria-label="Your company or organization name"
        />
        <label
          htmlFor="company"
          className={`
            absolute left-5 transition-all duration-300 pointer-events-none
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#153230]/50
            peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#4D7DA3] peer-focus:font-bold
            ${formData.company ? 'top-2 text-xs font-bold text-[#153230]' : 'top-4 text-base text-[#153230]/50'}
          `}
        >
          Company or Organization <span className="text-[#153230]/40 text-xs">(optional)</span>
        </label>
      </div>

      <div className="relative group">
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          onFocus={() => handleFocus('message')}
          onBlur={handleBlur}
          maxLength={messageMaxLength}
          className={`
            peer w-full px-4 sm:px-5 py-3 sm:py-4 pt-5 sm:pt-6 rounded-xl border-2 
            bg-white/80 backdrop-blur-sm
            transition-all duration-300
            text-[#153230] text-sm sm:text-base font-medium leading-relaxed
            placeholder-transparent resize-none
            focus:outline-none focus:ring-4 focus:ring-[#4D7DA3]/20
            ${getFieldValidation('message', formData.message) === 'valid'
              ? 'border-green-400 focus:border-green-500'
              : getFieldValidation('message', formData.message) === 'invalid'
                ? 'border-red-400 focus:border-red-500'
                : 'border-[#E2F3F2] focus:border-[#4D7DA3] hover:border-[#4D7DA3]/50'
            }
          `}
          placeholder="Your Message"
          aria-label="Your message or project details"
          aria-required="true"
        />
        <label
          htmlFor="message"
          className={`
            absolute left-5 transition-all duration-300 pointer-events-none
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#153230]/50
            peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#4D7DA3] peer-focus:font-bold
            ${formData.message ? 'top-2 text-xs font-bold text-[#153230]' : 'top-4 text-base text-[#153230]/50'}
          `}
        >
          Tell Me About Your Project <span className="text-[#4D7DA3]">*</span>
        </label>

        <div className={`
          absolute bottom-3 right-4 text-xs font-semibold transition-colors
          ${messageLength > messageMaxLength * 0.9
            ? 'text-orange-500'
            : messageLength > 0
              ? 'text-[#4D7DA3]'
              : 'text-[#153230]/30'
          }
        `}>
          {messageLength} / {messageMaxLength}
        </div>
      </div>

      {status === 'success' && (
        <div className="bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-400 text-[#153230] px-6 py-4 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="font-black text-lg text-[#153230] mb-1">Message Sent Successfully! 🎉</h4>
              <p className="text-sm text-[#153230]/70 leading-relaxed">
                Thanks for reaching out! I'll review your message and get back to you within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-linear-to-r from-red-50 to-orange-50 border-2 border-red-400 text-red-900 px-6 py-4 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="font-black text-lg text-red-900 mb-1">Oops! Something Went Wrong</h4>
              <p className="text-sm text-red-800/80 leading-relaxed">
                {errorMessage || 'Unable to send your message. Please try again or email me directly.'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`
            group relative w-full overflow-hidden
            bg-linear-to-r from-[#153230] via-[#1a4544] to-[#153230]
            text-white px-8 py-5 rounded-xl
            font-black text-lg tracking-wide
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:shadow-2xl hover:shadow-[#4D7DA3]/30
            focus:outline-none focus:ring-4 focus:ring-[#4D7DA3]/40
            ${status !== 'loading' ? 'hover:scale-[1.02] active:scale-[0.98]' : ''}
          `}
          aria-label="Submit contact form"
        >
          <div className="absolute inset-0 bg-linear-to-r from-[#4D7DA3] via-[#5a8fb5] to-[#4D7DA3] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative flex items-center justify-center gap-3">
            {status === 'loading' ? (
              <>
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>SENDING YOUR MESSAGE...</span>
              </>
            ) : (
              <>
                <span>SEND MESSAGE</span>
                <svg
                  className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </span>
        </button>

        <div className="mt-4 flex items-start gap-2 text-xs text-[#153230]/60 leading-relaxed">
          <svg className="w-4 h-4 shrink-0 mt-0.5 text-[#4D7DA3]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <p>
            Your information is secure and will only be used to respond to your inquiry.
            I respect your privacy and never share contact details with third parties.
          </p>
        </div>
      </div>
    </form>
  );
}

