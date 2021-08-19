import { Button, CircularProgress, Grid } from '@material-ui/core';
import Google from '@material-ui/icons/Google';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useUser } from '../customHooks/useUser';
import { loginWithGoogle } from '../firebase/client';

function Auth() {
  const { user, isLoading, isError } = useUser();
  const router = useRouter();
  const [authFailed, setAuthFailed] = useState(false);

  const redirectAuthenticated = useCallback(() => (
    router.push(`${router.query.from || process.env.NEXT_PUBLIC_AUTHENTICATED_ROUTE}`)
  ), [router]);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    const result = await loginWithGoogle();
    // console.log({ result });
    if (result.auth) {
      setAuthFailed(false);
      redirectAuthenticated();
    } else {
      setAuthFailed(true);
    }
  }, [redirectAuthenticated]);

  useEffect(() => {
    console.log({ from: router.query });
    if (user?.name) {
      redirectAuthenticated();
    }
  }, [user]);

  // if (isError) {
  //   return (
  //     <h1>
  //       Error Happened, SORRY!!!
  //     </h1>
  //   );
  // }
  if (isLoading) {
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Grid>
    );
  }
  // if (!user) {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {
          authFailed
          && <h1>Authentication failed , please try again</h1>
        }
        {
          isError
          && (
            <h1>
              Error Happened, SORRY!!!
              <br />
              Please, try again!
            </h1>
          )
        }
        {
          isLoading
          && <CircularProgress />
        }
        {
          user
            ? <h1>Redirecting......!!!!!!!</h1>
            : (
              <Button
                type="button"
                onClick={handleLogin}
                variant="outlined"
                color="primary"
              >
                <Google />
                &nbsp;
                Login With Google
              </Button>
            )
        }
      </Grid>
    </>
  );
  // }
  // return <h1>Redirecting......!!!!!!!</h1>;
}
export default Auth;
