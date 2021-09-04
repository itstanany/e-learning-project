import React from 'react';
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
      <Grid container xs={12} spacing={3} alignContent="center">
        {
          courses.map((course) => (
            <CourseCard course={course} key={course.id} user={user} />
          ))
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
  };
};
