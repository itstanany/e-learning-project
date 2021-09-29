const bypassThumbnailUpload = ({ req }) => {
  console.log({ body: req.body });
  // const parsedCourseInfo = JSON.parse(req?.body?.courseInfo);
  const parsedCourseInfo = req?.body?.courseInfo;
  // console
  if (parsedCourseInfo?.thumbnail) {
    return true;
  }
  return false;
};

export {
  bypassThumbnailUpload,
};
