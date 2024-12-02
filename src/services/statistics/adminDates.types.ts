import type { IBaseWithPageResponse } from '../_fetch/types';

export interface IAdminDatesRequest {
  stats_de_start?: string;
  stats_de_end?: string;
  search_type?: 'prtnr_nm' | 'code';
  search_keyword?: string;
  page: number;
  per_page: number;
  orderby?: Array<'stats_de'>;
}

export interface IAdminDatesResponse extends IBaseWithPageResponse {
  data: Array<{
    ca_stats_id: number;
    mngr_id: number;
    prtnr_nm: string;
    code: string;
    stats_de: string;
    purchs_co: number;
    hold_qy: number;
    purchs_qy: number;
    sle_co: number;
    sle_qy: number;
    rirvl_qy: number;
    csby_fee_am: number;
    purchs_fee_am: number;
    sle_fee_am: number;
  }>;
}
