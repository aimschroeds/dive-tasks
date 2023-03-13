import { format, isValid } from 'date-fns';
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const validateDiveData = (diveData) => {
    // Add your validation logic here, e.g., check if values are within valid ranges or if required fields are filled
    // Returns an object with a boolean `isValid` property and an optional `errorMessage` property
    const { startTime, endTime, startPressure, endPressure, maxDepth, waterTemperature, visibility } = diveData;
    console.log(diveData)
    if (!(startTime && endTime && startPressure && endPressure && maxDepth && waterTemperature && visibility)) {
      return { isValid: false, errorMessage: "Please fill all required fields." };
    }
  
    if (new Date(startTime) >= new Date(endTime)) {
      return { isValid: false, errorMessage: "Dive start time must be earlier than dive end time." };
    }
  
    if (parseFloat(startPressure) <= parseFloat(endPressure)) {
      return { isValid: false, errorMessage: "Start pressure must be greater than end pressure." };
    }
  
    return { isValid: true };
  };
  
 export const convertUnits = (diveData, isMetric) => {
    if (isMetric) {
      // Dive data is already in metric units; no conversion necessary
      return diveData;
    } else {
      // Convert imperial values to metric values
      return {
        ...diveData,
        maxDepth: parseFloat(diveData.maxDepth) * 0.3048, // feet to meters
        waterTemperature: (parseFloat(diveData.waterTemperature) - 32) * 5 / 9, // fahrenheit to celsius
        visibility: parseFloat(diveData.visibility) * 0.3048, // feet to meters
        startPressure: parseFloat(diveData.startPressure) * 0.0689476, // psi to bar
        endPressure: parseFloat(diveData.endPressure) * 0.0689476, // psi to bar
      };
    }
  };
  
  export const formatStartTime = (date) => {
    if (typeof date === 'object' && 'seconds' in date) {
      date = date.seconds * 1000;
    }
    if (date && isValid(new Date(date))) {
      const formattedDate = format(date, 'PPp');
      const timeIn24HourFormat = new Date(date).toLocaleString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
      const formattedDateWithoutTime = formattedDate.slice(0, -9);
      return `Start Time: ${formattedDateWithoutTime} ${timeIn24HourFormat}`;
    }
    return 'Start Time';
  }

  export const formatEndTime = (date) => {
    if (typeof date === 'object' && 'seconds' in date) {
      date = date.seconds * 1000;
    }
    if (date && isValid(new Date(date))) {
      const formattedDate = format(date, 'PPp');
      const timeIn24HourFormat = new Date(date).toLocaleString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
      const formattedDateWithoutTime = formattedDate.slice(0, -9);
      return `End Time: ${formattedDateWithoutTime} ${timeIn24HourFormat}`;
    }
    return 'End Time';
  }

  export const calculateBottomTime = (startTime, endTime) => {
    const startNanoseconds = startTime.seconds * 1e9 + startTime.nanoseconds;
    const endNanoseconds = endTime.seconds * 1e9 + endTime.nanoseconds;
  
    const bottomTimeNanoseconds = endNanoseconds - startNanoseconds;
  
    // Convert nanoseconds to minutes and round to nearest integer
    const bottomTimeMinutes = Math.round(bottomTimeNanoseconds / 1e9 / 60);
  
    return bottomTimeMinutes;
  };
  
  export const calculatePressureUsed = (startPressure, endPressure) => {
    return startPressure - endPressure;
  };

  export const getDiveData = async (diveId) => {
    // Get dive data from Firestore
    const docRef = doc(db, "dives", diveId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    }
};