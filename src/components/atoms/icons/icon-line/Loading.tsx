import type { SVGProps } from 'react';

type IconLine16LoadingProps = SVGProps<SVGSVGElement>;

export default function IconLine16Loading(props: IconLine16LoadingProps) {
  return (
    <svg xmlns={'http://www.w3.org/2000/svg'} width={'16'} height={'16'} viewBox={'0 0 16 16'} fill={'none'} {...props}>
      <path
        d={
          'M8 4V2M8 14V12M4 8H2M13 8H12M5.41421 5.41421L4 4M11.2929 11.2929L12 12M5.41421 10.5858L4 12M11.7071 4.29289L11 5'
        }
        stroke={'#28282A'}
        strokeWidth={'1.5'}
        strokeLinecap={'round'}
      />
    </svg>
  );
}
