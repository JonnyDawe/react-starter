import { useOs } from '@mantine/hooks';

export function useCommandKbd() {
  const os = useOs();

  return os === 'macos' ? '⌘' : 'ctrl';
}
