import React from 'react';
import { OverlayTriggerStateContext } from 'react-aria-components';

import { SvgIcon } from '../SvgIcon/SvgIcon';
import { IconButton } from './IconButton';

interface CloseButtonProps {
  onPress: () => void
  className?: string
}

export function CloseButton({ onPress, className }: CloseButtonProps) {
  return (
    <IconButton
      className={className}
      variant="surface"
      onPress={onPress}
      icon={<SvgIcon size={16} name="icon-x" />}
      aria-label="Close"
    >
    </IconButton>
  );
}

export function CloseDialogButton({ className }: CloseButtonProps) {
  const state = React.use(OverlayTriggerStateContext)!;
  return <CloseButton onPress={() => state.close()} className={className} />;
}
