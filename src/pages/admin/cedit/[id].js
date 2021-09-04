/**
 * Course Edit page
 */
import React from 'react';
import { protectPage } from '../../../utils/server';

function EditCourse() {
  return (
    <div>
      Edit Course Placeholder
      <h1>
        Coming soon, stay toned!!
      </h1>
    </div>
  );
}

export const getServerSideProps = protectPage(() => ({ props: {} }));

export default EditCourse;
