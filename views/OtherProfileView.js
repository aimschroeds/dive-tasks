import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { db, auth } from "../firebase";
import { collection, doc, getDoc, getDocs, query, where, setDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Styles from '../styles/Styles';

const OtherProfileView = ({ route, navigation }) => {
  const { viewingUserId } = route.params;
  const [relationshipStatus, setRelationshipStatus] = useState(null);
  const [relationshipDocId, setRelationshipDocId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState();
  const [sentRequest, setSentRequest] = useState(false);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setCurrentUserId(user.uid);
                console.log('user.uid:', user.uid)
            } else {
                // User is signed out
                setCurrentUserId(null);
                navigation.navigate('Login');
            }
        })
        return unsubscribe;
    }, [navigation]);

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

  const fetchRelationshipStatus = async () => {
    const relationshipRef = collection(db, "relationships");
  
    const q1 = query(
      relationshipRef,
      where("userId1", "==", currentUserId),
      where("userId2", "==", viewingUserId)
    );
  
    const q2 = query(
      relationshipRef,
      where("userId1", "==", viewingUserId),
      where("userId2", "==", currentUserId)
    );
  
    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);
    let relationshipDoc;
  
    if (!querySnapshot1.empty) {
      relationshipDoc = querySnapshot1.docs[0];
    } else if (!querySnapshot2.empty) {
      relationshipDoc = querySnapshot2.docs[0];
    }
  
    if (relationshipDoc) {
      setRelationshipDocId(relationshipDoc.id);
      const data = relationshipDoc.data();
      const status =
        data.userId1 === currentUserId ? data.status1 : data.status2;
      setRelationshipStatus(status);
    } else {
      setRelationshipStatus("not friends");
    }
  };
  
  
  
  useEffect(() => {
    if (currentUserId && viewingUserId)
    {
        fetchRelationshipStatus();
    }
  }, [viewingUserId, currentUserId]);
  
  const sendFriendRequest = async () => {
    await addDoc(collection(db, "relationships"), {
      userId1: currentUserId,
      userId2: viewingUserId,
      status1: "pending",
      status2: "pending",
    });
    setRelationshipStatus("pending");
    setSentRequest(true);
  };
  
  const cancelFriendRequest = async () => {
    await deleteDoc(doc(db, "relationships", relationshipDocId));
    setRelationshipStatus("not friends");
  };
  
  const acceptFriendRequest = async () => {
    await updateDoc(doc(db, "relationships", relationshipDocId), {
      [`status${currentUserId === userId1 ? 1 : 2}`]: "friends",
    });
    setRelationshipStatus("friends");
  };
  
  const declineFriendRequest = async () => {
    await deleteDoc(doc(db, "relationships", relationshipDocId));
    setRelationshipStatus("not friends");
  };
  
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
  
