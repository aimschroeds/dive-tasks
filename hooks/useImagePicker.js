import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const useImagePicker = (options) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const pickImages = async () => {
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!status.granted) {
      alert('We need permission to access your camera roll to select images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      ...options,
    });

    if (!result.canceled) {
      setSelectedImages(result.assets || [result]);
    }
  };
  return { selectedImages, pickImages };
};

export default useImagePicker;
