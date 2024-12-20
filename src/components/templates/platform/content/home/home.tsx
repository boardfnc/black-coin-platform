import Link from 'next/link';

import { Image } from '@/components/atoms/images';
import { ROUTES } from '@/constants';
import {
  homeBackground,
  blueUserIcon,
  chartIcon,
  blockChainObject,
  privacyImage,
  mainObject,
} from '@/images/background';

export const information = [
  {
    title: '고급보안',
    description:
      'PG사 수준에서 은행 수준의 보안 시스템을 목표로 지속적이며 주기적으로 보안업데이트를 진행하며, 내부직원 등급별 체계를 구축하여 고객자산을 상시 보호합니다.',
    image: privacyImage,
  },
  {
    title: '손쉬운 사용',
    description:
      '모든 사용자가 쉽게 설정 가능하고 자세하고 보기 쉬운 차트를 제공하여 이용하는 고객들이 더욱 편리하게 자산을 분석하고 관리할 수 있도록 데이터를 제공합니다.',
    image: chartIcon,
  },
  {
    title: '데이터 투명성',
    description:
      '분산형 블록체인 네트워크를 통해 투명성을 사용하여 사용자 간의 신뢰에 대한 필요성을 줄여 사용자의 피로도를 완화합니다.',
    image: blockChainObject,
  },
  {
    title: '사용자 편리성',
    description:
      'PC / 모바일 / 태블릿 등 모든 기기에 최적화된 화면을 제공하여 사용자는 어디에서 접근하여도 편리한 환경을 제공합니다.',
    image: blueUserIcon,
  },
];

export default function HomePage() {
  return (
    <div className={'w-full overflow-x-hidden'}>
      <div className={'my-15'}>
        <div>
          <div className={'relative w-full h-[500px] mobile:h-[800px]'}>
            <Image className={'object-cover'} src={homeBackground} alt={'home-background'} fill priority />

            <div
              className={
                'absolute w-full flex items-center h-[250px] mobile:bottom-[174px] bottom-[100px] left-0 bg-gray-50/20 p-5 sm:p-0'
              }
            >
              <div className={'max-w-[1320px] w-full mx-auto flex flex-col gap-5'}>
                <div>
                  <div className={'text-white font-pre-20-600-130 sm:font-pre-26-b-130'}>블록체인 기술 기반</div>
                  <div className={'text-gray-100 font-suit-35-800-110 sm:font-suit-60-800-110'}>Black Coin</div>
                </div>

                <div className={'flex flex-col gap-1.5'}>
                  <div className={'text-gray-100 font-suit-15-300-130 sm:font-suit-22-300-130'}>
                    탈중앙화 변조 방지 시스템으로 효율적인 결제 계정을 구축.
                  </div>

                  <div className={'text-gray-100 font-suit-15-300-130 sm:font-suit-22-300-130'}>
                    Black Coin은 트레이더들의 권익 보호를 위해 언제나 보안을 신경쓰고 있습니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={'px-5 sm:px-0'}>
          <div className={'pb-[75px] '}>
            <div className={'max-w-[1320px] mx-auto pt-10 sm:pt-[60px] pb-20 border-b border-gray-0'}>
              <div className={'flex flex-col gap-[60px]'}>
                <div className={'flex flex-col text-gray-20 font-suit-22-r-130 gap-5'}>
                  <div className={'text-gray-0 font-pre-35-400-130 sm:font-pre-40-r-130 letter-spacing-[0.04px]'}>
                    Black Coin
                  </div>

                  <div className={'text-gray-20 font-suit-18-400-140 sm:font-suit-22-r-140 whitespace-pre-line'}>
                    {`보안성 및 안정성이 입증된 콜드월렛의 코어 솔루션으로 전용 지갑을 제작하여 고객님들의 코인을 안정하게 보관할 수 있습니다.\n코인 지갑은 PC, 모바일, 태블릿 등 모든 기기에 최적화된 화면으로 구성되어 있어 어디에서 접근하여도 편리한 환경을 제공합니다.\n또한, 직관적이고 간편한 결제 시스템을 제공하여 다양한 서비스를 누구나 쉽게 이용가능합니다.\n또한, 고급 기술을 통해 고객이 소유하고 있는 자산을 디지털화 하여 작은 단위로 분할, 이를 블록체인을 통해 소유 및 이관할 수 있도록 했으며, Private Key를 개인이 보관하기 때문에 서버의 해킹으로 부터 안전하며, 분실 시에도 복구 단어 등의 고급 보안 수단을 통해 완벽한 복구가 가능합니다.`}
                  </div>
                </div>

                <div className={'grid grid-cols-1 tablet2:grid-cols-2 sm:flex sm:flex-row gap-[30px]'}>
                  {information.map((item) => (
                    <div key={item.title} className={'flex-1 flex flex-col gap-5'}>
                      <div className={'relative h-[335px] border border-line-line02 bg-[#F4F7FE]'}>
                        <Image
                          className={'object-scale-down'}
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes={'(min-width: 1367px) 100vw, (min-width: 768px) 50vw, 33vw'}
                        />
                      </div>

                      <div className={'flex flex-col gap-4'}>
                        <div className={'text-gray-10 font-suit-22-b-130'}>{item.title}</div>
                        <div className={'text-gray-20 font-suit-18-400-156'}>{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={'max-w-[1320px] mx-auto mb-[150px]'}>
            <div className={'flex flex-col gap-[120px] sm:gap-[150px]'}>
              <div className={'relative w-full h-[390px] sm:h-[600px]'}>
                <Image className={'object-cover'} src={mainObject} alt={'main-object'} fill />
              </div>

              <div className={'flex flex-col gap-[30px]'}>
                <div
                  className={
                    'text-center text-gray-10 font-suit-26-500-130 tablet:font-suit-28-500-130 sm:font-suit-32-500-130'
                  }
                >
                  전문 개발팀을 통해
                  <span className={'hidden mobile:inline'}>{` `}</span>
                  <br className={'block mobile:hidden'} />
                  강력한 보안 시스템을 만들어
                  <br />
                  고객의 자산을 상시 보호 합니다.
                </div>

                <div className={'w-full sm:w-[350px] h-14 mx-auto'}>
                  <div className={'w-full h-full border border-gray-0 text-gray-0 font-suit-17-m-130'}>
                    <Link href={ROUTES.PLATFORM.LOGIN} className={'h-full flex justify-center items-center'}>
                      Join Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
