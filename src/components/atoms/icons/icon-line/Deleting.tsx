import type { SVGProps } from "react";

type IconLine24DeletingProps = SVGProps<SVGSVGElement>;

export default function IconLine24Deleting ({
  className,
}: IconLine24DeletingProps) {
  return (
    <svg
      className={`${className}`}
      fill={"none"}
      height={"18"}
      viewBox={"0 0 18 18"}
      width={"18"}
      xmlns={"http://www.w3.org/2000/svg"}
    >
      <path
        d={"M2.16946 11.625V11.6945C2.16946 14.0171 4.05235 15.9 6.37502 15.9H11.625C13.9415 15.9 15.8195 14.0221 15.8195 11.7056V11.625V6.37502C15.8195 4.09684 13.9726 2.25001 11.6945 2.25H11.625L6.37502 2.25002H6.29446C4.01629 2.25002 2.16946 4.09684 2.16946 6.37502V11.625Z"}
        fill={"#FF6C5C"}
      />

      <path
        d={"M6.19043 6.75L12 11.25M6.19043 11.25L12 6.75"}
        stroke={"white"}
        strokeLinecap={"round"}
      />
    </svg>
  );
};
