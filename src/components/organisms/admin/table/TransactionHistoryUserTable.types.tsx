export interface ITransactionHistoryUserTableData {
  indexId: number;
  uniqueId: number;
  memberId: number;
  tradeNumber: string;
  applyDate: string;
  type: number | string;
  status: number | string;
  authorRank: string;
  id: string;
  name: string;
  codeName: string;
  partnerUrl: string;
  purchasePrevCount: number;
  purchaseCount: number;
  managerPhone: string;
  partnerName: string;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
}

export interface ITransactionHistoryUserTableProps {
  data?: ITransactionHistoryUserTableData[];
}
