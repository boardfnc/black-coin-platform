import type { SVGProps } from 'react';

type IconLine24ArrowProps = SVGProps<SVGSVGElement>;

export default function IconLine24Arrow(props: IconLine24ArrowProps) {
  return (
    <svg fill={'none'} height={'24'} viewBox={'0 0 24 24'} width={'24'} xmlns={'http://www.w3.org/2000/svg'} {...props}>
      <path
        d={'M7 9L10.8477 13.6172C11.4474 14.3368 12.5526 14.3368 13.1523 13.6172L17 9'}
        stroke={'currentColor'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
    </svg>
  );
}
