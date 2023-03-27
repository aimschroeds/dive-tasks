import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export const getFriends = async (userId) => {
    const db = getFirestore();
    const relationshipsRef = collection(db, "relationships");
  
    // Query relationships where userId is either userId1 or userId2, and status is "friends"
    const q1 = query(
      relationshipsRef,
      where("userId1", "==", userId),
      where("status1", "==", "friends")
    );
  
    const q2 = query(
      relationshipsRef,
      where("userId2", "==", userId),
      where("status2", "==", "friends")
    );

    const q3 = query(
        relationshipsRef,
        where("userId1", "==", userId),
        where("status2", "==", "friends")
      );
    
      const q4 = query(
        relationshipsRef,
        where("userId2", "==", userId),
        where("status1", "==", "friends")
      );
  
    // Fetch query results
    const queryResults1 = await getDocs(q1);
    const queryResults2 = await getDocs(q2);
    const queryResults3 = await getDocs(q3);
    const queryResults4 = await getDocs(q4);
  
    // Combine query results and map to an array of friend userIds
    const friends = [
      ...queryResults1.docs.map((doc) => doc.data().userId2),
      ...queryResults2.docs.map((doc) => doc.data().userId1),
      ...queryResults3.docs.map((doc) => doc.data().userId2),
      ...queryResults4.docs.map((doc) => doc.data().userId1),
    ];

    return friends;
  };
  