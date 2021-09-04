import { adminFirestore } from '../../firebase/admin';

const getLectures = ({ courseId }) => adminFirestore
  .collection(`courses/${courseId}/lectures`)
  .orderBy('order')
  .get()
  .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));

export {
  getLectures,
};
