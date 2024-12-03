import type { ISaleCATableData } from '../table/SaleCATable.types';
import type { ISaleGeneralTableData } from '../table/SaleGeneralTable.types';

export interface ISaleCoinModalProps {
  type: 'ca' | 'user';
  isOpen: boolean;
  saleCoinModalTableData: ISaleCATableData[] | ISaleGeneralTableData[];
  useDefaultDeposit: boolean;
  onClose: () => void;
}
