import { useCallback } from 'react';

import type { ISaleGeneralCoinHistoryModalProps } from './SaleGeneralCoinHistoryModal.types';

import IconLine24Close from '@/components/atoms/icons/icon-line/Close';
import Modal from '@/components/atoms/modals/Modal';
import { useFetch } from '@/hooks';
import { adminSaleMemberHistoryService } from '@/services/admin/coin/adminSale';
import { convertDealStatus, convertMembershipGrade, convertBank } from '@/utils/covert';

export default function SaleGeneralCoinHistoryModal(props: ISaleGeneralCoinHistoryModalProps) {
  const { coinHistoryModalTableData, isOpen, onClose } = props;

  const fetchCoinHistory = useCallback(
    () =>
      adminSaleMemberHistoryService({
        mber_id: coinHistoryModalTableData.memberId,
        page: 1,
        per_page: Number.MAX_SAFE_INTEGER,
      }),
    [coinHistoryModalTableData],
  );

  const { data } = useFetch(fetchCoinHistory, { enabled: isOpen && coinHistoryModalTableData != null });

  const coinPurchaseHistoryData = data?.data?.map((item) => ({
    tradeNumber: item.delng_no,
    applyDate: item.created_at,
    status: item.delng_sttus,
    purchaseCount: item.delng_qy,
    bonusCount: item.bnus_qy,
    purchaseCompleteCount: item.compt_qy,
    ipAddress: item.reg_ip,
  }));

  const handleClose = () => onClose();

  if (coinHistoryModalTableData == null || isOpen === false) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} width={'960px'} height={'700px'}>
      <div className={'flex flex-col gap-[30px] px-2.5'}>
        <div className={'flex items-center justify-between gap-2 pt-1 pb-3'}>
          <div className={'text-gray-0 font-pre-20-m-130'}>코인 판매 이력</div>
          <button className={'text-gray-0 font-pre-13-r-130'} onClick={handleClose}>
            <IconLine24Close className={'text-gray-10'} />
          </button>
        </div>

        <div className={'flex flex-row gap-6'}>
          <div className={'w-[220px] flex flex-col gap-[2px]'}>
            <span className={'w-fit p-1 text-orange-orange50 font-pre-11-r-113 border border-gray-80 rounded-[4px]'}>
              일반회원
            </span>
            <div className={'font-suit-24-b-130 text-gray-0'}>{coinHistoryModalTableData.loginId}</div>
          </div>

          <div className={'flex-1'}>
            <div className={'h-[120px] flex flex-col justify-between p-5 border rounded-2xl'}>
              <div className={'flex flex-row justify-between items-center'}>
                <div className={'text-gray-40 font-pre-14-m-130'}>회원명</div>
                <div className={'font-pre-16-r-130 text-gray-0'}>{coinHistoryModalTableData.name}</div>
              </div>

              <div className={'flex flex-row justify-between items-center'}>
                <div className={'text-gray-40 font-pre-14-m-130'}>회원등급</div>
                <div className={'font-pre-16-r-130 text-gray-0'}>
                  {convertMembershipGrade(Number(coinHistoryModalTableData.authorRank))}
                </div>
              </div>

              <div className={'flex flex-row justify-between items-center'}>
                <div className={'text-gray-40 font-pre-14-m-130'}>파트너사명</div>
                <div className={'font-pre-16-r-130 text-gray-0'}>{coinHistoryModalTableData.partnerName}</div>
              </div>
            </div>
          </div>

          <div className={'flex-1'}>
            <div className={'h-[120px] flex flex-col justify-between p-5 border rounded-2xl'}>
              <div className={'flex flex-row justify-between items-center'}>
                <div className={'text-gray-40 font-pre-14-m-130'}>은행명</div>
                <div className={'font-pre-16-r-130 text-gray-0'}>{convertBank(coinHistoryModalTableData.bank)}</div>
              </div>

              <div className={'flex flex-row justify-between items-center'}>
                <div className={'text-gray-40 font-pre-14-m-130'}>예금주</div>
                <div className={'font-pre-16-r-130 text-gray-0'}>{coinHistoryModalTableData.accountHolder}</div>
              </div>

              <div className={'flex flex-row justify-between items-center'}>
                <div className={'text-gray-40 font-pre-14-m-130'}>계좌번호</div>
                <div className={'font-pre-16-r-130 text-gray-0'}>{coinHistoryModalTableData.accountNumber}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={'h-[360px] overflow-y-auto'}>
          <table className={'w-full border-collapse'}>
            <thead className={'sticky top-0 z-10'}>
              <tr className={'h-8 bg-orange-orange95'}>
                <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>거래번호</th>
                <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>일자</th>
                <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>상태</th>
                <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>판매요청수량</th>
                <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>지급금액</th>
                <th className={'text-gray-20 font-pre-13-m-130 border border-gray-80'}>IP 주소</th>
              </tr>
            </thead>

            <tbody>
              {coinPurchaseHistoryData?.map((item, index) => (
                <tr key={index} className={'h-10 text-center'}>
                  <td className={'text-gray-20 font-pre-13-r-130 border border-gray-80 py-1 px-2.5'}>
                    {item.tradeNumber}
                  </td>
                  <td className={'text-gray-20 font-pre-13-r-130 border border-gray-80 py-1 px-2.5'}>
                    {item.applyDate}
                  </td>
                  <td className={'w-[70px] text-gray-20 font-pre-13-r-130 border border-gray-80 py-1 px-2.5'}>
                    {convertDealStatus(item.status)}
                  </td>
                  <td className={'text-gray-20 font-pre-13-r-130 border border-gray-80 text-end py-1 px-2.5'}>
                    {item.purchaseCount?.toLocaleString('ko-KR') || 0}
                  </td>
                  <td className={'text-gray-20 font-pre-13-r-130 border border-gray-80 text-end py-1 px-2.5'}>
                    {item.purchaseCompleteCount?.toLocaleString('ko-KR') || 0}
                  </td>
                  <td className={'text-gray-20 font-pre-13-r-130 border border-gray-80 py-1 px-2.5'}>
                    {item.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={'flex justify-end'}>
          <button
            className={
              'text-gray-10 font-pre-16-m-130 w-[90px] h-12 px-4 flex justify-center items-center border border-gray-80 rounded-[60px]'
            }
            onClick={handleClose}
          >
            닫기
          </button>
        </div>
      </div>
    </Modal>
  );
}
