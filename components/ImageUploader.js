import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Styles from '../styles/Styles';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import useImagePicker from '../hooks/useImagePicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ImageUploader = ({ entityId, entityPath, images, onImagesUploaded }) => {
  const { selectedImages, pickImages } = useImagePicker();

  useEffect(() => {
    if (selectedImages.length > 0) {
      handleImageUpload(selectedImages);
    }
  }, [selectedImages]);

  const handleImageUpload = async (images) => {
    try {
      const uploadedImageUrls = [];

      for (const image of images) {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const fileName = new Date().getTime();
        const storageRef = ref(storage, `${entityPath}/${entityId}/${fileName}`);
        console.log('Storage ref:', storageRef);
        await uploadBytes(storageRef, blob);
        const imageUrl = await getDownloadURL(storageRef);
        console.log('Image URL:', imageUrl);
        uploadedImageUrls.push(imageUrl);
        console.log('Uploaded image URLs:', uploadedImageUrls);

      }

      const docRef = doc(db, entityPath, entityId);
      await updateDoc(docRef, {
        images: arrayUnion(...uploadedImageUrls),
      });

      onImagesUploaded(uploadedImageUrls);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <View style={Styles.uploadImageContainer}>
      <TouchableOpacity onPress={pickImages}>
        <MaterialCommunityIcons
          name="image-plus"
          size={48}
          style={Styles.uploadImageIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ImageUploader;
