'use client';

import { useCallback, useEffect, useState } from 'react';

import type { IUserListIdProps } from './UserListId.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { IconLine24SquareInfo } from '@/components/atoms/icons/icon-line';
import { Image } from '@/components/atoms/images';
import { BankSelect, DatePicker } from '@/components/atoms/inputs';
import { useFetch, useRequest, useToast } from '@/hooks';
import { profile } from '@/mocks/images';
import {
  adminManagerAccountNumberUpdateService,
  adminManagerAccountUpdateService,
  adminManagerDealingsService,
  adminManagerFeeUpdateService,
  adminManagerIdService,
  adminManagerStatusUpdateService,
} from '@/services/admin/member/adminManagers';

export default function UserList({ id }: IUserListIdProps) {
  const [formData, setFormData] = useState({
    partnerName: '',
    codeName: '',
    phoneNumber: '',
    siteUrl: '',
    authorStatus: '',
    bank: '',
    account: '',
    accountName: '',
    csbyFee: '',
    purchaseFee: '',
    saleFee: '',
  });

  const [searchDate, setSearchDate] = useState({
    startDate: '',
    endDate: '',
  });

  const { open: openToast } = useToast();
  const fetchUserList = useCallback(() => adminManagerIdService({ id: Number(id) }), [id]);
  const fetchUserDealingsList = useCallback(
    () =>
      adminManagerDealingsService({
        id: Number(id),
        stats_de_start: searchDate.startDate,
        stats_de_end: searchDate.endDate,
      }),
    [id, searchDate],
  );

  const { request } = useRequest();

  const { data: userDataOrigin } = useFetch(fetchUserList);
  const { data: userDealingsDataOrigin } = useFetch(fetchUserDealingsList);

  useEffect(() => {
    if (userDataOrigin?.data) {
      setFormData({
        partnerName: userDataOrigin.data.prtnr_nm || '',
        codeName: userDataOrigin.data.code || '',
        phoneNumber: userDataOrigin.data.mp_no || '',
        siteUrl: userDataOrigin.data.site_adres || '',
        authorStatus: userDataOrigin.data.mngr_sttus || '',
        bank: userDataOrigin.data.bank || '',
        account: userDataOrigin.data.acnutno || '',
        accountName: userDataOrigin.data.dpstr || '',
        csbyFee: userDataOrigin.data.csby_fee?.toString() || '',
        purchaseFee: userDataOrigin.data.purchs_fee?.toString() || '',
        saleFee: userDataOrigin.data.sle_fee?.toString() || '',
      });
    }
  }, [userDataOrigin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    fetchUserDealingsList();
  };

  const userData = {
    loginId: userDataOrigin?.data?.login_id,
    totalCoin: userDataOrigin?.data?.hold_coin,
    joinDate: userDataOrigin?.data?.sbscrb_dt,
    joinIp: userDataOrigin?.data?.sbscrb_ip,
    lastLoginDate: userDataOrigin?.data?.last_conect_dt,
    lastLoginIp: userDataOrigin?.data?.last_conect_ip,
    lastLoginOs: userDataOrigin?.data?.last_conect_os,
    lastLoginBrowser: userDataOrigin?.data?.last_conect_brwsr,
  };

  const coinData = {
    feeAmount: userDealingsDataOrigin?.data?.fee_am,
    purchaseAmount: userDealingsDataOrigin?.data?.purchs_am,
    saleAmount: userDealingsDataOrigin?.data?.sle_am,
  };

  // NOTE: 회원 계정정보 업데이트
  const onClickSaveAccountUpdate = async () => {
    const data = await request(() =>
      adminManagerAccountUpdateService({
        id: Number(id),
        prtnr_nm: formData.partnerName,
        mp_no: formData.phoneNumber,
        site_adres: formData.siteUrl,
      }),
    );

    if (data?.status) {
      openToast({
        message: '변경사항이 저장되었습니다.',
        type: 'success',
      });
    }
  };

  // NOTE: 계좌 정보 업데이트
  const onClickSaveAccountNumberUpdate = async () => {
    const data = await request(() =>
      adminManagerAccountNumberUpdateService({
        id: Number(id),
        bank: formData.bank,
        acnutno: formData.account,
        dpstr: formData.accountName,
      }),
    );

    if (data?.status) {
      openToast({
        message: '변경사항이 저장되었습니다.',
        type: 'success',
      });
    }
  };

  // NOTE: 수수료 정보 업데이트
  const onClickSaveFeeUpdate = async () => {
    const data = await request(() =>
      adminManagerFeeUpdateService({
        id: Number(id),
        csby_fee: Number(formData.csbyFee),
        purchs_fee: Number(formData.purchaseFee),
        sle_fee: Number(formData.saleFee),
      }),
    );

    if (data?.status) {
      openToast({
        message: '변경사항이 저장되었습니다.',
        type: 'success',
      });
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    setSearchDate((prev) => ({
      ...prev,
      startDate: date ? date.toISOString().split('T')[0] : '',
    }));
  };

  const handleEndDateChange = (date: Date | null) => {
    setSearchDate((prev) => ({
      ...prev,
      endDate: date ? date.toISOString().split('T')[0] : '',
    }));
  };

  // NOTE: 상태 정보 업데이트
  const onClickSaveAuthorStatusUpdate = async () => {
    const data = await request(() =>
      adminManagerStatusUpdateService({
        id: Number(id),
        mngr_sttus: Number(formData.authorStatus),
      }),
    );

    if (data?.status) {
      openToast({
        message: '변경사항이 저장되었습니다.',
        type: 'success',
      });
    }
  };

  return (
    <>
      <div className={'w-full h-full text-gray-0 bg-gray-100'}>
        <AdminHeadline title={'CA 회원 정보 수정'} subTitle={['회원 관리', 'CA 회원 목록', 'CA 회원 정보 수정']} />

        <div className={'flex flex-col gap-5 mt-5 mx-4'}>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex flex-auto flex-shrink-0 flex-row w-[500px] gap-5 bg-gray-95 p-5 rounded-[30px]'}>
              <div className={'w-full flex flex-col gap-5'}>
                <div className={'w-full flex flex-row gap-5'}>
                  <div className={'w-full flex flex-col gap-2.5 bg-gray-100 rounded-[30px] p-5'}>
                    <div className={'font-pre-20-b-130 py-1 pb-4 border-b border-gray-80'}>회원 정보</div>

                    <div className={'flex flex-col gap-10 pt-4 justify-center items-center'}>
                      <div className={'relative w-[128px] h-[128px] border border-gray-80 rounded-[44px]'}>
                        <Image src={profile} alt={'회원 프로필'} fill />
                      </div>

                      <div className={'w-full flex flex-col gap-5'}>
                        <div className={'w-full flex flex-col gap-2'}>
                          <span className={'text-gray-40 font-pre-14-m-130'}>아이디</span>
                          <span className={'text-gray-0 font-pre-16-r-130 py-4 border-b border-gray-80'}>
                            {userData.loginId}
                          </span>
                        </div>

                        <div className={'flex flex-col gap-2'}>
                          <span className={'text-gray-40 font-pre-14-m-130'}>비밀번호</span>
                          <span className={'text-gray-0 font-pre-16-r-130 py-4 border-b border-gray-80'}>
                            ● ● ● ● ● ● ● ● ●
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={'w-full flex flex-row bg-gray-95 justify-end gap-5 rounded-[30px] '}>
                  <div className={'w-full flex flex-col rounded-[30px] gap-5 bg-gray-100 p-5'}>
                    <div className={'w-full flex flex-row justify-between'}>
                      <div className={'font-pre-20-b-130 py-2'}>계정 정보</div>
                      <button
                        onClick={onClickSaveAccountUpdate}
                        className={
                          'w-[70px] h-[40px] flex justify-center items-center text-primary-50 font-pre-14-m-130 py-4 border border-primary-50 text-center rounded-[12px]'
                        }
                      >
                        저장
                      </button>
                    </div>

                    <div className={'flex flex-col gap-1'}>
                      <div className={'text-gray-40 font-pre-14-m-130'}>파트너사명</div>
                      <input
                        name={'partnerName'}
                        className={'w-full h-[56px] border border-gray-80 rounded-[12px] p-2'}
                        value={formData.partnerName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className={'flex flex-col gap-1'}>
                      <div className={'text-gray-40 font-pre-14-m-130'}>코드명</div>
                      <input
                        name={'codeName'}
                        className={'w-full h-[56px] border border-gray-80 rounded-[12px] p-2 disabled:bg-gray-90'}
                        value={formData.codeName}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>

                    <div className={'flex flex-col gap-1'}>
                      <div className={'text-gray-40 font-pre-14-m-130'}>담당자연락처</div>
                      <input
                        name={'phoneNumber'}
                        className={'w-full h-[56px] border border-gray-80 rounded-[12px] p-2'}
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className={'flex flex-col gap-1'}>
                      <div className={'text-gray-40 font-pre-14-m-130'}>사이트주소</div>
                      <input
                        name={'siteUrl'}
                        className={'w-full h-[56px] border border-gray-80 rounded-[12px] p-2'}
                        value={formData.siteUrl}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className={'w-full flex flex-row bg-gray-95 justify-end gap-5 rounded-[30px]'}>
                  <div className={'w-full flex flex-col rounded-[30px] gap-5 bg-gray-100 p-5'}>
                    <div className={'w-full flex flex-row justify-between'}>
                      <div className={'font-pre-20-b-130 py-2'}>회원 상태</div>
                      <button
                        onClick={onClickSaveAuthorStatusUpdate}
                        className={
                          'w-[70px] h-[40px] flex justify-center items-center text-primary-50 font-pre-14-m-130 py-4 border border-primary-50 text-center rounded-[12px]'
                        }
                      >
                        저장
                      </button>
                    </div>

                    <label className={'flex flex-row gap-2'}>
                      <input
                        name={'status'}
                        type={'radio'}
                        checked={formData.authorStatus === '1'}
                        onChange={() => setFormData((prev) => ({ ...prev, authorStatus: '1' }))}
                      />
                      <div className={'text-gray-0 font-pre-13-r-130'}>정상</div>
                    </label>

                    <label className={'flex flex-row gap-2'}>
                      <input
                        name={'status'}
                        type={'radio'}
                        checked={formData.authorStatus === '2'}
                        onChange={() => setFormData((prev) => ({ ...prev, authorStatus: '2' }))}
                      />
                      <div className={'text-gray-0 font-pre-13-r-130'}>차단</div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className={'w-full flex flex-col gap-5 bg-gray-95 p-5 rounded-[30px]'}>
              <div className={'flex flex-col gap-5'}>
                <div className={'flex justify-between items-center bg-gray-100 py-4 px-5 rounded-[20px]'}>
                  <div className={'text-gray-0 font-pre-24-b-130'}>Total Coin</div>
                  <div className={'text-purple-fmg60 font-pre-28-b-130'}>
                    {userData.totalCoin?.toLocaleString('ko-KR')}
                  </div>
                </div>

                <div className={'flex flex-col gap-2.5 p-5 bg-gray-100 rounded-[20px]'}>
                  <div className={'flex items-center h-[40px] text-gray-10 font-pre-20-b-130'}>구입 정보</div>

                  <div className={'flex flex-row gap-2 items-center'}>
                    <DatePicker
                      selected={searchDate.startDate ? new Date(searchDate.startDate) : null}
                      onChange={handleStartDateChange}
                      className={'w-[308px] h-[40px] font-pre-16-r-130'}
                      placeholder={'YYYY - MM - DD'}
                    />
                    <span>~</span>
                    <DatePicker
                      selected={searchDate.endDate ? new Date(searchDate.endDate) : null}
                      onChange={handleEndDateChange}
                      className={'w-[308px] h-[40px] font-pre-16-r-130'}
                      placeholder={'YYYY - MM - DD'}
                    />
                    <button
                      onClick={handleSearch}
                      className={'font-pre-14-m-130 text-gray-100 bg-gray-0 h-[40px] px-4 rounded-[12px]'}
                    >
                      기간검색
                    </button>
                  </div>

                  <div className={'h-[152px] flex flex-row gap-2.5 pt-5'}>
                    <div
                      className={'flex flex-1 flex-col h-full gap-[30px] px-3 rounded-2xl border border-line-line03'}
                    >
                      <div
                        className={
                          'h-[32px] flex justify-center items-center border-b border-line-line01 text-gray-20 font-pre-14-m-130'
                        }
                      >
                        수수료액
                      </div>
                      <div className={'flex justify-center items-center text-primary-60 font-pre-24-b-130'}>
                        {coinData.feeAmount?.toLocaleString('ko-KR')}
                      </div>
                    </div>

                    <div
                      className={'flex flex-1 flex-col h-full gap-[30px] px-3 rounded-2xl border border-line-line03'}
                    >
                      <div
                        className={
                          'h-[32px] flex justify-center items-center border-b border-line-line01 text-gray-20 font-pre-14-m-130'
                        }
                      >
                        구매액
                      </div>
                      <div className={'flex justify-center items-center text-orange-orange50 font-pre-24-b-130'}>
                        {coinData.purchaseAmount?.toLocaleString('ko-KR')}
                      </div>
                    </div>

                    <div
                      className={'flex flex-1 flex-col h-full gap-[30px] px-3 rounded-2xl border border-line-line03'}
                    >
                      <div
                        className={
                          'h-[32px] flex justify-center items-center border-b border-line-line01 text-gray-20 font-pre-14-m-130'
                        }
                      >
                        판매액
                      </div>
                      <div className={'flex justify-center items-center text-green-50 font-pre-24-b-130'}>
                        {coinData.saleAmount?.toLocaleString('ko-KR')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={'flex flex-row gap-5'}>
                  <div className={'flex-1 p-5 bg-gray-100 rounded-[20px]'}>
                    <div className={'flex flex-row justify-between items-center'}>
                      <div className={'font-pre-20-b-130'}>계좌 정보</div>
                      <button
                        onClick={onClickSaveAccountNumberUpdate}
                        className={
                          'w-[70px] font-pre-14-m-130 text-primary-50 border border-primary-50 h-[40px] px-4 rounded-[12px]'
                        }
                      >
                        저장
                      </button>
                    </div>

                    <div className={'flex flex-col my-6 gap-5'}>
                      <div className={'flex flex-col gap-1'}>
                        <div className={'text-gray-40 font-pre-14-m-130'}>은행명</div>
                        <BankSelect
                          value={formData.bank}
                          onChange={(value) => setFormData((prev) => ({ ...prev, bank: value }))}
                        />
                      </div>

                      <div className={'flex flex-col gap-1'}>
                        <div className={'text-gray-40 font-pre-14-m-130'}>계좌번호</div>
                        <input
                          name={'account'}
                          className={'w-full h-[56px] border border-gray-80 rounded-[12px] p-2 px-3.5'}
                          value={formData.account}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className={'flex flex-col gap-1'}>
                        <div className={'text-gray-40 font-pre-14-m-130'}>예금주</div>
                        <input
                          name={'accountName'}
                          className={'w-full h-[56px] border border-gray-80 rounded-[12px] p-2 px-3.5'}
                          value={formData.accountName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={'flex-1 p-5 bg-gray-100 rounded-[20px]'}>
                    <div className={'flex flex-row justify-between items-center'}>
                      <div className={'font-pre-20-b-130'}>수수료 정보</div>
                      <button
                        onClick={onClickSaveFeeUpdate}
                        className={
                          'w-[70px] font-pre-14-m-130 text-primary-50 border border-primary-50 h-[40px] px-4 rounded-[12px]'
                        }
                      >
                        저장
                      </button>
                    </div>

                    <div className={'flex flex-col my-6 gap-5'}>
                      <div className={'flex flex-col gap-1'}>
                        <div className={'text-gray-40 font-pre-14-m-130'}>건당 수수료(원)</div>
                        <div className={'relative'}>
                          <input
                            name={'csbyFee'}
                            className={'w-full h-[56px] border border-gray-80 rounded-[12px] p-2 px-3.5'}
                            value={formData.csbyFee}
                            onChange={handleInputChange}
                          />
                          <span className={'absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-40'}>원</span>
                        </div>
                      </div>

                      <div className={'flex flex-col gap-1'}>
                        <div className={'text-gray-40 font-pre-14-m-130'}>구매 수수료(%)</div>
                        <div className={'relative'}>
                          <input
                            name={'purchaseFee'}
                            className={'w-full h-[56px] border border-gray-80 rounded-[12px] p-2 px-3.5'}
                            value={formData.purchaseFee}
                            onChange={handleInputChange}
                          />
                          <span className={'absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-40'}>%</span>
                        </div>
                      </div>

                      <div className={'flex flex-col gap-1'}>
                        <div className={'text-gray-40 font-pre-14-m-130'}>판매 수수료(%)</div>
                        <div className={'relative'}>
                          <input
                            name={'saleFee'}
                            className={'w-full h-[56px] border border-gray-80 rounded-[12px] p-2 px-3.5'}
                            value={formData.saleFee}
                            onChange={handleInputChange}
                          />
                          <span className={'absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-40'}>%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={'flex flex-row gap-5'}>
                  <div className={'flex-1 p-5 bg-gray-100 rounded-[20px]'}>
                    <div className={'h-[40px] flex flex-row justify-between items-center font-pre-20-b-130'}>
                      로그인 정보
                    </div>

                    <div className={'h-[60px] flex flex-row gap-2 items-center me-2.5'}>
                      <IconLine24SquareInfo className={'text-orange-orange50'} />
                      <div className={'text-gray-0 font-pre-13-r-130'}>로그인 정보는 수정이 불가능합니다.</div>
                    </div>

                    <div className={'flex flex-row gap-10'}>
                      <div className={'flex flex-col gap-5 flex-1'}>
                        <div className={'text-gray-40 font-pre-14-m-130'}>가입일</div>
                        <div
                          className={
                            'h-[56px] px-[14px] py-4 rounded-[16px] bg-gray-90 text-gray-0 font-pre-16-r-130 py-4 border border-gray-80'
                          }
                        >
                          {userData.joinDate}
                        </div>

                        <div className={'text-gray-40 font-pre-14-m-130'}>가입 시 IP주소</div>
                        <div
                          className={
                            'h-[56px] px-[14px] py-4 rounded-[16px] bg-gray-90 text-gray-0 font-pre-16-r-130 py-4 border border-gray-80'
                          }
                        >
                          {userData.joinIp}
                        </div>
                      </div>

                      <div className={'flex flex-col gap-5 flex-1'}>
                        <div className={'text-gray-40 font-pre-14-m-130'}>마지막 접속일</div>
                        <div
                          className={
                            'h-[56px] px-[14px] py-4 rounded-[16px] bg-gray-90 text-gray-0 font-pre-16-r-130 py-4 border border-gray-80'
                          }
                        >
                          {userData.lastLoginDate}
                        </div>

                        <div className={'text-gray-40 font-pre-14-m-130'}>마지막 접속 IP주소</div>
                        <div
                          className={
                            'h-[56px] px-[14px] py-4 rounded-[16px] bg-gray-90 text-gray-0 font-pre-16-r-130 py-4 border border-gray-80'
                          }
                        >
                          {userData.lastLoginIp}
                        </div>

                        <div className={'text-gray-40 font-pre-14-m-130'}>접속 OS</div>
                        <div
                          className={
                            'h-[56px] px-[14px] py-4 rounded-[16px] bg-gray-90 text-gray-0 font-pre-16-r-130 py-4 border border-gray-80'
                          }
                        >
                          {userData.lastLoginOs}
                        </div>

                        <div className={'text-gray-40 font-pre-14-m-130'}>브라우저</div>
                        <div
                          className={
                            'h-[56px] px-[14px] py-4 rounded-[16px] bg-gray-90 text-gray-0 font-pre-16-r-130 py-4 border border-gray-80'
                          }
                        >
                          {userData.lastLoginBrowser}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
