import type { ListBoxProps as AriaListBoxProps, ListBoxItemProps, SectionProps } from 'react-aria-components';
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,

  Collection,
  composeRenderProps,
  Header,

  ListBoxSection,

} from 'react-aria-components';

import { Text } from '@/components/atoms/Typography';
import { composeTailwindRenderProps } from '@/lib/helpers/tailwind-utils';
import { listBoxItemStyles, selectListDropdownItemStyles } from '@/styles/recipes/listbox';

type ListBoxProps<T> = Omit<AriaListBoxProps<T>, 'layout' | 'orientation'>;

export function ListBox<T extends object>({ children, ...props }: ListBoxProps<T>) {
  return (
    <AriaListBox
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'rounded-sm border border-app-border bg-white shadow-sm',
      )}
    >
      {children}
    </AriaListBox>
  );
}

export function ListBoxItem(props: ListBoxItemProps) {
  const textValue
    = props.textValue || (typeof props.children === 'string' ? props.children : undefined);
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={listBoxItemStyles}>
      {composeRenderProps(props.children, (children) => (
        <>{children}</>
      ))}
    </AriaListBoxItem>
  );
}

export function DropdownItem(props: ListBoxItemProps) {
  const textValue
    = props.textValue || (typeof props.children === 'string' ? props.children : undefined);
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={selectListDropdownItemStyles}>
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <Text bold={isSelected} className="text-inherit">
          {children}
        </Text>
      ))}
    </AriaListBoxItem>
  );
}

export interface DropdownSectionProps<T> extends SectionProps<T> {
  title?: string
  items?: any
}

export function DropdownSection<T extends object>(props: DropdownSectionProps<T>) {
  return (
    <ListBoxSection className="after:block after:h-[5px] after:content-[''] first:-mt-[5px]">
      <Header className="sticky -top-[5px] z-10 -mx-1 -mt-px truncate border-y px-4 py-1 text-sm font-semibold text-fg backdrop-blur-md [&+*]:mt-1">
        {props.title}
      </Header>
      <Collection items={props.items}>{props.children}</Collection>
    </ListBoxSection>
  );
}
