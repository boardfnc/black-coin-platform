export interface ICAUserListTableData {
  uniqueId: number;
  managerId: number;
  date: string;
  id: string;
  partnerName: string;
  codeName: string;
  phoneNumber: string;
  coin: number;
  purchaseCount: number;
  saleCount: number;
  siteUrl: string;
  charge: number;
  totalFeePerCase: number;
  purchaseFee: number;
  saleFee: number;
  authorStatus: string;
}

export interface ICAUserListTableProps {
  data?: ICAUserListTableData[];
}
