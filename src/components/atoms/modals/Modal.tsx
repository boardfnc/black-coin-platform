'use client';

import { useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import type { IModalProps } from './Modal.types';

export default function Modal(props: IModalProps) {
  const { isOpen, onClose, title, children, width = '500px', height = 'auto' } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose();
      };

      window.addEventListener('keydown', handleEscKey);

      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={'fixed inset-0 z-50 flex items-center justify-center px-[27px] sm:px-0'}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className={'fixed inset-0 bg-black'}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className={'relative bg-white rounded-[20px] shadow-lg'}
            style={{ width, height }}
          >
            {title && (
              <div className={'flex items-center justify-between p-5 border-b border-gray-80'}>
                <h2 className={'text-gray-0 font-pre-20-b-130'}>{title}</h2>
                <button onClick={onClose} className={'text-gray-40'}>
                  <svg width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'}>
                    <path
                      d={'M18 6L6 18M6 6L18 18'}
                      stroke={'currentColor'}
                      strokeWidth={'1.5'}
                      strokeLinecap={'round'}
                      strokeLinejoin={'round'}
                    />
                  </svg>
                </button>
              </div>
            )}

            <div className={'w-full h-full p-5'}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
