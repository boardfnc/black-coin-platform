import type { TDateRangeKey } from './Filter.types';

export const dateRangeButtons = [
  { label: '오늘', value: 'today' },
  { label: '어제', value: 'yesterday' },
  { label: '이번 주', value: 'thisWeek' },
  { label: '지난 주', value: 'lastWeek' },
  { label: '이번 달', value: 'thisMonth' },
  { label: '지난 달', value: 'lastMonth' },
  { label: '1개월', value: '1month' },
  { label: '3개월', value: '3month' },
  { label: '6개월', value: '6month' },
] satisfies Array<{ label: string; value: TDateRangeKey }>;
