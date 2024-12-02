import type { IPurchaseUserTableData } from '../table/PurchaseUserTable.types';

export interface IPurchaseGeneralCoinHistoryModalProps {
  coinHistoryModalTableData: IPurchaseUserTableData;
  isOpen: boolean;
  onClose: () => void;
}
