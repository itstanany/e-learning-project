// remove extra \ added by OS
const jwtPublicKey = process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n');
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n');

export {
  jwtPublicKey,
  jwtPrivateKey,
};
