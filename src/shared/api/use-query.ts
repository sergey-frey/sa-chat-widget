import { useEffect, useState } from "react";

interface UseQueryState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseQueryOptions {
  enabled?: boolean;
  throwOnError?: boolean;
}

export function useQuery<T>(
  fetcher: () => Promise<T>,
  deps: unknown[],
  { enabled = true, throwOnError = true }: UseQueryOptions = {},
): UseQueryState<T> {
  const [state, setState] = useState<UseQueryState<T>>({
    data: null,
    loading: enabled,
    error: null,
  });

  useEffect(() => {
    if (!enabled) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let isMounted = true;

    setState({ data: null, loading: true, error: null });

    fetcher()
      .then((data) => {
        if (isMounted) setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err : new Error(String(err)),
          });
        }
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, enabled]);

  if (throwOnError && state.error) throw state.error;

  return state;
}
