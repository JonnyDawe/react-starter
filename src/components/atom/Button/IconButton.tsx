'use client';

import type { ButtonVariantProps } from '@/styles/recipes/button';
import React from 'react';

import {
  Button as ButtonPrimitive,
  composeRenderProps,
  TooltipTrigger,
} from 'react-aria-components';
import { buttonRecipe } from '@/styles/recipes/button';

import { Tooltip } from '../Tooltip';

export type IconButtonProps = React.ComponentProps<typeof ButtonPrimitive>
  & ButtonVariantProps & {
    className?: string
  } & {
    'icon': React.ReactNode
    'aria-label': string
    'disableTooltip'?: boolean
    'tooltipPlacement'?: 'top' | 'right' | 'bottom' | 'left'
  };

export function IconButton({ ref, icon: Icon, className, disableTooltip, tooltipPlacement, ...restProps }: IconButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  const buttonElement = (
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
      {Icon}
    </ButtonPrimitive>
  );

  return (
    <TooltipTrigger isDisabled={disableTooltip} delay={1000}>
      {buttonElement}
      <Tooltip placement={tooltipPlacement ?? 'right'}>{restProps['aria-label']}</Tooltip>
    </TooltipTrigger>
  );
}
