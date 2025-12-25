'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ContactForm } from './ContactForm';

/**
 * Global contact modal that can be triggered from anywhere via custom event.
 * Usage: window.dispatchEvent(new CustomEvent('openContactModal'));
 */
export function GlobalContactModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleOpenContactModal = () => {
            setIsModalOpen(true);
        };

        window.addEventListener('openContactModal', handleOpenContactModal);
        return () => window.removeEventListener('openContactModal', handleOpenContactModal);
    }, []);

    return (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="text-center mb-8">
                <h2 id="modal-title" className="text-2xl md:text-3xl font-black text-[#153230] mb-2">
                    Let&apos;s Build Something Great
                </h2>
                <p className="text-[#153230]/70">
                    Tell me about your project, team, or event.
                </p>
            </div>
            <ContactForm />
        </Modal>
    );
}
