import React from 'react';

import { appTwVariants } from '@/lib/helpers/tailwind-utils';

import { Title } from '../Typography';
import { SpinLoader } from './AppSpinLoader';

const loadingScrim = appTwVariants({
  base: 'absolute inset-0 grid h-full w-full place-content-center bg-gray-8/70 text-fg transition-all duration-1000 ease-in-out',
  variants: {
    isLoading: {
      true: 'opacity-100',
      false: 'pointer-events-none opacity-0',
    },
    error: {
      true: 'bg-accent-5',
    },
  },
  compoundVariants: [
    {
      isLoading: false,
      error: true,
      className: 'pointer-events-auto bg-accent-5 opacity-100',
    },
  ],
});

export function AppLoader({ isLoading, error }: { isLoading: boolean, error?: string }) {
  const [shouldShow, setShouldShow] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    let timeoutId: number;
    if (isLoading) {
      setIsVisible(true);
      setShouldShow(true);
    } else {
      setShouldShow(false);
      timeoutId = window.setTimeout(() => {
        setIsVisible(false);
      }, 1000); // Match the transition duration
    }
    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  if (!isVisible && !error) {
    return null;
  }

  return (
    <div className={loadingScrim({ isLoading: shouldShow, error: !!error })}>
      {error
        ? (
            <Title as="h2" size="lg">{`Error initializing map: ${error}`}</Title>
          )
        : (
            <SpinLoader className="text-fg" size={140}></SpinLoader>
          )}
    </div>
  );
}
