import type { SVGProps } from 'react';

type IconLine24RoundWarningProps = SVGProps<SVGSVGElement>;

export default function IconLine24RoundWarning(props: IconLine24RoundWarningProps) {
  return (
    <svg xmlns={'http://www.w3.org/2000/svg'} width={'25'} height={'25'} viewBox={'0 0 25 25'} fill={'none'} {...props}>
      <path
        d={
          'M12.5 21.5C17.4706 21.5 21.5 17.4706 21.5 12.5C21.5 7.52944 17.4706 3.5 12.5 3.5C7.52944 3.5 3.5 7.52944 3.5 12.5C3.5 17.4706 7.52944 21.5 12.5 21.5Z'
        }
        stroke={'currentColor'}
        strokeWidth={'1.5'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d={
          'M12.6501 15.25C12.2359 15.25 11.9001 15.5858 11.9001 16C11.9001 16.4142 12.2359 16.75 12.6501 16.75V15.25ZM12.6601 16.75C13.0743 16.75 13.4101 16.4142 13.4101 16C13.4101 15.5858 13.0743 15.25 12.6601 15.25V16.75ZM11.8711 13.3934C11.8711 13.8076 12.2069 14.1434 12.6211 14.1434C13.0353 14.1434 13.3711 13.8076 13.3711 13.3934H11.8711ZM13.3711 8C13.3711 7.58579 13.0353 7.25 12.6211 7.25C12.2069 7.25 11.8711 7.58579 11.8711 8H13.3711ZM12.6501 16.75H12.6601V15.25H12.6501V16.75ZM11.8711 12.5V13.3934H13.3711V12.5H11.8711ZM13.3711 12.5V8H11.8711V12.5H13.3711Z'
        }
        fill={'currentColor'}
      />
    </svg>
  );
}
