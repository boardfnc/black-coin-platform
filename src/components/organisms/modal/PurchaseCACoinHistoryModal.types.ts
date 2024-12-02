import type { IPurchaseCATableData } from '../table/PurchaseCATable.types';

export interface IPurchaseCACoinHistoryModalProps {
  coinHistoryModalTableData: IPurchaseCATableData;
  isOpen: boolean;
  onClose: () => void;
}
