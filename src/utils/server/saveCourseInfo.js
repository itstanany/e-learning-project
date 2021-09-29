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
    const courseId = courseInfo?.id || await nanoid();
    const courseDocRef = await adminFirestore.collection('courses').doc(courseId);
    await courseDocRef.set(
      {
        ...courseInfo,
        slug: ars(courseInfo.title),
        id: courseId,
      },
      // {
      //   merge: true,
      // },
    );
    lectures.forEach(async (lect) => {
      const lectId = lect.id || await nanoid();
      const {
        resources = [],
        ...remaining
      } = lect;
      const lectDocRef = courseDocRef.collection('lectures').doc(lectId);
      lectDocRef.set({
        ...remaining,
        id: lectId,
      });
      if (resources instanceof Array) {
        resources.forEach(async (res) => {
          const resId = res.id || await nanoid();
          const resWithId = {
            ...res,
            id: resId,
          };
          lectDocRef
            .collection('resources')
            .doc(resId)
            .set(resWithId);
        });
      }
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
