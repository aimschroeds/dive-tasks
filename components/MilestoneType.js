import { View, Text, TouchableOpacity } from "react-native";
import { Section, Cell } from "react-native-tableview-simple";
import React from "react";
import { StyleSheet } from "react-native";

import Styles from "../styles/Styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



const MilestoneType = ({ milestoneType, setMilestoneType }) => {
  const milestoneTypes = [
    { type: "Confined Water Dive", icon: "pool", label: "Confined Water Dive" },
    { type: "Theory", icon: "book-open-page-variant", label: "Theory" },
    { type: "Open Water Dive", icon: "waves-arrow-right", label: "Open Water Dive" },
    { type: "Exam", icon: "clipboard-text-outline", label: "Exam" },
    { type: "Other", icon: "dots-horizontal", label: "Other" },
  ];
  
  const styles = StyleSheet.create({
    touchableOpacity: {
      alignItems: "center",
      width: "19%",
    },
    text: {
      alignSelf: "center",
      marginTop: 5,
      fontSize: 12,
    },
  });

  return (
    <Cell
      cellStyle="Basic"
      contentContainerStyle={Styles.cellContainer}
      cellAccessoryView={
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {milestoneTypes.map(({ type, icon, label }) => (
            <TouchableOpacity
              key={type}
              onPress={() => setMilestoneType(type)}
              style={styles.touchableOpacity}
            >
              <MaterialCommunityIcons
                name={icon}
                size={24}
                color={milestoneType === type ? "#AA77FF" : "gray"}
              />
              <Text
                style={[
                  styles.text,
                  {
                    textAlign: "center",
                    color: milestoneType === type ? "#AA77FF" : "gray",
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      }
    ></Cell>
  );
};

export default MilestoneType;
