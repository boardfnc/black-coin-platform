import type { SVGProps } from 'react';

type IconLine24ConfirmProps = SVGProps<SVGSVGElement>;

export default function IconLine24Confirm(props: IconLine24ConfirmProps) {
  return (
    <svg xmlns={'http://www.w3.org/2000/svg'} width={'20'} height={'20'} viewBox={'0 0 20 20'} fill={'none'} {...props}>
      <path
        d={
          'M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z'
        }
        fill={'currentColor'}
      />
      <path
        d={'M6.66663 10.717L8.75729 13.04L12.7066 7'}
        stroke={'white'}
        strokeWidth={'1.25'}
        strokeMiterlimit={'10'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  );
}
