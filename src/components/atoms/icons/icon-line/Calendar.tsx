import type { SVGProps } from 'react';

type IconLine24CalendarProps = SVGProps<SVGSVGElement>;

export default function IconLine24Calendar(props: IconLine24CalendarProps) {
  return (
    <svg xmlns={'http://www.w3.org/2000/svg'} width={'20'} height={'20'} viewBox={'0 0 20 20'} fill={'none'} {...props}>
      <path
        d={
          'M6.24967 3.3335H13.7497C16.0509 3.3335 17.9163 5.19898 17.9163 7.50016V14.1668C17.9163 16.468 16.0509 18.3335 13.7497 18.3335H6.24967C3.94849 18.3335 2.08301 16.468 2.08301 14.1668V7.50016C2.08301 5.19898 3.94849 3.3335 6.24967 3.3335Z'
        }
        stroke={'#666970'}
        strokeWidth={'1.25'}
      />
      <path
        d={'M7.08301 1.6665V4.99984M12.9163 1.6665V4.99984'}
        stroke={'#666970'}
        strokeWidth={'1.25'}
        strokeLinecap={'round'}
      />
      <path d={'M2.08301 8.3335H17.9163'} stroke={'#666970'} strokeWidth={'1.25'} strokeLinecap={'round'} />
      <path
        d={'M8.5 12.0835L9.65858 10.925C9.78457 10.799 10 10.8882 10 11.0664V15.3247M8.5 15.3247H11.5'}
        stroke={'#666970'}
        strokeWidth={'1.5'}
        strokeLinecap={'round'}
      />
    </svg>
  );
}
