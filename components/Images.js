import React, { useRef, useState } from "react";
import { Modal, View, Image, ScrollView, TouchableOpacity } from "react-native";
import Styles from "../styles/Styles";
import { deleteImage } from "../utils/deleteImage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Images = ({ entityId, entityPath, images, refreshImages }) => {
  const scrollViewRef = useRef();
  const [contentOffset, setContentOffset] = useState({ x: 0, y: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState(null); 

  const handleDeleteImage = async (image) => {
    try {
      await deleteImage(entityId, entityPath, image);
      // Refresh the images
        refreshImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleModalOpen = (image) => {
    setModalImage(image);
    setModalVisible(true);
    };

    const handleModalClose = () => {
    setModalImage(null);
    setModalVisible(false);
    };

  return (
    <View style={Styles.imageScrollContainer}>
      {images.length >2 && <TouchableOpacity
        // When pressed scroll to the left a small amount
        onPress={() => {
          scrollViewRef.current.scrollTo({
            x: contentOffset.x - 100,
            animated: true,
          });
        }}
        style={Styles.imageScrollButtonLeft}
      >
        <MaterialCommunityIcons
          name="arrow-left-drop-circle-outline"
          size={24}
          color="white"
        />
      </TouchableOpacity>}
      <ScrollView
        horizontal={true}
        style={Styles.imageScroll}
        contentContainerStyle={{ alignItems: "center" }}
        ref={scrollViewRef}
        onScroll={(event) => {
            setContentOffset(event.nativeEvent.contentOffset);
        }}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <View key={index} style={Styles.imageWrapper}>
            <TouchableOpacity
                onPress={() => handleModalOpen(image)}
            >
            <Image source={{ uri: image }} style={Styles.image} />
            <TouchableOpacity
              style={Styles.imageDeleteButton}
              onPress={() => handleDeleteImage(image)}
            >
              <MaterialCommunityIcons name="delete" size={24} color="white" />
            </TouchableOpacity>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {images.length > 2 && <TouchableOpacity
        // When pressed scroll to the left a small amount
        onPress={() => {
          scrollViewRef.current.scrollTo({
            x: contentOffset.x + 100,
            animated: true,
          });
        }}
        style={Styles.imageScrollButtonRight}
      >
        <MaterialCommunityIcons
          name="arrow-right-drop-circle-outline"
          size={24}
          color="white"
        />
      </TouchableOpacity>}
      <Modal
        visible={modalVisible}
        onRequestClose={handleModalClose}
        animationType="fade"
        transparent={true}
        >
            <TouchableOpacity
            style={Styles.modalContainer}
            onPress={handleModalClose}
            activeOpacity={1}
            >
                <Image source={{ uri: modalImage }} 
                style={Styles.modalImage} 
                resizeMode="contain"
                />
            </TouchableOpacity>
        </Modal>

    </View>
  );
};

export default Images;
