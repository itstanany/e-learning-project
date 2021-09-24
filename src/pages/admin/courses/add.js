/**
 * Add Course Form
 */

// helper utilities
import {
  getUserDoc, adminEditorAccess, protectPage, getAllAuthors,
} from '../../../utils/server';
import { AddCourseForm } from '../../../components/CourseForm';

const AddCourse = ({ userDoc, allAuthors }) => (
  <AddCourseForm
    userDoc={userDoc}
    allAuthors={allAuthors}
  />
);

/**
 * Get current "user" document and list of all users
 * @param {*} ctx NextJS context object of "req" and "res" object fields
 * @returns object of property "props" of object type with fields: .....
 */
const getSSProps = async (ctx, { userCookie }) => {
  const userDoc = await getUserDoc({ uid: userCookie.uid });
  const allAuthors = await getAllAuthors();
  return {
    props: {
      userDoc,
      allAuthors,
    },
  };
};

export const getServerSideProps = protectPage(adminEditorAccess(getSSProps));

export default AddCourse;
