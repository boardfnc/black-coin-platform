import type { ITransactionHistoryUserTableData } from '@/components/organisms/table/TransactionHistoryUserTable.types';

export interface IUserHistoryModalProps {
  transactionHistoryTableData: ITransactionHistoryUserTableData;
  isOpen: boolean;
  onClose: () => void;
}
