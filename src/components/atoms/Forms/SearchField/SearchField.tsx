'use client';
import type { SearchFieldProps, ValidationResult } from 'react-aria-components';
import React, { useRef } from 'react';
import { FieldError, SearchField, Text } from 'react-aria-components';

import { IconButton } from '@/components/atoms/Button';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import { SvgIcon } from '@/components/atoms/SvgIcon';
import { appTwVariants, composeTailwindRenderProps } from '@/lib/helpers/tailwind-utils';

import { FieldGroup, Input, Label } from '../Field';

interface MySearchFieldProps extends SearchFieldProps {
  label?: string
  description?: string
  placeholder?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  hint?: 'required' | 'optional'
  useFloatingLabel?: boolean
  searchRef?: React.RefObject<HTMLDivElement | null>
  isLoading?: boolean
  inputClassName?: string
}

const floatingLabelStyles = appTwVariants({
  base: 'transform font-medium text-gray-12 transition-all duration-100 ease-in-out',
  variants: {
    floating: { true: '-translate-y-0', false: 'translate-x-9 translate-y-8' },
  },
});

function Search({
  label,
  description,
  errorMessage,
  placeholder,
  className,
  hint,
  searchRef,
  isLoading,
  inputClassName,
  useFloatingLabel = false,
  ...props
}: MySearchFieldProps) {
  const internalInputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState('');
  const floating = internalValue.trim().length !== 0 || focused || undefined;

  return (
    <SearchField
      ref={searchRef}
      {...props}
      onChange={(e) => {
        setInternalValue(e);
        props.onChange?.(e);
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={composeTailwindRenderProps(className, 'group relative flex flex-col gap-1')}
    >
      <Label hint={hint} className={useFloatingLabel ? floatingLabelStyles({ floating }) : ''}>
        {label}
      </Label>
      <FieldGroup className={inputClassName}>
        <SvgIcon
          name="icon-magnify-glass"
          size={20}
          className="ml-2"
          onClick={() => internalInputRef.current?.focus()}
        />
        <Input
          ref={internalInputRef}
          placeholder={useFloatingLabel ? (floating ? placeholder : '') : placeholder}
          className="h-full text-base [&::-webkit-search-cancel-button]:hidden"
        />
        {isLoading && <Spinner size="sm" />}
        <IconButton
          disableTooltip
          aria-label="clear search"
          insetFocusRing
          icon={<SvgIcon name="icon-x" size={20} />}
          className="h-full w-10 border-none group-empty:invisible"
        >
        </IconButton>
      </FieldGroup>

      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </SearchField>
  );
}

export default Search;
