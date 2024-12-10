import { Image } from '@/components/atoms/images';
import { contentsArea, contentsArea2 } from '@/mocks/images';

export default function MainPage() {
  return (
    <div className={'w-full h-full bg-gray-100'}>
      <div className={'p-5'}>
        <div className={'flex flex-col gap-5'}>
          <Image src={contentsArea} alt={'contents-area'} quality={100} />

          <Image src={contentsArea2} alt={'contents-area-2'} quality={100} />
        </div>
      </div>
    </div>
  );
}
