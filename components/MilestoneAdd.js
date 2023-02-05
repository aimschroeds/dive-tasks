import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Section, Cell } from "react-native-tableview-simple";
import React, { useState, useEffect } from "react";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";

import Styles from "../styles/Styles";
import { useNavigation } from "@react-navigation/native";
import StatusToggle from "./StatusToggle";
import MilestoneType from "./MilestoneType";
import SkillsAdd from "./SkillsAdd";
import DeleteMilestone from "./DeleteMilestone";

const MilestoneAdd = ({ milestone, setMilestone, index, deleteMilestone }) => {
  const [milestoneName, setMilestoneName] = useState(milestone.name||"");
  const [milestoneStatus, setMilestoneStatus] = useState(milestone.status||false);
  const [milestoneType, setMilestoneType] = useState(milestone.type||null);
  const [skills, setSkills] = useState(milestone.skills||[]);
  const headerTitle = "Milestone " + (index + 1);
    
// If any element of the milestone object is updated, update the milestone object
    useEffect(() => {
        setMilestone({
            name: milestoneName,
            status: milestoneStatus,
            type: milestoneType,
            skills: skills,
        });
    }, [milestoneName, milestoneStatus, milestoneType, skills]);


  return (
    <Section
        header={headerTitle}
        headerTextStyle={Styles.tableHeaderChild}
        hideSeparator
        sectionPaddingBottom={5}
        sectionPaddingTop={10}
    >
        <Cell
            cellContentView={
                <View>
                    <TextInput
                        placeholder="Name of Milestone"
                        value={milestoneName}
                        onChangeText={(text) => setMilestoneName(text)}
                        autoCapitalize="words"
                    ></TextInput>
                </View>
            }
            hideSeparator={true}
        >
        </Cell>
        <StatusToggle
            milestoneStatus={milestoneStatus}
            setMilestoneStatus={setMilestoneStatus}
        />
        <MilestoneType
            milestoneType={milestoneType}
            setMilestoneType={setMilestoneType}
        />
        <SkillsAdd
            skills={skills}
            setSkills={setSkills}
        />
        <DeleteMilestone 
            deleteMilestone={deleteMilestone}
        />
    </Section>
  );
};

export default MilestoneAdd;
