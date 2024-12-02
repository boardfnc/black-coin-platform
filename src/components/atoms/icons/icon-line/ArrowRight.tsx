import type { SVGProps } from 'react';

type IconLine24ArrowRightProps = SVGProps<SVGSVGElement>;

export default function IconLine24ArrowRight(props: IconLine24ArrowRightProps) {
  return (
    <svg
      xmlns={'http://www.w3.org/2000/svg'}
      width={'24'}
      height={'24'}
      viewBox={'0 0 24 24'}
      fill={'none'}
      preserveAspectRatio={'none'}
      {...props}
    >
      <path
        d={'M9 7L13.6172 10.8477C14.3368 11.4474 14.3368 12.5526 13.6172 13.1523L9 17'}
        stroke={'currentColor'}
        strokeWidth={'1.5'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  );
}
