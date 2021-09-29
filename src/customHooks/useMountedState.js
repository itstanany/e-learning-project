import { useCallback, useEffect, useRef } from 'react';

const useMountedState = () => {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const isMounted = useCallback(() => (mounted.current), []);
  return { isMounted };
};

export {
  useMountedState,
};
