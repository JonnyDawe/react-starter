import type { GridListItemProps, GridListProps } from 'react-aria-components';
import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  Button,

} from 'react-aria-components';

import { appTwVariants, cn } from '@/lib/helpers/tailwind-utils';
import { insetFocusRing } from '@/styles/recipes/focusRing';

import { Checkbox } from '../Checkbox';

export function GridList<T extends object>({ children, className, ...props }: GridListProps<T>) {
  return (
    <AriaGridList {...props} className={className}>
      {children}
    </AriaGridList>
  );
}

const itemStyles = appTwVariants({
  extend: insetFocusRing,
  base: cn('active:bg-accent4 group flex rounded-sm border border-app-border p-2'),
  variants: {
    isSelected: {
      false: 'hover:bg-accent-1',
      true: 'bg-accent-2 hover:bg-accent-3',
    },
    isDisabled: {
      true: 'z-10 text-gray-11',
    },
  },
});

export function GridListItem({ children, ...props }: GridListItemProps) {
  const textValue = typeof children === 'string' ? children : undefined;
  return (
    <AriaGridListItem textValue={textValue} {...props} className={itemStyles}>
      {(renderProps) => (
        <>
          {/* Add elements for drag and drop and selection. */}
          {renderProps.allowsDragging && <Button slot="drag">≡</Button>}
          {renderProps.selectionMode === 'multiple'
            && renderProps.selectionBehavior === 'toggle' && <Checkbox slot="selection" />}
          {typeof children === 'function' ? children(renderProps) : children}
        </>
      )}
    </AriaGridListItem>
  );
}
