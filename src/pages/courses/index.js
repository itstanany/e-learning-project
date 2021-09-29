/*
  * Render all courses in a responsive page.
  * Render mode: Incremental static Generation. Page is revalidated after 5 seconds of visit
*/

import Head from 'next/head';
import {
  Grid,
} from '@material-ui/core';

import { getAllcourses } from '../../utils/server';
import { CourseCard } from '../../components/CourseCard/Index';
import { useUser } from '../../customHooks';
import CourseLibrary from '../../components/CourseLibrary';
import { useEffect, useMemo, useState } from 'react';

function AllCourses({ courses: initialCourses = [] }) {
  // const [courses, setCourses] = useState(initialCourses);
  // console.log({ courses });
  const {
    user,
  } = useUser();

  const courses = useMemo(() => {
    if (initialCourses?.length && user?.subscription?.length > 0) {
      const coursesWithSubscription = initialCourses?.map((crse) => {
        const crseWithSubscription = {
          ...crse,
          subscribed: user?.subscription?.includes(crse?.id),
        };
        return crseWithSubscription;
      });
      return coursesWithSubscription;
    }
    return initialCourses;
  }, [user, initialCourses]);

  // useEffect(() => {
  //   console.log('inside useeffect');
  //   if (courses && user?.subscription?.length > 0) {
  //     const coursesWithSubscription = courses.map((crse) => {
  //       const crseWithSubscription = {
  //         ...crse,
  //         subscribed: user?.subscription?.includes(crse?.id),
  //       };
  //       return crseWithSubscription;
  //     });
  //     setCourses(coursesWithSubscription);
  //   }
  // }, [user]);

  return (
    <>
      <Head>
        <title>
          All Courses
        </title>
      </Head>
      {/* <Grid container spacing={3}>
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
      </Grid> */}
      <CourseLibrary courses={courses} />
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
