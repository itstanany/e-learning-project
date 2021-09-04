import ars from 'arslugify';
import { nanoid } from 'nanoid/async';
import { adminFirestore } from '../../firebase/admin';

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
    const courseId = await nanoid();
    const courseDocRef = await adminFirestore.collection('courses').doc(courseId);
    await courseDocRef.set({
      ...courseInfo,
      slug: ars(courseInfo.title),
      id: courseId,
    });
    lectures.forEach(async (lect) => {
      const lectId = await nanoid();
      courseDocRef.collection('lectures').doc(lectId).set({
        ...lect,
        id: lectId,
      });
    });
    return { added: true };
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
