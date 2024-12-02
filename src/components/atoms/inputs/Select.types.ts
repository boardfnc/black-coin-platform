import type { SelectHTMLAttributes } from 'react';

export interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  paramsName?: string;
  options?: Array<{ value: string; label: string }>;
}
