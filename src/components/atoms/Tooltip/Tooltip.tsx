import type { TooltipProps as AriaTooltipProps } from 'react-aria-components';
import React from 'react';
import {
  Tooltip as AriaTooltip,

  OverlayArrow,
} from 'react-aria-components';

import { cn } from '@/lib/helpers/tailwind-utils';
import useIsMobile from '@/lib/hooks/useIsMobile';
import { tooltipRecipe } from '@/styles/recipes/tooltip';

export interface TooltipProps extends Omit<AriaTooltipProps, 'children'> {
  children: React.ReactNode
}

export function Tooltip({ children, ...props }: TooltipProps) {
  const { root, container, arrow, triangle, triangleStroke } = tooltipRecipe();
  const isMobile = useIsMobile();
  if (isMobile) {
    return null;
  }
  return (
    <AriaTooltip {...props} className={cn(root(), 'group')} offset={10}>
      <div className={container()}>{children}</div>
      <OverlayArrow style={{ zIndex: 1000 }}>
        <svg className={arrow()} width={12} height={12} viewBox="0 0 8 8">
          {/* Background triangle */}
          <path d="M0 0 L4 4 L8 0 Z" className={triangle()} />
          {/* Angled sides only */}
          <path d="M0 0 L4 4 M4 4 L8 0" className={triangleStroke()} />
        </svg>
      </OverlayArrow>
    </AriaTooltip>
  );
}
export default Tooltip;
