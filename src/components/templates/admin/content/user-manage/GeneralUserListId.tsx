'use client';

import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';

import type { IGeneralUserListIdProps } from './GeneralUserListId.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { IconLine24SquareInfo } from '@/components/atoms/icons/icon-line';
import { Image } from '@/components/atoms/images';
import { BankSelect, DatePicker } from '@/components/atoms/inputs';
import { DropdownSelect } from '@/components/atoms/inputs/DropdownSelect';
import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import { UserDetailGradeResetModal, UserDetailPartnerSearchModal } from '@/components/organisms/admin/modal';
import UserDetailChangePasswordModal from '@/components/organisms/admin/modal/UserDetailChangePasswordModal';
import { useFetch, useRequest, useToast } from '@/hooks';
import { profile2 } from '@/mocks/images';
import {
  adminMemberAccountNumberUpdateService,
  adminMemberDealingsService,
  adminMemberGradeUpdateService,
  adminMemberIdService,
  adminMemberStatusUpdateService,
} from '@/services/admin/member/adminMembers';
import {
  memberAccountNumberUpdateService,
  memberDealingsService,
  memberGradeUpdateService,
  memberService,
  memberStatusUpdateService,
} from '@/services/admin/member/members';
import { dayjs } from '@/utils';

export default function GeneralUserListId({ id }: IGeneralUserListIdProps) {
  const { request } = useRequest();
  const { open: openToast } = useToast();
  const { isSuperAdmin } = useAuthor();

  const [isGradeResetModalOpen, setIsGradeResetModalOpen] = useState(false);
  const [isPartnerSearchModalOpen, setIsPartnerSearchModalOpen] = useState(false);

  const handleGradeResetModalOpen = () => setIsGradeResetModalOpen(true);
  const handleGradeResetModalClose = () => setIsGradeResetModalOpen(false);

  const handlePartnerSearchModalOpen = () => setIsPartnerSearchModalOpen(true);
  const handlePartnerSearchModalClose = () => setIsPartnerSearchModalOpen(false);

  const [formData, setFormData] = useState({
    partnerName: '',
    codeName: '',
    phoneNumber: '',
    bank: '',
    account: '',
    accountName: '',
    authorStatus: '',
    authorRank: '',
  });

  const [searchDate, setSearchDate] = useState({
    startDate: '',
    endDate: '',
  });

  const [realSearchDate, setRealSearchDate] = useState({
    startDate: '',
    endDate: '',
  });

  const fetchUserList = useCallback(() => {
    return isSuperAdmin ? adminMemberIdService({ id: Number(id) }) : memberService({ id: Number(id) });
  }, [id, isSuperAdmin]);

  const fetchUserDealingsList = useCallback(() => {
    return isSuperAdmin
      ? adminMemberDealingsService({
          id: Number(id),
          stats_de_start: realSearchDate.startDate || undefined,
          stats_de_end: realSearchDate.endDate || undefined,
        })
      : memberDealingsService({
          id: Number(id),
          stats_de_start: realSearchDate.startDate || undefined,
          stats_de_end: realSearchDate.endDate || undefined,
        });
  }, [id, isSuperAdmin, realSearchDate]);

  const { data: userDataOrigin } = useFetch(fetchUserList);
  const { data: userDealingsDataOrigin } = useFetch(fetchUserDealingsList);

  useEffect(() => {
    if (userDataOrigin?.data) {
      setFormData({
        partnerName:
          (userDataOrigin.data &&
            'prtnr_nm' in userDataOrigin.data &&
            typeof userDataOrigin.data.prtnr_nm === 'string' &&
            userDataOrigin.data.prtnr_nm) ||
          '',
        codeName:
          (userDataOrigin.data &&
            'code' in userDataOrigin.data &&
            typeof userDataOrigin.data.code === 'string' &&
            userDataOrigin.data.code) ||
          '',
        phoneNumber: userDataOrigin.data.mp_no,
        bank: userDataOrigin.data.bank,
        account: userDataOrigin.data.acnutno,
        accountName: userDataOrigin.data.dpstr,
        authorStatus: userDataOrigin.data.mber_sttus,
        authorRank: userDataOrigin.data.mber_grd,
      });
    }
  }, [userDataOrigin]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    setRealSearchDate(searchDate);

    await fetchUserDealingsList();
  };

  const handleReset = () => {
    setSearchDate({
      startDate: '',
      endDate: '',
    });
    setRealSearchDate({
      startDate: '',
      endDate: '',
    });
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

  // NOTE: 계좌 정보 업데이트
  const onClickSaveAccountNumberUpdate = async () => {
    const data = await request(() =>
      isSuperAdmin
        ? adminMemberAccountNumberUpdateService({
            id: Number(id),
            bank: formData.bank,
            acnutno: formData.account,
            dpstr: formData.accountName,
          })
        : memberAccountNumberUpdateService({
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

  // NOTE: 회원 등급 업데이트
  const onClickSaveAuthorRankUpdate = async () => {
    const data = await request(() =>
      isSuperAdmin
        ? adminMemberGradeUpdateService({
            id: Number(id),
            mber_grd: formData.authorRank,
          })
        : memberGradeUpdateService({
            id: Number(id),
            mber_grd: formData.authorRank,
          }),
    );

    if (data?.status) {
      openToast({
        message: '변경사항이 저장되었습니다.',
        type: 'success',
      });
    }
  };

  // NOTE: 상태 정보 업데이트
  const onClickSaveAuthorStatusUpdate = async () => {
    const data = await request(() =>
      isSuperAdmin
        ? adminMemberStatusUpdateService({
            id: Number(id),
            mber_sttus: formData.authorStatus,
          })
        : memberStatusUpdateService({
            id: Number(id),
            mber_sttus: formData.authorStatus,
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

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const handlePasswordModalOpen = () => setIsPasswordModalOpen(true);
  const handlePasswordModalClose = () => setIsPasswordModalOpen(false);

  return (
    <>
      <div className={'w-full h-full text-gray-0 bg-gray-100'}>
        <AdminHeadline title={'회원 정보 수정'} subTitle={['회원 관리', '회원 목록', '회원 정보 수정']} />

        <div className={'flex flex-col gap-5 mt-5 mx-4'}>
          <div className={'flex flex-row gap-5'}>
            <div className={'flex flex-auto flex-shrink-0 flex-row w-[500px] gap-5 bg-gray-95 p-5 rounded-[30px]'}>
              <div className={'w-full flex flex-col gap-5'}>
                <div className={'w-full flex flex-row gap-5 '}>
                  <div className={'w-full flex flex-col gap-2.5 bg-gray-100 rounded-[30px] p-5'}>
                    <div className={'font-pre-20-b-130 py-1 pb-4 border-b border-gray-80'}>회원 정보</div>

                    <div className={'flex flex-col gap-10 pt-4 justify-center items-center'}>
                      <div className={'relative w-[128px] h-[128px] border border-gray-80 rounded-[44px]'}>
                        <Image src={profile2} alt={'회원 프로필'} fill />
                      </div>

                      <div className={'w-full flex flex-col gap-5'}>
                        <div className={'w-full flex flex-col gap-2'}>
                          <span className={'text-gray-40 font-pre-14-m-130'}>아이디</span>
                          <span className={'text-gray-0 font-pre-16-r-130 py-4 border-b border-gray-80'}>
                            {userData.loginId}
                          </span>
                        </div>

                        <div className={'flex flex-row items-end gap-4'}>
                          <div className={'flex flex-col gap-2 w-full'}>
                            <span className={'w-full text-gray-40 font-pre-14-m-130'}>비밀번호</span>

                            <div className={'w-full border-b border-gray-80 py-4'}>
                              <span className={'w-full text-gray-0 font-pre-16-r-130'}>● ● ● ● ● ● ● ● ●</span>
                            </div>
                          </div>

                          <button
                            onClick={handlePasswordModalOpen}
                            className={
                              'w-[136px] h-8 text-gray-100 bg-gray-0 font-pre-13-m-130 rounded-lg px-3 py-2 whitespace-pre'
                            }
                          >
                            비밀번호 변경
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={'w-full flex flex-row bg-gray-95 justify-end gap-5 rounded-[30px] '}>
                  <div className={'w-full flex flex-col rounded-[30px] gap-6 bg-gray-100 p-5'}>
                    <div className={'w-full flex flex-row justify-between'}>
                      <div className={'font-pre-20-b-130 py-2'}>회원등급</div>
                      <button
                        onClick={onClickSaveAuthorRankUpdate}
                        className={
                          'w-[70px] h-8 flex justify-center items-center text-primary-50 font-pre-14-m-130 py-4 border border-primary-50 text-center rounded-xl'
                        }
                      >
                        저장
                      </button>
                    </div>

                    <div className={'flex flex-col gap-1'}>
                      <div className={'flex justify-between items-center'}>
                        <div className={'text-gray-40 font-pre-14-m-130'}>회원등급</div>
                        <button
                          onClick={handleGradeResetModalOpen}
                          className={'text-gray-10 font-pre-14-m-130 underline'}
                        >
                          등급 초기화
                        </button>
                      </div>

                      <DropdownSelect
                        name={'authorRank'}
                        value={formData.authorRank}
                        onChange={handleSelectChange}
                        options={[
                          { value: '1', label: 'VVIP' },
                          { value: '2', label: 'VIP' },
                          { value: '3', label: '일반 회원' },
                          { value: '4', label: '신규 회원' },
                        ]}
                      />
                    </div>
                  </div>
                </div>

                {isSuperAdmin && (
                  <div className={'w-full flex flex-row bg-gray-95 justify-end gap-5 rounded-[30px] '}>
                    <div className={'w-full flex flex-col rounded-[30px] gap-5 bg-gray-100 p-5'}>
                      <div className={'w-full flex flex-row justify-between'}>
                        <div className={'font-pre-20-b-130 py-2'}>계정 정보</div>
                      </div>

                      <div className={'flex flex-col gap-1'}>
                        <div className={'text-gray-40 font-pre-14-m-130'}>파트너사명</div>
                        <div
                          className={
                            'w-full h-14 border border-gray-80 rounded-xl p-2 flex justify-between items-center px-3.5'
                          }
                        >
                          <span>{formData.partnerName}</span>
                          <button
                            className={'font-pre-14-m-130 text-gray-100 bg-gray-0 h-8 px-4 rounded-[8px]'}
                            onClick={handlePartnerSearchModalOpen}
                          >
                            검색
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className={'w-full flex flex-row bg-gray-95 justify-end gap-5 rounded-[30px]'}>
                  <div className={'w-full flex flex-col rounded-[30px] gap-5 bg-gray-100 p-5'}>
                    <div className={'w-full flex flex-row justify-between'}>
                      <div className={'font-pre-20-b-130 py-2'}>회원 상태</div>
                      <button
                        onClick={onClickSaveAuthorStatusUpdate}
                        className={
                          'w-[70px] h-8 flex justify-center items-center text-primary-50 font-pre-14-m-130 py-4 border border-primary-50 text-center rounded-xl'
                        }
                        disabled={userDataOrigin?.data.confm_sttus !== '1'}
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
                        disabled={userDataOrigin?.data.confm_sttus !== '1'}
                      />
                      <div className={'text-gray-0 font-pre-13-r-130'}>정상</div>
                    </label>

                    <label className={'flex flex-row gap-2'}>
                      <input
                        name={'status'}
                        type={'radio'}
                        checked={formData.authorStatus === '2'}
                        onChange={() => setFormData((prev) => ({ ...prev, authorStatus: '2' }))}
                        disabled={userDataOrigin?.data.confm_sttus !== '1'}
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
                  <div className={'text-orange-orange50 font-pre-28-b-130'}>
                    {userData.totalCoin?.toLocaleString('ko-KR')}
                  </div>
                </div>

                <div className={'flex flex-col gap-2.5 p-5 bg-gray-100 rounded-[20px]'}>
                  <div className={'flex items-center h-10 text-gray-10 font-pre-20-b-130'}>구입 정보</div>

                  <div className={'flex flex-row gap-2 items-center'}>
                    <DatePicker
                      selected={searchDate.startDate ? new Date(searchDate.startDate) : null}
                      onChange={handleStartDateChange}
                      className={'w-[308px] h-10 font-pre-16-r-130'}
                      placeholder={'YYYY - MM - DD'}
                    />
                    <span>~</span>
                    <DatePicker
                      selected={searchDate.endDate ? new Date(searchDate.endDate) : null}
                      onChange={handleEndDateChange}
                      className={'w-[308px] h-10 font-pre-16-r-130'}
                      placeholder={'YYYY - MM - DD'}
                    />
                    <button
                      onClick={handleSearch}
                      className={'font-pre-14-m-130 text-gray-100 bg-gray-0 h-10 px-4 rounded-xl'}
                    >
                      기간검색
                    </button>

                    <button
                      onClick={handleReset}
                      className={'font-pre-14-m-130 border border-gray-70 text-gray-0 bg-gray-100 h-10 px-4 rounded-xl'}
                    >
                      초기화
                    </button>
                  </div>

                  <div className={'h-[152px] flex flex-row gap-2.5 pt-5'}>
                    <div
                      className={'flex flex-1 flex-col h-full gap-[30px] px-3 rounded-2xl border border-line-line03'}
                    >
                      <div
                        className={
                          'h-8 flex justify-center items-center border-b border-line-line01 text-gray-20 font-pre-14-m-130'
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
                          'h-8 flex justify-center items-center border-b border-line-line01 text-gray-20 font-pre-14-m-130'
                        }
                      >
                        구매액
                      </div>
                      <div className={'flex justify-center items-center text-purple-fmg60 font-pre-24-b-130'}>
                        {coinData.purchaseAmount?.toLocaleString('ko-KR')}
                      </div>
                    </div>

                    <div
                      className={'flex flex-1 flex-col h-full gap-[30px] px-3 rounded-2xl border border-line-line03'}
                    >
                      <div
                        className={
                          'h-8 flex justify-center items-center border-b border-line-line01 text-gray-20 font-pre-14-m-130'
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
                          'w-[70px] h-8 font-pre-14-m-130 text-primary-50 border border-primary-50 px-4 rounded-xl'
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
                          className={'w-full h-14 border border-gray-80 rounded-xl p-2 px-3.5'}
                          value={formData.account}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className={'flex flex-col gap-1'}>
                        <div className={'text-gray-40 font-pre-14-m-130'}>예금주</div>
                        <input
                          name={'accountName'}
                          className={'w-full h-14 border border-gray-80 rounded-xl p-2 px-3.5'}
                          value={formData.accountName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={'flex flex-row gap-5'}>
                  <div className={'flex-1 p-5 bg-gray-100 rounded-[20px]'}>
                    <div className={'h-10 flex flex-row justify-between items-center font-pre-20-b-130'}>
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
                            'h-14 px-3.5 rounded-2xl bg-gray-90 text-gray-0 font-pre-16-r-130 py-4 border border-gray-80'
                          }
                        >
                          {dayjs(userData.joinDate).format('YYYY.MM.DD HH:mm:ss')}
                        </div>

                        <div className={'text-gray-40 font-pre-14-m-130'}>가입 시 IP주소</div>
                        <div
                          className={
                            'h-14 px-3.5 rounded-2xl bg-gray-90 text-gray-0 font-pre-16-r-130 py-4 border border-gray-80'
                          }
                        >
                          {userData.joinIp}
                        </div>
                      </div>

                      <div className={'flex flex-col gap-5 flex-1'}>
                        <div className={'text-gray-40 font-pre-14-m-130'}>마지막 접속일</div>
                        <div
                          className={
                            'h-14 px-3.5 rounded-2xl bg-gray-90 text-gray-0 font-pre-16-r-130 py-4 border border-gray-80'
                          }
                        >
                          {userData.lastLoginDate != null && userData.lastLoginDate !== '-'
                            ? dayjs(userData.lastLoginDate).format('YYYY.MM.DD HH:mm:ss')
                            : '-'}
                        </div>

                        <div className={'text-gray-40 font-pre-14-m-130'}>마지막 접속 IP주소</div>
                        <div
                          className={
                            'h-14 px-3.5 rounded-2xl bg-gray-90 text-gray-0 font-pre-16-r-130 py-4 border border-gray-80'
                          }
                        >
                          {userData.lastLoginIp}
                        </div>

                        <div className={'text-gray-40 font-pre-14-m-130'}>접속 OS</div>
                        <div
                          className={
                            'h-14 px-3.5 rounded-2xl bg-gray-90 text-gray-0 font-pre-16-r-130 py-4 border border-gray-80'
                          }
                        >
                          {userData.lastLoginOs}
                        </div>

                        <div className={'text-gray-40 font-pre-14-m-130'}>브라우저</div>
                        <div
                          className={
                            'h-14 px-3.5 rounded-2xl bg-gray-90 text-gray-0 font-pre-16-r-130 py-4 border border-gray-80'
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
      <UserDetailChangePasswordModal isOpen={isPasswordModalOpen} onClose={handlePasswordModalClose} id={Number(id)} />

      <UserDetailGradeResetModal
        id={Number(id)}
        isOpen={isGradeResetModalOpen}
        onClose={handleGradeResetModalClose}
        refetch={handleSearch}
      />

      <UserDetailPartnerSearchModal isOpen={isPartnerSearchModalOpen} onClose={handlePartnerSearchModalClose} />
    </>
  );
}
