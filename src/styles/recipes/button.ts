import type { VariantProps } from 'tailwind-variants';

import { appTwVariants } from '@/lib/helpers/tailwind-utils';
import { focusRing, insetFocusRing } from '@/styles/recipes/focusRing';

const primaryButtonStyles = appTwVariants({
  base: 'rounded-sm border-transparent bg-accent-solid text-accent-contrast shadow-sm active:brightness-92 active:saturate-110 disabled:bg-accent-9/70',
});

const mapButtonStyles = appTwVariants({
  base: `${primaryButtonStyles.base} rounded-xs`,
  variants: {
    size: {
      sm: 'h-6 w-6 md:h-8 md:w-8',
      md: 'h-8 w-8 md:h-10 md:w-10',
      lg: 'h-10 w-10 md:h-12 md:w-12',
    },
  },
});

export const buttonRecipe = appTwVariants({
  base: 'border-1px pointer-events-auto inline-flex h-fit cursor-pointer items-center justify-center text-nowrap no-underline',
  variants: {
    variant: {
      primary: primaryButtonStyles(),
      mapButton: mapButtonStyles(),
      outline:
        'border-1 border-accent-a10 text-accent hover:border-accent-9 hover:bg-accent-a2 active:bg-accent-a3',
      surface: 'border-transparent hover:bg-gray-a3 active:bg-gray-a4',
    },
    size: {
      sm: 'h-6 gap-1 rounded-xs px-1 py-0.5 text-xs',
      md: 'h-8 gap-2 rounded-sm px-1.5 py-1 text-base',
      lg: 'h-10 gap-2 rounded-sm px-2 py-2 text-lg',
    },
    isDisabled: {
      true: 'cursor-not-allowed opacity-45 hover:text-gray-a10',
    },
    IconButton: {
      true: 'p-0',
    },
    contained: {
      true: 'rounded-none',
    },
    isFocused: {
      true: '',
      false: '',
    },
    insetFocusRing: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      isFocusVisible: true,
      insetFocusRing: true,
      className: insetFocusRing({ isFocusVisible: true }),
    },
    {
      isFocusVisible: false,
      insetFocusRing: true,
      className: insetFocusRing({ isFocusVisible: false }),
    },
    {
      isFocusVisible: true,
      insetFocusRing: false,
      className: focusRing({ isFocusVisible: true }),
    },
    {
      isFocusVisible: false,
      insetFocusRing: false,
      className: focusRing({ isFocusVisible: false }),
    },
    {
      variant: 'mapButton',
      size: 'md',
      className: mapButtonStyles({ size: 'md' }),
    },
    {
      variant: 'mapButton',
      size: 'lg',
      className: mapButtonStyles({ size: 'lg' }),
    },
    {
      variant: 'mapButton',
      size: 'sm',
      className: mapButtonStyles({ size: 'sm' }),
    },
    {
      variant: 'mapButton',
      contained: true,
      className: 'rounded-none',
    },
  ],
  defaultVariants: {
    size: 'md',
    insetFocusRing: false,
  },
});

export type ButtonVariantProps = VariantProps<typeof buttonRecipe>;
