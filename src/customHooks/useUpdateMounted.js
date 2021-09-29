import { useCallback } from 'react';
import { useMountedState } from './useMountedState';

const useUpdateMounted = () => {
  const { isMounted } = useMountedState();
  const updateSt = useCallback((setFn, ...args) => (isMounted() && setFn(...args)), [isMounted]);
  return { updateSt };
};

export {
  useUpdateMounted,
};
