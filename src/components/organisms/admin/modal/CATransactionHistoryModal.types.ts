import type { ITransactionHistoryCATableData } from '@/components/organisms/admin/table/TransactionHistoryCATable.types';

export interface ICATransactionHistoryModalProps {
  transactionHistoryTableData: ITransactionHistoryCATableData;
  isOpen: boolean;
  onClose: () => void;
}
