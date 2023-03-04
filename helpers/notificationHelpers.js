import { addDoc, collection } from 'firebase/firestore';
import { db } from "../firebase";

export const sendFriendshipRequestNotification = async (senderId, recipientId) => {
    await addDoc(collection(db, "notifications"), {
      senderId,
      recipientId,
      type: "friendship_request",
      message: "sent you a friend request.",
      read: false,
      timestamp: new Date(),
    });
  };
  
  export const sendFriendshipAcceptanceNotification = async (senderId, recipientId) => {
    await addDoc(collection(db, "notifications"), {
      senderId,
      recipientId,
      type: "friendship_acceptance",
      message: "accepted your friend request.",
      read: false,
      timestamp: new Date(),
    });
  };
  