import React from 'react';
import Link from 'next/link';
import { protectPage } from '../../utils/clientServer/protectPage';

function AddCourse() {
  return (
    <div>
      Add course Placeholder
      <Link href='/dashboard'>
        <a>
          My Courses
        </a>
      </Link>
    </div>
  );
}

export const getServerSideProps = protectPage(() => ({ props: {} }));

export default AddCourse;
