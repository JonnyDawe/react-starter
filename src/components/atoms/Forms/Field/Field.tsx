'use client';
import type { FieldErrorProps, GroupProps, InputProps, LabelProps, TextAreaProps, TextProps } from 'react-aria-components';
import React from 'react';
import {
  composeRenderProps,

  Group,

  FieldError as RACFieldError,
  Input as RACInput,
  Label as RACLabel,
  TextArea as RACTextArea,
  Text,

} from 'react-aria-components';

import { cn } from '@/lib/helpers/tailwind-utils';
import {
  descriptionStyles,
  fieldBorderStyles,
  fieldErrorStyles,
  fieldGroupStyles,
  inputStyles,
  labelStyles,
  textAreaStyles,
} from '@/styles/recipes/fieldRecipes';

export function Label({
  children,
  hint,
  className,
  ...props
}: LabelProps & { hint?: 'required' | 'optional' }) {
  return (
    <RACLabel
      {...props}
      className={labelStyles({
        className,
        requiredHint: hint === 'required',
      })}
    >
      {children}
      {hint === 'optional' && (
        <span className="ms-auto ps-0.5 font-normal text-gray-11">Optional</span>
      )}
    </RACLabel>
  );
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={descriptionStyles({ className: props.className })}
    />
  );
}

export function FieldError(props: FieldErrorProps) {
  return (
    <RACFieldError
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldErrorStyles({ ...renderProps, className }),
      )}
    />
  );
}

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) => {
        console.log(renderProps);
        return cn(fieldGroupStyles({ ...renderProps }), fieldBorderStyles({ ...renderProps }), className);
      })}
    />
  );
}

export function Input({ ref, ...props }: InputProps & { ref?: React.RefObject<HTMLInputElement | null> }) {
  return (
    <RACInput
      {...props}
      ref={ref}
      className={composeRenderProps(props.className, (className) =>
        inputStyles({ className }),
      )}
    />
  );
}

export function TextArea(props: TextAreaProps) {
  return (
    <RACTextArea
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        textAreaStyles({ ...renderProps, className }),
      )}
    />
  );
}
