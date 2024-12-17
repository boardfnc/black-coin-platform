export interface ITransactionFeeHistoryTableData {
  uniqueId: number;
  memberId: number;
  managerId: number;
  partnerName: string;
  codeName: string;
  authorRank: string;
  loginId: string;
  authorName: string;
  date: string;
  tradeNumber: string;
  type: string;
  perFee: number;
  sellFee: number;
  buyFee: number;
  feeBalance: number;
  caCoin: number;
}

export interface ITransactionFeeHistoryTableProps {
  data?: ITransactionFeeHistoryTableData[];
}
