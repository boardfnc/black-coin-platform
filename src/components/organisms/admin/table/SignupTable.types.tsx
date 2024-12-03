export interface ISignupTableData {
  uniqueId: number;
  memberId: number;
  id: number;
  joinDate: string;
  loginId: string;
  phoneNumber: string;
  codeName: string;
  partnerName: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  memberStatus: string;
}

export interface ISignupTableProps {
  data?: ISignupTableData[];
  refetch: () => void;
}
