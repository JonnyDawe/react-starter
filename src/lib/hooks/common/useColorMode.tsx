import { readLocalStorageValue, useLocalStorage } from '@mantine/hooks';

function getOSColorScheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialValue(initialValue?: 'dark' | 'light', storageKey?: string) {
  if (typeof window === 'undefined') {
    return initialValue ?? 'light';
  }
  return readLocalStorageValue({
    key: storageKey ?? 'theme',
    defaultValue: initialValue ?? getOSColorScheme() ?? 'light',
  });
}

export function useColorMode(storageKey?: string, initialValue?: 'dark' | 'light') {
  const key = storageKey ?? 'theme';

  const [theme, setTheme] = useLocalStorage({
    key,
    defaultValue: getInitialValue(initialValue, key),
  });

  return { theme, setTheme };
}
