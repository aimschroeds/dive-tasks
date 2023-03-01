import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

import Styles from '../styles/Styles';

const OtherProfileView = ({ route }) => {
    const { viewingUserId } = route.params;
    console.log('OtherProfileView - viewingUserId:', viewingUserId);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log('viewingUserID:', viewingUserId)

  useEffect(() => {
    console.log('useEffect viewingUserID:', viewingUserId)
    const fetchUser = async () => {
      const docRef = doc(db, "users", viewingUserId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
      setLoading(false);
    };
    fetchUser();
  }, [viewingUserId]);

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
      </View>
      {userData?.display_name && (
        <Text style={Styles.displayName}>{userData.display_name}</Text>
      )}
    </View>
  );
};

export default OtherProfileView;
