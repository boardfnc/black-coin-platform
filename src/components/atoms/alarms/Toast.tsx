'use client';

import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { IconLine24Confirm, IconLine24ConfirmEtc } from '../icons/icon-line';
import IconLine24Warning from '../icons/icon-line/Warning';

import { IS_ADMIN } from '@/constants';
import { useToastStore } from '@/stores/toast';

export default function Toast() {
  const { message, type, isOpen, duration } = useToastStore();
  const pathname = usePathname();
  const [transparentType, setTransparentType] = useState(false);
  const [isCenterPosition, setIsCenterPosition] = useState(false);

  const closeToast = () => {
    useToastStore.setState({ isOpen: false });
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        useToastStore.setState({ isOpen: false });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration]);

  useEffect(() => {
    if (pathname.includes('wallet') || IS_ADMIN) {
      setTransparentType(false);
      setIsCenterPosition(true);
      return;
    }

    if (IS_ADMIN) {
      setIsCenterPosition(false);
      return;
    }

    setTransparentType(false);
    setIsCenterPosition(false);
  }, [pathname]);

  useEffect(() => {
    if (type === 'transparent') setTransparentType(true);
    else setTransparentType(false);
  }, [type]);

  const toastIcons = {
    success: <IconLine24Confirm className={'text-[#59C173]'} />,
    error: <IconLine24Warning className={'text-[#FF6C5C]'} />,
    info: <IconLine24Confirm className={'text-[#2196F3]'} />,
    warning: <IconLine24Warning className={'text-[#FF9800]'} />,
    transparent: <IconLine24Warning className={'text-[#FF6C5C]'} width={32} height={32} />,
  };

  const toastColors = {
    success: 'bg-[#FCFEF8]',
    error: 'bg-[#FEF8F8]',
    info: 'bg-[#F8FBFE]',
    warning: 'bg-[#FFFBF5]',
    transparent: 'bg-transparent',
  };

  const toastBorderColors = {
    success: 'border-[#C3E7C5]',
    error: 'border-[#FF6C5C]',
    info: 'border-[#2196F3]',
    warning: 'border-[#FF9800]',
    transparent: 'border-transparent',
  };

  return (
    <AnimatePresence mode={'wait'}>
      {isOpen && (
        <motion.div
          className={`fixed ${
            !isCenterPosition
              ? 'top-[184px] left-0 right-0 flex justify-center'
              : 'inset-0 flex items-center justify-center'
          } z-50 pointer-events-none`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            type: 'spring',
            duration: 0.4,
            exit: { duration: 0.4 },
          }}
        >
          {transparentType && (
            <div
              className={`max-w-[480px] w-full flex flex-col justify-center items-center gap-4 bg-gray-0 bg-opacity-30 py-6 px-8 rounded-xl`}
            >
              <div>{toastIcons[type]}</div>

              <div className={'flex flex-col items-center gap-2.5'}>
                <div className={'text-gray-100 font-suit-18-700-130'}>Error</div>

                <div className={'text-gray-100 font-suit-16-m-130'}>{message}</div>
              </div>
            </div>
          )}

          {!transparentType && (
            <div
              onClick={closeToast}
              className={`${toastColors[type]} pointer-events-auto text-gray-0 border ${toastBorderColors[type]} rounded-2xl shadow-lg p-4 flex flex-row items-center justify-start gap-4 text-start min-w-[450px] cursor-pointer`}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  closeToast();
                }
              }}
            >
              <span>{toastIcons[type]}</span>
              <span className={'text-gray-0 font-pre-14-r-130'}>{message}</span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
