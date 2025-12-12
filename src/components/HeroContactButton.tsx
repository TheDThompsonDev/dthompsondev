'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import { ContactForm } from './ContactForm';

export function HeroContactButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="group relative bg-[#4D7DA3] text-white px-8 py-4 lg:px-10 lg:py-5 rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-sm lg:text-md overflow-hidden w-full sm:w-auto cursor-pointer"
      >
        <span className="relative z-10">
          Let's work together!
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
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
