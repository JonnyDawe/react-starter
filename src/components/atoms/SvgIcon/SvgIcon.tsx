import type { IconName } from '@/lib/types/Icons.gen.ts';

import React from 'react';
import { appTwVariants } from '@/lib/helpers/tailwind-utils';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName
  size?: number | string
  color?: string
  inline?: boolean
}

const iconRecipe = appTwVariants({
  base: 'block align-middle select-none',
  variants: {
    inline: {
      true: 'mr-1 inline-block align-middle',
    },
  },
});

export const SvgIcon: React.FC<IconProps> = React.forwardRef<SVGSVGElement, IconProps>(
  (
    { name, size = 12, color = 'currentColor', className, style, inline = false, ...props },
    ref,
  ) => (
    <svg
      aria-hidden
      ref={ref}
      className={iconRecipe({ inline, className })}
      width={size}
      height={size}
      fill={color}
      style={{
        ...style,
      }}
      {...props}
    >
      <use xlinkHref={`/svg/sprites.svg#${name}`} />
    </svg>
  ),
);
