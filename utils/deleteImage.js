import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { db } from '../firebase';

const getStorageRefFromUrl = (storage, url) => {
    const regex = /\/b\/(.*?)\/o\/(.*)/;
    const match = url.match(regex);
  
    if (match && match[2]) {
      const storagePath = decodeURIComponent(match[2]);
      return ref(storage, storagePath);
    } else {
      throw new Error('Unable to extract storage path from URL');
    }
  };
  

export const deleteImage = async (entityId, entityPath, imageUrl) => {
  const storage = getStorage();
  // Strip query from URL
  image = imageUrl.split('?')[0];
  const storageRef = getStorageRefFromUrl(storage, image);

  await deleteObject(storageRef);

  const docRef = doc(db, entityPath, entityId);
  await updateDoc(docRef, {
    images: arrayRemove(imageUrl),
  });
};
