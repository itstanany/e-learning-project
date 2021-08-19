import nextConnect from 'next-connect';
import { multerUpload, uploadFile } from '../../../utils/api/middlewares';
import { saveCourseInfo } from '../../../utils/api/helpers';

// router for the "/addcourse" route
const handler = nextConnect();

// extract form data into "req.body" for all fields except "files"
//    and "req.file" for attached file
handler.use(multerUpload.single('thumbnail'));
// upload file to the storage
// attach file location as "req.fileLocation" field
handler.use(uploadFile);

// save course details in data base
handler.post(async (req, res) => {
  try {
    const {
      body: { courseInfo = null, lectures = null, fileLocation = null },
    } = req;
    const parsedCourseInfo = JSON.parse(courseInfo);
    parsedCourseInfo.thumbnail = fileLocation;
    const parsedLectures = JSON.parse(lectures);
    const { added } = await saveCourseInfo({
      courseInfo: parsedCourseInfo,
      lectures: parsedLectures,
    });
    res.json({ added });
  } catch (error) {
    res.statusCode(400).json({ error: `Error during saving the course. ${error.message}` });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
