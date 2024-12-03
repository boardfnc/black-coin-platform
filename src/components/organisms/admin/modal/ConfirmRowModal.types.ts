import type { ReactNode } from 'react';

export interface IConfirmRowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon?: ReactNode;
  title: string;
  iconColor?: 'primary' | 'red';
  content: string | ReactNode;
  cancelText?: string;
  confirmText?: string;
  width?: string;
}
