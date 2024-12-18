export interface IToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning' | 'transparent';
  duration?: number;
  isOpen?: boolean;
}

export interface IToastStore {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning' | 'transparent';
  isOpen: boolean;
  duration: number;
  setToast: (props: IToastProps) => void;
}

export interface IToastHook {
  open: (props: IToastProps) => void;
  close: () => void;
}
