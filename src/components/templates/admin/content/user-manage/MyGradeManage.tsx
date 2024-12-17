'use client';

import { useCallback, useEffect, useState } from 'react';

import { AdminHeadline } from '@/components/atoms/headlines';
import { IconLine24SquareInfo } from '@/components/atoms/icons/icon-line';
import { useFetch, useRequest, useToast } from '@/hooks';
import { memberGradePutService, memberGradeService } from '@/services/admin/member/members';

const selectType: Record<string, string> = {
  1: '입/출금 횟수',
  2: '입금 금액',
  3: '출금 금액',
  4: '총 거래 금액',
};

const selectCovertText: Record<string, string> = {
  1: '입/출금 ',
  2: '입금 ',
  3: '출금 ',
  4: '거래 ',
};

const formatNumber = (value: number | undefined) => {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parseNumber = (value: string) => {
  return Number(value.replace(/,/g, ''));
};

export default function MyGradeManage() {
  const [formData, setFormData] = useState({
    type: '1',
    vvip: 0,
    vip: 0,
    general: 0,
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeSelect = (e: MouseEvent) => {
      if (isOpen && !(e.target as HTMLElement).closest('.relative')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', closeSelect);
    return () => document.removeEventListener('click', closeSelect);
  }, [isOpen]);

  const fetchData = useCallback(() => memberGradeService(), []);

  const { data } = useFetch(fetchData);
  const { open: openToast } = useToast();
  const { request } = useRequest();

  const onClickSaveMemberGradeUpdate = async () => {
    const data = await request(() =>
      memberGradePutService({
        comput_stdr_se: formData.type,
        vvip_stdr: formData.vvip,
        vip_stdr: formData.vip,
        gnrl_stdr: formData.general,
      }),
    );

    if (data?.status) {
      openToast({
        message: '변경사항이 저장되었습니다.',
        type: 'success',
      });
    }
  };

  useEffect(() => {
    if (data != null) {
      setFormData({
        type: data.data?.comput_stdr_se,
        vvip: data.data?.vvip_stdr,
        vip: data.data?.vip_stdr,
        general: data.data?.gnrl_stdr,
      });
    }
  }, [data, setFormData]);

  return (
    <>
      <div className={'w-full h-full text-gray-0 bg-gray-100'}>
        <AdminHeadline title={'회원 등급 설정'} subTitle={['회원 관리', '회원 등급 관리', '회원 등급 설정']} />

        <div className={'flex flex-col gap-5 mt-5 mx-4'}>
          <div className={'flex flex-row gap-5'}>
            <div className={'w-full flex flex-col gap-5 bg-gray-95 p-5 rounded-[30px]'}>
              <div className={'flex flex-col gap-5'}>
                <div className={'flex flex-col gap-2.5 bg-gray-100 p-5 rounded-[20px]'}>
                  <div className={'h-10 flex justify-between items-center'}>
                    <div className={'text-gray-0 font-pre-20-b-130'}>산출 기준 선택</div>
                  </div>

                  <div className={'h-10 ps-2.5 bg-primary-99 flex flex-row gap-1.5 items-center'}>
                    <IconLine24SquareInfo className={'text-orange-orange50'} />
                    <div className={'text-gray-0 font-pre-13-r-130'}>
                      선택한 산출 기준에 따라 회원등급을 자동으로 산출합니다.
                    </div>
                  </div>

                  <div className={'flex flex-col gap-1'}>
                    <div className={'text-gray-40 font-pre-14-m-130'}>산출 기준</div>
                    <div className={'relative w-[460px]'}>
                      <button
                        type={'button'}
                        className={
                          'w-full h-14 text-left font-pre-16-r-130 border border-gray-80 rounded-xl px-3.5 pe-10'
                        }
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {selectType[formData.type]}
                        <svg
                          className={'absolute right-[14px] top-1/2 -translate-y-1/2'}
                          width={'18'}
                          height={'18'}
                          viewBox={'0 0 18 18'}
                          fill={'none'}
                        >
                          <path
                            d={
                              'M7.61273 11.2047L5.69814 8.46601C5.01294 7.48587 4.67033 6.99581 4.68816 6.58787C4.70369 6.23265 4.87536 5.9025 5.15709 5.68606C5.48063 5.4375 6.07806 5.4375 7.27292 5.4375H11.1021C12.2969 5.4375 12.8944 5.4375 13.2179 5.68606C13.4996 5.9025 13.6713 6.23265 13.6868 6.58787C13.7047 6.99581 13.3621 7.48587 12.6769 8.46601L10.7623 11.2047C10.2325 11.9625 9.96762 12.3414 9.63762 12.4749C9.34888 12.5917 9.02612 12.5917 8.73738 12.4749C8.40738 12.3414 8.14249 11.9625 7.61273 11.2047Z'
                            }
                            fill={'#888B94'}
                            stroke={'#888B94'}
                            strokeWidth={'1.5'}
                            strokeLinecap={'round'}
                            strokeLinejoin={'round'}
                          />
                        </svg>
                      </button>

                      {isOpen && (
                        <ul
                          className={
                            'absolute z-10 w-full mt-1 bg-gray-100 border border-gray-80 rounded-xl overflow-hidden'
                          }
                        >
                          {Object.entries(selectType).map(([key, value]) => (
                            <li key={key}>
                              <button
                                type={'button'}
                                className={`w-full text-center font-pre-14-r-130 px-3.5 py-[13px] hover:bg-gray-90 ${
                                  formData.type === key
                                    ? 'bg-sub-blue-s-blue-10 text-sub-blue-s-d-blue-10'
                                    : 'bg-gray-100 text-gray-0'
                                } font-pre-14-r-130`}
                                onClick={() => {
                                  setFormData({ ...formData, type: key });
                                  setIsOpen(false);
                                }}
                              >
                                {value}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className={'flex flex-col gap-2.5 p-5 bg-gray-100 rounded-[20px]'}>
                  <div className={'h-10 flex justify-between items-center'}>
                    <div className={'text-gray-0 font-pre-20-b-130'}>등급 별 산출 기준 설정</div>
                  </div>

                  <div className={'flex flex-col gap-5 pt-5'}>
                    <div className={'flex flex-row gap-5 items-center'}>
                      <div className={'flex flex-row gap-5'}>
                        <label className={'flex flex-col gap-1 justify-center items-start'}>
                          <div className={'text-gray-40 font-pre-14-m-130'}>등급명</div>

                          <input
                            type={'text'}
                            className={
                              'w-[308px] h-14 bg-gray-90 placeholder:text-gray-0 font-pre-16-r-130 border border-gray-80 rounded-xl px-2 py-1'
                            }
                            placeholder={'VVIP'}
                            disabled
                          />
                        </label>

                        <label className={'flex flex-col gap-1 justify-center items-start'}>
                          <div className={'text-gray-40 font-pre-14-m-130'}>입/출금 횟수</div>

                          <div className={'flex flex-row gap-1 items-center'}>
                            <input
                              type={'text'}
                              value={formatNumber(formData.vvip)}
                              onChange={(event) => setFormData({ ...formData, vvip: parseNumber(event.target.value) })}
                              className={
                                'w-[340px] h-14 disabled:text-gray-50 font-pre-16-r-130 border border-gray-80 rounded-xl px-3.5 py-[15px]'
                              }
                              placeholder={'입력'}
                            />

                            <div className={'text-gray-0 font-pre-16-r-130'}>
                              회 이상 입/출금시 자동으로 해당 등급으로 조정
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className={'flex flex-row gap-5 items-center'}>
                      <div className={'flex flex-row gap-5'}>
                        <label className={'flex flex-col gap-1 justify-center items-start'}>
                          <div className={'text-gray-40 font-pre-14-m-130'}>등급명</div>

                          <input
                            type={'text'}
                            className={
                              'w-[308px] h-14 bg-gray-90 placeholder:text-gray-0 font-pre-16-r-130 border border-gray-80 rounded-xl px-2 py-1'
                            }
                            placeholder={'VIP'}
                            disabled
                          />
                        </label>

                        <label className={'flex flex-col gap-1 justify-center items-start'}>
                          <div className={'text-gray-40 font-pre-14-m-130'}>입/출금 횟수</div>

                          <div className={'flex flex-row gap-1 items-center'}>
                            <input
                              type={'text'}
                              value={formatNumber(formData.vip)}
                              onChange={(event) => setFormData({ ...formData, vip: parseNumber(event.target.value) })}
                              className={
                                'w-[340px] h-14 disabled:text-gray-50 font-pre-16-r-130 border border-gray-80 rounded-xl px-3.5 py-[15px]'
                              }
                              placeholder={'입력'}
                            />

                            <div className={'text-gray-0 font-pre-16-r-130'}>
                              회 이상 입/출금시 자동으로 해당 등급으로 조정
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className={'flex flex-row gap-5 items-center'}>
                      <div className={'flex flex-row gap-5'}>
                        <label className={'flex flex-col gap-1 justify-center items-start'}>
                          <div className={'text-gray-40 font-pre-14-m-130'}>등급명</div>

                          <input
                            type={'text'}
                            className={
                              'w-[308px] h-14 bg-gray-90 placeholder:text-gray-0 font-pre-16-r-130 border border-gray-80 rounded-xl px-2 py-1'
                            }
                            placeholder={'일반회원'}
                            disabled
                          />
                        </label>

                        <label className={'flex flex-col gap-1 justify-center items-start'}>
                          <div className={'text-gray-40 font-pre-14-m-130'}>입/출금 횟수</div>

                          <div className={'flex flex-row gap-1 items-center'}>
                            <input
                              type={'text'}
                              value={formatNumber(formData.general)}
                              onChange={(event) =>
                                setFormData({ ...formData, general: parseNumber(event.target.value) })
                              }
                              className={
                                'w-[340px] h-14 disabled:text-gray-50 font-pre-16-r-130 border border-gray-80 rounded-xl px-3.5 py-[15px]'
                              }
                              placeholder={'입력'}
                            />

                            <div className={'text-gray-0 font-pre-16-r-130'}>
                              회 이상 입/출금시 자동으로 해당 등급으로 조정
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className={'flex flex-row gap-5 items-center'}>
                      <div className={'flex flex-row gap-5'}>
                        <label className={'flex flex-col gap-1 justify-center items-start'}>
                          <div className={'text-gray-40 font-pre-14-m-130'}>등급명</div>

                          <input
                            type={'text'}
                            className={
                              'w-[308px] h-14 bg-gray-90 placeholder:text-gray-0 font-pre-16-r-130 border border-gray-80 rounded-xl px-2 py-1'
                            }
                            placeholder={'신규회원'}
                            disabled
                          />
                        </label>

                        <label className={'flex flex-col gap-1 justify-center items-start'}>
                          <div className={'text-gray-40 font-pre-14-m-130'}>입/출금 횟수</div>

                          <div className={'flex flex-row gap-1 items-center'}>
                            <input
                              type={'text'}
                              className={
                                'w-[308px] h-14 bg-gray-90 placeholder:text-gray-0 font-pre-16-r-130 border border-gray-80 rounded-xl px-2 py-1'
                              }
                              placeholder={'0'}
                              disabled
                            />

                            <div className={'text-gray-0 font-pre-16-r-130'}>
                              회 인 경우 자동으로 해당 등급으로 조정
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={'flex justify-center'}>
                  <button
                    className={
                      'w-[300px] h-10 text-primary-50 bg-gray-100 font-pre-14-m-130 rounded-xl border border-primary-50 px-5 py-2.5 font-pre-16-m-130'
                    }
                    onClick={onClickSaveMemberGradeUpdate}
                  >
                    저장
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
