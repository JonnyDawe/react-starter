'use client';
import type { TextFieldProps as RACTextFieldProps, ValidationResult } from 'react-aria-components';
import {
  TextField as RACTextField,

  Text,

} from 'react-aria-components';

import { composeTailwindRenderProps } from '@/lib/helpers/tailwind-utils';
import { inputStyles } from '@/styles/recipes/fieldRecipes';

import { FieldError, Input, Label, TextArea } from '../Field';

interface TextFieldProps extends RACTextFieldProps {
  label?: string
  description?: string
  hint?: 'required' | 'optional'
  placeholder?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export default function TextInput({
  label,
  description,
  errorMessage,
  placeholder,
  className,
  hint,
  ...props
}: TextFieldProps) {
  return (
    <RACTextField
      {...props}
      className={composeTailwindRenderProps(className, 'flex flex-col gap-1')}
    >
      <Label hint={hint}>{label}</Label>
      <Input placeholder={placeholder} className={inputStyles} />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACTextField>
  );
}

export function TextAreaInput({
  label,
  description,
  errorMessage,
  placeholder,
  className,
  hint,
  ...props
}: TextFieldProps) {
  return (
    <RACTextField
      {...props}
      className={composeTailwindRenderProps(className, 'flex flex-col gap-1')}
    >
      <Label hint={hint}>{label}</Label>

      <TextArea placeholder={placeholder} />

      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACTextField>
  );
}
