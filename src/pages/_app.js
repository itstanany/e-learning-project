import { initAuth } from '../firebase/auth/initAuth';
import '../styles/globals.css'

// Initialize NextJS Firebase auth package.
initAuth();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
