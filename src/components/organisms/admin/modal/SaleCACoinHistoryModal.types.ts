import type { ISaleCATableData } from '../table/SaleCATable.types';

export interface ISaleCACoinHistoryModalProps {
  coinHistoryModalTableData: ISaleCATableData;
  isOpen: boolean;
  onClose: () => void;
}
