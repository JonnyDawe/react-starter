import type { SelectProps as AriaSelectProps, ValidationResult } from 'react-aria-components';

import React from 'react';
import {
  Button,

  Popover,

  Select as SelectPrimitive, SelectStateContext,
  SelectValue,

} from 'react-aria-components';
import { appTwVariants, composeTailwindRenderProps } from '@/lib/helpers/tailwind-utils';

import { Description, FieldError, FieldGroup, Label } from '../Forms/Field';
import { ListBox, ListBoxItem } from '../ListBox';
import { SvgIcon } from '../SvgIcon';

interface ISelectProps<T extends object> extends Omit<AriaSelectProps<T>, 'children'> {
  className?: string
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  children: (item: T) => React.ReactElement<React.ComponentProps<typeof ListBoxItem>>
  items: Iterable<T>
}

export function Select<T extends object>({
  label,
  description,
  errorMessage,
  className,
  children,
  items,
  ...props
}: ISelectProps<T>) {
  return (
    <SelectPrimitive
      {...props}
      className={composeTailwindRenderProps(className, 'group flex flex-col gap-1')}
    >
      {label && <Label>{label}</Label>}
      <SelectButton />
      {description && <Description>{description}</Description>}
      {errorMessage && (
        <FieldError>
          {(renderProps) => {
            return typeof errorMessage === 'function' ? errorMessage(renderProps) : errorMessage;
          }}
        </FieldError>
      )}
      <Popover className="min-w-(--trigger-width)" placement="bottom start">
        <ListBox items={items} className="max-h-[inherit] overflow-auto">
          {children}
        </ListBox>
      </Popover>
    </SelectPrimitive>
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

interface StaticSelectProps<T extends { value: string | number, label: string }>
  extends Omit<ISelectProps<T>, 'children' | 'value' | 'onChange'> {
  value: T['value']
  onChange: (value: T['value']) => void
}
export function StaticSelect<T extends { value: string | number, label: string }>({
  label,
  description,
  errorMessage,
  className,
  items,
  value,
  onChange,
  ...props
}: StaticSelectProps<T>) {
  return (
    <Select
      className={className}
      label={label}
      description={description}
      errorMessage={errorMessage}
      items={items}
      value={value}
      onChange={(key) => {
        if (key !== null) {
          onChange(key as T['value']);
        }
      }}
      {...props}
    >
      {(item) => <ListBoxItem id={item.value}>{item.label}</ListBoxItem>}
    </Select>
  );
}
