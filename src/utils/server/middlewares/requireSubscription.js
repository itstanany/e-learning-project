import { adminFirestore } from '../../../firebase/admin';

const requireSubscription = async (req, res, next) => {
  const { user, cId } = req.body;
  console.log('inside requiresubscription');
  console.log({ user, cId });
  const userDoc = await adminFirestore
    .doc(`users/${user.uid}`)
    .get()
    .then((querySnapshot) => querySnapshot.data());
  if (userDoc?.subscription?.includes(cId)) {
    next();
  } else {
    res.status(401).json({ error: 'not authorized' });
  }
};

export {
  requireSubscription,
};
