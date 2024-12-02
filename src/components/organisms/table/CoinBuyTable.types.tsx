export interface ICoinBuyTableData {
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
  bonusAmount: number;
  paymentAmount: number;
}

export interface ICoinBuyTableProps {
  data?: ICoinBuyTableData[];
  refetch: () => void;
}
