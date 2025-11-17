import { useEffect, useRef, useState } from 'react';

// Interface for resources that can be destroyed
interface Destroyable {
  destroy: () => void
}

/**
 * Hook for managing resources that need to be destroyed when dependencies change or component unmounts
 * @param factory Function that creates the resource
 * @returns The current resource instance
 */
export function useDestroyableResource<T extends Destroyable>(factory: () => T): T {
  const resourceRef = useRef<T | null>(null);
  const [resource, setResource] = useState<T>(() => {
    const instance = factory();
    resourceRef.current = instance;
    return instance;
  });

  useEffect(() => {
    const newResource = factory();

    if (resourceRef.current) {
      resourceRef.current.destroy();
    }

    resourceRef.current = newResource;
    setResource(newResource);

    return () => {
      if (resourceRef.current) {
        resourceRef.current.destroy();
      }
    };
  }, [factory]);

  return resource;
}
