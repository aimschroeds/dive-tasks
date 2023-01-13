import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Section, Cell } from "react-native-tableview-simple";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";

import Styles from "../styles/Styles";
import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DeleteMilestone = ({ deleteMilestone }) => {
  
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
              style={[Styles.buttonLowkey, Styles.buttonPrimaryLarge, { flexDirection: "row", alignItems: "center" }]}
              onPress={() => deleteMilestone()}
            >
              <MaterialCommunityIcons name="delete" size={20} color="#AA77FF" />
              <Text style={[Styles.buttonTextLowkey, {marginLeft: 8}]}>Delete Milestone</Text>
            </TouchableOpacity>
          </View>
        }
        hideSeparator={true}
      ></Cell>
    </Section>
  );
};

export default DeleteMilestone;
