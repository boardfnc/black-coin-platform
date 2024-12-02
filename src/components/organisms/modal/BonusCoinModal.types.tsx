export interface IBonusCoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (amount: number, isPercentage: boolean) => void;
  hasExistingValue: () => boolean;
}
