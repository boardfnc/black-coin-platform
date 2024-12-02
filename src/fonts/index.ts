import localFont from "next/font/local";

export const pretendardFont = localFont({
  src: [
    {
      path: "../fonts/pretendard/Pretendard-Thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/pretendard/Pretendard-ExtraLight.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/pretendard/Pretendard-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/pretendard/Pretendard-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/pretendard/Pretendard-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/pretendard/Pretendard-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/pretendard/Pretendard-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/pretendard/Pretendard-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/pretendard/Pretendard-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
});

export const suitFont = localFont({
  src: [
    {
      path: "../fonts/suit/Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/suit/ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/suit/Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/suit/Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/suit/Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/suit/SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/suit/Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/suit/ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/suit/Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-suit",
});
