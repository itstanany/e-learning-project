import ars from 'arslugify';
import { adminFirestore } from '../../../firebase/admin';

/**
 * Save course info into the database
 * @param {
 * courseInfo: object of course details,
 * lectures: array of lecture details object
 * } param0
 * @returns {add: boolean}  true if info saved successfully, false otherwise
 */
const saveCourseInfo = async ({ courseInfo, lectures }) => {
  try {
    const result = await adminFirestore.collection('courses').add({
      lectures,
      slug: ars(courseInfo.title),
      ...courseInfo,
    }).then((res) => res.id);
    return { added: !!result };
  } catch (error) {
    return {
      added: false,
      error,
    };
  }
};

export {
  saveCourseInfo,
};
