export interface IPurchaseUserTableData {
  uniqueId: number;
  dealingId: number;
  memberId: number;
  managerId: number;
  bank: string;
  accountNumber: string;
  accountHolder: string;
  phoneNumber: string;
  loginId: string;
  name: string;
  authorRank: string;
  siteUrl: string;
  todayPurchsCount: number;
  tradeNumber: string;
  applyDate: string;
  ipAddress: string;
  partnerName: string;
  type: string;
  status: string;
  requestAmount: number;
  bonusAmount: number;
  paymentAmount: number;
}

export interface IPurchaseUserTableProps {
  data?: IPurchaseUserTableData[];
  refetch?: () => void;
}
