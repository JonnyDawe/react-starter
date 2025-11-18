'use client';

import type { CheckboxProps as AriaCheckBoxProps } from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import {
  Checkbox as AriaCheckbox,

  composeRenderProps,
} from 'react-aria-components';

import { VisuallyHidden } from '@/components/atoms/VisuallyHidden';
import { appTwVariants } from '@/lib/helpers/tailwind-utils';
import { focusRing } from '@/styles/recipes/focusRing';

import { SvgIcon } from '../SvgIcon';

const checkboxStyles = appTwVariants({
  extend: focusRing,
  base: 'group flex cursor-pointer items-center gap-2 text-fg transition',
  variants: {
    isSelected: {
      false: 'text-fg/90',
    },
    isDisabled: {
      true:
         'cursor-not-allowed',
    },
  },
});

const BoxRecipe = appTwVariants({
  slots: {
    box: 'm-2 flex h-4 w-4 min-w-4 items-center justify-center border border-dashed border-accent',
    check: 'relative hidden h-2.5 w-2.5',
    checkIcon: 'absolute inset-0 flex items-center justify-center text-accent-contrast',
  },
  variants: {
    rounded: {
      true: {
        box: 'rounded-full',
        check: 'rounded-full',
      },
      false: {},
    },
    isSelected: {
      true: {
        check: 'block bg-accent-solid',
        box: 'border-solid border-accent',
      },
      false: {
        check: 'block group-hover:bg-accent-action',
      },
    },
    isHovered: {
      true: {
        check: 'block',
      },
    },

  },
  compoundVariants: [
    {
      isSelected: true,
      isHovered: true,
      class: {
        check: 'h-3 w-3 bg-accent',
      },
    },
  ],
  defaultVariants: {
    rounded: false,
  },
});

type CheckboxProps = AriaCheckBoxProps
  & Pick<VariantProps<typeof BoxRecipe>, 'rounded'> & {
    showCheck?: boolean
  };

export function Checkbox({ rounded, children, showCheck = true, ...props }: CheckboxProps) {
  return (
    <>
      <AriaCheckbox
        {...props}
        aria-label={props['aria-label']}
        className={composeRenderProps(props.className, (className, renderProps) =>
          checkboxStyles({ ...renderProps, className }),
        )}
      >
        {(renderProps) => {
          const { box, check, checkIcon } = BoxRecipe({
            rounded,
            isSelected: renderProps.isSelected,
            isHovered: renderProps.isHovered,
          });
          return (
            <>
              <VisuallyHidden>{props['aria-label']}</VisuallyHidden>
              <div className={box({ rounded })}>
                <span className={check({ rounded })}>
                  {showCheck && (
                    <span className={checkIcon({ rounded })}>
                      <SvgIcon name="icon-check" />
                    </span>
                  )}
                </span>
              </div>
              {typeof children === 'function' ? children(renderProps) : children}
            </>
          );
        }}
      </AriaCheckbox>
    </>
  );
}

export default Checkbox;
