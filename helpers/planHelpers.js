
  import { format, isValid } from 'date-fns';
  import { getDoc, doc } from "firebase/firestore";
  import { db } from "../firebase";
  
  export const getPlanData = async (planId) => {
    // Get plan data from Firestore
    const docRef = doc(db, "plans", planId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    }
};


export const formatEndTime = (date) => {
    if (typeof date === 'object' && 'seconds' in date) {
      date = date.seconds * 1000;
    }
    if (date && isValid(new Date(date))) {
      const formattedDate = format(date, 'PPp');
      const timeIn24HourFormat = new Date(date).toLocaleString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
      const formattedDateWithoutTime = formattedDate.slice(0, -9);
      return `Completed At: ${formattedDateWithoutTime} ${timeIn24HourFormat}`;
    }
    return 'Incomplete';
  }