import type { VariantProps } from 'tailwind-variants';

import { appTwVariants } from '@/lib/helpers/tailwind-utils';

export type SharedTypographyRecipeProps = VariantProps<typeof sharedTypographyRecipe>;
export type TextRecipeProps = VariantProps<typeof textRecipe>;
export type TitleRecipeProps = VariantProps<typeof titleRecipe>;

// https://github.com/heroui-inc/tailwind-variants/issues/244
export type LinkRecipeProps = VariantProps<typeof linkRecipe> & SharedTypographyRecipeProps;

export const sharedTypographyRecipe = appTwVariants({
  base: 'text-fg',
  variants: {
    margin: {
      true: 'mb-2',
    },
    bold: {
      true: 'font-semibold',
    },
    italic: {
      true: 'italic',
    },
    underline: {
      true: 'underline underline-offset-2',
    },
    listitem: {
      true: 'ml-8',
    },
  },
});

export const textRecipe = appTwVariants({
  extend: sharedTypographyRecipe,
  variants: {
    textStyle: {
      bodyEmphasized: 'text-lg/snug font-semibold',
      body: 'text-base/snug font-normal',
      bodySmall: 'text-sm/snug font-light',
      bodyExtraSmall: 'text-xs/snug font-light',
      caption: 'text-xs/snug font-normal md:text-sm/snug',
      label: 'text-sm/snug font-normal',
    },
  },
});

export const linkRecipe = appTwVariants({
  extend: textRecipe,
  base: 'text-underline-offset-2 decoration-muted hover:decoration-accent cursor-pointer',
  variants: {
    underline: {
      true: 'underline',
    },
    isFocusVisible: {
      true: 'inset-focus-ring outline-offset-2',
    },
  },
  defaultVariants: {
    underline: true,
  },
});

export const titleRecipe = appTwVariants({
  extend: sharedTypographyRecipe,
  base: 'font-semibold text-pretty text-fg',
  variants: {
    size: {
      '2xl': 'text-xl/snug md:text-3xl/snug',
      'xl': 'text-xl/snug md:text-2xl/snug',
      'lg': 'text-lg/snug md:text-xl/snug',
      'md': 'text-base/snug md:text-lg/snug',
      'body': 'text-base/tight',
    },
  },
});
