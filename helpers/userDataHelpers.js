import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";



export const getDisplayName = async (userId) => {
    // Get the user's display name from the database
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().display_name;
    } else {
        console.log("No such document!");
    }
};



export const getProfilePicture = async (userId) => {
    // Get the user's profile picture from the database
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log('Profile picture:', docSnap.data().image_url)
        return docSnap.data().image_url;
    }
};