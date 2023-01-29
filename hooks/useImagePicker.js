import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const useImagePicker = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const pickImages = async () => {
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!status.granted) {
      alert('We need permission to access your camera roll to select images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      maxImagesCount: 10,
      quality: 0.5,
    });

    if (!result.canceled) {
      setSelectedImages(result.assets);
    }
  };

  return { selectedImages, pickImages };
};

export default useImagePicker;
