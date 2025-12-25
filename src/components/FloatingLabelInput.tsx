'use client';

interface FloatingLabelInputProps {
    id: string;
    name: string;
    type?: 'text' | 'email';
    label: string;
    value: string;
    required?: boolean;
    placeholder?: string;
    ariaLabel?: string;
    validation?: 'valid' | 'invalid' | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
}

export function FloatingLabelInput({
    id,
    name,
    type = 'text',
    label,
    value,
    required = false,
    placeholder,
    ariaLabel,
    validation,
    onChange,
    onFocus,
    onBlur,
}: FloatingLabelInputProps) {
    const getBorderClasses = () => {
        if (validation === 'valid') return 'border-green-400 focus:border-green-500';
        if (validation === 'invalid') return 'border-red-400 focus:border-red-500';
        return 'border-[#E2F3F2] focus:border-[#4D7DA3] hover:border-[#4D7DA3]/50';
    };

    return (
        <div className="relative group">
            <input
                type={type}
                id={id}
                name={name}
                required={required}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className={`
                    peer w-full px-4 sm:px-5 py-3 sm:py-4 pt-5 sm:pt-6 rounded-xl border-2 
                    bg-white/80 backdrop-blur-sm
                    transition-all duration-300
                    text-[#153230] text-sm sm:text-base font-medium
                    placeholder-transparent
                    focus:outline-none focus:ring-4 focus:ring-[#4D7DA3]/20
                    ${getBorderClasses()}
                `}
                placeholder={placeholder || label}
                aria-label={ariaLabel || label}
                aria-required={required}
            />
            <label
                htmlFor={id}
                className={`
                    absolute left-5 transition-all duration-300 pointer-events-none
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#153230]/50
                    peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#4D7DA3] peer-focus:font-bold
                    ${value ? 'top-2 text-xs font-bold text-[#153230]' : 'top-4 text-base text-[#153230]/50'}
                `}
            >
                {label} {required && <span className="text-[#4D7DA3]">*</span>}
            </label>

            {validation === 'valid' && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
            {validation === 'invalid' && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            )}
        </div>
    );
}
