import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { db, auth } from "../firebase";
import { collection, doc, getDoc, getDocs, query, where, orderBy, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

const NotificationDrawer = ({ navigation }) => {
  const [currentUserId, setCurrentUserId] = useState();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
        navigation.navigate('Login');
      }
    })
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const fetchNotifications = async () => {
        if (currentUserId) {
          const notificationsRef = collection(db, "notifications");
          const q = query(
            notificationsRef,
            where("recipientId", "==", currentUserId),
            orderBy("timestamp", "desc")
          );
      
          const querySnapshot = await getDocs(q);
      
          // Fetch sender user data for each notification
          const fetchedNotifications = await Promise.all(
            querySnapshot.docs.map(async doc => {
              const notificationData = doc.data();
              const senderDocRef = doc(db, "users", notificationData.senderId);
              const senderDocSnap = await getDoc(senderDocRef);
      
              return {
                ...notificationData,
                id: doc.id,
                senderProfilePicture: senderDocSnap.data().image_url,
                senderDisplayName: senderDocSnap.data().display_name,
              };
            })
          );
      
          setNotifications(fetchedNotifications);
        }
      };      

    fetchNotifications();
  }, [currentUserId]);

  const markAsRead = async (notificationId) => {
    await updateDoc(doc(db, "notifications", notificationId), {
      read: true,
    });
  };

  const handleNotificationPress = async (notification) => {
    await markAsRead(notification.id);
    navigation.navigate('Other Profile', { viewingUserId: notification.senderId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, item.read ? styles.read : styles.unread]}
      onPress={() => handleNotificationPress(item)}
    >
      {item.senderProfilePicture ? (
        <Image
          source={{ uri: item.senderProfilePicture }}
          style={styles.senderProfilePicture}
          resizeMode="cover"
        />
      ) : (
        <MaterialCommunityIcons
          name="account-circle"
          size={50}
          color="gray"
          style={{ marginRight: 15 }}
        />
      )}
      <View style={styles.notificationTextContainer}>
        <Text style={styles.senderDisplayName}>{item.senderDisplayName}</Text>
        <Text>{item.message}</Text>
        <Text style={styles.timestamp}>{item.timestamp.toDate().toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default NotificationDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  read: {
    backgroundColor: '#fff',
  },
  unread: {
    backgroundColor: '#f0f0f0',
  },
  senderProfilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationTextContainer: {
    flex: 1,
  },
  
 
});