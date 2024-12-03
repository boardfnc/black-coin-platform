export interface ISaleCATableData {
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
  ipAddress: string;
  tradeNumber: string;
  applyDate: string;
  partnerName: string;
  codeName: string;
  type: string;
  status: string;
  requestAmount: number;
  bonusAmount: number;
  paymentAmount: number;
}

export interface ISaleCATableProps {
  data?: ISaleCATableData[];
}
