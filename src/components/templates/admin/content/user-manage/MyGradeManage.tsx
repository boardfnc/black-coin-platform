'use client';

import { useCallback, useEffect, useState } from 'react';

import { AdminHeadline } from '@/components/atoms/headlines';
import { IconLine24SquareInfo } from '@/components/atoms/icons/icon-line';
import { useFetch, useRequest, useToast } from '@/hooks';
import { memberGradePutService, memberGradeService } from '@/services/admin/member/members';

export default function MyGradeManage() {
  const [formData, setFormData] = useState({
    type: '1',
    vvip: 0,
    vip: 0,
    general: 0,
  });

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
                  <div className={'h-[40px] flex justify-between items-center'}>
                    <div className={'text-gray-0 font-pre-20-b-130'}>산출 기준 선택</div>
                  </div>

                  <div className={'h-[40px] ps-2.5 bg-primary-99 flex flex-row gap-1.5 items-center'}>
                    <IconLine24SquareInfo className={'text-orange-orange50'} />
                    <div className={'text-gray-0 font-pre-13-r-130'}>
                      선택한 산출 기준에 따라 회원등급을 자동으로 산출합니다.
                    </div>
                  </div>

                  <div className={'flex flex-col gap-1'}>
                    <div className={'text-gray-40 font-pre-14-m-130'}>산출 기준</div>
                    <select
                      className={
                        'w-[308px] h-[56px] disabled:text-gray-50 font-pre-16-r-130 border border-gray-80 rounded-[12px] p-2 px-3.5 font-pre-16-r-130'
                      }
                      value={formData.type}
                      onChange={(event) => setFormData({ ...formData, type: event.target.value })}
                    >
                      <option value={'1'}>입/출금 횟수</option>
                      <option value={'2'}>입금 금액</option>
                      <option value={'3'}>출금 금액</option>
                      <option value={'4'}>총 거래 금액</option>
                    </select>
                  </div>
                </div>

                <div className={'flex flex-col gap-2.5 p-5 bg-gray-100 rounded-[20px]'}>
                  <div className={'h-[40px] flex justify-between items-center'}>
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
                              'w-[308px] h-[56px] bg-gray-90 placeholder:text-gray-0 font-pre-16-r-130 border border-gray-80 rounded-[12px] px-2 py-1'
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
                              value={formData.vvip}
                              onChange={(event) => setFormData({ ...formData, vvip: Number(event.target.value) })}
                              className={
                                'w-[308px] h-[56px] disabled:text-gray-50 font-pre-16-r-130 border border-gray-80 rounded-[12px] px-2 py-1'
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
                              'w-[308px] h-[56px] bg-gray-90 placeholder:text-gray-0 font-pre-16-r-130 border border-gray-80 rounded-[12px] px-2 py-1'
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
                              value={formData.vip}
                              onChange={(event) => setFormData({ ...formData, vip: Number(event.target.value) })}
                              className={
                                'w-[308px] h-[56px] disabled:text-gray-50 font-pre-16-r-130 border border-gray-80 rounded-[12px] px-2 py-1'
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
                              'w-[308px] h-[56px] bg-gray-90 placeholder:text-gray-0 font-pre-16-r-130 border border-gray-80 rounded-[12px] px-2 py-1'
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
                              value={formData.general}
                              onChange={(event) => setFormData({ ...formData, general: Number(event.target.value) })}
                              className={
                                'w-[308px] h-[56px] disabled:text-gray-50 font-pre-16-r-130 border border-gray-80 rounded-[12px] px-2 py-1'
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
                              'w-[308px] h-[56px] bg-gray-90 placeholder:text-gray-0 font-pre-16-r-130 border border-gray-80 rounded-[12px] px-2 py-1'
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
                                'w-[308px] h-[56px] bg-gray-90 placeholder:text-gray-0 font-pre-16-r-130 border border-gray-80 rounded-[12px] px-2 py-1'
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
                      'w-[300px] h-[40px] text-primary-50 bg-gray-100 font-pre-14-m-130 rounded-xl border border-primary-50 px-5 py-2.5 font-pre-16-m-130'
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
