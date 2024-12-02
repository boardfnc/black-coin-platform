import { EStatusCode } from '@/services/_fetch/types';

function covertStatusCode(statusCode: number | string) {
  return typeof statusCode === 'string' ? statusCode : String(statusCode);
}

export const isUnauthorizedError = (statusCode: number | string) => {
  const code = covertStatusCode(statusCode);

  return code === EStatusCode.토큰_로그인이_되어있지_않음;
};

export const isAccessTokenError = (statusCode: number | string) => {
  const code = covertStatusCode(statusCode);

  return (
    code === EStatusCode.토큰_엑세스_만료 ||
    code === EStatusCode.토큰_세션_만료 ||
    code === EStatusCode.토큰_리플레시_토큰_만료 ||
    code === EStatusCode.토큰_기타_오류 ||
    code === EStatusCode.토큰_액세스_토큰_불일치 ||
    code === EStatusCode.토큰_로그인이_되어있지_않음
  );
};

export const isRefreshTokenError = (statusCode: number | string) => {
  const code = covertStatusCode(statusCode);

  return (
    code === EStatusCode.토큰이_올바르지_않음 ||
    code === EStatusCode.리프레시_토큰_불일치 ||
    code === EStatusCode.리프레시_토큰_앱_키_값이_다를_때 ||
    code === EStatusCode.리프레시_토큰_IP_불일치 ||
    code === EStatusCode.리프레시_토큰_수정_불가능 ||
    code === EStatusCode.리프레시_토큰_수정_불가능_기타 ||
    code === EStatusCode.리프레시_토큰_발급_실패
  );
};
