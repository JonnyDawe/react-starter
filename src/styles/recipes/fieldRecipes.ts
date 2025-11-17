import { appTwVariants } from '@/lib/helpers/tailwind-utils';

import { focusRing } from './focusRing';

export const fieldBorderStyles = appTwVariants({
  variants: {
    isFocused: {
      true: 'border-accent-a8',
      false: 'border-app-border',
    },
    isInvalid: {
      true: 'border-2 border-accent-10',
    },
    isDisabled: {
      true: 'opacity-50',
    },
  },
});

export const fieldGroupStyles = appTwVariants({
  extend: focusRing,
  base: 'group flex h-9 min-h-9 items-center overflow-hidden rounded-sm border',
  variants: {
    isFocusWithin: fieldBorderStyles.variants.isFocused,
    isInvalid: fieldBorderStyles.variants.isInvalid,
    isDisabled: fieldBorderStyles.variants.isDisabled,
  },
});

export const labelStyles = appTwVariants({
  base: 'mt-1 flex min-w-max text-base text-pretty',
  variants: {
    requiredHint: {
      true: 'after:ms-0.5 after:text-accent-9 after:content-["*"]',
    },
  },
});

export const descriptionStyles = appTwVariants({
  base: 'text-sm',
});

export const fieldErrorStyles = appTwVariants({
  base: 'text-accent-10',
});

export const inputStyles = appTwVariants({
  extend: focusRing,
  base: 'placeholder:text-gray-11a h-9 min-h-9 rounded-sm border px-2',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocused,
    isInvalid: fieldBorderStyles.variants.isInvalid,
    isDisabled: fieldBorderStyles.variants.isDisabled,
  },
});

export const textAreaStyles = appTwVariants({
  extend: focusRing,
  base: 'h-32 min-h-32 w-full rounded-sm border bg-transparent px-2 placeholder:text-gray-11',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocused,
    isInvalid: fieldBorderStyles.variants.isInvalid,
    isDisabled: fieldBorderStyles.variants.isDisabled,
  },
});
