import { appTwVariants } from '@/lib/helpers/tailwind-utils';

import { focusRing } from './focusRing';

export const fieldStyles = appTwVariants({
  base: 'group flex flex-col gap-1',
});

export const labelStyles = appTwVariants({
  base: 'mt-1 flex min-w-max text-sm font-medium text-pretty',
  variants: {
    requiredHint: {
      true: 'after:ms-0.5 after:text-accent-9 after:content-["*"]',
    },
  },
});

export const fieldErrorStyles = appTwVariants({
  base: 'text-accent-10 text-sm font-medium',
});

export const descriptionStyles = appTwVariants({
  base: 'text-sm',
});

export const fieldBorderStyles = appTwVariants({
  extend: focusRing,
  base: 'border rounded-sm border-app-border',
  variants: {
    isFocused: {
      true: 'border-accent-a8',
    },
    isFocusWithin: {
      true: 'border-accent-a8',
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
  base: 'group flex h-9  items-center overflow-hidden',
});

export const inputContainerStyles = appTwVariants({
  base: 'min-w-0 h-9 bg-white',
});

export const inputStyles = appTwVariants({
  extend: focusRing,
  base: 'placeholder:text-gray-11a placeholder:text-sm px-2 py-1.5',
});

export const textAreaStyles = appTwVariants({
  extend: focusRing,
  base: 'h-32 min-h-32 w-full rounded-sm border bg-transparent px-2 placeholder:text-gray-11',
});
