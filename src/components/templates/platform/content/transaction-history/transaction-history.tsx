/* eslint-disable default-case */
'use client';

import 'react-datepicker/dist/react-datepicker.css';

import { useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';

import { IconLine24ArrowReturn, IconLine24Calendar, IconLine24Filter } from '@/components/atoms/icons/icon-line';
import { Image } from '@/components/atoms/images';
import { Pagination } from '@/components/organisms/admin/pagination';
import { useToast } from '@/hooks';
import { cube } from '@/images/background';
import { userInformationShowQueryKey } from '@/services/platform/auth/user.query';
import { dealingsService } from '@/services/platform/coin/dealings';
import { exchangeCheckQueryKey } from '@/services/platform/coin/exchange.query';
import { purchaseCancelService, purchaseCompletionService } from '@/services/platform/coin/purchase';
import { saleCancelService } from '@/services/platform/coin/sale';
import { accountShowQueryKey } from '@/services/platform/my-page/account.query';
import { convertBank } from '@/utils/covert';

export default function TransactionHistory() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const mode = searchParams.get('mode') || 2;
  const type = searchParams.get('type') || undefined;
  const page = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('view') ?? 5);
  const startDateParam = searchParams.get('startDate') || undefined;
  const endDateParam = searchParams.get('endDate') || undefined;

  const { open: openToast } = useToast();
  const { data, refetch } = useQuery({
    queryKey: ['dealings'],
    queryFn: () =>
      dealingsService({
        created_at_start: startDateParam,
        created_at_end: endDateParam,
        delng_se: Number(mode),
        sale_se: !!type && Number(mode) === 1 ? Number(2 + type) : undefined,
        purchase_se: !!type && Number(mode) === 2 ? Number(1 + type) : undefined,
        cancel_se: !!type && Number(mode) === 4 ? Number(type) : undefined,
        page,
        per_page: perPage,
      }),
  });

  const { mutate: purchaseCancelMutate } = useMutation({
    mutationFn: (id: number) => purchaseCancelService({ id }),
    onSuccess(data) {
      if (data != null) {
        if (!data.status) throw new Error(data.message);

        refetch();

        queryClient.invalidateQueries({ queryKey: userInformationShowQueryKey });
        queryClient.invalidateQueries({ queryKey: accountShowQueryKey });
        queryClient.invalidateQueries({ queryKey: exchangeCheckQueryKey });
      }
    },
  });

  const { mutate: purchaseCompleteMutate } = useMutation({
    mutationFn: (id: number) => purchaseCompletionService({ id }),
    onSuccess(data) {
      if (data != null) {
        if (!data.status) throw new Error(data.message);

        refetch();

        queryClient.invalidateQueries({ queryKey: userInformationShowQueryKey });
        queryClient.invalidateQueries({ queryKey: accountShowQueryKey });
        queryClient.invalidateQueries({ queryKey: exchangeCheckQueryKey });
      }
    },
  });

  const { mutate: saleCancelMutate } = useMutation({
    mutationFn: (id: number) => saleCancelService({ id }),
    onSuccess(data) {
      if (data != null) {
        if (!data.status) throw new Error(data.message);

        refetch();

        queryClient.invalidateQueries({ queryKey: userInformationShowQueryKey });
        queryClient.invalidateQueries({ queryKey: accountShowQueryKey });
        queryClient.invalidateQueries({ queryKey: exchangeCheckQueryKey });
      }
    },
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

    openToast({ message: '계좌 복사 성공!' });
  };

  const handlePurchaseCompleteClick = (id: number) => {
    purchaseCompleteMutate(id);
  };

  const handleSaleCancelClick = (type: 'sell' | 'buy', id: number) => {
    if (type === 'sell') saleCancelMutate(id);
    else purchaseCancelMutate(id);
  };

  useEffect(() => {
    refetch();
  }, [refetch, searchParams]);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [startDate, setStartDate] = useState<Date | undefined>(() => {
    const startParam = searchParams.get('startDate');
    return startParam ? new Date(startParam) : undefined;
  });

  const [endDate, setEndDate] = useState<Date | undefined>(() => {
    const endParam = searchParams.get('endDate');
    return endParam ? new Date(endParam) : undefined;
  });

  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search);

    if (startDate && endDate) {
      params.set('startDate', startDate.toISOString().split('T')[0]);
      params.set('endDate', endDate.toISOString().split('T')[0]);
    } else {
      params.delete('startDate');
      params.delete('endDate');
    }

    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    setIsCalendarOpen(false);
  };

  const handleDateReset = () => {
    setStartDate(undefined);
    setEndDate(undefined);

    const params = new URLSearchParams(window.location.search);
    params.delete('startDate');
    params.delete('endDate');
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleDateButton = (period: string) => {
    const today = new Date();
    const start = new Date();

    const periodAdjustments: Record<string, () => void> = {
      '1주일': () => start.setDate(today.getDate() - 7),
      '1개월': () => start.setMonth(today.getMonth() - 1),
      '3개월': () => start.setMonth(today.getMonth() - 3),
      '6개월': () => start.setMonth(today.getMonth() - 6),
      '1년': () => start.setFullYear(today.getFullYear() - 1),
    };
    const adjustStartDate = periodAdjustments[period];
    if (adjustStartDate) {
      adjustStartDate();
    }

    setStartDate(start);
    setEndDate(today);

    const params = new URLSearchParams(window.location.search);
    params.set('startDate', start.toISOString().split('T')[0]);
    params.set('endDate', today.toISOString().split('T')[0]);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className={'w-full pb-[100px]'}>
      <div className={'my-15'}>
        <div className={'pb-[30px] sm:pb-[60px]'}>
          <div className={'relative w-full h-[200px]'}>
            <Image className={'object-cover'} src={cube} alt={'home-background'} quality={100} fill />

            <div className={'absolute w-max top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'}>
              <div className={'flex flex-col justify-center items-center gap-2.5'}>
                <div className={'text-gray-100 font-suit-40-800-110 sm:font-suit-60-800-110'}>Black Coin</div>

                <div className={'text-gray-100 font-suit-30-400-110'}>거래내역</div>
              </div>
            </div>
          </div>
        </div>

        <div className={'max-w-[1080px] mx-auto px-3 sm:px-0'}>
          <div className={'w-full pb-5'}>
            <div className={'h-8 text-gray-10 font-suit-16-b-130'}>Transaction details</div>

            <div className={'h-[60px] text-gray-10 font-suit-24-b-130 sm:font-suit-30-700-130 border-b border-gray-50'}>
              거래내역
            </div>
          </div>

          <div className={'px-4 py-2 flex justify-between items-center bg-gray-95'}>
            <div className={'text-gray-10 font-suit-15-b-130'}>
              {(startDateParam == null || endDateParam == null) && <>전체</>}

              {startDateParam != null && endDateParam != null && (
                <div className={'flex flex-row gap-1'}>
                  <span className={'text-gray-40 font-suit-13-m-130'}>검색기간</span>
                  {startDateParam.replaceAll('-', '.')} ~ {endDateParam.replaceAll('-', '.')}
                </div>
              )}
            </div>

            <div className={'relative'}>
              <button
                className={`flex items-center gap-1 h-9 text-gray-10 bg-gray-100 rounded-[18px] border border-gray-70 px-4 ${
                  startDateParam == null && endDateParam == null ? 'text-gray-0' : 'border-primary-50 text-primary-50'
                }`}
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              >
                <IconLine24Filter />
                <div
                  className={`font-suit-13-650-130 ${startDateParam == null && endDateParam == null ? 'text-gray-0' : 'text-primary-50'}`}
                >
                  {startDateParam == null && endDateParam == null ? (
                    '날짜 검색'
                  ) : (
                    <div className={'flex flex-row gap-1'}>
                      <span className={'hidden sm:block'}>날짜</span> 재설정
                    </div>
                  )}
                </div>
              </button>

              {isCalendarOpen && (
                <div
                  className={`
                    fixed inset-0 z-50 lg:static lg:inset-auto
                    lg:absolute lg:right-0 lg:top-[44px]
                    bg-white
                    lg:rounded-3xl lg:shadow-[0px_4px_10px_0px_rgba(0,0,0,0.12)]
                    transition-transform duration-300 ease-in-out
                    ${isCalendarOpen ? 'translate-y-0' : 'translate-y-full'}
                    lg:translate-y-0
                    lg:w-auto lg:h-auto
                    flex flex-col
                  `}
                >
                  <div className={'flex-1 overflow-y-auto px-4 py-4'}>
                    <div className={'h-9 flex flex-row justify-start gap-1 whitespace-pre mb-4'}>
                      <button
                        className={'h-9 px-4 rounded-[20px] text-gray-50 bg-gray-95 font-suit-13-650-130'}
                        onClick={() => handleDateButton('1주일')}
                      >
                        1주일
                      </button>
                      <button
                        className={'h-9 px-4 rounded-[20px] text-gray-50 bg-gray-95 font-suit-13-650-130'}
                        onClick={() => handleDateButton('1개월')}
                      >
                        1개월
                      </button>
                      <button
                        className={'h-9 px-4 rounded-[20px] text-gray-50 bg-gray-95 font-suit-13-650-130'}
                        onClick={() => handleDateButton('3개월')}
                      >
                        3개월
                      </button>
                      <button
                        className={'h-9 px-4 rounded-[20px] text-gray-50 bg-gray-95 font-suit-13-650-130'}
                        onClick={() => handleDateButton('6개월')}
                      >
                        6개월
                      </button>
                      <button
                        className={'h-9 px-4 rounded-[20px] text-gray-50 bg-gray-95 font-suit-13-650-130'}
                        onClick={() => handleDateButton('1년')}
                      >
                        1년
                      </button>
                    </div>

                    <div>
                      <span className={'text-gray-50 font-suit-14-m-130'}>시작일/종료일</span>

                      <div
                        className={'flex justify-between items-center gap-2 mb-4 border border-gray-80 p-3 rounded-xl'}
                      >
                        <div className={'flex flex-row gap-[6px] items-center'}>
                          <IconLine24Calendar />
                          <span className={'text-gray-50 font-suit-13-r-130'}>
                            {dayjs(startDate).format('YYYY-MM-DD')}
                          </span>
                        </div>
                        <span className={'text-gray-50 font-suit-13-r-130'}>~</span>
                        <div className={'flex flex-row gap-[6px] items-center'}>
                          <IconLine24Calendar />
                          <span className={'text-gray-50 font-suit-13-r-130'}>
                            {dayjs(endDate).format('YYYY-MM-DD')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={'range-picker'}>
                      <DatePicker
                        selected={startDate}
                        onChange={(dates) => {
                          const [start, end] = dates;
                          setStartDate(start || undefined);
                          setEndDate(end || undefined);
                        }}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                        locale={ko}
                        dateFormat={'yyyy-MM-dd'}
                        maxDate={new Date()}
                        renderCustomHeader={({
                          date,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled,
                        }) => (
                          <div className={'flex justify-center items-center gap-4 py-3'}>
                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                              <span>
                                <svg
                                  xmlns={'http://www.w3.org/2000/svg'}
                                  width={'24'}
                                  height={'24'}
                                  viewBox={'0 0 24 24'}
                                  fill={'none'}
                                >
                                  <path
                                    d={'M15 7L10.3828 10.8477C9.66317 11.4474 9.66317 12.5526 10.3828 13.1523L15 17'}
                                    stroke={prevMonthButtonDisabled ? '#A0A3AA' : '#28282A'}
                                    strokeWidth={'1.5'}
                                    strokeLinecap={'round'}
                                    strokeLinejoin={'round'}
                                  />
                                </svg>
                              </span>
                            </button>

                            <div className={'flex flex-row gap-6 text-center font-pre-20-b-130 text-gray-10'}>
                              <span>{`${date.getFullYear()}`}</span>
                              <span>{`${String(date.getMonth() + 1).padStart(2, '0')}`}</span>
                            </div>

                            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                              <span>
                                <svg
                                  xmlns={'http://www.w3.org/2000/svg'}
                                  width={'24'}
                                  height={'24'}
                                  viewBox={'0 0 24 24'}
                                  fill={'none'}
                                >
                                  <path
                                    d={'M9 7L13.6172 10.8477C14.3368 11.4474 14.3368 12.5526 13.6172 13.1523L9 17'}
                                    stroke={nextMonthButtonDisabled ? '#A0A3AA' : '#28282A'}
                                    strokeWidth={'1.5'}
                                    strokeLinecap={'round'}
                                    strokeLinejoin={'round'}
                                  />
                                </svg>
                              </span>
                            </button>
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  <div
                    className={`
                    fixed bottom-0 left-0 right-0 lg:static
                    flex justify-between gap-2 p-4
                    border-t border-gray-80
                    bg-white
                    safe-area-bottom
                  `}
                  >
                    <button
                      className={`
                        h-12 px-4 py-2 rounded-[60px] text-gray-10 border border-gray-10 font-suit-16-m-130 
                        flex flex-row gap-[6px] items-center justify-center flex-1 lg:flex-none
                        ${!startDate ? 'text-gray-50 !border-gray-80 cursor-not-allowed' : ''}
                      `}
                      onClick={handleDateReset}
                      disabled={!startDate}
                    >
                      <IconLine24ArrowReturn />
                      날짜 재설정
                    </button>

                    <button
                      className={`
                        h-12 px-4 py-2 rounded-[60px] text-gray-100 bg-gray-0 font-suit-16-b-130
                        flex-1 lg:flex-none
                        ${!(startDate && endDate) ? 'bg-gray-80 cursor-not-allowed' : ''}
                      `}
                      onClick={() => {
                        handleSearch();
                        setIsCalendarOpen(false);
                      }}
                      disabled={!(startDate && endDate)}
                    >
                      선택완료
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={'flex justify-between items-center pt-5'}>
            <button
              className={`h-14 flex-1 flex justify-center items-center border ${Number(mode) === 2 ? 'bg-white text-gray-900 border-b-0 border-gray-900' : 'text-gray-400 border-e-0 border-b border-gray-200 border-b-gray-900'}`}
              onClick={() => handleButtonClick(2)}
            >
              구매
            </button>
            <button
              className={`h-14 flex-1 flex justify-center items-center border ${Number(mode) === 1 ? 'bg-white text-gray-900 border-b-0 border-gray-900' : 'text-gray-400 border-e-0 border-b border-gray-200 border-b-gray-900'}`}
              onClick={() => handleButtonClick(1)}
            >
              판매
            </button>
            <button
              className={`h-14 flex-1 flex justify-center items-center border ${Number(mode) === 3 ? 'bg-white text-gray-900 border-b-0 border-gray-900' : 'text-gray-400 border-e-0 border-b border-gray-200 border-b-gray-900'}`}
              onClick={() => handleButtonClick(3)}
            >
              전송
            </button>
            <button
              className={`h-14 flex-1 flex justify-center items-center border ${Number(mode) === 4 ? 'bg-white text-gray-900 border-b-0 border-gray-900' : 'text-gray-400 border-b border-gray-200 border-b-gray-900'}`}
              onClick={() => handleButtonClick(4)}
            >
              취소
            </button>
          </div>

          <div className={'flex justify-start py-4 gap-1'}>
            {Number(mode) === 4 && (
              <>
                <button
                  onClick={() => handleTypeClick('all')}
                  className={`h-9 px-4 font-suit-13-b-130 ${!type ? 'text-gray-100 bg-gray-0' : 'text-gray-50 bg-gray-95'} rounded-[20px]`}
                >
                  전체
                </button>
                <button
                  onClick={() => handleTypeClick('2')}
                  className={`h-9 px-4 font-suit-13-b-130 ${type === '2' ? 'text-gray-100 bg-gray-0' : 'text-gray-50 bg-gray-95'} rounded-[20px]`}
                >
                  구매
                </button>
                <button
                  onClick={() => handleTypeClick('1')}
                  className={`h-9 px-4 font-suit-13-b-130 ${type === '1' ? 'text-gray-100 bg-gray-0' : 'text-gray-50 bg-gray-95'} rounded-[20px]`}
                >
                  판매
                </button>
              </>
            )}

            {Number(mode) === 3 && (
              <>
                <button
                  onClick={() => handleTypeClick('all')}
                  className={`h-9 px-4 font-suit-13-b-130 ${!type ? 'text-gray-100 bg-gray-0' : 'text-gray-50 bg-gray-95'} rounded-[20px]`}
                >
                  전체
                </button>

                <button
                  onClick={() => handleTypeClick('2')}
                  className={`h-9 px-4 font-suit-13-b-130 ${type === '2' ? 'text-gray-100 bg-gray-0' : 'text-gray-50 bg-gray-95'} rounded-[20px]`}
                >
                  대기
                </button>
                <button
                  onClick={() => handleTypeClick('3')}
                  className={`h-9 px-4 font-suit-13-b-130 ${type === '3' ? 'text-gray-100 bg-gray-0' : 'text-gray-50 bg-gray-95'} rounded-[20px]`}
                >
                  완료
                </button>
              </>
            )}

            {(Number(mode) === 1 || Number(mode) === 2) && (
              <>
                <button
                  onClick={() => handleTypeClick('all')}
                  className={`h-9 px-4 font-suit-13-b-130 ${!type ? 'text-gray-100 bg-gray-0' : 'text-gray-50 bg-gray-95'} rounded-[20px]`}
                >
                  전체
                </button>
                <button
                  onClick={() => handleTypeClick('1')}
                  className={`h-9 px-4 font-suit-13-b-130 ${type === '1' ? 'text-gray-100 bg-gray-0' : 'text-gray-50 bg-gray-95'} rounded-[20px]`}
                >
                  신청
                </button>
                <button
                  onClick={() => handleTypeClick('2')}
                  className={`h-9 px-4 font-suit-13-b-130 ${type === '2' ? 'text-gray-100 bg-gray-0' : 'text-gray-50 bg-gray-95'} rounded-[20px]`}
                >
                  대기
                </button>
                <button
                  onClick={() => handleTypeClick('3')}
                  className={`h-9 px-4 font-suit-13-b-130 ${type === '3' ? 'text-gray-100 bg-gray-0' : 'text-gray-50 bg-gray-95'} rounded-[20px]`}
                >
                  완료
                </button>
              </>
            )}
          </div>

          {data?.data?.map((item) => {
            const isReady = Number(item.delng_sttus) === 11 || Number(item.delng_sttus) === 21;
            const isWait = Number(item.delng_sttus) === 12 || Number(item.delng_sttus) === 22;
            const isComplete = Number(item.delng_sttus) === 13 || Number(item.delng_sttus) === 23;
            const isCancel = Number(item.delng_sttus) === 14 || Number(item.delng_sttus) === 24;

            const isBuy = Number(item.delng_se) === 2;
            const isSell = Number(item.delng_se) === 1;

            const isBuyReady = isBuy && isReady;
            const isBuyWait = isBuy && isWait;
            const isSellReady = isSell && isReady;
            const isSellWait = isSell && isWait;

            const { header } = (() => {
              if (isReady) {
                return {
                  header: { text: '신청', textStyle: 'text-primary-50', headerStyle: 'bg-primary-95' },
                };
              }
              if (isComplete) {
                return { header: { text: '완료', textStyle: 'text-gray-0', headerStyle: 'bg-gray-95' } };
              }
              if (isCancel) {
                return {
                  header: {
                    text: '거래취소',
                    textStyle: 'text-red-50',
                    headerStyle: 'bg-gray-100 border-b border-gray-80',
                  },
                };
              }
              return {
                header: {
                  text: '대기',
                  textStyle: 'text-yellow-40',
                  headerStyle: 'bg-gradient-to-t from-white/85 to-white/85 bg-yellow-50',
                },
              };
            })();

            return (
              <div key={item.created_at} className={'w-full mx-auto pt-4 pb-[30px]'}>
                <div className={'rounded-2xl border border-line-02 overflow-hidden'}>
                  <div className={`flex justify-between items-center ${header.headerStyle} px-5 py-2`}>
                    <h2 className={`font-suit-22-b-130 ${header.textStyle}`}>{header.text}</h2>

                    {Number(mode) !== 4 && <span className={'text-gray-500 text-sm'}>신청일 {item.created_at}</span>}
                  </div>

                  <div className={'space-y-3 px-5 py-3'}>
                    {Number(mode) === 4 && (
                      <>
                        <div className={'flex justify-between items-center'}>
                          <span className={'text-gray-40 font-suit-14-m-130'}>거래구분</span>
                          <span className={'text-gray-10 font-suit-15-b-130'}>{isSell ? '판매' : '구매'}</span>
                        </div>

                        <div className={'flex justify-between items-center'}>
                          <span className={'text-gray-40 font-suit-14-m-130'}>거래신청일</span>
                          <span className={'text-gray-30 font-suit-15-m-130'}>{item.created_at}</span>
                        </div>

                        <div className={'flex justify-between items-center'}>
                          <span className={'text-gray-40 font-suit-14-m-130'}>취소요청일</span>
                          <span className={'text-gray-30 font-suit-15-m-130'}>{item.cancl_req_dd}</span>
                        </div>

                        <div className={'flex justify-between items-center'}>
                          <span className={'text-gray-40 font-suit-14-m-130'}>취소수량</span>
                          <span
                            className={`text-gray-10 font-suit-16-b-130 ${isBuy ? 'text-orange-orange50' : 'text-secondary-pink50'}`}
                          >
                            {(item.delng_qy || 0).toLocaleString('ko-KR')} C
                          </span>
                        </div>
                      </>
                    )}

                    {Number(mode) !== 4 && (
                      <>
                        <div className={'flex justify-between items-center'}>
                          <span className={'text-gray-40 font-suit-14-m-130'}>{isSell ? '판매' : '구매'}수량</span>
                          <span
                            className={`${isSell ? 'text-secondary-pink50' : 'text-orange-orange50'} font-suit-16-b-130`}
                          >
                            {(item.delng_qy || 0).toLocaleString('ko-KR')} C
                          </span>
                        </div>

                        <div className={'flex justify-between items-center'}>
                          <span className={'text-gray-40 font-suit-14-m-130'}>{isSell ? '계좌정보' : '입금정보'}</span>
                          <div className={'flex items-center gap-2'}>
                            <span className={'text-gray-10 font-suit-14-r-130'}>
                              {convertBank(item.rcpmny_bank || item.bank)} ({item.rcpmny_dpstr || item.dpstr}) |{' '}
                              {item.rcpmny_acnutno || item.acnutno}
                            </span>

                            {isBuy && (
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
                            )}
                          </div>
                        </div>

                        <div className={'flex justify-between items-center'}>
                          <span className={'text-gray-40 font-suit-14-m-130'}>{isSell ? '전송금액' : '입금금액'}</span>
                          <span className={'text-gray-10 font-suit-16-b-130'}>
                            {(item.compt_qy || 0).toLocaleString('ko-KR')}
                          </span>
                        </div>
                      </>
                    )}

                    {isBuyReady && (
                      <p className={'bg-primary-99 text-gray-10 mt-4 font-suit-13-r-150 p-3'}>
                        입금 완료 시 입금 완료 버튼을 클릭해 주시면 해당 계좌가 기능하며, 입금 확인 시{' '}
                        <span className={'text-red-50 font-suit-13-b-130'}>가상계좌 운영정책 예금주가 다를 경우</span>{' '}
                        처리 반환처리 되니 반드시 확인 후 입금하시기 바랍니다.
                      </p>
                    )}

                    {isSellReady && (
                      <p className={'bg-primary-99 text-gray-10 mt-4 font-suit-13-r-150 p-3'}>
                        입금시{' '}
                        <span className={'text-red-50 font-suit-13-b-130'}>
                          기재한 은행정보와 예금주가 다를 경우 반환처리
                        </span>{' '}
                        되니 반드시 확인 후 입금해주시기 바랍니다.
                      </p>
                    )}

                    {(isBuyWait || isSellWait) && (
                      <p className={'bg-primary-99 text-gray-10 mt-4 font-suit-13-r-150 p-3'}>
                        대기상태일 경우 신청 취소가 불가능하며, 입금 내역 확인 시
                        <span className={'text-red-50 font-suit-13-b-130'}>
                          기재한 은행정보와 예금주가 다를 경우 반환처리
                        </span>{' '}
                        되니 반드시 확인 후 입금해주시기 바랍니다.
                      </p>
                    )}

                    {isBuyReady && (
                      <div className={'flex justify-end gap-4 mt-8'}>
                        <button
                          className={
                            'flex items-center justify-center w-[200px] h-10 px-8 py-3 rounded-xl text-gray-100 bg-gray-0 hover:bg-gray-800 transition-colors font-suit-14-m-130'
                          }
                          onClick={() => handlePurchaseCompleteClick(item.mber_delng_dtls_id)}
                        >
                          입금완료
                        </button>

                        <button
                          className={
                            'flex items-center justify-center w-[200px] h-10 px-8 py-3 rounded-xl text-red-50 bg-gray-100 border border-gray-80 hover:text-red-60 transition-colors font-suit-14-m-130'
                          }
                          onClick={() => handleSaleCancelClick(isSell ? 'sell' : 'buy', item.mber_delng_dtls_id)}
                        >
                          신청취소
                        </button>
                      </div>
                    )}

                    {isSellReady && (
                      <div className={'flex justify-end gap-4 mt-8'}>
                        <button
                          className={
                            'flex items-center justify-center w-[200px] h-10 rounded-xl border border-gray-80 px-8 py-3 text-red-50 hover:text-red-60 transition-colors font-suit-14-m-130'
                          }
                        >
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
        <Pagination totalPage={data?.pagination?.total_pages || 1} />
      </div>
    </div>
  );
}
