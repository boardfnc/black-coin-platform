export interface ITransactionHistoryMyTradeTableData {
  indexId: number;
  uniqueId: number;
  memberId: number;
  tradeNumber: string;
  applyDate: string;
  type: string;
  status: string;
  purchasePrevCount: number;
  purchaseCount: number;
  completeDate: string;
}

export interface ITransactionHistoryMyTradeTableProps {
  data?: ITransactionHistoryMyTradeTableData[];
}
