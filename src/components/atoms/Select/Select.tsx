import type { SelectProps as AriaSelectProps, Key, ListBoxItemProps, ValidationResult } from 'react-aria-components';
import type { DropdownSectionProps } from '../ListBox';

import React from 'react';
import {
  Select as AriaSelect,

  Button,

  ListBox,

  SelectStateContext,
  SelectValue,

} from 'react-aria-components';
import { appTwVariants, composeTailwindRenderProps } from '@/lib/helpers/tailwind-utils';

import { useControllableState } from '@/lib/hooks/common/useControllableState';
import { Description, FieldError, FieldGroup, Label } from '../Forms/Field';
import { DropdownItem, DropdownSection } from '../ListBox';
import { Popover } from '../Popover';
import { SvgIcon } from '../SvgIcon';

export interface SelectProps<T extends object> extends Omit<AriaSelectProps<T>, 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  items?: Iterable<T>
  children: React.ReactNode | ((item: T) => React.ReactNode)
}

type SelectItemType<T> = T | { value: T, label: string };

interface ISelectProps<T> {
  className?: string
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  data: SelectItemType<T>[]
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
}

function hasLabel<T>(item: SelectItemType<T>): item is { value: T, label: string } {
  return typeof item === 'object' && item !== null && 'label' in item;
}

function normalizeItems<T>(
  items: SelectItemType<T>[],
): { value: T, label: string, id: string | number }[] {
  return items.map((item, index) => {
    if (hasLabel(item)) {
      return { value: item.value, label: item.label, id: index };
    }
    return { value: item, label: String(item), id: index };
  });
}

export function Select<T>({
  label,
  description,
  errorMessage,
  data,
  className,
  value,
  defaultValue,
  onChange,
  ...props
}: ISelectProps<T>) {
  const normalizedItems = React.useMemo(() => normalizeItems(data), [data]);

  // Use controllable state hook for value management
  const [selectedValue, setSelectedValue] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange,
  });

  const selectedItem = React.useMemo(() => {
    return normalizedItems.find((item) => item.value === selectedValue) ?? null;
  }, [normalizedItems, selectedValue]);

  // Handle selection changes
  const handleChange = React.useCallback(
    (selectedItem: Key | null) => {
      setSelectedValue(normalizedItems.find((item) => item.id === selectedItem)?.value);
    },
    [normalizedItems, setSelectedValue],
  );

  const refId = React.useId();

  return (
    <AriaSelect
      {...props}
      className={composeTailwindRenderProps(className, 'group flex flex-col gap-1')}
      onSelectionChange={handleChange}
      selectedKey={selectedItem === null ? null : selectedItem?.id}
      id={refId}
    >
      {label && <Label>{label}</Label>}
      <SelectButton />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover showArrow={false} className="min-w-(--trigger-width)" refId={refId}>
        <ListBox items={normalizedItems} className="max-h-[inherit] overflow-auto">
          {(item) => (
            <SelectItem id={item.id} key={item.id} textValue={item.label}>
              {item.label}
            </SelectItem>
          )}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}

const selectButtonRecipe = appTwVariants({
  slots: {
    fieldGroup: '',
    button: 'flex h-full min-w-0 flex-1 items-center px-2 outline-0',
    value: 'flex-1 text-left text-sm placeholder-shown:italic',
  },
  variants: {
    isOpen: {
      true: {
        fieldGroup: 'border-accent-a8',
      },
    },
  },
});

function SelectButton() {
  const state = React.useContext(SelectStateContext);
  if (!state) {
    return null;
  }
  const { button, fieldGroup, value } = selectButtonRecipe({ isOpen: state.isOpen });
  return (
    <FieldGroup className={fieldGroup()}>
      <Button className={button()}>
        <SelectValue className={value()} />
        <SvgIcon aria-hidden name="icon-chevron-down" />
      </Button>
    </FieldGroup>
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}

export function SelectSection<T extends object>(props: DropdownSectionProps<T>) {
  return <DropdownSection {...props} />;
}
