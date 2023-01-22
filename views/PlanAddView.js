import Styles from "../styles/Styles";
import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useState, useRef, useEffect } from "react";
import MilestoneAdd from "../components/MilestoneAdd";
import { auth, db } from "../firebase";
import { doc, collection, getDoc, addDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore"; 

const PlanAddView = ( { route } ) => {
  const navigation = useNavigation();
  const planId = route.params?.planId;
  const isEditMode = !!planId;

  const [plan, setPlan] = useState({
    title: "",
    status: false,
    milestones: [{}],
  });
  const [userId, setUserId] = useState(null);
  const [messageError, setMessageError] = useState(null);

  useEffect(() => {
    if (auth.currentUser)
    {
        setUserId(auth.currentUser.uid);
    }
  }, [auth.currentUser]);

  // Fetch the plan data when in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchPlanData = async () => {
        const docRef = doc(db, "plans", planId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPlan(docSnap.data());
        } else {
          console.log("No such document!");
        }
      };

      fetchPlanData();
    }
  }, [isEditMode, planId]);

  const setTitle = (text) => {
    setPlan({ ...plan, title: text });
  };

  const addMilestone = () => {
    setPlan({
      ...plan,
      milestones: [
        ...plan.milestones,
        { name: "", status: false, type: "", skills: [] },
      ],
    });
  };

  // Save the plan to the database
    const savePlan = async () => {
        // If user is not identified, return
        if (!userId)
        {
            setMessageError("You must be logged in to save a plan");
            return;
        }
        if (isEditMode) {
            // Update the plan in the database
            const docRef = doc(db, "plans", planId);
            await updateDoc(docRef, {
              ...plan,
              updatedAt: serverTimestamp(),
            });
          } else {
            // Add the plan to the database
            const docRef = await addDoc(collection(db, "plans"), {
              ...plan,
              userId: userId,
              createdAt: serverTimestamp(),
            });
          }
        // Clear the plan
        setPlan({
            title: "",
            status: false,
            milestones: [],
        });
        navigation.navigate("Plans");
        };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={160}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={false} />
          }
        >
          <TableView hideSeparator>
            <Section
              hideSeparator
              sectionPaddingBottom={5}
              sectionPaddingTop={10}
              header="Add Plan"
              headerTextStyle={Styles.tableHeader}
            >
              <Cell
                cellContentView={
                  <View>
                    <TextInput
                      style={Styles.textInput}
                      placeholder="Certification"
                      value={plan.title}
                      onChangeText={(text) => setTitle(text)}
                      autoFocus={true}
                      autoCapitalize="words"
                    ></TextInput>
                  </View>
                }
                hideSeparator={true}
              ></Cell>
            </Section>
            {/* Add a MilestoneAdd component for each milestone in the plan */}
            {plan.milestones.map((milestone, index) => {
              return (
                <MilestoneAdd
                  key={index}
                  milestone={milestone}
                  setMilestone={(milestone) => {
                    // Create a new array of milestones, replacing the one at the current index with the new milestone
                    const newMilestones = [...plan.milestones];
                    newMilestones[index] = milestone;
                    // Update the plan with the new array of milestones
                    setPlan({ ...plan, milestones: newMilestones });
                  }}
                  deleteMilestone={() => {
                    // Create a new array of milestones, removing the one at the current index
                    const newMilestones = [...plan.milestones];
                    newMilestones.splice(index, 1);
                    // Update the plan with the new array of milestones
                    setPlan({ ...plan, milestones: newMilestones });
                  }}
                  index={index}
                />
              );
            })}
          </TableView>
            {/* Add a button to add another milestone */}
            <TouchableOpacity
                onPress={() => {
                    addMilestone();
                }}
                style={Styles.buttonSecondary}
            >
                <Text style={[Styles.buttonText, { color: "white", margin: 10 }]}>Add Another Milestone</Text>
            </TouchableOpacity>
            {/* Show error messaging if relevant */}
            {messageError && (
                <Text style={Styles.messageError}>
                    {messageError}
                </Text>
            )}
            {/* Add a button which to save plan */}
            <TouchableOpacity
                onPress={() => {
                    savePlan();
                }}
                style={[Styles.buttonPlan]}
            >
                <Text style={[Styles.buttonText, { color: "white", margin: 10 }]}>Save Plan</Text>
            </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
    )}

export default PlanAddView;