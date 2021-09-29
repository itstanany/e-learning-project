const parseCourseSubmission = async (req, res, next) => {
  try {
    const parsedCourseInfo = JSON.parse(req?.body?.courseInfo);
    const parsedLectures = JSON.parse(req?.body?.lectures);
    req.body.courseInfo = parsedCourseInfo;
    req.body.lectures = parsedLectures;
    next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export {
  parseCourseSubmission,
};
