import { appTwVariants } from '@/lib/helpers/tailwind-utils';

import { insetFocusRing } from './focusRing';

export const listBoxItemStyles = appTwVariants({
  extend: insetFocusRing,
  base: 'group relative flex cursor-default items-center gap-8 px-2.5 py-1.5 text-sm will-change-transform select-none hover:bg-accent-4 active:bg-accent-5',
  variants: {
    isSelected: {
      false: 'text-fg',
      true: 'bg-accent-9 text-accent-contrast outline-accent-contrast! hover:bg-accent-9 active:bg-accent-10',
    },
    isDisabled: {
      true: 'text-slate-300',
    },
  },
});
