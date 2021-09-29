import { copyDoc, deleteDoc, moveDoc } from '../firebase';

const deleteCourses = async (req, res) => {
  const { body: { ids } } = req;
  let deleted = false;
  // const copiedState = await Promise.all(
  //   ids?.map((id) => (copyDoc({
  //     collectionFrom: 'courses',
  //     collectionTo: 'deletedCourses',
  //     docId: id,
  //     recursive: true,
  //   }))),
  // );
  // console.log({
  //   copiedState,
  // });
  // if (copiedState.indexOf(false) === -1) {
  //   const deletedState = await Promise.all(ids.map((id) => (
  //     deleteDoc({ docPath: `courses/${id}` })
  //   )));
  //   console.log({ deletedState });
  //   if (deletedState.indexOf(false) === -1) deleted = true;
  // }
  const movedState = await Promise.all(
    ids?.map((id) => (moveDoc({
      collectionFrom: 'courses',
      collectionTo: 'deletedCourses',
      docId: id,
      recursive: true,
    })
    )),
  );
  deleted = movedState.indexOf(false) === -1;
  // const deleted = deletion.indexOf(false) === -1;
  res.status(200).json(
    {
      deleted,
    },
  );
};

export {
  deleteCourses,
};
