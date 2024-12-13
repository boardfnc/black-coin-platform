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
