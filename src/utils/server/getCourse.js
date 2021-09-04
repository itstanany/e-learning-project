import { adminFirestore } from '../../firebase/admin';

const getCourse = ({ id }) => adminFirestore.doc(`courses/${id}`).get().then((doc) => doc.data());

export {
  getCourse,
};
