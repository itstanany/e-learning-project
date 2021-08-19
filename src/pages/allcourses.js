import React from 'react';
import Link from 'next/link';
import { Container } from '@material-ui/core';

function AllCourses() {
  return (
    <div>
      {/* <Container maxWidth="lg"> */}
      All Courses Placeholder
      <Link href="/dashboard">
        <a>
          Dashboard
        </a>
      </Link>
      {/* </Container> */}
    </div>
  )
}

export default AllCourses
