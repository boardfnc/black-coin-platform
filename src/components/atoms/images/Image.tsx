import NextImage from 'next/image';

import type { ComponentProps } from 'react';

type ILazyImageProps = Partial<ComponentProps<typeof NextImage>>;

export default function Image({ src, alt, ...restProps }: ILazyImageProps) {
  const imageSource = src || '';
  const altText = alt || '';

  return <NextImage src={imageSource} alt={altText} quality={100} {...restProps} />;
}
