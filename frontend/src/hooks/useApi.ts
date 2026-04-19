import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../types";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (config?: AxiosRequestConfig) => Promise<ApiResponse<T> | null>;
}

/**
 * Generic hook for making typed API requests.
 *
 * @param url     - The endpoint URL to call.
 * @param defaultConfig - Optional Axios config applied to every call.
 *
 * @example
 * const { data, loading, error, execute } = useApi<FoodItem[]>('/api/food/list');
 * useEffect(() => { execute({ method: 'GET' }); }, [execute]);
 */
function useApi<T>(
  url: string,
  defaultConfig?: AxiosRequestConfig
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (
      config?: AxiosRequestConfig
    ): Promise<ApiResponse<T> | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response = await axios<ApiResponse<T>>(url, {
          ...defaultConfig,
          ...config,
        });
        setState({
          data: response.data.data ?? null,
          loading: false,
          error: null,
        });
        return response.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setState({ data: null, loading: false, error: errorMessage });
        return null;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // `defaultConfig` is intentionally excluded: it is often passed as an
    // inline object literal whose reference changes every render, so including
    // it would cause an infinite re-render loop.  Callers that need dynamic
    // config should pass it through the `config` argument of `execute`.
    [url]
  );

  return { ...state, execute };
}

export default useApi;
