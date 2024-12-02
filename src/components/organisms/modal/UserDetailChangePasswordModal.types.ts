export interface IUserDetailChangePasswordModalProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  isMyProfile?: boolean;
}
