import type { ITransactionHistoryCATableData } from '@/components/organisms/table/TransactionHistoryCATable.types';

export interface ICATransactionHistoryModalProps {
  transactionHistoryTableData: ITransactionHistoryCATableData;
  isOpen: boolean;
  onClose: () => void;
}
