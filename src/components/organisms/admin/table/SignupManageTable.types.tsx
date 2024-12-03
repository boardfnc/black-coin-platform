export interface ISignupManageTableData {
  date: string;
  partnerName: string;
  totalPurchaseCount: number;
  totalPurchaseCoin: number;
  totalSaleCount: number;
  totalSaleCoin: number;
  recoveredCoin: number;
  totalFeePerCase: number;
  purchaseFee: number;
  saleFee: number;
  total: number;
}

export interface ISignupManageTableProps {
  data?: ISignupManageTableData[];
}
