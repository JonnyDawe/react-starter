import type { PopoverProps } from 'react-aria-components';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import {
  Popover as AriaPopover,
  composeRenderProps,
  Dialog, DialogTrigger, OverlayArrow,

} from 'react-aria-components';

import { appTwVariants } from '@/lib/helpers/tailwind-utils';

import { IconButton } from '../Button';

const popoverMenuRecipe = appTwVariants({
  slots: {
    root: [
      'group duration-150',

      // Base entering animation
      'entering:pointer-none entering:ease-out entering:motion-safe:animate-in entering:motion-safe:fade-in',

      'entering:placement-top:motion-safe:slide-in-from-bottom-5',
      'entering:placement-right:motion-safe:slide-in-from-left-5',
      'entering:placement-bottom:motion-safe:slide-in-from-top-5',
      'entering:placement-left:motion-safe:slide-in-from-right-5',

      // Base exiting animation
      'exiting:motion-safe:animate-out exiting:motion-safe:fade-out',

      'exiting:ease-in',
      'exiting:motion-safe:animate-reverse',
    ],
    dialog: 'rounded-sm bg-gray-2 p-2 shadow-md',
    arrow: [
      'group-placement-top:-translate-y-[0.05px] group-placement-top:rotate-0',
      'group-placement-right:translate-x-[0.05px] group-placement-right:rotate-90',
      'group-placement-bottom:translate-y-[0.05px] group-placement-bottom:rotate-180',
      'group-placement-left:-translate-x-[0.05px] group-placement-left:-rotate-90',
    ],
  },
});

export function Popover({
  className,
  children,
  showArrow = true,
  refId,
  ...props
}: React.PropsWithChildren<PopoverProps> & { showArrow?: boolean, refId?: string }) {
  const { root, dialog, arrow } = popoverMenuRecipe();
  return (
    <AriaPopover
      className={composeRenderProps(className, (className) => root({ className }))}
      {...props}
    >
      {showArrow && (
        <OverlayArrow style={{ zIndex: 1000 }}>
          <svg className={arrow()} width={12} height={12} viewBox="0 0 8 8">
            {/* Background triangle */}
            <path d="M0 0 L4 4 L8 0 Z" className="fill-gray-2 shadow-md" />
            {/* Angled sides only */}
            <path d="M0 0 L4 4 M4 4 L8 0" className="stroke-app-border stroke-1" />
          </svg>
        </OverlayArrow>
      )}
      <Dialog aria-labelledby={refId} className={dialog()}>
        {children}
      </Dialog>
    </AriaPopover>
  );
}

type PopoverButtonProps = React.PropsWithChildren<{
  icon: React.ReactNode
  ariaLabel: string
  showArrow?: boolean
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  popoverPlacement?: PopoverProps['placement']
  isNonModal?: PopoverProps['isNonModal']
  shouldCloseOnInteractOutside?: PopoverProps['shouldCloseOnInteractOutside']
  className?: string
}>;

export function PopoverButton({
  children,
  icon,
  ariaLabel,
  showArrow = true,
  tooltipPlacement,
  size,
  popoverPlacement,
  isNonModal,
  className,
  shouldCloseOnInteractOutside,
}: PopoverButtonProps) {
  const [isOpen, { toggle }] = useDisclosure(false);

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={toggle}>
      <IconButton
        tooltipPlacement={tooltipPlacement}
        variant="mapButton"
        size={size}
        icon={icon}
        aria-label={ariaLabel}
        disableTooltip={isOpen}
      />
      <Popover
        className={className}
        placement={popoverPlacement}
        isNonModal={isNonModal}
        shouldCloseOnInteractOutside={shouldCloseOnInteractOutside}
        showArrow={showArrow}
      >
        {children}
      </Popover>
    </DialogTrigger>
  );
}
