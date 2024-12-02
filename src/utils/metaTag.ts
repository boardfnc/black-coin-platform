import type { Metadata } from 'next';

import {
  PLATFORM_FAVICON,
  PLATFORM_NAME,
  PLATFORM_NAME_ENGLISH,
  PLATFORM_SPLASH_IMAGE,
  PLATFORM_URL,
} from '@/constants';

export const defaultMetaTag = {
  metadataBase: new URL(PLATFORM_URL),
  title: PLATFORM_NAME,
  description: `원단, 부자재까지 내 취향의 모든 것을 담은 1등 원단 쇼핑앱, ${PLATFORM_NAME}(${PLATFORM_NAME_ENGLISH})과 함께 원단, 부자재의 모든 것을 쇼핑하세요.`,
  icons: PLATFORM_FAVICON,
  robots: 'all',
  openGraph: {
    type: 'website',
    title: PLATFORM_NAME,
    description: `원단, 부자재까지 내 취향의 모든 것을 담은 1등 원단 쇼핑앱, ${PLATFORM_NAME}(${PLATFORM_NAME_ENGLISH})과 함께 원단, 부자재의 모든 것을 쇼핑하세요.`,
    images: PLATFORM_SPLASH_IMAGE,
  },
  twitter: {
    creator: '@onefabric',
    card: 'summary_large_image',
    title: PLATFORM_NAME,
    description: `원단, 부자재까지 내 취향의 모든 것을 담은 1등 원단 쇼핑앱, ${PLATFORM_NAME}(${PLATFORM_NAME_ENGLISH})과 함께 원단, 부자재의 모든 것을 쇼핑하세요.`,
    images: PLATFORM_SPLASH_IMAGE,
  },
} satisfies Metadata;

export const metaTag = (params?: Partial<Metadata> & { images?: string }): Metadata => {
  const paramsInTitle = params?.title ?? defaultMetaTag.title;

  const title = paramsInTitle === PLATFORM_NAME ? defaultMetaTag.title : paramsInTitle + ` - ${PLATFORM_NAME}`;
  const description = params?.description ?? defaultMetaTag.description;
  const icons = params?.icons ?? { icon: defaultMetaTag.icons, shortcut: defaultMetaTag.icons };
  const images = params?.images ?? defaultMetaTag?.openGraph?.images;

  const shareParams = {
    title,
    description,
  };

  return {
    ...defaultMetaTag,
    ...shareParams,
    icons,

    openGraph: {
      ...defaultMetaTag.openGraph,
      ...shareParams,
      images,
    },
    twitter: {
      ...defaultMetaTag.twitter,
      ...shareParams,
      images,
    },
    verification: {
      google: '',
    },
  };
};
