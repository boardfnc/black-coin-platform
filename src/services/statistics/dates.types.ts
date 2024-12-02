import type { IBaseWithPageResponse } from '../_fetch/types';

export interface IDatesRequest {
  stats_de_start?: string;
  stats_de_end?: string;
  page: number;
  per_page: number;
  orderby?: Array<'stats_de'>;
}

export interface IDatesResponse extends IBaseWithPageResponse {
  data: Array<{
    ca_stats_id: number;
    mngr_id: number;
    stats_de: string;
    purchs_co: number;
    purchs_qy: number;
    sle_co: number;
    sle_qy: number;
    rirvl_qy: number;
    hold_qy: number;
    csby_fee_am: number;
    purchs_fee_am: number;
    sle_fee_am: number;
  }>;
}
