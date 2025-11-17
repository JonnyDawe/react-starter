import { useMutationObserver } from '@mantine/hooks';
import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { appTwVariants } from '@/lib/helpers/tailwind-utils';

import { SvgIcon } from '../SvgIcon/SvgIcon';

const drawerRecipe = appTwVariants({
  slots: {
    content: 'fixed inset-0 mx-[-1px] flex flex-col outline-0',
    handle: 'shadow-xl',
    handleContent: 'flex items-center gap-2 px-2',
    title: 'sr-only',
    description: 'sr-only',
    panel: 'z-1 overflow-y-auto bg-panel p-4 shadow-xl',
  },
});

// Utility functions for snap point handling
function isPixelValue(value: string | number): boolean {
  if (typeof value === 'number') {
    return false;
  }
  return value.endsWith('px');
}

function isPercentageValue(value: string | number): boolean {
  if (typeof value === 'number') {
    return false;
  }
  return value.endsWith('%');
}

function convertSnapPointToPixels(value: string | number, viewportHeight: number): number {
  if (typeof value === 'number') {
    // Fraction of viewport height
    return value * viewportHeight;
  }

  if (isPixelValue(value)) {
    return Number.parseInt(value);
  }

  if (isPercentageValue(value)) {
    const percentage = Number.parseInt(value) / 100;
    return percentage * viewportHeight;
  }

  // Fallback: treat as pixel value
  return Number.parseInt(value) || 0;
}

// Type for snap points array
type SnapPoint = string | number;

// Props interface with proper typing
interface DrawerProps {
  children: React.ReactNode
  snapPoints?: SnapPoint[]
  defaultSnapPoint?: SnapPoint
  handleHeight?: number
  title: string
  description: string
}

// Default values
const DEFAULT_SNAP_POINTS: SnapPoint[] = ['32px', 0.4, 0.6];
const DEFAULT_HANDLE_HEIGHT = 32;

export function Drawer({
  children,
  snapPoints = DEFAULT_SNAP_POINTS,
  defaultSnapPoint,
  handleHeight = DEFAULT_HANDLE_HEIGHT,
  title,
  description,
}: DrawerProps) {
  // Ensure defaultSnapPoint is within snapPoints array, fallback to first item
  const initialSnapPoint
    = defaultSnapPoint && snapPoints.includes(defaultSnapPoint) ? defaultSnapPoint : snapPoints[0];

  const [snap, setSnap] = React.useState<SnapPoint | null>(initialSnapPoint);
  const {
    content,
    handle,
    handleContent,
    title: titleClass,
    description: descriptionClass,
    panel,
  } = drawerRecipe();

  const [drawerTop, setDrawerTop] = React.useState<number>(() => {
    if (!initialSnapPoint) {
      return 0;
    }
    return convertSnapPointToPixels(initialSnapPoint, window.innerHeight) - handleHeight;
  });

  const ref = useMutationObserver<HTMLDivElement>(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const element = mutation.target as HTMLElement;
          const transform = element.style.transform;
          const y = transform.match(/translate3d\(0px,\s*(-?\d+(?:\.\d+)?)px,\s*0px\)/)?.[1];
          const bottom = element.style.bottom.match(/(-?\d+(?:\.\d+)?)px/)?.[1] ?? '0';
          if (!y) {
            return;
          }
          setDrawerTop(
            y ? window.innerHeight + -(Number.parseInt(y) - Number.parseInt(bottom)) - handleHeight : 0,
          );
        }
      });
    },
    {
      attributes: true,
      attributeFilter: ['style'],
    },
  );

  function handleSetSnap(snap: SnapPoint | null) {
    if (snap === null) {
      return;
    }
    setSnap(snap);
    const top = convertSnapPointToPixels(snap, window.innerHeight);
    setDrawerTop(top - handleHeight);
  }

  return (
    <DrawerPrimitive.Root
      modal={false}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={handleSetSnap}
      handleOnly
      open={true}
      onClose={() => {}}
      repositionInputs={false}
    >
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Content ref={ref as React.RefObject<HTMLDivElement>} className={content()}>
          <DrawerPrimitive.Handle
            className={handle()}
            style={{ '--drawer-handle-height': `${handleHeight}px` } as React.CSSProperties}
          >
            <div className={handleContent()}>
              <SvgIcon name="icon-search-images" size={20} />
              <SvgIcon name="icon-chevron-up" size={20} />
            </div>
          </DrawerPrimitive.Handle>
          <DrawerPrimitive.Title className={titleClass()}>{title}</DrawerPrimitive.Title>
          <DrawerPrimitive.Description className={descriptionClass()}>
            {description}
          </DrawerPrimitive.Description>
          <div
            className={panel()}
            style={{
              height: `${drawerTop}px`,
              width: '100%',
            }}
          >
            {children}
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}
