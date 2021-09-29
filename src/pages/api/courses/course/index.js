import { getCourse, getLectures } from '../../../../utils/server';

/**
 * return all courses in the database *** will refactored with pagination soon.
 * @param {*} req NextJs request object
 * @param {*} res NextJs response object
 */
const handler = async (req, res) => {
  const { body: { id, lectures = true } } = req;
  const course = await getCourse({ id });
  let lecturesData;
  if (lectures) {
    lecturesData = await getLectures({ courseId: id });
  }
  res.json({
    course,
    lectures: lecturesData,
  });
};

export default handler;

// export {
//   getAllcourses,
// };
