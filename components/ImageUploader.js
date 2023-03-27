import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Styles from "../styles/Styles";
import useImagePicker from "../hooks/useImagePicker";
import { handleImageUpload } from "../utils/handleImageUpload";

/**
 * ImageUploader component for uploading images to an entity
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.entityId - Entity ID
 * @param {string} props.entityPath - Entity path
 * @param {Array} props.images - Array of image URIs
 * @param {Function} props.onImagesUploaded - Function to call after images have been uploaded
 * @returns {React.Node} - ImageUploader component
 */
const ImageUploader = ({ entityId, entityPath, images, onImagesUploaded }) => {
  const { selectedImages, pickImages } = useImagePicker({
    allowsMultipleSelection: true,
    maxImagesCount: 10,
    quality: 0.5,
  });

  // Upload selected images when available
  useEffect(() => {
    if (selectedImages.length > 0) {
      console.log("Selected images:", selectedImages);
      handleImageUpload(entityId, entityPath, selectedImages, onImagesUploaded);
    }
  }, [selectedImages]);

  /**
   * Render the ImageUploader component
   * @returns {React.Node} - The ImageUploader component
   */
  return (
    <View style={Styles.uploadImageContainer}>
      <TouchableOpacity onPress={pickImages} testID="upload-button">
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
