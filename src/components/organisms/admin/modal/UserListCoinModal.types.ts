export interface ICoinSendData {
  memberId: number;
  coin?: number;
  mode: 'payment' | 'retrieval';
}

export interface IUserListCoinModalProps extends ICoinSendData {
  isOpen: boolean;
  onClose: () => void;
  refetch?: () => void;
}
