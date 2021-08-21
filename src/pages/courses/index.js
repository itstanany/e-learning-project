import React from 'react';
import {
  Grid,
} from '@material-ui/core';
// import { useUser } from '../../customHooks';

import { getAllcourses } from '../../utils/server';
import { CourseCard } from '../../components/CourseCard/Index';

function AllCourses({ courses = [] }) {
  // const {
  //   user,
  // } = useUser();
  return (
    <Grid container xs={12} spacing={3} alignContent="center">
      {
        courses.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))
      }
    </Grid>
  );
}

export default AllCourses;

export const getStaticProps = async () => {
  // get array of all courses
  const courses = await getAllcourses();
  // console.log({ courses });
  return {
    props: {
      courses,
    },
  };
};
