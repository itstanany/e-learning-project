import { deleteDoc } from './deleteDoc';
import { copyDoc } from './copyDoc';

const moveDoc = async ({
  collectionFrom,
  docId,
  collectionTo,
  addData = {},
}) => {
  // copy the organization document
  const copied = await copyDoc({
    collectionFrom, docId, collectionTo, addData, recursive: true,
  });

  // if copy was successful, delete the original
  if (copied) {
    await deleteDoc({ docPath: `${collectionFrom}/${docId}` });
    return true;
  }
  throw new Error(
    'data-loss, Data was not copied properly to the target collection, please try again.',
  );
};

export {
  moveDoc,
};
