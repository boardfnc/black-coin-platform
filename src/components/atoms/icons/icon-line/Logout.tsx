import type { SVGProps } from 'react';

type IconLine24ArrowProps = SVGProps<SVGSVGElement>;

export default function IconLine24Logout(props: IconLine24ArrowProps) {
  return (
    <svg xmlns={'http://www.w3.org/2000/svg'} width={'18'} height={'18'} viewBox={'0 0 18 18'} fill={'none'} {...props}>
      <path
        d={
          'M10.125 2.25H7.125V2.25C5.05393 2.25 3.375 3.92893 3.375 6V6.75V11.625V12C3.375 14.0711 5.05393 15.75 7.125 15.75V15.75H10.125'
        }
        stroke={'#F8F8FA'}
        strokeWidth={'1.125'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d={'M7.125 8.625H13.125M13.125 8.625L10.875 6.375M13.125 8.625L10.875 10.875'}
        stroke={'#F8F8FA'}
        strokeWidth={'1.125'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  );
}
