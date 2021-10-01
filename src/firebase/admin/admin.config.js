import * as admin from 'firebase-admin';
// import serviceAccount from '../../keys/serviceAccountKey.json';

// const adminApp = admin.apps.length
//   ? admin.app()
//   : admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: 'gs://e-learning-76331.appspot.com',

//   });

const adminApp = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.FBA_TYPE,
      project_id: process.env.FBA_PROJECT_ID,
      private_key_id: process.env.FBA_PRIVATE_KEY_ID,
      private_key: process.env.FBA_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FBA_CLIENT_EMAIL,
      client_id: process.env.FBA_CLIENT_ID,
      auth_uri: process.env.FBA_AUTH_URI,
      token_uri: process.env.FBA_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FBA_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FBA_CLIENT_X509_CERT_URL,
    }),
    storageBucket: 'gs://e-learning-76331.appspot.com',
  });

export default adminApp;

export {
  adminApp,
};
