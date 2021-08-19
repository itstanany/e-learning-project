const verifyOnBackend = ({ idToken, isNewUser }) => fetch('/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    idToken,
    isNewUser,
  }),
}).then((loginRes) => loginRes.json());

export { verifyOnBackend };
