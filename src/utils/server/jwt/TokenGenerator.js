/**
 * Example to refresh tokens using https://github.com/auth0/node-jsonwebtoken
 * It was requested to be introduced at as part of the jsonwebtoken library,
 * since we feel it does not add too much value but it will add code to mantain
 * we won't include it.
 *
 * I create this gist just to help those who want to auto-refresh JWTs.
 */

// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

function TokenGenerator(secretOrPrivateKey, secretOrPublicKey, options) {
  // console.log('inside token generator and public is', secretOrPublicKey);
  this.secretOrPrivateKey = secretOrPrivateKey;
  this.secretOrPublicKey = secretOrPublicKey;
  this.options = options; // algorithm + keyid + noTimestamp + expiresIn + notBefore
}

TokenGenerator.prototype.sign = function (payload, signOptions) {
  const jwtSignOptions = { ...signOptions, ...this.options };
  // console.log('inside signin and secretororivate key is');
  // console.log(this.secretOrPrivateKey);
  // console.log('signin options');
  // console.log(jwtSignOptions);
  return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
};

TokenGenerator.prototype.verify = function ({ token, verifyOptions = {} }) {
  return jwt.verify(token, this.secretOrPrivateKey, verifyOptions);
};

// refreshOptions.verify = options you would use with verify function
// refreshOptions.jwtid = contains the id for the new token
TokenGenerator.prototype.refresh = function refresh(token, refreshOptions) {
  const payload = jwt.verify(token, this.secretOrPublicKey, refreshOptions.verify);
  delete payload.iat;
  delete payload.exp;
  delete payload.nbf;
  delete payload.jti;
  // We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
  const jwtSignOptions = { ...this.options, jwtid: refreshOptions.jwtid };
  // The first signing converted all needed options into claims, they are already in the payload
  return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
};

// module.exports = TokenGenerator;
export {
  TokenGenerator,
};
