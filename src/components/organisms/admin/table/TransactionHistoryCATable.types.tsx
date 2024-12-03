export interface ITransactionHistoryCATableData {
  indexId: number;
  uniqueId: number;
  managerId: number;
  tradeNumber: string;
  applyDate: string;
  type: number;
  status: number;
  partnerName: string;
  codeName: string;
  purchasePrevCount: number;
  purchaseCount: number;
  managerPhone: string;
  partnerUrl: string;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
}

export interface ITransactionHistoryCATableProps {
  data?: ITransactionHistoryCATableData[];
}
