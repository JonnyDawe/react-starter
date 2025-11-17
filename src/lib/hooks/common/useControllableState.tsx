import * as React from 'react';

import { useCallbackRef } from './useCallbackRef';

interface UseControllableStateParams<T> {
  prop?: T | undefined
  defaultProp?: T | undefined
  onChange?: (state: T) => void
}

type SetStateFn<T> = (prevState?: T) => T;

/**
 * A hook that manages both controlled and uncontrolled component states.
 *
 * @template T The type of the state value
 * @param {object} params Configuration options
 * @param {T | undefined} params.prop The controlled value
 * @param {T | undefined} params.defaultProp The default value for uncontrolled state
 * @param {(state: T) => void} params.onChange Callback function triggered when the value changes
 * @returns {readonly [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>]} A tuple containing the current value and a setter function
 *
 * @example
 * const [value, setValue] = useControllableState({
 *   prop: controlledValue,
 *   defaultProp: defaultValue,
 *   onChange: handleChange
 * });
 */
function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;

  const handleChange = useCallbackRef(onChange);
  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> = useCallbackRef(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as SetStateFn<T>;
        const value = typeof nextValue === 'function' ? setter(prop) : nextValue;
        if (value !== prop) {
          handleChange(value as T);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
  );

  return [value, setValue] as const;
}

/**
 * Internal hook for managing uncontrolled state with change notifications.
 *
 * @template T The type of the state value
 * @param {object} params Configuration options
 * @param {T | undefined} params.defaultProp The default value for the state
 * @param {(state: T) => void} params.onChange Callback function triggered when the state changes
 * @returns {[T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>]} A tuple containing the current value and a setter function
 *
 * @private
 */
function useUncontrolledState<T>({
  defaultProp,
  onChange,
}: Omit<UseControllableStateParams<T>, 'prop'>) {
  const uncontrolledState = React.useState<T | undefined>(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = React.useRef(value);
  const handleChange = useCallbackRef(onChange);

  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value as T);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);

  return uncontrolledState;
}

export { useControllableState };
