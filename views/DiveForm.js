import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, Switch, ScrollView } from 'react-native';
import IconPicker from '../components/IconPicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import ImageUploader from '../components/ImageUploader';
import Images from '../components/Images';

import Styles from '../styles/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { db, auth } from "../firebase";
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { formatStartTime, formatEndTime, validateDiveData, convertUnits } from '../helpers/diveHelpers';

const DiveForm = ({ navigation }) => {
    const [diveData, setDiveData] = useState({
        startTime: null,
        endTime: null,
        startPressure: '',
        endPressure: '',
        maxDepth: '',
        waterTemperature: '',
        visibility: '',
        entryType: '',
        waterType: '',
        surf: '',
        images: [],
        userId: null,
      });
      const [diveId, setDiveId] = useState(null);
  const [isMetric, setIsMetric] = useState(true);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const units = isMetric
    ? { pressure: 'bar', depth: 'm', temperature: 'C', visibility: 'm' }
    : { pressure: 'psi', depth: 'ft', temperature: 'F', visibility: 'ft' };
//   const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Get userId and add it to diveData
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setDiveData({ ...diveData, userId: user.uid });
        }
    });
    }, [navigation]);

//   useEffect(() => {
//     // Check if dive.images exists
//     if (diveData?.images) {
//       fetchImageUrls();
//     }
//   }, [diveData]);

  useEffect(() => {
    // If diveId is set, navigate to the DiveDetails screen
    if (diveId) {
        console.log("New dive added with ID: ", diveId);
        navigation.navigate("Dive", { diveId: diveId });
    }
    }, [diveId]);

//   const fetchImageUrls = async () => {
//     const urls = await Promise.all(
//       diveData.images.map((image) =>
//         getDownloadURL(ref(storage, image)).catch((error) => {
//           console.error("Error fetching download URL:", error);
//           return null;
//         })
//       )
//     );
//     setImageUrls(urls.filter((url) => url !== null));
// };

  const handleUnitChange = (value) => {
    setIsMetric(value);
  };

  const handleChange = (field, value) => {
    setDiveData({ ...diveData, [field]: value });
  };

  const handleSubmit = async () => {
    const validationResult = validateDiveData(diveData);
  
    if (!validationResult.isValid) {
      // Show an error message, e.g., using an Alert
      Alert.alert("Validation Error", validationResult.errorMessage);
      return;
    }
  
    // Performs conversions if necessary
    const convertedDiveData = convertUnits(diveData, isMetric);
  
    try {
      const divesCollection = collection(db, "dives");
      const newDiveRef = await addDoc(divesCollection, convertedDiveData);
      setDiveId(newDiveRef.id);
    } catch (error) {
      console.error("Error adding dive: ", error);
      Alert.alert("Error", "There was an error saving your dive. Please try again.");
    }
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };
  
  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  };
  
  const showEndTimePicker = () => {
    setEndTimePickerVisible(true);
  };
  
  const hideEndTimePicker = () => {
    setEndTimePickerVisible(false);
  };

  const handleStartTimePicked = (selectedDate) => {
    setDiveData({ ...diveData, startTime: selectedDate });
    hideStartTimePicker();
  };
  
  const handleEndTimePicked = (selectedDate) => {
    setDiveData({ ...diveData, endTime: selectedDate });
    hideEndTimePicker();
  };
  
  const handleImagesUploaded = (uploadedImageUrls) => {
    setDiveData({ ...diveData, images: [...diveData.images, ...uploadedImageUrls] });
    console.log("Images uploaded: ", uploadedImageUrls);
  };
  

  return (
    <ScrollView>
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={styles.switchContainer}>
        <Switch
          value={isMetric}
          onValueChange={handleUnitChange}
          trackColor={{ false: "#62CDFF", true: "#AA77FF" }}
        thumbColor={isMetric ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        />
        <Text style={{marginLeft: 10}}>{isMetric ? "Metric" : "Imperial"}</Text>
      </View>
    <View style={styles.container}>
      
      <TouchableOpacity onPress={showStartTimePicker}>
      <Text style={[Styles.scheduleLabel, {height: 40, margin: 12, marginLeft: 13, paddingTop: 12, padding: 10}]}>
              <MaterialCommunityIcons name='calendar-range' size={16} color='white'/>
                {formatStartTime(diveData.startTime || new Date())}
              </Text>
        </TouchableOpacity>

        <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="datetime"
        onConfirm={handleStartTimePicked}
        onCancel={hideStartTimePicker}
        display="inline"
        isDarkModeEnabled={true}
        />

        <TouchableOpacity onPress={showEndTimePicker} style={{alignContent: "center"}}>
              <Text style={[Styles.scheduleLabel, {height: 40, margin: 12, marginLeft: 13, paddingTop: 12, padding: 10}]}>
              <MaterialCommunityIcons name='calendar-range' size={16} color='white'/>
                {formatEndTime(diveData.endTime || new Date())}
              </Text>
        </TouchableOpacity>

        <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="datetime"
        onConfirm={handleEndTimePicked}
        onCancel={hideEndTimePicker}
        display="inline"
        isDarkModeEnabled={true}
        />

    <TextInput
    style={Styles.input}
    placeholder={`Start Pressure (${units.pressure})`}
    value={diveData.startPressure}
    onChangeText={(value) => setDiveData({ ...diveData, startPressure: value })}
    keyboardType="numeric"
    />

    <TextInput
    style={Styles.input}
    placeholder={`End Pressure (${units.pressure})`}
    value={diveData.endPressure}
    onChangeText={(value) => setDiveData({ ...diveData, endPressure: value })}
    keyboardType="numeric"
    />

    <TextInput
    style={Styles.input}
    placeholder={`Max Depth (${units.depth})`}
    value={diveData.maxDepth}
    onChangeText={(value) => setDiveData({ ...diveData, maxDepth: value })}
    keyboardType="numeric"
    />

    <TextInput
    style={Styles.input}
    placeholder={`Water Temperature (${units.temperature})`}
    value={diveData.waterTemperature}
    onChangeText={(value) => setDiveData({ ...diveData, waterTemperature: value })}
    keyboardType="numeric"
    />

    <TextInput
    style={Styles.input}
    placeholder={`Visibility (${units.visibility})`}
    value={diveData.visibility}
    onChangeText={(value) => setDiveData({ ...diveData, visibility: value })}
    keyboardType="numeric"
    />
      <IconPicker
        options={[
          { icon: 'sail-boat', label: 'Boat', value: 'boat' },
          { icon: 'beach', label: 'Shore', value: 'shore' },
          { icon: 'pier', label: 'Controlled', value: 'controlled' },
        ]}
        selectedValue={diveData.entryType}
        onValueChange={(value) => handleChange('entryType', value)}
      />
        {/* Fresh or salt water */}
        <IconPicker
            options={[
                { icon: 'water-outline', label: 'Fresh', value: 'fresh' },
                { icon: 'water', label: 'Salt', value: 'salt' },
            ]}
            selectedValue={diveData.waterType}
            onValueChange={(value) => handleChange('waterType', value)}
        />
        {/* Waves, current, surge or calm */} 
        <IconPicker
            options={[
                { icon: 'waves', label: 'Waves', value: 'waves' },
                { icon: 'weather-windy', label: 'Current', value: 'current' },
                { icon: 'arrow-u-right-top', label: 'Surge', value: 'surge' },
                { icon: 'panorama-horizontal-outline', label: 'Calm', value: 'calm' },
            ]}
            selectedValue={diveData.surf}
            onValueChange={(value) => handleChange('surf', value)}
            styles={{marginBottom: 200}}
        />
        <ImageUploader
                  entityId={diveId}
                  entityPath="dives"
                  images={diveData.images}
                  onImagesUploaded={(images)=>handleImagesUploaded(images)}
                />
                { diveData.images.length > 0 && 
                <Images
                  images={diveData.images}
                  entityId={diveId}
                  entityPath="dives"
                />}

            <TouchableOpacity
                onPress={() => {
                    handleSubmit();
                }}
                style={[Styles.buttonPlan, {marginTop: 40, width: '100%', marginLeft: 0}]}
            >
                <Text style={[Styles.buttonText, { color: "white", marginVertical: 10 }]}>Save Dive</Text>
            </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
    {/* </TouchableWithoutFeedback> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    inputGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      fontSize: 16,
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    pickerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    pickerItemSelected: {
      color: '#007AFF',
    },
    pickerItemUnselected: {
      color: '#000',
    },
    dateTimePickerButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 20,
      width: '100%',
    },
    dateTimePickerButtonText: {
      fontSize: 16,
    },
    saveButton: {
      backgroundColor: '#007AFF',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 15,
        marginBottom: 3,
      },
  });
  

export default DiveForm;
