import React from 'react';
import { protectPage } from '../../../utils/clientServer/protectPage';

function EditCourse() {
  return (
    <div>
      Edit Course Placeholder
    </div>
  );
}

export const getServerSideProps = protectPage(() => ({ props: {} }));

export default EditCourse;
