// External libraries
import { useEffect, useLayoutEffect, useState } from "react";
import { Image, View, Text, FlatList, TextInput } from "react-native";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import { format } from "date-fns";
import { onAuthStateChanged } from "@firebase/auth";
import DateTimePickerModal from 'react-native-modal-datetime-picker';


// Firebase imports
import { doc, getDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db, auth, storage } from "../firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

// Internal modules
import Styles from "../styles/Styles";
import milestoneTypes from "../data/milestoneTypes";

// Components
import CompletionCelebration from "../components/CompletionCelebration";
import Milestone from "../components/Milestone";
import Notes from "../components/Notes";
import Images from "../components/Images";
import ImageUploader from "../components/ImageUploader";
import LocationSelection from "./LocationSelection";

// Helpers
import {
  renderMilestoneIcon,
  calculateCompletionPercentage,
} from "../helpers/milestoneHelpers";
import { renderSkills, areAllSkillsComplete } from "../helpers/skillsHelpers";
import { addToCalendarExpo } from "../helpers/calendarHelpers";

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
  const [selectedMilestoneLocationIndex, setSelectedMilestoneLocationIndex] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedMilestoneDateIndex, setSelectedMilestoneDateIndex] = useState(null);



  
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
      // Update the 'published' field in the database if not already published
    if (!plan.published) {
        const docRef = doc(db, "plans", planId);
        updateDoc(docRef, { published: true, completedAt: serverTimestamp() }).then(() => {
        setPlan({ ...plan, published: true });
        showCelebration();
      });
    }
      
    }
  }, [milestoneCompletion.percentage, plan]);

  useEffect(() => {
    // Check if plan.images exists
    if (plan?.images) {
      fetchImageUrls();
      // console.log("plan: ", plan);
    }
  }, [plan]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialCommunityIcons
          name="pencil"
          size={24}
          color="#AA77FF"
          style={{ marginRight: 20 }}
          onPress={() => navigation.navigate("Plan Form", { planId: planId })}
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
        navigation.navigate("Login");
      }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getPlan();
  }, [planId]);

  const toggleLocationModal = (milestoneIndex) => {
    setSelectedMilestoneLocationIndex(milestoneIndex);
  };   

  const fetchImageUrls = async () => {
    const urls = await Promise.all(
      plan.images.map((image) =>
        getDownloadURL(ref(storage, image)).catch((error) => {
          console.error("Error fetching download URL:", error);
          return null;
        })
      )
    );

    setImageUrls(urls.filter((url) => url !== null));
  };

  const showDatePicker = (milestoneIndex) => {
    setSelectedMilestoneDateIndex(milestoneIndex);
  };

  const scheduleMilestone = async (date, milestoneIndex) => {
    setSelectedMilestoneDateIndex(null);
  
    const docRef = doc(db, "plans", planId);
    const updatedMilestones = plan.milestones.map((milestone, index) => {
      if (index === milestoneIndex) {
        return { ...milestone, scheduledAt: date };
      }
      return milestone;
    });
  
    await updateDoc(docRef, {
      milestones: updatedMilestones,
    });
  
    setPlan({ ...plan, milestones: updatedMilestones });
  
    // Get the updated milestone
    const updatedMilestone = updatedMilestones[milestoneIndex];
  
    // Concatenate plan and milestone names
    const eventTitle = `${plan.title} - ${updatedMilestone.name}`;
  
    // Create a location description string
    const locationDescription = updatedMilestone.geo
      ? [
          updatedMilestone.geo.name,
          updatedMilestone.geo.street,
          updatedMilestone.geo.streetNumber,
          updatedMilestone.geo.postalCode,
          updatedMilestone.geo.city,
          updatedMilestone.geo.region,
          updatedMilestone.geo.country,
        ]
          .filter((part) => part !== null && part !== undefined)
          .join(', ')
      : '';
  
    // Calculate the end date by adding 1 hour to the start date
    const startDate = new Date(updatedMilestone.scheduledAt);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  
    // Add the event to the calendar
    addToCalendarExpo(eventTitle, startDate, endDate, locationDescription);
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
        } else {
          setPlan(docSnap.data());
        }
        if (!docSnap.data().published)
        {
          const updatedPlan = {
            ...docSnap.data(),
            published: false,
          };
          setPlan(updatedPlan);
        } else 
        {
          setPlan(docSnap.data());
        }
        setErrorMessage(null);
      } else {
        setErrorMessage("Plan not found");
      }
    } catch (error) {
      console.error("Error fetching plan:", error);
      setErrorMessage("Error fetching plan");
    }
  };

  useEffect(() => {
    if (plan) {
      const completionPercentage = calculateCompletionPercentage(
        plan.milestones
      );
      const formattedDate = format(
        new Date(plan.createdAt.seconds * 1000),
        "PPpp"
      );
      setMilestoneCompletion({
        percentage: completionPercentage,
        date: formattedDate,
      });
    }
  }, [plan]);

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
              return {
                ...skill,
                status: skill.status === "complete" ? "incomplete" : "complete",
              };
            }
            return skill;
          });
          const allSkillsComplete = areAllSkillsComplete(updatedSkills);
          return {
            ...milestone,
            skills: updatedSkills,
            status: allSkillsComplete,
          };
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
    // console.log("Updating notes:", text);
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

  const updateLocation = async (location, milestoneIndex) => {
    // console.log("Updating milestone location:", location)
    // console.log("Milestone index:", milestoneIndex)
    try {
      const docRef = doc(db, "plans", planId);
      const updatedMilestones = plan.milestones.map((milestone, index) => {
        if (index === milestoneIndex) {
          return { ...milestone, geo: location };
        }
        return milestone;
      });
      // console.log("Updated milestones:", updatedMilestones)
      await updateDoc(docRef, {
        milestones: updatedMilestones,
      });

      setPlan({ ...plan, milestones: updatedMilestones });
    } catch (error) {
      console.error("Error updating milestone location:", error);
      setErrorMessage("Error updating milestone location");
    }
  };

  const handleImagesUploaded = (uploadedImageUrls) => {
    setPlan({ ...plan, images: [...plan.images, ...uploadedImageUrls] });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <>
          {errorMessage !== null && (
            <Text style={Styles.errorMessage}>{errorMessage}</Text>
          )}
          {plan && (
            <>
              <View style={Styles.planDetailsContainer}>
                {/* Existing plan details code */}
                <Text style={Styles.planText}>{plan.title}</Text>

                
                  {plan.milestones.map((item, index) => (
                    <View style={{ flex: 1 }} key={`${index}-${item.name}`}>
                    <Milestone
                      // item, index, toggleMilestoneStatus, renderMilestoneIcon, toggleSkillStatus
                      index={index}
                      item={item}
                      renderMilestoneIcon={renderMilestoneIcon}
                      toggleMilestoneStatus={toggleMilestoneStatus}
                      toggleSkillStatus={toggleSkillStatus}
                      locationSelectionVisible={()=>toggleLocationModal(index)}
                      onSchedule={showDatePicker}
                    />
                    <Modal
                        animationType="slide"
                        presentationStyle="pageSheet"
                        visible={selectedMilestoneLocationIndex !== null}
                        onRequestClose={toggleLocationModal}
                      >
                        <LocationSelection
                          onClose={() => setSelectedMilestoneLocationIndex(null)}
                          onSelect={(locationData) => {
                            updateLocation(locationData, selectedMilestoneLocationIndex);
                            setSelectedMilestoneLocationIndex(null);
                          }}
                          selectedLocation={plan.milestones[selectedMilestoneLocationIndex]?.geo}
                        />
                      </Modal>
                      <DateTimePickerModal
                        isVisible={selectedMilestoneDateIndex !== null}
                        mode="datetime"
                        onConfirm={(date) => scheduleMilestone(date, selectedMilestoneDateIndex)}
                        onCancel={() => selectedMilestoneDateIndex(null)}
                      />
                      </View>
                  ))}
                
                <Notes notes={plan.notes} updateNotes={updateNotes} />
                <ImageUploader
                  entityId={planId}
                  entityPath="plans"
                  images={plan.images}
                  onImagesUploaded={(images)=>handleImagesUploaded(images)}
                />
                { plan.images.length > 0 && <Images
                  images={plan.images}
                  entityId={planId}
                  entityPath="plans"
                  refreshImages={getPlan}
                />}
              </View>
            </>
          )}
        </>
        <Modal
          visible={celebrationVisible}
          transparent={false}
          animationType="fade"
        >
          <CompletionCelebration
            user={userDisplayName ? userDisplayName : ""}
            plan={plan}
          />
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PlanView;
