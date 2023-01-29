import React, { useRef } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import Styles from "../styles/Styles";
import { deleteImage } from "../utils/deleteImage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Images = ({ entityId, entityPath, images }) => {
  const scrollViewRef = useRef();

  const handleDeleteImage = async (image) => {
    try {
      await deleteImage(entityId, entityPath, image);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <View style={Styles.imageScrollContainer}>
      <TouchableOpacity
        // When pressed scroll to the left a small amount
        onPress={() => {
          scrollViewRef.current.scrollTo({
            x: scrollViewRef.current.contentOffset.x - 100,
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
      </TouchableOpacity>
      <ScrollView
        horizontal={true}
        style={Styles.imageScroll}
        contentContainerStyle={{ alignItems: "center" }}
        ref={scrollViewRef}
      >
        {images.map((image, index) => (
          <View key={index} style={Styles.imageWrapper}>
            <Image source={{ uri: image }} style={Styles.image} />
            <TouchableOpacity
              style={Styles.imageDeleteButton}
              onPress={() => handleDeleteImage(image)}
            >
              <MaterialCommunityIcons name="delete" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        // When pressed scroll to the left a small amount
        onPress={() => {
          scrollViewRef.current.scrollTo({
            x: scrollViewRef.current.contentOffset.x + 100,
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
      </TouchableOpacity>
    </View>
  );
};

export default Images;
