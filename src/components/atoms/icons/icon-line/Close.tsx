import type { SVGProps } from 'react';

type IconLine24CloseProps = SVGProps<SVGSVGElement>;

export default function IconLine24Close(props: IconLine24CloseProps) {
  return (
    <svg xmlns={'http://www.w3.org/2000/svg'} width={'24'} height={'24'} viewBox={'0 0 24 24'} fill={'none'} {...props}>
      <path
        d={'M6 6L18 18M6 18L18 6'}
        stroke={'currentColor'}
        strokeWidth={'1.5'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  );
}
