'use client';

import { useDisclosure } from '@mantine/hooks';
import { motion } from 'framer-motion';
import React from 'react';
import { TooltipTrigger } from 'react-aria-components';

import { Button } from '@/components/atoms/Button/Button';
import { SvgIcon } from '@/components/atoms/SvgIcon';
import { Tooltip } from '@/components/atoms/Tooltip';
import { useArcState, useCurrentMapView } from '@/lib/arcgis/hooks';
import { appTwVariants } from '@/lib/helpers/tailwind-utils';

interface MapPanelToggleProps {
  children: React.ReactNode
  defaultOpen?: boolean
  contentLabel: string
  tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left'
  buttonContent: React.ReactNode
  className?: string
  buttonPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

const mapPanelRecipe = appTwVariants({
  slots: {
    wrapper: 'pointer-events-none relative z-100 pt-6',
    button:
      'pointer-events-auto absolute top-0 z-100 flex h-8 items-center justify-center gap-3 rounded-xs',
    content: [
      'pointer-events-auto',
      '[max-height:min(calc(var(--mapViewHeight)-100px),var(--maxHeight,300px))]',
      '[max-width:min(calc(var(--mapViewWidth)-100px),var(--maxWidth,300px))]',
      'flex flex-col overflow-hidden rounded-sm border-2 border-gray-11 bg-gray-2 px-4 pt-4 pb-4 shadow-md',
    ],
    icon: '',
  },
  variants: {
    buttonPosition: {
      'top-right': { button: 'right-0', wrapper: 'pr-2' },
      'top-left': { button: 'left-0', wrapper: 'pl-2' },
      'bottom-right': { button: 'right-0', wrapper: 'pr-2', icon: 'rotate-180' },
      'bottom-left': { button: 'left-0', wrapper: 'pl-2', icon: 'rotate-180' },
    },
    opened: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      buttonPosition: ['bottom-left', 'bottom-right'],
      opened: false,
      className: { button: 'top-auto bottom-0' },
    },
  ],

  defaultVariants: {
    buttonPosition: 'top-left',
  },
});

export function MapPanelToggle({
  children,
  contentLabel,
  buttonContent,
  className,
  tooltipPlacement = 'right',
  buttonPosition = 'top-left',
  defaultOpen = true,
}: MapPanelToggleProps) {
  const [opened, handlers] = useDisclosure(defaultOpen);
  const toggleId = React.useId();
  const mapView = useCurrentMapView();
  const { wrapper, button, content, icon } = mapPanelRecipe({ buttonPosition, opened });
  const [mapViewHeight] = useArcState(mapView, 'height');
  const [mapViewWidth] = useArcState(mapView, 'width');

  const label = opened ? `Close ${contentLabel}` : `Open ${contentLabel}`;

  return (
    <div
      className={wrapper()}
      style={
        {
          '--mapViewHeight': `${mapViewHeight}px`,
          '--maxHeight': '100vh',
          '--mapViewWidth': `${mapViewWidth}px`,
          '--maxWidth': '100vw',
        } as React.CSSProperties
      }
    >
      <TooltipTrigger delay={800}>
        <Button
          variant="primary"
          aria-expanded={opened}
          aria-controls={toggleId}
          aria-label={label}
          onPress={handlers.toggle}
          size="md"
          className={button()}
        >
          {buttonContent}
          {!opened && <SvgIcon name="icon-chevron-down" className={icon()} size={20} />}
          {opened && <SvgIcon name="icon-chevron-up" className={icon()} size={20} />}
        </Button>
        <Tooltip placement={tooltipPlacement}>{label}</Tooltip>
      </TooltipTrigger>
      {opened && (
        <motion.div
          id={toggleId}
          role="region"
          aria-label={`${contentLabel} content`}
          className={content({ className })}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
