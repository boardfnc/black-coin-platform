import type { ReactNode } from 'react';

export interface IConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  content: string | ReactNode;
  title: string;
  cancelText?: string;
  confirmText?: string;
  width?: string;
}

export interface IBuyCompleteModalData {
  detailId?: number;
  createdAt?: string;
  bank?: string;
  account?: string;
  bankAccount?: string;
  bankAmount?: string;
}

export interface IBuyCompleteModalProps extends IBuyCompleteModalData {
  isOpen: boolean;
  onClose: () => void;
}

export interface IBuyCoinData {
  coin?: number;
  mode: 'payment' | 'retrieval';
}

export interface IBuyCoinModalProps extends IBuyCoinData {
  isOpen: boolean;
  onClose: () => void;
  refetch?: () => void;
}
