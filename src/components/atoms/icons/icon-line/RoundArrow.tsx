import type { SVGProps } from "react";

type IconLine24RoundArrowProps = SVGProps<SVGSVGElement>;

export default function IconLine24RoundArrow(props: IconLine24RoundArrowProps) {
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      width={"24"}
      height={"24"}
      viewBox={"0 0 24 24"}
      fill={"none"}
      {...props}
    >
      <path d={"M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"} stroke={'currentColor'} strokeLinecap={"round"} strokeLinejoin={"round"}/>

      <path d={"M15 10.5L12.64 13.6467C12.32 14.0733 11.68 14.0733 11.36 13.6467L9 10.5"} stroke={'currentColor'} strokeLinecap={"round"} strokeLinejoin={"round"} />
    </svg>
  );
}
