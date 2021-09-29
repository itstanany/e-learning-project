import { adminFirestore } from '../../../firebase/admin';

const copyDoc = async (
  {
    collectionFrom,
    docId,
    collectionTo,
    addData = {},
    recursive = false,
  },
) => {
  // document reference
  const docRef = adminFirestore.collection(collectionFrom).doc(docId);
  // console.log({ docRef });
  // copy the document
  const docData = await docRef
    .get()
    .then((doc) => doc.exists && doc.data())
    .catch((error) => {
      console.error('Error reading document', `${collectionFrom}/${docId}`, JSON.stringify(error));
      throw new Error('not-found, Copying document was not read');
    });

  if (docData) {
    // document exists, create the new item
    await adminFirestore
      .collection(collectionTo)
      .doc(docId)
      .set({ ...docData, ...addData })
      .catch((error) => {
        console.error('Error creating document', `${collectionTo}/${docId}`, JSON.stringify(error));
        throw new Error('data-loss, Data was not copied properly to the target collection, please try again.');
      });

    // if copying of the subcollections is needed
    if (recursive) {
      // subcollections
      const subcollections = await docRef.listCollections();
      // eslint-disable-next-line no-restricted-syntax
      for await (const subcollectionRef of subcollections) {
        const subcollectionPath = `${collectionFrom}/${docId}/${subcollectionRef.id}`;

        // get all the documents in the collection
        return subcollectionRef
          .get()
          .then(async (snapshot) => {
            const { docs } = snapshot;
            // eslint-disable-next-line no-restricted-syntax
            for await (const doc of docs) {
              await copyDoc({
                collectionFrom: subcollectionPath,
                docId: doc.id,
                collectionTo: `${collectionTo}/${docId}/${subcollectionRef.id}`,
                recursive: true,
              });
            }
            return true;
          })
          .catch((error) => {
            console.error('Error reading subcollection', subcollectionPath, JSON.stringify(error));
            throw new Error(
              'data-loss, Data was not copied properly to the target collection, please try again.',
            );
          });
      }
    }
    return true;
  }
  return false;
};

export {
  copyDoc,
};
