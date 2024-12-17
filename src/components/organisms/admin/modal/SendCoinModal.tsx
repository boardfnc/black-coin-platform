import { useState } from 'react';

import { ConfirmRowModal } from '.';
import BonusCoinModal from './BonusCoinModal';

import type { ISendCoinModalProps } from './SendCoinModal.types';

import { IconLine24RoundWarning, IconLine24SquareInfo } from '@/components/atoms/icons/icon-line';
import IconLine24Close from '@/components/atoms/icons/icon-line/Close';
import Modal from '@/components/atoms/modals/Modal';
import { useAuthor } from '@/components/atoms/provider/AdminProvider';
import { useRequest, useToast } from '@/hooks';
import { adminPurchaseManageService, adminPurchaseMemberService } from '@/services/admin/coin/adminPurchase';
import { useRefetch } from '@/stores/refetch';
import { convertMembershipGrade, convertBank } from '@/utils/covert';

export default function SendCoinModal(props: ISendCoinModalProps) {
  const { sendCoinModalTableData, isOpen, type, onClose, refetch } = props;

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isBonusModalOpen, setIsBonusModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [paymentAmounts, setPaymentAmounts] = useState<Record<string, string>>({});
  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);

  const { sideBarRefetch } = useRefetch();
  const { open: openToast } = useToast();
  const { request } = useRequest();
  const { isSuperAdmin } = useAuthor();

  const showCheckboxes = sendCoinModalTableData?.length > 1;

  const handleCheckboxChange = (dealingId: string) => {
    setSelectedDeals((prev) =>
      prev.includes(dealingId) ? prev.filter((id) => id !== dealingId) : [...prev, dealingId],
    );
  };

  const handlePaymentAmountChange = (dealingId: string, value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    const formattedValue = Number(numericValue).toLocaleString();

    setPaymentAmounts((prev) => ({
      ...prev,
      [dealingId]: formattedValue,
    }));
  };

  const handleClose = () => {
    setIsChecked(false);
    setPaymentAmounts({});
    onClose();
  };

  const handleAdminPurchaseManager = async () => {
    const targetData =
      sendCoinModalTableData.length === 1
        ? sendCoinModalTableData
        : sendCoinModalTableData.filter((item) => selectedDeals.includes(item.dealingId.toString()));

    const response = await request(() =>
      type === 'ca'
        ? adminPurchaseManageService({
            _bc_ca_delng_dtls: targetData.map((item) => ({
              ca_delng_dtls_id: item.dealingId,
              bnus_qy: item.bonusAmount || 0,
              compt_qy: Number(paymentAmounts[item.dealingId]?.replace(/,/g, '') || item.requestAmount),
            })),
          })
        : adminPurchaseMemberService({
            _bc_mber_delng_dtls: targetData.map((item) => ({
              mber_delng_dtls_id: item.dealingId,
              bnus_qy: item.bonusAmount || 0,
              compt_qy: Number(paymentAmounts[item.dealingId]?.replace(/,/g, '') || item.requestAmount),
            })),
          }),
    );

    setIsConfirmModalOpen(false);

    if (response != null && 'status' in response && response.status) {
      openToast({
        message: '코인 지급이 완료되었습니다.',
        type: 'success',
      });

      refetch?.();
      sideBarRefetch?.();
      handleClose();
      onClose();
    }

    return response;
  };

  const handlePaymentClick = () => setIsConfirmModalOpen(true);

  const handleAllCheckboxChange = () => {
    const newIsAllChecked = !isAllChecked;
    setIsAllChecked(newIsAllChecked);

    if (newIsAllChecked) {
      const allDealingIds = sendCoinModalTableData.map((item) => item.dealingId.toString());
      setSelectedDeals(allDealingIds);
    } else {
      setSelectedDeals([]);
    }
  };

  const handleResetPaymentAmounts = () => {
    setPaymentAmounts({});
  };

  const hasExistingPaymentAmounts = () => {
    const dealsToCheck =
      sendCoinModalTableData.length === 1 ? [sendCoinModalTableData[0].dealingId.toString()] : selectedDeals;

    return dealsToCheck.some((dealId) => paymentAmounts[dealId]);
  };

  const handleBonusComplete = (bonusAmount: number, isPercentage: boolean) => {
    const updatedPaymentAmounts = { ...paymentAmounts };

    const dealsToUpdate =
      sendCoinModalTableData.length === 1 ? [sendCoinModalTableData[0].dealingId.toString()] : selectedDeals;

    dealsToUpdate.forEach((dealId) => {
      const item = sendCoinModalTableData.find((item) => item.dealingId.toString() === dealId);
      if (!item) return;

      const requestAmount = item.requestAmount;
      const bonusValue = isPercentage ? (requestAmount * bonusAmount) / 100 : bonusAmount;

      const currentAmount = Number(paymentAmounts[dealId]?.replace(/,/g, '') || requestAmount);
      updatedPaymentAmounts[dealId] = Math.floor(currentAmount + bonusValue).toLocaleString();
    });

    setPaymentAmounts(updatedPaymentAmounts);
  };

  const modalTitle = (() => {
    if (isSuperAdmin) return '코인 지급';
    if (type === 'ca') return '코인 지급 이력';
    return '입금 확인(코인 지급)';
  })();

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} width={type === 'ca' ? '1655px' : '1655px'} height={'auto'}>
        <div className={'flex flex-col gap-[30px] px-2.5'}>
          <div className={'flex items-center justify-between gap-2 pt-1 pb-3'}>
            <div className={'text-gray-0 font-pre-20-m-130'}>{modalTitle}</div>

            <button className={'text-gray-0 font-pre-13-r-130'} onClick={handleClose}>
              <IconLine24Close className={'text-gray-10'} />
            </button>
          </div>

          <div>
            <div className={'h-[50px] flex items-center justify-end gap-2 bg-gray-99'}>
              <button
                onClick={handleResetPaymentAmounts}
                className={
                  'text-gray-10 font-pre-13-m-130 h-8 px-3 flex justify-center items-center border border-gray-80 rounded-[9px]'
                }
              >
                지급수량 초기화
              </button>
              <button
                onClick={() => setIsBonusModalOpen(true)}
                className={
                  'text-gray-100 bg-gray-0 font-pre-13-m-130 h-8 px-3 flex justify-center items-center border border-gray-80 rounded-[9px]'
                }
              >
                보너스 코인 지급
              </button>
            </div>

            <div className={'h-[360px] overflow-y-auto'}>
              <table className={'w-full border-collapse'}>
                {type === 'ca' && (
                  <>
                    <thead className={'sticky top-0 z-10'}>
                      <tr className={'h-8 bg-gray-95'}>
                        {showCheckboxes && (
                          <th className={'h-8 text-gray-20 font-pre-13-m-130 border border-gray-80'}>
                            <input
                              type={'checkbox'}
                              checked={isAllChecked}
                              onChange={handleAllCheckboxChange}
                              className={`w-5 h-5 appearance-none rounded-md border border-[#D9D9D9] bg-gray-100 
                            checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTMgMkg3QzQuMjM4NTggMiAyIDQuMjM4NTggMiA3VjEzQzIgMTUuNzYxNCA0LjIzODU4IDE4IDcgMThIMTNDMTUuNzYxNCAxOCAxOCAxNS43NjE0IDE4IDEzVjdDMTggNC4yMzg1OCAxNS43NjE0IDIgMTMgMloiIGZpbGw9IiM0MDlFRkYiIHN0cm9rZT0iIzQyODNDOSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNC4xMjUgNy43NUw4LjYyNDk3IDEzTDUuODc1IDEwLjM3NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] 
                            checked:bg-no-repeat checked:bg-center checked:border-none`}
                            />
                          </th>
                        )}
                        <th className={'h-8 text-gray-20 font-pre-13-m-130 border border-gray-80'}>거래번호</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>신청일</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>IP 주소</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>파트너사명</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>코드명</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>은행명</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>예금주</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>계좌번호</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>구매요청수량</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>보너스</th>
                        <th className={'w-[140px] text-gray-20 font-pre-13-m-130 border border-gray-80'}>지급수량</th>
                      </tr>
                    </thead>

                    <tbody>
                      {sendCoinModalTableData?.map((item, index) => (
                        <tr key={index} className={'h-10 text-gray-0 font-pre-13-r-130 text-center'}>
                          {showCheckboxes && (
                            <td className={'border border-gray-80 bg-gray-90'}>
                              <input
                                type={'checkbox'}
                                checked={selectedDeals.includes(item.dealingId.toString())}
                                onChange={() => handleCheckboxChange(item.dealingId.toString())}
                                className={`w-5 h-5 appearance-none rounded-md border border-[#D9D9D9] bg-gray-100 
                              checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTMgMkg3QzQuMjM4NTggMiAyIDQuMjM4NTggMiA3VjEzQzIgMTUuNzYxNCA0LjIzODU4IDE4IDcgMThIMTNDMTUuNzYxNCAxOCAxOCAxNS43NjE0IDE4IDEzVjdDMTggNC4yMzg1OCAxNS43NjE0IDIgMTMgMloiIGZpbGw9IiM0MDlFRkYiIHN0cm9rZT0iIzQyODNDOSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNC4xMjUgNy43NUw4LjYyNDk3IDEzTDUuODc1IDEwLjM3NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] 
                              checked:bg-no-repeat checked:bg-center checked:border-none`}
                              />
                            </td>
                          )}
                          <td className={'border border-gray-80 bg-gray-90'}>{item.tradeNumber}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>{item.applyDate}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>{item.ipAddress}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>{item.partnerName}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>{'codeName' in item && item.codeName}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>{convertBank(item.bank)}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>{item.accountHolder}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>{item.accountNumber}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>
                            {item.requestAmount?.toLocaleString('ko-KR') || 0}
                          </td>
                          <td className={'border border-gray-80 bg-gray-90'}>
                            {item.bonusAmount?.toLocaleString('ko-KR') || 0}
                          </td>
                          <td className={'border border-gray-80'}>
                            <input
                              type={'text'}
                              value={
                                isSuperAdmin
                                  ? paymentAmounts[item.dealingId] || item.requestAmount?.toLocaleString('ko-KR') || ''
                                  : paymentAmounts[item.dealingId] || ''
                              }
                              onChange={(event) =>
                                handlePaymentAmountChange(item.dealingId.toString(), event.target.value)
                              }
                              className={'text-gray-10 disabled:text-gray-50 text-end font-pre-13-r-130 p-2.5'}
                              placeholder={'직접입력'}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}

                {type === 'user' && (
                  <>
                    <thead className={'sticky top-0 z-10'}>
                      <tr className={'h-8 bg-gray-95'}>
                        {showCheckboxes && (
                          <th className={'h-8 text-gray-20 font-pre-13-m-130 border border-gray-80'}>
                            <input
                              type={'checkbox'}
                              checked={isAllChecked}
                              onChange={handleAllCheckboxChange}
                              className={`w-5 h-5 appearance-none rounded-md border border-[#D9D9D9] bg-gray-100 
                            checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTMgMkg3QzQuMjM4NTggMiAyIDQuMjM4NTggMiA3VjEzQzIgMTUuNzYxNCA0LjIzODU4IDE4IDcgMThIMTNDMTUuNzYxNCAxOCAxOCAxNS43NjE0IDE4IDEzVjdDMTggNC4yMzg1OCAxNS43NjE0IDIgMTMgMloiIGZpbGw9IiM0MDlFRkYiIHN0cm9rZT0iIzQyODNDOSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNC4xMjUgNy43NUw4LjYyNDk3IDEzTDUuODc1IDEwLjM3NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] 
                            checked:bg-no-repeat checked:bg-center checked:border-none`}
                            />
                          </th>
                        )}
                        <th className={'h-8 text-gray-20 font-pre-13-m-130 border border-gray-80'}>거래번호</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>신청일</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>IP 주소</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>회원등급</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>아이디</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>회원명</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>추천파트너사명</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>은행명</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>예금주</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>계좌번호</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>구매요청수량</th>
                        <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>보너스</th>
                        <th className={'w-[140px] text-gray-20 font-pre-13-m-130 border border-gray-80'}>지급수량</th>
                      </tr>
                    </thead>

                    <tbody>
                      {sendCoinModalTableData?.map((item, index) => (
                        <tr key={index} className={'h-10 text-gray-0 font-pre-13-r-130 text-center'}>
                          {showCheckboxes && (
                            <td className={'border border-gray-80 bg-gray-90'}>
                              <input
                                type={'checkbox'}
                                checked={selectedDeals.includes(item.dealingId.toString())}
                                onChange={() => handleCheckboxChange(item.dealingId.toString())}
                                className={`w-5 h-5 appearance-none rounded-md border border-[#D9D9D9] bg-gray-100 
                              checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTMgMkg3QzQuMjM4NTggMiAyIDQuMjM4NTggMiA3VjEzQzIgMTUuNzYxNCA0LjIzODU4IDE4IDcgMThIMTNDMTUuNzYxNCAxOCAxOCAxNS43NjE0IDE4IDEzVjdDMTggNC4yMzg1OCAxNS43NjE0IDIgMTMgMloiIGZpbGw9IiM0MDlFRkYiIHN0cm9rZT0iIzQyODNDOSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNC4xMjUgNy43NUw4LjYyNDk3IDEzTDUuODc1IDEwLjM3NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] 
                              checked:bg-no-repeat checked:bg-center checked:border-none`}
                              />
                            </td>
                          )}
                          <td className={'border border-gray-80 bg-gray-90'}>{item.tradeNumber}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>{item.applyDate}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>{item.ipAddress}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>
                            {convertMembershipGrade(item.authorRank)}
                          </td>
                          <td className={'border border-gray-80 bg-gray-90'}>{item.loginId}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>{item.name}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>{item.partnerName}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>{convertBank(item.bank)}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>{item.accountHolder}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>{item.accountNumber}</td>
                          <td className={'border border-gray-80 bg-gray-90'}>
                            {item.requestAmount?.toLocaleString('ko-KR') || 0}
                          </td>
                          <td className={'border border-gray-80 bg-gray-90'}>
                            {item.bonusAmount?.toLocaleString('ko-KR') || 0}
                          </td>
                          <td className={'border border-gray-80'}>
                            <input
                              type={'text'}
                              value={paymentAmounts[item.dealingId] || ''}
                              onChange={(event) =>
                                handlePaymentAmountChange(item.dealingId.toString(), event.target.value)
                              }
                              className={'text-gray-10 disabled:text-gray-50 text-end font-pre-13-r-130 p-2.5'}
                              placeholder={'직접입력'}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}
              </table>
            </div>
          </div>

          <div className={'rounded-2xl border border-gray-80 p-5 flex flex-col gap-2.5'}>
            <div className={'flex gap-1 items-center'}>
              <IconLine24SquareInfo className={'text-purple-fmg70'} />
              <div className={'text-gray-0 font-pre-16-m-130 py-1'}>지급 동의</div>
            </div>

            <label className={'flex gap-2 items-center'}>
              <input
                type={'checkbox'}
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className={
                  'appearance-none w-[18px] h-[18px] rounded-full border border-gray-80 bg-gray-90 checked:bg-primary-50 checked:bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDMuNUw0LjUgOUwyIDYuNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==")] checked:bg-no-repeat checked:bg-center checked:border-primary-50'
                }
              />
              <div className={'font-pre-13-r-130'}>
                코인 구매에 대한 코인 수량 및 사용자의 정보를 확인 했으며, 해당 코인을 지급합니다.
              </div>
            </label>
          </div>

          <div className={'flex justify-end gap-2'}>
            <button
              className={
                'text-gray-10 font-pre-16-m-130 w-[90px] h-12 px-4 flex justify-center items-center border border-gray-80 rounded-[60px]'
              }
              onClick={handleClose}
            >
              취소
            </button>
            <button
              disabled={!isChecked}
              className={
                'text-gray-100 bg-primary-50 transition disabled:text-gray-50 disabled:bg-gray-90 font-pre-16-m-130 w-[90px] h-12 px-4 flex justify-center items-center rounded-[60px] '
              }
              onClick={handlePaymentClick}
            >
              지급
            </button>
          </div>
        </div>
      </Modal>

      <BonusCoinModal
        isOpen={isBonusModalOpen}
        onClose={() => setIsBonusModalOpen(false)}
        onComplete={handleBonusComplete}
        hasExistingValue={hasExistingPaymentAmounts}
      />

      <ConfirmRowModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleAdminPurchaseManager}
        icon={
          <div className={'relative p-2.5 bg-primary-95 rounded-[35px]'}>
            <IconLine24RoundWarning className={'absolute top-0 left-0'} />
          </div>
        }
        title={'코인지급'}
        content={'해당 회원에게 코인을 지급합니다.\n계속 진행 하시겠습니까?'}
        cancelText={'취소'}
        confirmText={'확인'}
      />
    </>
  );
}
