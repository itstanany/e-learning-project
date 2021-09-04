/**
 * Authentication page
 */
import Head from 'next/head';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import Google from '@material-ui/icons/Google';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { useUser } from '../../customHooks/useUser';
import { loginWithGoogle } from '../../firebase/client';

const Auth = () => {
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
    if (user?.name) {
      redirectAuthenticated();
    }
  }, [user]);

  if (isLoading) return <Loader />;

  // if (!user) {
  return (
    <>
      <Head>
        <title>
          Authentication
        </title>
      </Head>
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
};

export default Auth;
