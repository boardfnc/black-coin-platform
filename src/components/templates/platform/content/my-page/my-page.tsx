'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { IconLine24Headset, IconLine24SavingMoney, IconLine24SquareInfo } from '@/components/atoms/icons/icon-line';
import { PasswordModal, PhoneNumberModal } from '@/components/organisms/platform/modal';
import { accountShowService } from '@/services/platform/my-page/account';
import { accountShowQueryKey } from '@/services/platform/my-page/account.query';
import { convertBank } from '@/utils/covert';

export default function MyPage() {
  const { data } = useQuery({
    queryKey: accountShowQueryKey,
    queryFn: () => accountShowService(),
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPhoneNumberModalOpen, setIsPhoneNumberModalOpen] = useState(false);

  return (
    <div className={'w-full pt-[40px] pb-[100px]'}>
      <div className={'my-15'}>
        <div className={'max-w-[1080px] mx-auto px-3 sm:px-0'}>
          <div className={'h-[32px] text-gray-10 font-suit-16-b-130'}>My page</div>
          <div className={'h-[60px] text-gray-10 font-suit-30-700-130'}>마이페이지</div>

          <div className={'grid grid-cols-1 lg:grid-cols-3 gap-8'}>
            {/* 왼쪽 섹션 */}
            <div className={'lg:col-span-2'}>
              <div className={'border border-gray-80 rounded-2xl p-[30px]'}>
                <div className={'text-gray-10 font-suit-20-b-130'}>환영합니다! {data?.data.login_id}님</div>

                <div className={'pt-5 space-y-5'}>
                  {/* 사용자 정보 */}
                  <div className={'flex flex-col gap-2.5'}>
                    <span className={'text-gray-40 font-suit-14-m-130'}>사용자 정보</span>
                    <div className={'flex gap-4'}>
                      <div className={'w-[128px] h-[128px] bg-gray-95 rounded-[44px] relative'}>
                        <button
                          className={
                            'absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border border-gray-80 flex items-center justify-center'
                          }
                        >
                          <span>+</span>
                        </button>
                      </div>
                      <div className={'flex-1 space-y-4'}>
                        <div className={'flex flex-col gap-1'}>
                          <span className={'text-gray-40 text-sm'}>아이디(수정불가)</span>
                          <input
                            className={
                              'w-full h-[40px] px-4 rounded-xl bg-gray-90 border border-gray-80 font-suit-16-r-130'
                            }
                            placeholder={data?.data.login_id}
                            readOnly
                          />
                        </div>
                        <div className={'flex flex-col gap-1'}>
                          <div className={'flex items-center gap-1'}>
                            <span className={'text-gray-40 text-sm'}>비밀번호</span>
                            <span className={'text-red-500'}>*</span>
                          </div>
                          <div className={'flex gap-2 items-center'}>
                            <input
                              type={'password'}
                              className={
                                'flex-1 h-[40px] px-4 rounded-xl bg-gray-90 border border-gray-80 font-suit-16-r-130'
                              }
                              value={'●●●●●●●●'}
                              readOnly
                            />
                            <button
                              className={'px-3 w-[70px] h-[32px] bg-gray-0 text-gray-100 rounded-xl font-suit-13-m-130'}
                              onClick={() => setIsPasswordModalOpen(true)}
                            >
                              변경하기
                            </button>
                          </div>
                        </div>
                        <div className={'flex flex-col gap-1'}>
                          <span className={'text-gray-40 text-sm'}>연락처</span>
                          <div className={'flex gap-2 items-center'}>
                            <input
                              className={
                                'flex-auto w-[120px] h-[40px] px-4 rounded-xl bg-gray-90 border border-gray-80 font-suit-16-r-130 text-center '
                              }
                              value={'010'}
                              readOnly
                            />
                            <span className={'flex items-center'}>-</span>
                            <input
                              className={
                                'flex-auto w-[120px] h-[40px] px-4 rounded-xl bg-gray-90  border border-gray-80 font-suit-16-r-130 text-center'
                              }
                              value={'1234'}
                              readOnly
                            />
                            <span className={'flex items-center'}>-</span>
                            <input
                              className={
                                'flex-auto w-[120px] h-[40px] px-4 rounded-xl border border-gray-80 font-suit-16-r-130 text-center bg-gray-90'
                              }
                              value={'5678'}
                              readOnly
                            />

                            <button
                              className={'px-3 w-[70px] h-[32px] bg-gray-0 text-gray-100 rounded-xl font-suit-13-m-130'}
                              onClick={() => setIsPhoneNumberModalOpen(true)}
                            >
                              변경하기
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 계좌 정보 */}
                  <div className={'flex flex-col gap-6'}>
                    <span className={'text-gray-40 font-suit-14-m-130 px-1 py-[7px]'}>계좌 정보</span>
                    <div className={'flex items-center gap-1.5 py-2 px-[10px] bg-orange-50/10 rounded-xl'}>
                      <span className={'text-orange-500'}>
                        <IconLine24SquareInfo />
                      </span>
                      <span className={'text-gray-0 rounded-lg bg-primary-99 font-suit-13-400-130'}>
                        계좌정보 변경을 원하실 경우 고객센터로 연락해주세요.
                      </span>
                    </div>
                    <div className={'grid grid-cols-2 gap-x-5 gap-y-3'}>
                      <div>
                        <span className={'text-gray-40 text-sm block'}>은행명</span>
                        <div className={'h-[48px] border-b border-gray-80 font-suit-16-r-130 flex items-center'}>
                          {convertBank(data?.data.bank)}
                        </div>
                      </div>
                      <div>
                        <span className={'text-gray-40 text-sm block'}>예금주</span>
                        <div className={'h-[48px] border-b border-gray-80 font-suit-16-r-130 flex items-center'}>
                          {data?.data.nm}
                        </div>
                      </div>
                      <div className={'col-span-2'}>
                        <span className={'text-gray-40 text-sm block'}>계좌번호</span>
                        <div className={'h-[48px] border-b border-gray-80 font-suit-16-r-130 flex items-center'}>
                          {data?.data.acnutno}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 서비스 섹션 */}
              <div className={'bg-white rounded-2xl p-8 mt-8 border border-gray-80'}>
                <div className={'text-gray-40 font-suit-14-m-130 mb-4'}>서비스</div>
                <button className={'flex items-center gap-2 text-gray-0'}>
                  <span className={'w-5 h-5 flex items-center justify-center text-gray-0'}>
                    <IconLine24Headset />
                  </span>
                  고객센터
                </button>
              </div>
            </div>

            {/* 오른쪽 MY WALLET 섹션 */}
            <div className={'w-[360px] h-auto'}>
              <div className={'rounded-2xl border border-gray-80 pt-2 px-4 pb-4'}>
                <div className={'h-[56px] flex items-center text-gray-10 font-suit-20-b-130'}>MY WALLET</div>
                <div className={'flex gap-[6px] justify-between items-center border-b border-gray-20'}>
                  <div className={'h-[56px] flex items-center gap-1'}>
                    <IconLine24SavingMoney className={'text-yellow-50'} />
                    <span className={'font-suit-16-b-130 text-gray-10'}>보유 수량</span>
                  </div>

                  <span className={'flex gap-[2px] text-orange-500 text-xl font-bold'}>
                    <span>{data?.data?.hold_coin.toLocaleString('ko-KR')}</span>
                    <span>C</span>
                  </span>
                </div>

                <div>
                  <div className={'font-suit-14-m-130 text-gray-40 px-1 py-5'}>거래내역</div>
                  <div className={'flex items-center py-4'}>
                    <div className={'flex-1 text-center h-[48px]'}>
                      <div className={'font-suit-20-750-130 text-gray-10'}>{data?.data.purchase_count}</div>
                      <div className={'font-suit-13-r-130 text-gray-40'}>구매</div>
                    </div>

                    <div className={'w-[1px] h-[48px] bg-gray-80 mx-[10px]'} />

                    <div className={'flex-1 text-center h-[48px]'}>
                      <div className={'font-suit-20-750-130 text-gray-10'}>{data?.data.sale_count}</div>
                      <div className={'font-suit-13-r-130 text-gray-40'}>판매</div>
                    </div>

                    <div className={'w-[1px] h-[48px] bg-gray-80 mx-[10px]'} />

                    <div className={'flex-1 text-center h-[48px]'}>
                      <div className={'font-suit-20-750-130 text-gray-10'}>0</div>
                      <div className={'font-suit-13-r-130 text-gray-40'}>전송</div>
                    </div>

                    <div className={'w-[1px] h-[48px] bg-gray-80 mx-[10px]'} />

                    <div className={'flex-1 text-center h-[48px]'}>
                      <div className={'font-suit-20-750-130 text-gray-10'}>{data?.data.cancel_count}</div>
                      <div className={'font-suit-13-r-130 text-gray-40'}>취소</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
      <PhoneNumberModal isOpen={isPhoneNumberModalOpen} onClose={() => setIsPhoneNumberModalOpen(false)} />
    </div>
  );
}
