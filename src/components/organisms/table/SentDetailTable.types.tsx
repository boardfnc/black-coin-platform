export interface ISentDetailTableData {
  uniqueId: number;
  detailId: number;
  partnerName: string;
  codeName: string;
  tradeDate: string;
  partnerCoin: number;
  authorRank: string;
  loginId: string;
  authorName: string;
  sendCoin: number;
  receiveCoin: number;
  coin: number;
  memberId: number;
  partnerId: number;
}

export interface ISentDetailTableProps {
  data?: ISentDetailTableData[];
}
