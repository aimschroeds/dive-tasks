import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { db, auth } from "../firebase";
import { collection, doc, getDoc, getDocs, query, where, setDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Styles from '../styles/Styles';
import { sendFriendshipAcceptanceNotification, sendFriendshipRequestNotification } from "../helpers/notificationHelpers.js";

/**
 * OtherProfileView component shows another user's profile and allows the current user
 * to interact with them (e.g. send/accept friend requests).
 */
const OtherProfileView = ({ route, navigation }) => {
  const { viewingUserId } = route.params;
  const [relationshipStatus, setRelationshipStatus] = useState(null);
  const [relationshipDocId, setRelationshipDocId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState();
  const [sentRequest, setSentRequest] = useState(false);
  const [requesterId, setRequesterId] = useState(null);

  // Set up a listener for the current user's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
        navigation.navigate('Login');
      }
    });
    return unsubscribe;
  }, [navigation]);

  // Fetch data for the user being viewed
  useEffect(() => {
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

  // Fetch the current relationship status between the current user and the user being viewed
  const fetchRelationshipStatus = async () => {
    const relationshipRef = collection(db, "relationships");

    // Query for relationships where the current user is userId1
    const q1 = query(
      relationshipRef,
      where("userId1", "==", currentUserId),
      where("userId2", "==", viewingUserId)
    );

    // Query for relationships where the current user is userId2
    const q2 = query(
      relationshipRef,
      where("userId1", "==", viewingUserId),
      where("userId2", "==", currentUserId)
    );

    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);
    let relationshipDoc;

    // Determine the correct relationship document based on the query results
    if (!querySnapshot1.empty) {
      relationshipDoc = querySnapshot1.docs[0];
    } else if (!querySnapshot2.empty) {
      relationshipDoc = querySnapshot2.docs[0];
    }

    // Set relationship state variables based on the relationship document
    if (relationshipDoc) {
      setRelationshipDocId(relationshipDoc.id);
      const data = relationshipDoc.data();
      const status =
        data.userId1 === currentUserId ? data.status1 : data.status2;
      setRequesterId(data.userId1);
      setRelationshipStatus(status);
    } else {
      setRelationshipStatus("not friends");
    }
  };
  
  
  // Fetch relationship status whenever the current user or user being viewed changes
  useEffect(() => {
    if (currentUserId && viewingUserId)
    {
        fetchRelationshipStatus();
    }
  }, [viewingUserId, currentUserId]);
  
  // Send a friend request from the current user to the user being viewed
  const sendFriendRequest = async () => {
    await addDoc(collection(db, "relationships"), {
      userId1: currentUserId,
      userId2: viewingUserId,
      status1: "pending",
      status2: "pending",
    });
    setRelationshipStatus("pending");
    setSentRequest(true);
    // Send a notification for the friendship request
    await sendFriendshipRequestNotification(currentUserId, viewingUserId);
  };

  // Cancel a friend request sent by the current user
  const cancelFriendRequest = async () => {
    await deleteDoc(doc(db, "relationships", relationshipDocId));
    setRelationshipStatus("not friends");
  };

  // Accept a friend request received by the current user
  const acceptFriendRequest = async () => {
    await updateDoc(doc(db, "relationships", relationshipDocId), {
      [`status${currentUserId === requesterId ? 2 : 1}`]: "friends",
    });
    setRelationshipStatus("friends");
    // Send a notification for the friendship acceptance
    await sendFriendshipAcceptanceNotification(currentUserId, requesterId);
  };

  // Decline a friend request received by the current user
  const declineFriendRequest = async () => {
    await deleteDoc(doc(db, "relationships", relationshipDocId));
    setRelationshipStatus("not friends");
  };

  // Unfriend the user being viewed
  const unfriend = async () => {
    await deleteDoc(doc(db, "relationships", relationshipDocId));
    setRelationshipStatus("not friends");
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
      </View>
      {userData?.display_name && (
        <Text style={Styles.displayName}>{userData.display_name}</Text>
      )}
      {relationshipStatus === 'not friends' && (
        <TouchableOpacity
            style={styles.actionButton}
            onPress={sendFriendRequest}
        >
            <Text style={styles.actionButtonText}>Send Friend Request</Text>
        </TouchableOpacity>
        )}

        {relationshipStatus === 'pending' && (
        <View>
            {sentRequest ? (
            <TouchableOpacity
                style={styles.actionButton}
                onPress={cancelFriendRequest}
            >
                <Text style={styles.actionButtonText}>Cancel Friend Request</Text>
            </TouchableOpacity>
            ) : (
            <View>
                {currentUserId === requesterId ? null : (
                <>
                    <TouchableOpacity
                    style={styles.actionButton}
                    onPress={acceptFriendRequest}
                    >
                    <Text style={styles.actionButtonText}>Accept Friend Request</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.actionButton}
                    onPress={declineFriendRequest}
                    >
                    <Text style={styles.actionButtonText}>Decline Friend Request</Text>
                    </TouchableOpacity>
                </>
                )}
            </View>
            )}
        </View>
        )}


        {relationshipStatus === 'friends' && (
        <TouchableOpacity
            style={styles.actionButton}
            onPress={unfriend}
        >
            <Text style={styles.actionButtonText}>Unfriend</Text>
        </TouchableOpacity>
        )}

    </View>
  );
};

export default OtherProfileView;

const styles = StyleSheet.create({
    // ...
    actionButton: {
      backgroundColor: '#1a73e8',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    actionButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  
