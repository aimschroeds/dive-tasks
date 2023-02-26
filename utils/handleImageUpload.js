import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { db, storage } from '../firebase';

export const handleImageUpload = async (entityId, entityPath, inputImage, onImageUploaded) => {
  try {
    const images = Array.isArray(inputImage) ? inputImage : [inputImage];
    const uploadedImageUrls = [];

    for (const image of images) {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const fileName = `${new Date().getTime()}_${images.indexOf(image)}`;
      const storageRef = ref(storage, `${entityPath}/${entityId}/${fileName}`);
      await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(storageRef);
      uploadedImageUrls.push(imageUrl);
    }

    // const docRef = doc(db, entityPath, entityId);
    // await updateDoc(docRef, { images: arrayUnion(...uploadedImageUrls) });
    onImageUploaded(uploadedImageUrls);
    console.log('Image(s) saved successfully!');
  } catch (error) {
    console.error('Error saving image(s):', error);
  }
};

