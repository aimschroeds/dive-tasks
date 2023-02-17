import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Section, Cell } from "react-native-tableview-simple";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

import Styles from "../styles/Styles";
import { auth, signOut } from "../firebase";

/**
 * DeleteMilestone component for rendering the delete milestone button
 * @component
 * @param {Object} props - Component properties
 * @param {Function} props.deleteMilestone - Function to handle milestone deletion
 * @returns {React.Node} - DeleteMilestone component
 */
const DeleteMilestone = ({ deleteMilestone }) => {
  /**
   * Render the DeleteMilestone component
   * @returns {React.Node} - The DeleteMilestone component
   */
  return (
    <Section
      hideSeparator
      hideSurroundingSeparators
      sectionPaddingBottom={0}
      sectionPaddingTop={0}
    >
      <Cell
        cellAccessoryView={
          <View
            style={{
              flexDirection: "row",
              marginRight: -20,
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              style={[
                Styles.buttonLowkey,
                Styles.buttonPrimaryLarge,
                { flexDirection: "row", alignItems: "center" },
              ]}
              onPress={() => deleteMilestone()}
            >
              <MaterialCommunityIcons
                name="delete"
                size={20}
                color="#AA77FF"
              />
              <Text style={[Styles.buttonTextLowkey, { marginLeft: 8 }]}>
                Delete Milestone
              </Text>
            </TouchableOpacity>
          </View>
        }
        hideSeparator={true}
      ></Cell>
    </Section>
  );
};

export default DeleteMilestone;
