export interface IPurchaseCATableData {
  uniqueId: number;
  dealingId: number;
  managerId: number;
  bank: string;
  accountNumber: string;
  accountHolder: string;
  phoneNumber: string;
  loginId: string;
  name: string;
  authorRank: string;
  siteUrl: string;
  tradeNumber: string;
  applyDate: string;
  partnerName: string;
  codeName: string;
  type: string;
  status: string;
  ipAddress: string;
  requestAmount: number;
  bonusAmount: number;
  paymentAmount: number;
}

export interface IPurchaseCATableProps {
  data?: IPurchaseCATableData[];
  refetch?: () => void;
}
