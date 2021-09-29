import { getAllcourses } from '../getAllCourses';

const getCourses = async (req, res) => {
  try {
    const courses = await getAllcourses();
    return res.status(200).json({ courses });
  } catch (error) {
    return res.status('400').json({ error: error.message });
  }
};

export {
  getCourses,
};
