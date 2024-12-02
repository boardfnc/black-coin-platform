export interface IGradeManageTableData {
  uniqueId: number;
  managerId: number;
  partnerName: string;
  codeName: string;
  memberRank: string;
  id: string;
  coin: string;
  memberCount: number;
  vvipStandard: number | string;
  vipStandard: number | string;
  generalStandard: number | string;
  newStandard: number | string;
}

export interface IGradeManageTableProps {
  data?: IGradeManageTableData[];
}
