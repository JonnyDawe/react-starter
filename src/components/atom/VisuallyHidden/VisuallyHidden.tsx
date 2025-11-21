'use client';
import type { VisuallyHiddenProps } from '@react-aria/visually-hidden';
import {
  VisuallyHidden as RAVisuallyHidden,

} from '@react-aria/visually-hidden';

export function VisuallyHidden(props: VisuallyHiddenProps) {
  return <RAVisuallyHidden {...props}></RAVisuallyHidden>;
}
