/* eslint-disable no-restricted-syntax */
import { adminFirestore } from '../../../firebase/admin';

const deleteDoc = async ({ docPath }) => {
  console.log('inside deleteDoc')
  // document reference
  const docRef = adminFirestore
    .doc(docPath);

  console.log({
    docId: docRef.id,
  });

  // subcollections
  const subcollections = await docRef.listCollections();
  console.log({ subcollections });
  for await (const subcollectionRef of subcollections) {
    console.log({ subCollId: subcollectionRef.id });
    await subcollectionRef
      .get()
      .then(async (snapshot) => {
        const { docs } = snapshot;
        for await (const doc of docs) {
          console.log({ subColDOCID: doc.id });
          await deleteDoc({ docPath: `${docPath}/${subcollectionRef.id}/${doc.id}` });
        }
        return true;
      })
      .catch(() => false);
  }

  // when all subcollections are deleted, delete the document itself
  return docRef
    .delete()
    .then(() => true)
    .catch(() => false);
};

export {
  deleteDoc,
};

// console.error('Error deleting document', docPath, JSON.stringify(error));

// console.error('Error reading subcollection',
//  `${docPath}/${subcollectionRef.id}`, JSON.stringify(error));
