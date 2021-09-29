/**
 * public/private key generator
 *  https://travistidwell.com/jsencrypt/demo/
 */

// const jwt = require('jsonwebtoken');
// const TokenGenerator = require('./TokenGenerator');
import { TokenGenerator } from './TokenGenerator';
// const { jwtPublicKey, jwtPrivateKey } = require('../../components/Config/keys');
import { jwtPublicKey, jwtPrivateKey } from '../config';

const tokenGenerator = new TokenGenerator(jwtPrivateKey, jwtPublicKey, {
  expiresIn: '7d',
  algorithm: 'RS256',
});

const jwtGenerate = (plainMessage, options = {}) => (
  tokenGenerator.sign(plainMessage, options)
);

const jwtVerify = ({ token, verifyOptions }) => (
  tokenGenerator.verify({ token, verifyOptions: { ...verifyOptions, algorithms: ['RS256'] } })
);

const refreshJWT = (token, refreshOptions = {}) => (
  tokenGenerator.refresh(token, refreshOptions)
);

// module.exports = {
//   generateJWT,
//   refreshJWT,
// };

export {
  jwtGenerate,
  jwtVerify,
  refreshJWT,
};
