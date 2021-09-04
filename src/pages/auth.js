import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useUser } from '../customHooks/useUser';
import { signinWithGoogle } from '../firebase';

function Signin() {
  const { user, isLoading, isError } = useUser();
  const router = useRouter();
  const [authFailed, setAuthFailed] = useState(false);

  const [someState, setSt] = useState(null);

  const redirectAuthenticated = useCallback(() => (
    router.push(`${router.query.from || process.env.NEXT_PUBLIC_AUTHENTICATED_ROUTE}`)), [router]);

  const handleSignin = useCallback(async (e) => {
    e.preventDefault();
    const result = await signinWithGoogle();
    // console.log({ result });
    if (result.auth) {
      setAuthFailed(false);
      redirectAuthenticated();
    } else {
      setAuthFailed(true);
    }
  }, [router]);

  useEffect(() => {
    console.log({ from: router.query });
    if (user?.name) {
      redirectAuthenticated();
    }
  }, [user]);

  if (isError) {
    return (
      <h1>
        Error Happened, SORRY!!!
      </h1>
    );
  }
  if (isLoading) {
    return <h1>LOADING...........!!! Wait or close the window</h1>;
  }
  if (!user) {
    return (
      <>
        {
          authFailed
            ? <h1>Authentication failed , please try again</h1>
            : null
        }
        <button type="button" onClick={handleSignin}>
          Signin With Google
        </button>
        <button type="button" onClick={() => setSt(55)}>
          Sttttttt
        </button>
      </>
    );
  }
  return <h1>Redirecting......!!!!!!!</h1>;
}
export default Signin;
