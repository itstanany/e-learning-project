import { Button, Snackbar } from '@material-ui/core';
import { useCallback, useMemo, useState } from 'react';
import { Alert } from '../../components/Alert';

function useSnackbar({
  autoHideDuration = 6000,
} = {}) {
  // snackbar toast message state
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const handlerSnackbarClose = useCallback(() => {
    /**
     * Control visibility of Snackbar toast
     */
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  }, []);

  const showSnackbar = useCallback(({ msg = '', severity = '' } = {}) => {
    setSnackbarState({
      open: true,
      message: msg,
      severity,
    });
  }, []);

  const showSuccess = useCallback(({ msg = '' } = {}) => {
    showSnackbar({ msg, severity: 'success' });
  }, [showSnackbar]);

  const showError = useCallback(({ msg = '' } = {}) => {
    showSnackbar({ msg, severity: 'error' });
  }, [showSnackbar]);

  const showInfo = useCallback(({ msg = '' } = {}) => {
    showSnackbar({ msg, severity: 'info' });
  }, [showSnackbar]);

  const showWarning = useCallback(({ msg = '' } = {}) => {
    showSnackbar({ msg, severity: 'warning' });
  }, [showSnackbar]);
  const snackbar = useMemo(() => (
    <Snackbar
      autoHideDuration={autoHideDuration}
      open={snackbarState.open}
      onClose={handlerSnackbarClose}
    >
      <Alert
        severity={snackbarState.severity}
        onClose={handlerSnackbarClose}
        // fix ed, action button long height making icon and text at flex-start not symmetric
        style={{ alignItems: 'center' }}
      >
        {
          snackbarState.message
        }
      </Alert>
    </Snackbar>
  ), [
    autoHideDuration,
    handlerSnackbarClose,
    snackbarState.message,
    snackbarState.open,
    snackbarState.severity,
  ]);

  const returnValue = useMemo(() => ({
    showSuccess,
    showError,
    showInfo,
    showWarning,
    snackbar,
  }), [
    showError,
    showInfo,
    showSuccess,
    showWarning,
    snackbar,
  ]);

  return returnValue;
}

export default useSnackbar;

export {
  useSnackbar,
};
