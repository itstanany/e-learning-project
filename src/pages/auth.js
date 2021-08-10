import { signinWithGoogle } from '../firebase';

function Signin() {
  return (
    <div>
      Signin Placeholder
      <br />
      <button onClick={signinWithGoogle}>
        Signin With Google
      </button>
    </div>
  )
}

export default Signin
