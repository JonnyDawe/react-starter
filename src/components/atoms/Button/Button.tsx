'use client';

import type { ButtonProps as AriaButtonProps } from 'react-aria-components';
import type { ButtonVariantProps } from '@/styles/recipes/button';

import React from 'react';
import {

  Button as ButtonPrimitive,
  composeRenderProps,
} from 'react-aria-components';
import { buttonRecipe } from '@/styles/recipes/button';

type ButtonProps = AriaButtonProps
  & ButtonVariantProps & {
    className?: string
    ref?: React.Ref<HTMLButtonElement>
  };

export function Button({ className, children, ref, ...restProps }: ButtonProps) {
  return (
    <ButtonPrimitive
      ref={ref}
      className={composeRenderProps(className, (className, renderProps) => {
        return buttonRecipe({
          ...renderProps,
          ...restProps,
          className,
        });
      })}
      {...restProps}
    >
      {children}
    </ButtonPrimitive>
  );
}
