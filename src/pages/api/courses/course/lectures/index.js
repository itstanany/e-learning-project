import { getLectures, getResources, isAuth } from '../../../../../utils/server';

/**
 * return all courses in the database *** will refactored with pagination soon.
 * @param {*} req NextJs request object
 * @param {*} res NextJs response object
 */
const handler = async (req, res) => {
  const { /* body, */ body: { id, resources = false } } = req;
  // console.log({ body });
  const lectures = await getLectures({ courseId: id });
  // return lectures with "resources" field as array of lecture resources.
  if (resources && isAuth(req, res)) {
    const lecturesWithRes = await Promise.all(lectures.map(async (lect) => {
      const resource = await getResources({ cId: id, lId: lect?.id });
      return {
        ...lect,
        resources: resource,
      };
    }));
    return res.json({ lectures: lecturesWithRes });
  }
  res.json({ lectures });
};

export default handler;

// export {
//   getAllcourses,
// };
