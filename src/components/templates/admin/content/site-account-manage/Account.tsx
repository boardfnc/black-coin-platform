'use client';

import { useCallback, useState, useEffect } from 'react';

import type { IAdminAccountResponse } from '@/services/admin/setup/adminAccount.types';

import { AdminHeadline } from '@/components/atoms/headlines';
import { BankSelect } from '@/components/atoms/inputs';
import { useFetch, useRequest } from '@/hooks';
import { useToast } from '@/hooks/toast';
import { setUpAdminAccountService, setUpAdminAccountUpdateService } from '@/services/admin/setup/adminAccount';

export default function Account() {
  const { open: openToast } = useToast();

  const fetchAccountService = useCallback(() => setUpAdminAccountService(), []);

  const { data } = useFetch(fetchAccountService);

  const [formData, setFormData] = useState<IAdminAccountResponse['data']>({
    acnut_setup_id: 0,
    ca_rcpmny_bank: '',
    ca_rcpmny_dpstr: '',
    ca_rcpmny_acnutno: '',
    ca_mumm_rcpmny_am: 0,
    ca_mxmm_rcpmny_am: 0,
    vvip_rcpmny_bank: '',
    vvip_rcpmny_dpstr: '',
    vvip_rcpmny_acnutno: '',
    vvip_mumm_rcpmny_am: 0,
    vvip_mxmm_rcpmny_am: 0,
    vvip_mumm_defray_am: 0,
    vvip_mxmm_defray_am: 0,
    vip_rcpmny_bank: '',
    vip_rcpmny_dpstr: '',
    vip_rcpmny_acnutno: '',
    vip_mumm_rcpmny_am: 0,
    vip_mxmm_rcpmny_am: 0,
    vip_mumm_defray_am: 0,
    vip_mxmm_defray_am: 0,
    gnrl_rcpmny_bank: '',
    gnrl_rcpmny_dpstr: '',
    gnrl_rcpmny_acnutno: '',
    gnrl_mumm_rcpmny_am: 0,
    gnrl_mxmm_rcpmny_am: 0,
    gnrl_mumm_defray_am: 0,
    gnrl_mxmm_defray_am: 0,
    new_rcpmny_bank: '',
    new_rcpmny_dpstr: '',
    new_rcpmny_acnutno: '',
    new_mumm_rcpmny_am: 0,
    new_mxmm_rcpmny_am: 0,
    new_mumm_defray_am: 0,
    new_mxmm_defray_am: 0,
  });

  useEffect(() => {
    if (data) setFormData(data.data);
  }, [data]);

  const { request } = useRequest();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      if (!prev) return prev;

      let processedValue = value;

      if (field.includes('_am')) {
        const numValue = Number(value);
        if (numValue < 0) return prev;
        if (isNaN(numValue)) {
          processedValue = '0';
        } else {
          processedValue = String(numValue);
        }
      }

      return {
        ...prev,
        [field]: processedValue,
      };
    });
  };

  const handleSubmit = async () => {
    if (formData) {
      const covertFormData = {
        ...formData,
        ca_mumm_rcpmny_am: Number(formData.ca_mumm_rcpmny_am),
        ca_mxmm_rcpmny_am: Number(formData.ca_mxmm_rcpmny_am),
        vvip_mumm_rcpmny_am: Number(formData.vvip_mumm_rcpmny_am),
        vvip_mxmm_rcpmny_am: Number(formData.vvip_mxmm_rcpmny_am),
        vvip_mumm_defray_am: Number(formData.vvip_mumm_defray_am),
        vvip_mxmm_defray_am: Number(formData.vvip_mxmm_defray_am),
        vip_mumm_rcpmny_am: Number(formData.vip_mumm_rcpmny_am),
        vip_mxmm_rcpmny_am: Number(formData.vip_mxmm_rcpmny_am),
        vip_mumm_defray_am: Number(formData.vip_mumm_defray_am),
        vip_mxmm_defray_am: Number(formData.vip_mxmm_defray_am),
        gnrl_mumm_defray_am: Number(formData.gnrl_mumm_defray_am),
        gnrl_mxmm_defray_am: Number(formData.gnrl_mxmm_defray_am),
        gnrl_mumm_rcpmny_am: Number(formData.gnrl_mumm_rcpmny_am),
        gnrl_mxmm_rcpmny_am: Number(formData.gnrl_mxmm_rcpmny_am),
        new_mumm_rcpmny_am: Number(formData.new_mumm_rcpmny_am),
        new_mxmm_rcpmny_am: Number(formData.new_mxmm_rcpmny_am),
        new_mumm_defray_am: Number(formData.new_mumm_defray_am),
        new_mxmm_defray_am: Number(formData.new_mxmm_defray_am),
      };

      const response = await request(() => setUpAdminAccountUpdateService(covertFormData));

      if (response?.status) openToast({ message: '변경 사항이 저장되었습니다.', type: 'success' });
    }
  };

  return (
    <div className={'w-full h-full bg-gray-100'}>
      <div className={'flex flex-col gap-5'}>
        <AdminHeadline title={'계좌 관리'} subTitle={['사이트/계좌 관리', '계좌 관리']} />
      </div>

      <div className={'flex flex-col gap-5 p-5'}>
        <div className={'flex flex-col gap-5 p-5 text-gray-0 border-gray-80 rounded-[30px] bg-gray-95'}>
          <div className={'flex flex-col gap-2.5 p-5 bg-gray-100 rounded-[20px]'}>
            <span className={'font-pre-20-b-130'}>CA 입금 계좌 설명</span>

            <div className={'flex flex-col gap-4'}>
              <div className={'flex flex-row pt-4 gap-5'}>
                <div className={'flex flex-auto flex-col gap-1'}>
                  <span className={'text-gray-40 font-pre-14-m-130'}>은행명</span>

                  <BankSelect
                    className={'!h-[48px]'}
                    value={formData.ca_rcpmny_bank}
                    onChange={(value) => handleChange('ca_rcpmny_bank', value)}
                  />
                </div>

                <div className={'flex flex-auto flex-col gap-1'}>
                  <span className={'text-gray-40 font-pre-14-m-130'}>예금주</span>

                  <input
                    className={'h-[48px] px-3.5 py-[13px] border border-gray-80 rounded-[14px]'}
                    placeholder={'입력'}
                    value={formData.ca_rcpmny_dpstr}
                    onChange={(event) => handleChange('ca_rcpmny_dpstr', event.target.value)}
                  />
                </div>

                <div className={'flex flex-auto flex-col gap-1'}>
                  <span className={'text-gray-40 font-pre-14-m-130'}>계좌번호</span>

                  <input
                    className={'h-[48px] px-3.5 py-[13px] border border-gray-80 rounded-[14px]'}
                    value={formData.ca_rcpmny_acnutno}
                    onChange={(event) => handleChange('ca_rcpmny_acnutno', event.target.value)}
                  />
                </div>
              </div>

              <div className={'flex flex-col gap-1'}>
                <span className={'flex flex-row gap-1 items-center text-gray-40 font-pre-14-m-130'}>
                  <span>최소/최대 금액 설정</span>
                  <span className={'text-red-50'}>*</span>
                </span>

                <div className={'flex flex-row gap-2.5 items-center'}>
                  <span className={'text-gray-20 font-pre-16-r-130'}>최소입금금액</span>
                  <input
                    className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                    value={formData.ca_mumm_rcpmny_am}
                    onChange={(event) => handleChange('ca_mumm_rcpmny_am', event.target.value)}
                  />
                  <span>원</span>
                  <span>~</span>

                  <span className={'text-gray-20 font-pre-16-r-130'}>최대입금금액</span>
                  <input
                    className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                    value={formData.ca_mxmm_rcpmny_am}
                    onChange={(event) => handleChange('ca_mxmm_rcpmny_am', event.target.value)}
                  />
                  <span>원</span>
                </div>
              </div>
            </div>
          </div>

          <div className={'flex flex-col gap-[30px] bg-gray-100 p-5 rounded-[20px]'}>
            <h2 className={'font-pre-20-b-130'}>소비자 등급 별 입금 계좌 및 금액 설정</h2>

            <div className={'flex flex-col gap-2.5 p-5 rounded-[16px] border border-line-line03'}>
              <h3 className={'font-pre-20-b-130'}>VVIP 등급</h3>

              <div className={'flex flex-col gap-4'}>
                <div className={'flex flex-row pt-4 gap-5'}>
                  <div className={'flex flex-auto flex-col gap-1'}>
                    <span className={'text-gray-40 font-pre-14-m-130'}>은행명</span>

                    <BankSelect
                      className={'!h-[48px]'}
                      value={formData.vvip_rcpmny_bank}
                      onChange={(value) => handleChange('vvip_rcpmny_bank', value)}
                    />
                  </div>

                  <div className={'flex flex-auto flex-col gap-1'}>
                    <span className={'text-gray-40 font-pre-14-m-130'}>예금주</span>

                    <input
                      className={'h-[48px] px-3.5 py-[13px] border border-gray-80 rounded-[14px]'}
                      value={formData.vvip_rcpmny_dpstr}
                      onChange={(event) => handleChange('vvip_rcpmny_dpstr', event.target.value)}
                    />
                  </div>

                  <div className={'flex flex-auto flex-col gap-1'}>
                    <span className={'text-gray-40 font-pre-14-m-130'}>계좌번호</span>

                    <input
                      className={'h-[48px] px-3.5 py-[13px] border border-gray-80 rounded-[14px]'}
                      value={formData.vvip_rcpmny_acnutno}
                      onChange={(event) => handleChange('vvip_rcpmny_acnutno', event.target.value)}
                    />
                  </div>
                </div>

                <div className={'flex flex-col gap-1'}>
                  <span className={'flex flex-row gap-1 items-center text-gray-40 font-pre-14-m-130'}>
                    <span>최소/최대 입금 금액 설정</span>
                    <span className={'text-red-50'}>*</span>
                  </span>

                  <div className={'flex flex-row gap-2.5 items-center'}>
                    <span className={'text-gray-20 font-pre-16-r-130'}>최소입금금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.vvip_mumm_rcpmny_am}
                      onChange={(event) => handleChange('vvip_mumm_rcpmny_am', event.target.value)}
                    />
                    <span>원</span>
                    <span>~</span>

                    <span className={'text-gray-20 font-pre-16-r-130'}>최대입금금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.vvip_mxmm_rcpmny_am}
                      onChange={(event) => handleChange('vvip_mxmm_rcpmny_am', event.target.value)}
                    />
                    <span>원</span>
                  </div>
                </div>

                <div className={'flex flex-col gap-1'}>
                  <span className={'flex flex-row gap-1 items-center text-gray-40 font-pre-14-m-130'}>
                    <span>최소/최대 판매 금액 설정</span>
                    <span className={'text-red-50'}>*</span>
                  </span>

                  <div className={'flex flex-row gap-2.5 items-center'}>
                    <span className={'text-gray-20 font-pre-16-r-130'}>최소판매금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.vvip_mumm_defray_am || ''}
                      onChange={(event) => handleChange('vvip_mumm_defray_am', event.target.value)}
                    />
                    <span>원</span>
                    <span>~</span>

                    <span className={'text-gray-20 font-pre-16-r-130'}>최대판매금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.vvip_mxmm_defray_am || ''}
                      onChange={(event) => handleChange('vvip_mxmm_defray_am', event.target.value)}
                    />
                    <span>원</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={'flex flex-col gap-2.5 p-5 rounded-[16px] border border-line-line03'}>
              <h3 className={'font-pre-20-b-130'}>VIP 등급</h3>

              <div className={'flex flex-col gap-4'}>
                <div className={'flex flex-row pt-4 gap-5'}>
                  <div className={'flex flex-auto flex-col gap-1'}>
                    <span className={'text-gray-40 font-pre-14-m-130'}>은행명</span>

                    <BankSelect
                      className={'!h-[48px]'}
                      value={formData.vip_rcpmny_bank}
                      onChange={(value) => handleChange('vip_rcpmny_bank', value)}
                    />
                  </div>

                  <div className={'flex flex-auto flex-col gap-1'}>
                    <span className={'text-gray-40 font-pre-14-m-130'}>예금주</span>

                    <input
                      className={'h-[48px] px-3.5 py-[13px] border border-gray-80 rounded-[14px]'}
                      value={formData.vip_rcpmny_dpstr}
                      onChange={(event) => handleChange('vip_rcpmny_dpstr', event.target.value)}
                    />
                  </div>

                  <div className={'flex flex-auto flex-col gap-1'}>
                    <span className={'text-gray-40 font-pre-14-m-130'}>계좌번호</span>

                    <input
                      className={'h-[48px] px-3.5 py-[13px] border border-gray-80 rounded-[14px]'}
                      value={formData.vip_rcpmny_acnutno}
                      onChange={(event) => handleChange('vip_rcpmny_acnutno', event.target.value)}
                    />
                  </div>
                </div>

                <div className={'flex flex-col gap-1'}>
                  <span className={'flex flex-row gap-1 items-center text-gray-40 font-pre-14-m-130'}>
                    <span>최소/최대 입금 금액 설정</span>
                    <span className={'text-red-50'}>*</span>
                  </span>

                  <div className={'flex flex-row gap-2.5 items-center'}>
                    <span className={'text-gray-20 font-pre-16-r-130'}>최소입금금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.vip_mumm_rcpmny_am}
                      onChange={(event) => handleChange('vip_mumm_rcpmny_am', event.target.value)}
                    />
                    <span>원</span>
                    <span>~</span>

                    <span className={'text-gray-20 font-pre-16-r-130'}>최대입금금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.vip_mxmm_rcpmny_am}
                      onChange={(event) => handleChange('vip_mxmm_rcpmny_am', event.target.value)}
                    />
                    <span>원</span>
                  </div>
                </div>

                <div className={'flex flex-col gap-1'}>
                  <span className={'flex flex-row gap-1 items-center text-gray-40 font-pre-14-m-130'}>
                    <span>최소/최대 판매 금액 설정</span>
                    <span className={'text-red-50'}>*</span>
                  </span>

                  <div className={'flex flex-row gap-2.5 items-center'}>
                    <span className={'text-gray-20 font-pre-16-r-130'}>최소판매금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.vip_mumm_defray_am || ''}
                      onChange={(event) => handleChange('vip_mumm_defray_am', event.target.value)}
                    />
                    <span>원</span>
                    <span>~</span>

                    <span className={'text-gray-20 font-pre-16-r-130'}>최대판매금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.vip_mxmm_defray_am || ''}
                      onChange={(event) => handleChange('vip_mxmm_defray_am', event.target.value)}
                    />
                    <span>원</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={'flex flex-col gap-2.5 p-5 rounded-[16px] border border-line-line03'}>
              <h3 className={'font-pre-20-b-130'}>일반회원 등급</h3>

              <div className={'flex flex-col gap-4'}>
                <div className={'flex flex-row pt-4 gap-5'}>
                  <div className={'flex flex-auto flex-col gap-1'}>
                    <span className={'text-gray-40 font-pre-14-m-130'}>은행명</span>

                    <BankSelect
                      className={'!h-[48px]'}
                      value={formData.gnrl_rcpmny_bank}
                      onChange={(value) => handleChange('gnrl_rcpmny_bank', value)}
                    />
                  </div>

                  <div className={'flex flex-auto flex-col gap-1'}>
                    <span className={'text-gray-40 font-pre-14-m-130'}>예금주</span>

                    <input
                      className={'h-[48px] px-3.5 py-[13px] border border-gray-80 rounded-[14px]'}
                      value={formData.gnrl_rcpmny_dpstr}
                      onChange={(event) => handleChange('gnrl_rcpmny_dpstr', event.target.value)}
                    />
                  </div>

                  <div className={'flex flex-auto flex-col gap-1'}>
                    <span className={'text-gray-40 font-pre-14-m-130'}>계좌번호</span>

                    <input
                      className={'h-[48px] px-3.5 py-[13px] border border-gray-80 rounded-[14px]'}
                      value={formData.gnrl_rcpmny_acnutno}
                      onChange={(event) => handleChange('gnrl_rcpmny_acnutno', event.target.value)}
                    />
                  </div>
                </div>

                <div className={'flex flex-col gap-1'}>
                  <span className={'flex flex-row gap-1 items-center text-gray-40 font-pre-14-m-130'}>
                    <span className={'text-gray-40'}>최소/최대 입금 금액 설정</span>
                    <span className={'text-red-50'}>*</span>
                  </span>

                  <div className={'flex flex-row gap-2.5 items-center'}>
                    <span className={'text-gray-20 font-pre-16-r-130'}>최소입금금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.gnrl_mumm_rcpmny_am}
                      onChange={(event) => handleChange('gnrl_mumm_rcpmny_am', event.target.value)}
                    />
                    <span>원</span>
                    <span>~</span>

                    <span className={'text-gray-20 font-pre-16-r-130'}>최대입금금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.gnrl_mxmm_rcpmny_am}
                      onChange={(event) => handleChange('gnrl_mxmm_rcpmny_am', event.target.value)}
                    />
                    <span>원</span>
                  </div>
                </div>

                <div className={'flex flex-col gap-1'}>
                  <span className={'flex flex-row gap-1 items-center text-gray-40 font-pre-14-m-130'}>
                    <span className={'text-gray-40'}>최소/최대 판매 금액 설정</span>
                    <span className={'text-red-50'}>*</span>
                  </span>

                  <div className={'flex flex-row gap-2.5 items-center'}>
                    <span className={'text-gray-20 font-pre-16-r-130'}>최소판매금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.gnrl_mumm_defray_am || ''}
                      onChange={(event) => handleChange('gnrl_mumm_defray_am', event.target.value)}
                    />
                    <span>원</span>
                    <span>~</span>

                    <span className={'text-gray-20 font-pre-16-r-130'}>최대판매금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.gnrl_mxmm_defray_am || ''}
                      onChange={(event) => handleChange('gnrl_mxmm_defray_am', event.target.value)}
                    />
                    <span>원</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={'flex flex-col gap-2.5 p-5 rounded-[16px] border border-line-line03'}>
              <h3 className={'font-pre-20-b-130'}>신규회원 등급</h3>

              <div className={'flex flex-col gap-4'}>
                <div className={'flex flex-row pt-4 gap-5'}>
                  <div className={'flex flex-auto flex-col gap-1'}>
                    <span className={'text-gray-40 font-pre-14-m-130'}>은행명</span>

                    <BankSelect
                      className={'!h-[48px]'}
                      value={formData.new_rcpmny_bank}
                      onChange={(value) => handleChange('new_rcpmny_bank', value)}
                    />
                  </div>

                  <div className={'flex flex-auto flex-col gap-1'}>
                    <span className={'text-gray-40 font-pre-14-m-130'}>예금주</span>

                    <input
                      className={'h-[48px] px-3.5 py-[13px] border border-gray-80 rounded-[14px]'}
                      value={formData.new_rcpmny_dpstr}
                      onChange={(event) => handleChange('new_rcpmny_dpstr', event.target.value)}
                    />
                  </div>

                  <div className={'flex flex-auto flex-col gap-1'}>
                    <span className={'text-gray-40 font-pre-14-m-130'}>계좌번호</span>

                    <input
                      className={'h-[48px] px-3.5 py-[13px] border border-gray-80 rounded-[14px]'}
                      value={formData.new_rcpmny_acnutno}
                      onChange={(event) => handleChange('new_rcpmny_acnutno', event.target.value)}
                    />
                  </div>
                </div>

                <div className={'flex flex-col gap-1'}>
                  <span className={'flex flex-row gap-1 items-center text-gray-40 font-pre-14-m-130'}>
                    <span className={'text-gray-40'}>최소/최대 입금 금액 설정</span>
                    <span className={'text-red-50'}>*</span>
                  </span>

                  <div className={'flex flex-row gap-2.5 items-center'}>
                    <span className={'text-gray-20 font-pre-16-r-130'}>최소입금금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.new_mumm_rcpmny_am}
                      onChange={(event) => handleChange('new_mumm_rcpmny_am', event.target.value)}
                    />
                    <span>원</span>
                    <span>~</span>

                    <span className={'text-gray-20 font-pre-16-r-130'}>최대입금금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.new_mxmm_rcpmny_am}
                      onChange={(event) => handleChange('new_mxmm_rcpmny_am', event.target.value)}
                    />
                    <span>원</span>
                  </div>
                </div>

                <div className={'flex flex-col gap-1'}>
                  <span className={'flex flex-row gap-1 items-center text-gray-40 font-pre-14-m-130'}>
                    <span className={'text-gray-40'}>최소/최대 판매 금액 설정</span>
                    <span className={'text-red-50'}>*</span>
                  </span>

                  <div className={'flex flex-row gap-2.5 items-center'}>
                    <span className={'text-gray-20 font-pre-16-r-130'}>최소판매금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.new_mumm_defray_am || ''}
                      onChange={(event) => handleChange('new_mumm_defray_am', event.target.value)}
                    />
                    <span>원</span>
                    <span>~</span>

                    <span className={'text-gray-20 font-pre-16-r-130'}>최대판매금액</span>
                    <input
                      className={'h-[48px] px-3.5 py-4 border border-gray-80 rounded-[14px]'}
                      value={formData.new_mxmm_defray_am || ''}
                      onChange={(event) => handleChange('new_mxmm_defray_am', event.target.value)}
                    />
                    <span>원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={'flex flex-row items-center justify-center m-5'}>
            <button
              className={
                'w-[300px] h-10 rounded-lg text-primary-50 bg-gray-100 font-pre-14-m-130 border border-primary-50'
              }
              onClick={handleSubmit}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
