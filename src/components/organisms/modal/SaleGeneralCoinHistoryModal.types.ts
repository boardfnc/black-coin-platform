import type { ISaleGeneralTableData } from '../table/SaleGeneralTable.types';

export interface ISaleGeneralCoinHistoryModalProps {
  coinHistoryModalTableData: ISaleGeneralTableData;
  isOpen: boolean;
  onClose: () => void;
  useDefaultDeposit?: boolean;
}
