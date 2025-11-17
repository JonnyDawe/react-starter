import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

/**
 * A wrapper around useQuery that sets staleTime to Infinity, making the query immutable.
 * This is equivalent to SWR's useSWRImmutable behavior.
 *
 * @example
 * const { data } = useQueryImmutable({
 *   queryKey: ['products', 'initial'],
 *   queryFn: () => fetchProducts(),
 * });
 */
export function useQueryImmutable<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>(
  options: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'staleTime'>,
): UseQueryResult<TData, TError> {
  return useQuery({
    ...options,
    staleTime: Infinity,
  });
}
