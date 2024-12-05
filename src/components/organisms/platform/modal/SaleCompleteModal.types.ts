export interface ISaleCompleteModalData {
  createdAt?: string;
  bank?: string;
  account?: string;
  bankAccount?: string;
  bankAmount?: string;
}

export interface ISaleCompleteModalProps extends ISaleCompleteModalData {
  isOpen: boolean;
  onClose: () => void;
}
