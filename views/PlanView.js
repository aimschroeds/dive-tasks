import { useEffect, useLayoutEffect, useState } from 'react';
import { Image, View, Text, FlatList, TextInput } from 'react-native';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal } from 'react-native';

import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth, storage } from '../firebase';
import Styles from '../styles/Styles';
import { format } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import milestoneTypes from '../data/milestoneTypes';

import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import Slider from '@react-native-community/slider';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import CompletionCelebration from '../components/CompletionCelebration';
import { onAuthStateChanged } from '@firebase/auth';
import get200ImageRef from '../helpers/get200ImageRef';

const PlanView = ({ route }) => {
    const navigation = useNavigation();
    const { planId } = route.params;
    const [plan, setPlan] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [userDisplayName, setUserDisplayName] = useState(null);
    const [milestoneCompletion, setMilestoneCompletion] = useState({
        percentage: null,
        date: null,
    });
    const [celebrationVisible, setCelebrationVisible] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);


    // Trigger the celebration animation
    const showCelebration = () => {
        setCelebrationVisible(true);
        setTimeout(() => {
        setCelebrationVisible(false);
        }, 5000); // Hide the animation after 5 seconds
    };

    // Check if the plan is completed and trigger the celebration
    useEffect(() => {
        if (milestoneCompletion.percentage === 100) {
            showCelebration();
        }
    }, [milestoneCompletion.percentage]);

    useEffect(() => {
        fetchImageUrls();
      }, [plan]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <MaterialCommunityIcons
                    name="pencil"
                    size={24}
                    color="#AA77FF"
                    style={{ marginRight: 20 }}
                    onPress={() => navigation.navigate('Add Plan', { planId: planId })}
                />
            ),
        });
    }, [navigation]);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                // Call firebase "users" collection to get the user's display name
                const fetchUserDisplayName = async () => {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserDisplayName(docSnap.data().display_name);
                    }
                };
                fetchUserDisplayName();
            } else {
                // User is signed out
                setUserDisplayName(null);
                navigation.navigate('Login');
            }
        })
        return unsubscribe;
    }, [navigation]);
    

    useEffect(() => {
        getPlan();
    }, [planId]);

    const fetchImageUrls = async () => {
        const urls = await Promise.all(
          plan.images.map((image) =>
            getDownloadURL(ref(storage, `${image}`)).catch((error) => {
              console.error('Error fetching download URL:', error);
              return null;
            })
          )
        );
      
        setImageUrls(urls.filter((url) => url !== null));
      };
      

    const getPlan = async () => {
        try {
          const docRef = doc(db, "plans", planId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // If the plan exists but has no notes section, add a blank one when calling setPlan
            if (!docSnap.data().notes) {
                const updatedPlan = {
                    ...docSnap.data(),
                    notes: [],
                };
                setPlan(updatedPlan);
            }
            else {
                setPlan(docSnap.data());
            }
            setErrorMessage(null);
          } else {
            setErrorMessage("Plan not found");
          }
        } catch (error) {
          console.error('Error fetching plan:', error);
          setErrorMessage('Error fetching plan');
        }
    };

    useEffect(() => {
        if (plan) {
            const totalMilestones = plan.milestones.length;
            const completedMilestones = plan.milestones.filter(milestone => milestone.status).length;
            const completionPercentage = (completedMilestones / totalMilestones) * 100;
            const formattedDate = format(new Date(plan.createdAt.seconds * 1000), 'PPpp');
            setMilestoneCompletion({
                percentage: completionPercentage,
                date: formattedDate,
            });
        }
    }, [plan]);

    const renderMilestoneIcon = (_milestoneType) => {
        const milestone = milestoneTypes.find((item) => item.type === _milestoneType);
        if (milestone) {
          return milestone.icon;
        } else {
          return "help-circle"; // Default icon
        }
      };
      

      const renderSkills = (skills, milestoneIndex) => {
        if (!skills || skills.length === 0) {
          return null;
        }
      
        return skills.map((item, index) => (
          <View key={index} style={Styles.skillItemContainer}>
            <CheckBox
              title=""
              checked={item.status === "complete"}
              onPress={() => toggleSkillStatus(milestoneIndex, index)}
              containerStyle={Styles.skillCheckbox}
              checkedColor="#AA77FF"
              uncheckedColor='#AA77FF'
            />
            <Text style={Styles.skillName}>{item.skill}</Text>
          </View>
        ));
      };

      const toggleMilestoneStatus = async (milestoneIndex) => {
        try {
          const docRef = doc(db, "plans", planId);
          const updatedMilestones = plan.milestones.map((milestone, index) => {
            if (index === milestoneIndex) {
              return { ...milestone, status: !milestone.status };
            }
            return milestone;
          });
      
          await updateDoc(docRef, {
            milestones: updatedMilestones,
          });
      
          setPlan({ ...plan, milestones: updatedMilestones });
        } catch (error) {
          console.error("Error updating milestone status:", error);
          setErrorMessage("Error updating milestone status");
        }
      };

      const toggleSkillStatus = async (milestoneIndex, skillIndex) => {
        try {
          const docRef = doc(db, "plans", planId);
          const updatedMilestones = plan.milestones.map((milestone, mIndex) => {
            if (mIndex === milestoneIndex) {
              const updatedSkills = milestone.skills.map((skill, sIndex) => {
                if (sIndex === skillIndex) {
                  return { ...skill, status: skill.status === "complete" ? "incomplete" : "complete" };
                }
                return skill;
              });
              const allSkillsComplete = updatedSkills.every(skill => skill.status === "complete");
              return { ...milestone, skills: updatedSkills, status: allSkillsComplete };
            }
            return milestone;
          });
      
          await updateDoc(docRef, {
            milestones: updatedMilestones,
          });
      
          setPlan({ ...plan, milestones: updatedMilestones });
        } catch (error) {
          console.error("Error updating skill status:", error);
          setErrorMessage("Error updating skill status");
        }
      };
      
      const updateNotes = async (text) => {
        console.log("Updating notes:", text)
        try {
          const docRef = doc(db, "plans", planId);
          await updateDoc(docRef, {
            notes: text,
          });
          setPlan({ ...plan, notes: text });
        } catch (error) {
          console.error("Error updating notes:", error);
          setErrorMessage("Error updating notes");
        }
      };

      const pickImage = async () => {
        const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!status.granted) {
          alert('We need permission to access your camera roll to select images.');
          return;
        }
      
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          maxImagesCount: 10,
          quality: 0.5,
        });
      
        if (!result.canceled) {
          // Upload the images to Firebase and save the references in the plan
          handleImageUpload(result.assets);
        }
      };
      
      
      const handleImageUpload = async (images) => {
        try {
          const uploadedImageUrls = [];
      
          for (const image of images) {
            const response = await fetch(image.uri);
            const blob = await response.blob();
            const fileName = new Date().getTime();
            const storageRef = ref(storage, `plans/${planId}/${fileName}`);
            await uploadBytes(storageRef, blob);
            const imageUrl = await getDownloadURL(storageRef);
            uploadedImageUrls.push(imageUrl);
          }
      
          // Update the plan document in Firestore with the image URLs
          const docRef = doc(db, 'plans', planId);
          await updateDoc(docRef, {
            images: arrayUnion(...uploadedImageUrls),
          });
      
          setPlan({ ...plan, images: [...plan.images, ...uploadedImageUrls] });
        } catch (error) {
          console.error('Error uploading images:', error);
          setErrorMessage('Error uploading images');
        }
      };
      
    
      
      const renderImages = () => {
        if (!imageUrls || imageUrls.length === 0) {
          console.log('No images');
          return <Text style={Styles.noImagesText}>No images</Text>;
        }
      
        return (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {imageUrls.map((url, index) => (
              <Image key={index} source={{ uri: url }} style={Styles.image} />
            ))}
          </ScrollView>
        );
      };
      
      
        return (
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
             <ScrollView>
        <>
            {errorMessage !== null && <Text style={Styles.errorMessage}>{errorMessage}</Text>}
            {plan && (
                <>
                    <View style={Styles.planDetailsContainer}>
                    {/* Existing plan details code */}
                    <Text style={Styles.planText}>{plan.title}</Text>
                    
                    <View style={{ flex: 1 }}>
                    {plan.milestones.map((item, index) => (
                        <View style={Styles.milestoneItemContainer} key={index}>
                        <View style={Styles.milestoneContent}>
                            {/* View showing items on one row */}
                            <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                            }}
                            >
                            <CheckBox
                                title=""
                                checked={item.status}
                                onPress={() => toggleMilestoneStatus(index)}
                                containerStyle={Styles.milestoneCheckbox}
                                checkedColor="#AA77FF"
                                uncheckedColor='#AA77FF'
                            />
                            <View style={Styles.milestoneContent}>
                                <Text style={Styles.milestoneName}>{item.name}</Text>
                                {renderSkills(item.skills, index)}
                            </View>
                            <MaterialCommunityIcons
                                name={renderMilestoneIcon(item.type)}
                                size={24}
                                color="#AA77FF"
                                style={Styles.milestoneIcon}
                            />
                            </View>
                        </View>
                        </View>
                    ))}
                    </View>
                    <View style={Styles.notesContainer}>
                        <Text style={Styles.notesTitle}>Notes:</Text>
                        <TextInput
                            style={Styles.notesInput}
                            value={plan.notes}
                            onBlur={(e) => updateNotes(e.nativeEvent.text)}
                            multiline
                            textAlignVertical="top"
                        />
                    </View>
                    <View style={Styles.uploadImageButtonContainer}>
                        <TouchableOpacity onPress={pickImage} style={Styles.uploadImageButton}>
                            <Text style={Styles.uploadImageButtonText}>Upload Images</Text>
                        </TouchableOpacity>
                        </View>
                        {renderImages()}

                    </View>
                </>
                )}

        </>
        <Modal visible={celebrationVisible} transparent={false} animationType="fade">
            <CompletionCelebration user={userDisplayName ? userDisplayName : ""} plan={plan} />
        </Modal>
        </ScrollView>
  </KeyboardAvoidingView>
);
};

export default PlanView;