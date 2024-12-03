export interface IWithdrawalListTableData {
  uniqueId: number;
  memberId: number;
  memberDetailId: number;
  partnerName: string;
  codeName: string;
  memberRank: string;
  id: string;
  loginId: string;
  coin: number;
  purchaseCount: number;
  saleCount: number;
  returnMemberId: string;
  returnDate: string;
  returnCoin: number;
  memberStatus: string;
}

export interface IWithdrawalListTableProps {
  data?: IWithdrawalListTableData[];
}
