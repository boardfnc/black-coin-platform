import type { SVGProps } from 'react';

type IconLine24PlusProps = SVGProps<SVGSVGElement>;

export default function IconLine24Plus(props: IconLine24PlusProps) {
  return (
    <svg xmlns={'http://www.w3.org/2000/svg'} width={'18'} height={'18'} viewBox={'0 0 18 18'} fill={'none'} {...props}>
      <path
        d={'M2.8125 9H15.1875'}
        stroke={'currentColor'}
        strokeWidth={'1.5'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d={'M9 2.8125V15.1875'}
        stroke={'currentColor'}
        strokeWidth={'1.5'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  );
}
