const ROUTES = {
  ROOT: '/',
  PLATFORM: {
    ROOT: '/platform',
    LOGIN: '/platform/login',
    REGISTER: '/platform/register',
    FORGOT_AUTHOR: {
      ID: '/platform/forgot-author/id',
      PASSWORD: '/platform/forgot-author/password',
    },
    MY_PAGE: '/platform/my-page',
    MAIN: '/platform/content',
    HOME: '/platform/content/home',
    BUY: '/platform/content/buy',
    SELL: '/platform/content/sell',
    SEND: '/platform/content/send',
    TRANSACTION_HISTORY: '/platform/content/transaction-history',
  },
  ADMIN: {
    ROOT: '/admin',
    LOGIN: '/admin/login',
    MAIN: '/admin/content',
    STATISTICS: '/admin/content/statistics',
    USER_MANAGE: {
      USER_LIST: '/admin/content/user-manage/user-list',
      USER_DETAIL: (managerId: string | number) => `/admin/content/user-manage/user-list/${managerId}`,
      GENERAL_USER_LIST: '/admin/content/user-manage/general-user-list',
      GENERAL_USER_DETAIL: (memberId: string | number) => `/admin/content/user-manage/general-user-list/${memberId}`,
      WITHDRAWAL_LIST: '/admin/content/user-manage/withdrawal-list',
      SIGNUP_MANAGE: '/admin/content/user-manage/signup-manage',
      GRADE_MANAGE: '/admin/content/user-manage/grade-manage',
      GRADE_MANAGE_DETAIL: (
        uniqueId: string | number,
        params?: { type: string; VVIP: string | number; VIP: string | number; general: string | number },
      ) =>
        `/admin/content/user-manage/grade-manage/${uniqueId}${
          params ? `?type=${params.type}&VVIP=${params.VVIP}&VIP=${params.VIP}&general=${params.general}` : ''
        }`,
      MY_GRADE_MANAGE: '/admin/content/user-manage/my-grade-manage',
    },
    TRANSACTION_HISTORY: {
      CA: '/admin/content/transaction-history/ca',
      USER: '/admin/content/transaction-history/user',
      MY_TRADE: '/admin/content/transaction-history/my-trade',
    },
    COIN_MANAGE: {
      PURCHASE_CA: '/admin/content/coin-manage/purchase-ca',
      PURCHASE_GENERAL: '/admin/content/coin-manage/purchase-general',
      SALE_CA: '/admin/content/coin-manage/sale-ca',
      SALE_GENERAL: '/admin/content/coin-manage/sale-general',
      RECEIVED_HISTORY: '/admin/content/coin-manage/received-history',
      SENT_HISTORY: '/admin/content/coin-manage/sent-history',
      TRANSACTION_FEE_HISTORY: '/admin/content/coin-manage/transaction-fee-history',
      BUY_COIN: '/admin/content/coin-manage/buy-coin',
      SELL_COIN: '/admin/content/coin-manage/sell-coin',
    },
    SITE_ACCOUNT_MANAGE: {
      NOTICE: '/admin/content/site-account-manage/notice',
      ACCOUNT: '/admin/content/site-account-manage/account',
    },
    MY_PAGE: '/admin/content/my-page',
  },
};

export default ROUTES;
