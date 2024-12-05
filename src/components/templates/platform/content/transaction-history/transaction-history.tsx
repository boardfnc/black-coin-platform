'use client';

import { useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { IconLine24Filter } from '@/components/atoms/icons/icon-line';
import { Image } from '@/components/atoms/images';
import { Pagination } from '@/components/organisms/admin/pagination';
import { cube } from '@/images/background';
import { dealingsService } from '@/services/platform/coin/dealings';
import { convertBank } from '@/utils/covert';

export default function TransactionHistory() {
  const searchParams = useSearchParams();

  const mode = searchParams.get('mode') || 1;
  const type = searchParams.get('type') || undefined;
  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 5);

  const { data, refetch } = useQuery({
    queryKey: ['dealings'],
    queryFn: () =>
      dealingsService({
        delng_se: Number(mode),
        sale_se: !!type && Number(mode) === 1 ? Number(2 + type) : undefined,
        purchase_se: !!type && Number(mode) === 2 ? Number(1 + type) : undefined,
        cancel_se: !!type && Number(mode) === 4 ? Number(type) : undefined,
        page,
        per_page: perPage,
      }),
  });

  const handleButtonClick = (newMode: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('mode', newMode.toString());
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleTypeClick = (newType: string) => {
    const params = new URLSearchParams(window.location.search);
    if (newType === 'all') {
      params.delete('type');
    } else {
      params.set('type', newType);
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    refetch();
  }, [refetch, searchParams]);

  return (
    <div className={'w-full pb-[100px]'}>
      <div className={'my-15'}>
        <div className={'pb-[30px] sm:pb-[60px]'}>
          <div className={'relative w-full h-[200px]'}>
            <Image className={'object-cover'} src={cube} alt={'home-background'} quality={100} fill />

            <div className={'absolute w-max top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'}>
              <div className={'flex flex-col justify-center items-center gap-2.5'}>
                <div className={'text-gray-100 font-suit-40-800-110 sm:font-suit-60-800-110'}>Service Name</div>

                <div className={'text-gray-100 font-suit-30-400-110'}>거래내역</div>
              </div>
            </div>
          </div>
        </div>

        <div className={'max-w-[1080px] mx-auto px-3 sm:px-0'}>
          <div className={'w-full pb-5'}>
            <div className={'h-[32px] text-gray-10 font-suit-16-b-130'}>Transaction details</div>

            <div className={'h-[60px] text-gray-10 font-suit-24-b-130 sm:font-suit-30-700-130 border-b border-gray-50'}>
              거래내역
            </div>
          </div>

          <div className={'px-4 py-2 flex justify-between items-center bg-gray-95'}>
            <div className={'text-gray-10 font-suit-15-b-130'}>전체</div>

            <button
              className={
                'flex items-center gap-1 h-[36px] text-gray-10 bg-gray-100 rounded-[18px] border border-gray-70 px-4'
              }
            >
              <IconLine24Filter />

              <div className={'font-suit-13-650-130'}>날짜 검색</div>
            </button>
          </div>

          <div className={'flex justify-between items-center pt-5'}>
            <button
              className={'h-[56px] flex-1 flex justify-center items-center text-gray-10 border font-suit-15-b-130'}
              onClick={() => handleButtonClick(1)}
            >
              구매
            </button>
            <button
              className={'h-[56px] flex-1 flex justify-center items-center text-gray-10 border font-suit-15-b-130'}
              onClick={() => handleButtonClick(2)}
            >
              판매
            </button>
            <button
              className={'h-[56px] flex-1 flex justify-center items-center text-gray-10 border font-suit-15-b-130'}
              onClick={() => handleButtonClick(3)}
            >
              전송
            </button>
            <button
              className={'h-[56px] flex-1 flex justify-center items-center text-gray-10 border font-suit-15-b-130'}
              onClick={() => handleButtonClick(4)}
            >
              취소
            </button>
          </div>

          <div className={'flex justify-start py-4 gap-1'}>
            <button
              onClick={() => handleTypeClick('all')}
              className={`h-[36px] px-4 font-suit-13-b-130 ${!type ? 'text-gray-100 bg-gray-0' : 'text-gray-50 bg-gray-95'} rounded-[20px]`}
            >
              전체
            </button>
            <button
              onClick={() => handleTypeClick('1')}
              className={`h-[36px] px-4 font-suit-13-b-130 ${type === '1' ? 'text-gray-100 bg-gray-0' : 'text-gray-50 bg-gray-95'} rounded-[20px]`}
            >
              신청
            </button>
            <button
              onClick={() => handleTypeClick('2')}
              className={`h-[36px] px-4 font-suit-13-b-130 ${type === '2' ? 'text-gray-100 bg-gray-0' : 'text-gray-50 bg-gray-95'} rounded-[20px]`}
            >
              대기
            </button>
            <button
              onClick={() => handleTypeClick('3')}
              className={`h-[36px] px-4 font-suit-13-b-130 ${type === '3' ? 'text-gray-100 bg-gray-0' : 'text-gray-50 bg-gray-95'} rounded-[20px]`}
            >
              완료
            </button>
          </div>

          {data?.data.map((item) => {
            const isReady = Number(item.delng_sttus) === 11 || Number(item.delng_sttus) === 21;
            const isWait = Number(item.delng_sttus) === 12 || Number(item.delng_sttus) === 22;
            const isComplete = Number(item.delng_sttus) === 13 || Number(item.delng_sttus) === 23;
            const isCancel = Number(item.delng_sttus) === 14 || Number(item.delng_sttus) === 24;

            const isBuyReady = Number(item.delng_se) === 1 && Number(item.delng_sttus) === 11;
            const isSellReady = Number(item.delng_se) === 2 && Number(item.delng_sttus) === 21;

            const status = (() => {
              if (isReady) return { text: '신청', style: 'text-primary-50 bg-primary-95' };
              if (isWait) {
                return {
                  text: '대기',
                  style: 'text-yellow-50 bg-gradient-to-t from-white/85 to-white/85 bg-yellow-50',
                };
              }
              if (isComplete) return { text: '완료', style: 'text-gray-0 bg-gray-95' };
              if (isCancel) return { text: '취소', style: 'text-gray-50 bg-gray-95' };
              return { text: '대기', style: 'text-gray-50 bg-gray-95' };
            })();

            return (
              <div key={item.created_at} className={'w-full max-w-2xl mx-auto p-6'}>
                <div className={'rounded-[16px] border border-line-02 overflow-hidden'}>
                  <div className={`flex justify-between items-center ${status.style} px-5 py-2`}>
                    <h2 className={`font-suit-22-b-130 ${status.style}`}>{status.text}</h2>
                    <span className={'text-gray-500 text-sm'}>신청일 {item.created_at}</span>
                  </div>

                  <div className={'space-y-3 px-5 py-3'}>
                    <div className={'flex justify-between items-center'}>
                      <span className={'text-gray-40 font-suit-14-m-130'}>구매수량</span>
                      <span className={'text-orange-orange50 font-suit-16-b-130'}>
                        {(item.delng_qy || 0).toLocaleString('ko-KR')} C
                      </span>
                    </div>

                    <div className={'flex justify-between items-center'}>
                      <span className={'text-gray-40 font-suit-14-m-130'}>입금정보</span>
                      <div className={'flex items-center gap-2'}>
                        <span className={'text-gray-10 font-suit-14-r-130'}>
                          {convertBank(item.rcpmny_bank)} ({item.rcpmny_dpstr}) | {item.rcpmny_acnutno}
                        </span>

                        <button
                          className={'h-[28px] border text-gray-10 font-suit-12-m-130 px-3 rounded-lg'}
                          onClick={() =>
                            handleCopyClick(
                              `${convertBank(item.rcpmny_bank)} (${item.rcpmny_dpstr}) ${item.rcpmny_acnutno}`,
                            )
                          }
                        >
                          <span className={'text-sm'}>복사하기</span>
                        </button>
                      </div>
                    </div>

                    <div className={'flex justify-between items-center'}>
                      <span className={'text-gray-40 font-suit-14-m-130'}>입금금액</span>
                      <span className={'text-gray-10 font-suit-16-b-130'}>
                        {(item.compt_qy || 0).toLocaleString('ko-KR')}
                      </span>
                    </div>

                    <p className={'bg-primary-99 text-gray-10 mt-4 font-suit-13-r-150'}>
                      입금 완료 시 입금 완료 버튼을 클릭해 주시면 해당 계좌가 기능하며, 입금 확인 시{' '}
                      <span className={'text-red-50 font-suit-13-b-130'}>가상계좌 운영정책 예금주가 다를 경우</span>{' '}
                      처리 반환처리 되니 반드시 확인 후 입금하시기 바랍니다.
                    </p>

                    {isBuyReady && (
                      <div className={'flex justify-center gap-4 mt-8'}>
                        <button
                          className={'px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors'}
                        >
                          입금완료
                        </button>

                        <button className={'px-8 py-3 text-red-50 hover:text-red-60 transition-colors'}>
                          신청취소
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={'flex justify-center items-center mt-14'}>
        <Pagination totalPage={10} />
      </div>
    </div>
  );
}
