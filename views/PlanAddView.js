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
import React, { useState, useRef } from "react";
import MilestoneAdd from "../components/MilestoneAdd";

const PlanAddView = () => {
  const navigation = useNavigation();
  const [plan, setPlan] = useState({
    title: "",
    status: false,
    milestones: [],
  });

  console.log(plan);

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
            {/* Add a button which to save plan */}
            <TouchableOpacity
                onPress={() => {
                    addPlan();
                }}
                style={[Styles.buttonPlan, {  }]}
            >
                <Text style={[Styles.buttonText, { color: "white", margin: 10 }]}>Save Plan</Text>
            </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
    )}

export default PlanAddView;