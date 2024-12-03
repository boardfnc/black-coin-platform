import type { IPurchaseCATableData } from '../table/PurchaseCATable.types';
import type { IPurchaseUserTableData } from '../table/PurchaseUserTable.types';

export interface ISendCoinModalProps {
  sendCoinModalTableData: IPurchaseCATableData[] | IPurchaseUserTableData[];
  isOpen: boolean;
  type: 'ca' | 'user';
  onClose: () => void;
}
