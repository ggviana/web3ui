import { useCallback } from 'react';
import debounce from 'lodash/debounce';

export const useDebounce = (
  callback: (inputs: any) => any,
  timeoutMillis?: number
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced = useCallback(debounce(callback, timeoutMillis || 400), []);

  return { debounced };
};
