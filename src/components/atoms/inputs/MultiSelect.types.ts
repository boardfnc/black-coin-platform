interface IOption {
  value: string;
  label: string;
}

export interface IMultiSelectProps {
  options: IOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  className?: string;
}
