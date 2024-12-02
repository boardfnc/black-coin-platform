import type { ITransactionHistoryMyTradeTableData } from '@/components/organisms/table/TransactionHistoryMyTrade.types';

export interface ITransactionHistoryMyTradeModalProps {
  transactionHistoryMyTradeData: ITransactionHistoryMyTradeTableData;
  isOpen: boolean;
  onClose: () => void;
}
