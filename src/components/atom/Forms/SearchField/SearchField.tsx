'use client';
import type { SearchFieldProps, ValidationResult } from 'react-aria-components';
import { useHotkeys } from '@mantine/hooks';
import React, { useRef } from 'react';

import { FieldError, SearchField, Text } from 'react-aria-components';
import { IconButton } from '@/components/atoms/Button';
import { Spinner } from '@/components/atoms/Spinner/Spinner';
import { SvgIcon } from '@/components/atoms/SvgIcon';

import { composeTailwindRenderProps } from '@/lib/helpers/tailwind-utils';
import { useCommandKbd } from '@/lib/hooks/common/useCommandKbd';
import { fieldStyles } from '@/styles/recipes/fieldRecipes';
import { FieldGroup, Input, Label } from '../Field';

interface MySearchFieldProps extends SearchFieldProps {
  label?: string
  description?: string
  placeholder?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  searchRef?: React.RefObject<HTMLDivElement | null>
  isLoading?: boolean
  fieldGroupClassName?: string
  useKeyboardFocusShortcut?: boolean
}

export function Search({
  label,
  description,
  errorMessage,
  placeholder,
  className,
  searchRef,
  isLoading,
  fieldGroupClassName,
  useKeyboardFocusShortcut,
  ...props
}: MySearchFieldProps) {
  const internalInputRef = useRef<HTMLInputElement>(null);
  const commandKbd = useCommandKbd();

  useHotkeys(
    [
      [
        'mod+K',
        () => {
          if (useKeyboardFocusShortcut) {
            internalInputRef.current?.focus();
          }
        },
      ],
    ],
    ['INPUT', 'TEXTAREA'],
  );

  return (
    <SearchField
      ref={searchRef}
      {...props}
      className={composeTailwindRenderProps(className, fieldStyles())}
    >
      <Label>
        {label}
      </Label>
      <FieldGroup className={fieldGroupClassName}>
        <SvgIcon
          name="icon-magnify-glass"
          size={20}
          className="ml-2 shrink-0"
          onClick={() => internalInputRef.current?.focus()}
        />

        <div className="flex-1 flex">
          <Input
            ref={internalInputRef}
            placeholder={`${placeholder}${useKeyboardFocusShortcut ? ` (${commandKbd}+K)` : ''}`}
            className="h-full text-base [&::-webkit-search-cancel-button]:hidden flex-1"
          />
        </div>
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
