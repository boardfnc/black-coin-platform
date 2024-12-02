export interface ICheckboxOption {
  label: string;
  value: string;
}

export interface ICategoryOption {
  value: string;
  label: string;
  children?: ICategoryOption[];
}

export interface IFilterProps {
  date?: {
    text?: string;
    visible?: boolean;
  };
  search?: {
    visible?: boolean;
    defaultSearchType?: string;
  };
  select?: {
    text?: string;
    visible?: boolean;
    options?: Array<{ value: string; label: string }>;
  };
  range?: {
    text?: string;
    visible?: boolean;
    min?: number;
    max?: number;
    placeholder?: {
      start?: string;
      end?: string;
    };
  };
  radio?: {
    text?: string;
    visible?: boolean;
    options: Array<{ value: string; label: string }>;
  };
  category?: {
    text?: string;
    visible?: boolean;
    options: ICategoryOption[];
  };
  checkbox?: {
    text?: string;
    visible?: boolean;
    options: Array<{ value: string; label: string }>;
  };
  subCheckbox?: {
    text?: string;
    visible?: boolean;
    options: Array<{ value: string; label: string }>;
  };
}

export type TDateRangeType = {
  start?: () => number;
  end?: () => number;
};

export type TDateRangeKey =
  | 'today'
  | 'yesterday'
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth'
  | '1month'
  | '3month'
  | '6month';
