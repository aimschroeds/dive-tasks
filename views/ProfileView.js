import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, Switch, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';


import { db, auth, storage } from "../firebase";
import { getFirestore, query, getDoc, doc, collection, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { handleImageUpload } from '../utils/handleImageUpload';
import useImagePicker from '../hooks/useImagePicker';

import Styles from '../styles/Styles';

const UserProfile = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userDisplayName, setUserDisplayName] = useState('');
    const [searchable, setSearchable] = useState(false);
    const [certificationLevel, setCertificationLevel] = useState('None');

  
    const { selectedImages, pickImages } = useImagePicker({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      allowsMultipleSelection: false,
    });
  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const fetchUser = async () => {
              const docRef = doc(db, "users", user.uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                setUserData(docSnap.data());
                setUser(user);
                setUserDisplayName(docSnap.data().display_name || "");
                setSearchable(docSnap.data().searchable || false);
                setCertificationLevel(docSnap.data().certificationLevel || 'None');
              }
            };
            fetchUser();
            setLoading(false);
          }
        });
        return unsubscribe;
      }, []);
      
      useEffect(() => {
        if (!user) {
          navigation.navigate("Login");
        }
      }, [user, navigation]);
  
    useEffect(() => {
        if (selectedImages.length > 0 && user ) {
            console.log('Selected images:', selectedImages)
            handleImageUpload(user.uid, 'users', selectedImages, async (uploadedImageUrls) => {
              const imageUrl = uploadedImageUrls[0];
              console.log('Image URL:', imageUrl)
              const docRef = doc(db, "users", user.uid);
              await updateDoc(docRef, { image_url: imageUrl });
              setUserData({ ...userData, image_url: imageUrl });
            });
      }
    }, [selectedImages]);

    const handleDisplayNameUpdate = async () => {
        if (user && userDisplayName!== userData.display_name) {
          const docRef = doc(db, "users", user.uid);
          await updateDoc(docRef, { display_name: userDisplayName });
          setUserData({ ...userData, display_name: userDisplayName });
        }
      };

      const handleSearchableUpdate = async () => {
        if (user && searchable !== userData.searchable) {
          const docRef = doc(db, "users", user.uid);
          await updateDoc(docRef, { searchable });
          setUserData({ ...userData, searchable });
        }
      };
    
      const handleCertificationLevelUpdate = async (newValue) => {
        if (user && newValue !== userData.certificationLevel) {
          const docRef = doc(db, "users", user.uid);
          await updateDoc(docRef, { certificationLevel: newValue });
          setUserData({ ...userData, certificationLevel: newValue });
        }
      };
      
  
    if (loading) {
      return (
        <View style={Styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  
    return (
        <View style={Styles.container}>
            <View style={Styles.profileImageContainer}>
        {userData?.image_url ? (
            <Image
            source={{ uri: userData.image_url }}
            style={Styles.profileImage}
            resizeMode="cover"
            />
        ) : (
            <MaterialCommunityIcons
            name="account-circle"
            size={128}
            color="gray"
            />
        )}
        <TouchableOpacity style={Styles.editIcon} onPress={pickImages}>
            <MaterialCommunityIcons name="pencil" size={24} color="#FFF" />
        </TouchableOpacity>
        </View>
        
        {userData?.display_name && (
            <TextInput
            style={Styles.input}
            value={userDisplayName}
            onChangeText={(text) => setUserDisplayName(text)}
            onSubmitEditing={handleDisplayNameUpdate}
            autoCapitalize="words"
            returnKeyType="done"
            ></TextInput>
        )}
        <View style={Styles.profileContainer}>
        <View style={Styles.switchContainer}>
            <Text>Can other user's search for you in-app? </Text>
            <Switch
                trackColor={{ false: "grey", true: "#AA77FF" }}
                thumbColor={searchable ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={searchable}
                onValueChange={(value) => {
                    setSearchable(value);
                    handleSearchableUpdate();
                }}
            />
            </View>

            <View style={Styles.pickerContainer}>
            <Text style={{marginTop: 160}}>Certification Level: </Text>
            <Picker
                selectedValue={certificationLevel}
                onValueChange={(itemValue) => {
                setCertificationLevel(itemValue);
                handleCertificationLevelUpdate(itemValue);
                }}
                style={Styles.picker}
            >
                <Picker.Item label="None" value="None" />
                <Picker.Item label="Scuba Diver" value="Scuba Diver" />
                <Picker.Item label="Open Water Diver" value="Open Water Diver" />
                <Picker.Item label="Advanced Open Water Diver" value="Advanced Open Water Diver" />
                <Picker.Item label="Rescue Diver" value="Rescue Diver" />
                <Picker.Item label="Master Diver" value="Master Diver" />
                <Picker.Item label="Scubamaster" value="Scubamaster" />
            </Picker>
            </View>
                </View>
      </View>
    );
  };
  
  export default UserProfile;