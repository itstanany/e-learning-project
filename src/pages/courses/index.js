import Head from 'next/head';
import {
  Grid,
} from '@material-ui/core';

import { getAllcourses } from '../../utils/server';
import { CourseCard } from '../../components/CourseCard/Index';
import { useUser } from '../../customHooks';

function AllCourses({ courses = [] }) {
  const {
    user,
  } = useUser();
  return (
    <>
      <Head>
        <title>
          All Courses
        </title>
      </Head>
      <Grid container spacing={3}>
        {
          courses.map((course) => {
            const subscribed = (user?.subscription?.includes(course?.id));
            return (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CourseCard course={course} key={course.id} subscribed={subscribed} />
              </Grid>
            );
          })
        }
      </Grid>
    </>
  );
}

export default AllCourses;

export const getStaticProps = async () => {
  // get array of all courses
  const courses = await getAllcourses();
  return {
    props: {
      courses,
    },
    revalidate: 5,
  };
};
