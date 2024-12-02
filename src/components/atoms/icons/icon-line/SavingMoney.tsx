import type { SVGProps } from 'react';

type IconLineSavingMoneyProps = SVGProps<SVGSVGElement>;

export default function IconLineSavingMoney(props: IconLineSavingMoneyProps) {
  return (
    <svg xmlns={'http://www.w3.org/2000/svg'} width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'} {...props}>
      <g filter={'url(#filter0_i_16_14120)'}>
        <path
          d={
            'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
          }
          fill={'currentColor'}
        />
      </g>
      <path
        d={'M5.5 8L8.31274 17L12 9L15.5 17L18.89 8'}
        stroke={'white'}
        strokeWidth={'1.5'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path d={'M4.5 12H19.5'} stroke={'white'} strokeWidth={'1.5'} strokeLinecap={'round'} strokeLinejoin={'round'} />
      <defs>
        <filter
          id={'filter0_i_16_14120'}
          x={'2'}
          y={'2'}
          width={'22'}
          height={'22'}
          filterUnits={'userSpaceOnUse'}
          colorInterpolationFilters={'sRGB'}
        >
          <feFlood floodOpacity={'0'} result={'BackgroundImageFix'} />
          <feBlend mode={'normal'} in={'SourceGraphic'} in2={'BackgroundImageFix'} result={'shape'} />
          <feColorMatrix
            in={'SourceAlpha'}
            type={'matrix'}
            values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'}
            result={'hardAlpha'}
          />
          <feOffset dx={'2'} dy={'2'} />
          <feGaussianBlur stdDeviation={'2'} />
          <feComposite in2={'hardAlpha'} operator={'arithmetic'} k2={'-1'} k3={'1'} />
          <feColorMatrix type={'matrix'} values={'0 0 0 0 0.682682 0 0 0 0 0.79057 0 0 0 0 1 0 0 0 0.25 0'} />
          <feBlend mode={'normal'} in2={'shape'} result={'effect1_innerShadow_16_14120'} />
        </filter>
      </defs>
    </svg>
  );
}
