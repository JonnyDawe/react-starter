'use client';
import type { ProgressBarProps as AriaProgressBarProps } from 'react-aria-components';
import {
  ProgressBar as AriaProgressBar,

  Label,
} from 'react-aria-components';

import { composeTailwindRenderProps } from '@/lib/helpers/tailwind-utils';

export interface ProgressBarProps extends AriaProgressBarProps {
  label?: string
}

export function BarLoader({ label, ...props }: ProgressBarProps) {
  return (
    <AriaProgressBar
      {...props}
      className={composeTailwindRenderProps(props.className, 'flex w-full flex-col gap-1')}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <div className="w-full bg-gray-a2">
          <div className="flex justify-between gap-2">
            <Label className="px-1 pt-1 text-xs font-semibold text-accent uppercase">{label}</Label>
            <span className="text-sm text-gray-11">{valueText}</span>
          </div>
          <div className="border-primary-blue relative h-2 w-full overflow-hidden border border-t-0">
            <div
              className={`absolute top-0 h-full bg-accent ${isIndeterminate ? 'left-full animate-in ease-out repeat-infinite [--tw-enter-translate-x:calc(-300%-50%)] slide-out-to-right-full' : 'left-0'}`}
              style={{
                width: `${isIndeterminate ? 40 : percentage}%`,
                animationDuration: '1400ms',
              }}
            />
          </div>
        </div>
      )}
    </AriaProgressBar>
  );
}
