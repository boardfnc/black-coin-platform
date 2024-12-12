export const formatPhoneNumber = (phoneNumber?: string): string => {
  if (!phoneNumber) return '';

  const cleaned = phoneNumber.replace(/\D/g, '');

  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }

  return phoneNumber;
};

export const convertMemberGradeStandard = (standard: string): string => {
  const standards: Record<string, string> = {
    1: '입/출급 횟수',
    2: '입금 금액',
    3: '출금 금액',
    4: '총 거래 금액',
  };

  return standards[standard] || '알 수 없음';
};

export const convertMembershipGrade = (grade: number | string): string => {
  const grades: Record<number | string, string> = {
    0: '전체',
    1: 'VVIP',
    2: 'VIP',
    3: '일반회원',
    4: '신규회원',
  };

  return grades[grade] || '알 수 없음';
};

export const covertMemberJoinProgress = (progress: number): string => {
  const progresses: Record<number, string> = {
    0: '전체',
    2: '대기',
    3: '거절',
  };

  return progresses[progress] || '알 수 없음';
};

export const convertMembershipStatus = (status: number): string => {
  const statuses: Record<number, string> = {
    0: '전체',
    1: '정상',
    2: '차단',
  };

  return statuses[status] || '알 수 없음';
};

export const convertDealType = (type: number | string): string => {
  const types: Record<number | string, string> = {
    1: '판매',
    2: '구매',
    4: '취소',
  };

  return types[type] || '알 수 없음';
};

export const convertDealStatus = (status: number | string): string => {
  const statuses: Record<number | string, string> = {
    1: '판매',
    2: '구매',
    3: '정산',
    11: '구매신청',
    12: '구매대기',
    13: '구매완료',
    14: '구매취소',
    21: '판매신청',
    22: '판매대기',
    23: '판매완료',
    24: '판매취소',
  };

  return statuses[status] || '알 수 없음';
};

export const convertDealStatusColor = (status: number | string): string => {
  const statuses: Record<number | string, string> = {
    1: 'text-[#888B94]',
    2: 'text-[#888B94]',
    3: 'text-[#888B94]',
    11: 'text-[#0000F4]',
    12: 'text-[#F854DC]',
    13: 'text-[#888B94]',
    14: 'text-[#ff6c5c]',
    21: 'text-[#0000F4]',
    22: 'text-[#F854DC]',
    23: 'text-[#888B94]',
    24: 'text-[#ff6c5c]',
  };

  return statuses[status] || 'text-[#888B94]';
};

export const convertSaleType = (type: number | string): string => {
  const types: Record<number | string, string> = {
    1: '입금',
    2: '완료',
  };

  return types[type] || '알 수 없음';
};

export const convertBank = (bank?: string | number): string => {
  if (!bank) return '알 수 없음';

  const banks: Record<string | number, string> = {
    '002': '산업은행',
    '003': '기업은행',
    '004': 'KB국민은행',
    '005': '외환은행',
    '007': '수협은행',
    '011': '농협은행',
    '020': '우리은행',
    '023': 'SC제일은행',
    '027': '씨티은행',
    '031': '대구은행',
    '032': '부산은행',
    '034': '광주은행',
    '035': '제주은행',
    '037': '전북은행',
    '039': '경남은행',
    '045': '새마을금고연합회',
    '071': '우체국',
    '081': '하나은행',
    '088': '신한은행',
    '089': '케이뱅크',
    '090': '카카오뱅크',
    '092': '토스뱅크',
  };

  return banks[bank] || '알 수 없음';
};
