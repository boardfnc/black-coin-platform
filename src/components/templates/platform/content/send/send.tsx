import { Image } from '@/components/atoms/images';
import { homeBackground, mainObject } from '@/images/background';

export default function HomePage() {
  return (
    <div className={'w-full overflow-x-hidden'}>
      <div className={'my-15'}>
        <div>
          <div className={'relative w-full h-[800px]'}>
            <Image className={'object-cover'} src={homeBackground} alt={'home-background'} fill quality={100} />

            <div
              className={'absolute w-full flex items-center h-[250px] bottom-[174px] left-0 bg-gray-50/20 p-5 sm:p-0'}
            >
              <div className={'max-w-[1320px] w-full mx-auto flex flex-col gap-5'}>
                <div>
                  <div className={'text-white font-pre-20-600-130 sm:font-pre-26-b-130'}>블록체인 기술 기반</div>
                  <div className={'text-gray-100 font-suit-35-800-110 sm:font-suit-60-800-110'}>Service Name</div>
                </div>

                <div className={'flex flex-col gap-1.5'}>
                  <div className={'text-gray-100 font-suit-15-300-130 sm:font-suit-22-300-130'}>
                    탈중앙화 변조 방지 시스템으로 효율적인 결제 계정을 구축.
                  </div>

                  <div className={'text-gray-100 font-suit-15-300-130 sm:font-suit-22-300-130'}>
                    Service Name은 트레이더들의 권익 보호를 위해 언제나 보안을 신경쓰고 있습니다.
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
