import { getAllcourses } from '../../utils/server';

/**
 * return all courses in the database *** will refactored with pagination soon.
 * @param {*} req NextJs request object
 * @param {*} res NextJs response object
 */
const handler = async (req, res) => {
  const courses = await getAllcourses();
  res.json({ courses });
};

export default handler;

// export {
//   getAllcourses,
// };
