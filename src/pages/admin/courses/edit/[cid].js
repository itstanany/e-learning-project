import { useRouter } from 'next/router';
import { CourseEditForm } from '../../../../components/CourseForm';

function EditCourse() {
  const router = useRouter();
  return (
    <CourseEditForm
      cId={router?.query?.cid}
    />
  );
}

export default EditCourse;
