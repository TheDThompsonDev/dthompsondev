'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ContactForm } from './ContactForm';
import { trackContact } from '@/lib/analytics';

interface ContactModalButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export function ContactModalButton({ children, className = '', onClick }: ContactModalButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        onClick?.();
        setIsModalOpen(true);
        trackContact('modal_open');
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={className}
            >
                {children}
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-black text-[#153230] mb-2">
                        Let's Build Something Great
                    </h2>
                    <p className="text-[#153230]/70">
                        Tell me about your project, team, or event.
                    </p>
                </div>
                <ContactForm />
            </Modal>
        </>
    );
}
