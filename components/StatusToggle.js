import { View, Text, TouchableOpacity } from "react-native";
import { Section, Cell } from "react-native-tableview-simple";
import React from "react";
import { StyleSheet } from "react-native";

import Styles from "../styles/Styles";

const StatusToggle = ({ milestoneStatus, setMilestoneStatus }) => {
  return (
    <Cell
      cellContentView={
        <View style={Styles.cellPrimaryView}>
          <TouchableOpacity
            style={[
              Styles.toggle,
              milestoneStatus
                ? Styles.toggleUnselected
                : Styles.toggleSelected,
            ]}
            onPress={() => setMilestoneStatus(false)}
          >
            <Text
              style={[
                Styles.toggleText,
                milestoneStatus
                  ? Styles.toggleTextUnselected
                  : Styles.toggleTextSelected,
              ]}
            >
              Not Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              Styles.toggle,
              milestoneStatus
                ? Styles.toggleSelected
                : Styles.toggleUnselected,
            ]}
            onPress={() => setMilestoneStatus(true)}
          >
            <Text
              style={[
                Styles.toggleText,
                milestoneStatus
                  ? Styles.toggleTextSelected
                  : Styles.toggleTextUnselected,
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      }
      hideSeparator={true}
    ></Cell>
  );
};

export default StatusToggle;
