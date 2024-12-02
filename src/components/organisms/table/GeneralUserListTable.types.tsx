export interface IUserListTableData {
  uniqueId: number;
  managerId: number;
  memberId: number;
  date: string;
  partnerName: string;
  codeName: string;
  id: string;
  coin: number;
  purchaseCount: number;
  saleCount: number;
  authorRank: string;
  lastAccess: string;
  ipAddress: string;
  authorStatus: string;
}

export interface IUserListTableProps {
  data?: IUserListTableData[];
  refetch?: () => void;
}
