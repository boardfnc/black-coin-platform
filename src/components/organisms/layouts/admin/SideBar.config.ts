import {
  IconLine24ChartUp,
  IconLine24Monitor2,
  IconLine24Receipt,
  IconLine24UserManage,
  IconLine24Wallet,
} from '@/components/atoms/icons/icon-line';
import ROUTES from '@/constants/routes';

export const superAdminSideBarMenu = [
  {
    title: '날짜 별 통계',
    icon: IconLine24ChartUp,
    path: ROUTES.ADMIN.STATISTICS,
  },
  {
    title: '회원 관리',
    icon: IconLine24UserManage,
    dropdown: [
      {
        title: 'CA 회원 목록',
        path: ROUTES.ADMIN.USER_MANAGE.USER_LIST,
      },
      {
        title: '회원 목록',
        path: ROUTES.ADMIN.USER_MANAGE.GENERAL_USER_LIST,
      },
      {
        title: '회수 회원 목록',
        path: ROUTES.ADMIN.USER_MANAGE.WITHDRAWAL_LIST,
      },
      {
        title: '회원가입 관리',
        path: ROUTES.ADMIN.USER_MANAGE.SIGNUP_MANAGE,
      },
      {
        title: '회원 등급 관리',
        path: ROUTES.ADMIN.USER_MANAGE.GRADE_MANAGE,
      },
    ],
  },
  {
    title: '거래 내역',
    icon: IconLine24Receipt,
    dropdown: [
      {
        title: 'CA 거래 내역',
        path: ROUTES.ADMIN.TRANSACTION_HISTORY.CA,
      },
      {
        title: '회원 거래 내역',
        path: ROUTES.ADMIN.TRANSACTION_HISTORY.USER,
      },
    ],
  },
  {
    title: '코인 관리',
    icon: IconLine24Wallet,
    dropdown: [
      {
        title: '코인 구매 관리 (CA)',
        path: ROUTES.ADMIN.COIN_MANAGE.PURCHASE_CA,
      },
      {
        title: '코인 구매 관리 (일반)',
        path: ROUTES.ADMIN.COIN_MANAGE.PURCHASE_GENERAL,
      },
      {
        title: '코인 판매 관리 (CA)',
        path: ROUTES.ADMIN.COIN_MANAGE.SALE_CA,
      },
      {
        title: '코인 판매 관리 (일반)',
        path: ROUTES.ADMIN.COIN_MANAGE.SALE_GENERAL,
      },
      {
        title: '받은 코인 내역',
        path: ROUTES.ADMIN.COIN_MANAGE.RECEIVED_HISTORY,
      },
      {
        title: '보낸 코인 내역',
        path: ROUTES.ADMIN.COIN_MANAGE.SENT_HISTORY,
      },
      {
        title: '거래 수수료 내역',
        path: ROUTES.ADMIN.COIN_MANAGE.TRANSACTION_FEE_HISTORY,
      },
    ],
  },
  {
    title: '사이트/계좌 관리',
    icon: IconLine24Monitor2,
    dropdown: [
      // {
      //   title: '공지사항',
      //   path: ROUTES.ADMIN.SITE_ACCOUNT_MANAGE.NOTICE,
      // },
      {
        title: '계좌 관리',
        path: ROUTES.ADMIN.SITE_ACCOUNT_MANAGE.ACCOUNT,
      },
    ],
  },
];

export const adminSideBarMenu = [
  {
    title: '날짜 별 통계',
    icon: IconLine24ChartUp,
    path: ROUTES.ADMIN.STATISTICS,
  },
  {
    title: '회원 관리',
    icon: IconLine24UserManage,
    dropdown: [
      {
        title: '회원 목록',
        path: ROUTES.ADMIN.USER_MANAGE.GENERAL_USER_LIST,
      },
      {
        title: '회수 회원 목록',
        path: ROUTES.ADMIN.USER_MANAGE.WITHDRAWAL_LIST,
      },
      {
        title: '회원 등급 관리',
        path: ROUTES.ADMIN.USER_MANAGE.MY_GRADE_MANAGE,
      },
    ],
  },
  {
    title: '내 거래 내역',
    icon: IconLine24Receipt,
    path: ROUTES.ADMIN.TRANSACTION_HISTORY.MY_TRADE,
  },
  {
    title: '내 코인 관리',
    icon: IconLine24Wallet,
    dropdown: [
      {
        title: '코인 구매',
        path: ROUTES.ADMIN.COIN_MANAGE.BUY_COIN,
      },
      {
        title: '코인 판매',
        path: ROUTES.ADMIN.COIN_MANAGE.SELL_COIN,
      },
      {
        title: '받은 코인 내역',
        path: ROUTES.ADMIN.COIN_MANAGE.RECEIVED_HISTORY,
      },
      {
        title: '보낸 코인 내역',
        path: ROUTES.ADMIN.COIN_MANAGE.SENT_HISTORY,
      },
      {
        title: '거래 수수료 내역',
        path: ROUTES.ADMIN.COIN_MANAGE.TRANSACTION_FEE_HISTORY,
      },
    ],
  },
  {
    title: '마이페이지',
    icon: IconLine24Monitor2,
    path: ROUTES.ADMIN.MY_PAGE,
  },
];
