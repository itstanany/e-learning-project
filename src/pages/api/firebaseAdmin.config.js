import * as admin from 'firebase-admin';



import serviceAccount from '../../keys/serviceAccountKey.json';

const adminApp = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

export default adminApp;

export {
  adminApp,
};
