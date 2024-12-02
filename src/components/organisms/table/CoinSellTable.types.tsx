export interface ICoinSellTableData {
  uniqueId: number;
  dealingId: number;
  managerId: number;
  bank: string;
  accountNumber: string;
  accountHolder: string;
  tradeNumber: string;
  applyDate: string;
  completeDate: string;
  type: string;
  status: string;
  requestAmount: number;
  holdAmount: number;
  bonusAmount: number;
  paymentAmount: number;
}

export interface ICoinSellTableProps {
  data?: ICoinSellTableData[];
  refetch: () => void;
}
