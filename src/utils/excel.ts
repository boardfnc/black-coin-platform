/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from 'xlsx';

interface IExcelDownloadProps {
  headers: string[];
  data: any;
  fileName: string;
}

export const downloadExcel = ({ headers, data, fileName }: IExcelDownloadProps) => {
  const wb = XLSX.utils.book_new();

  const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);

  XLSX.utils.book_append_sheet(wb, ws, 'Sheet');
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};
