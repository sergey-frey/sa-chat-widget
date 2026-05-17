import { useCallback, useState } from "react";

interface UseMutationState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useMutation<T, D = void>(
  mutationFn: (data: D) => Promise<T>,
): UseMutationState<T> & { mutate: (data: D) => Promise<T> } {
  const [state, setState] = useState<UseMutationState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = useCallback(
    async (data: D) => {
      setState({ data: null, loading: true, error: null });
      try {
        const response = await mutationFn(data);
        setState({ data: response, loading: false, error: null });
        return response;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [mutationFn],
  );

  return { ...state, mutate };
}
