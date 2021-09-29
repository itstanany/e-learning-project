import { adminFirestore } from '../../firebase/admin';

const getResources = async ({ cId, lId }) => (
  adminFirestore
    .collection('courses')
    .doc(cId)
    .collection('lectures')
    .doc(lId)
    .collection('resources')
    .get()
    .then((querySnapshot) => (
      querySnapshot.docs.map((doc) => (doc.data())))));

export {
  getResources,
};
