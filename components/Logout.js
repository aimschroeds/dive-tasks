import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";

import Styles from "../styles/Styles";

/**
 * Logout component for handling user log out
 * @component
 * @returns {React.Node} - Logout component
 */
const Logout = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();

  /**
   * Handle user wanting to log out
   */
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => setErrorMessage(error.message));
  };

  /**
   * Render the Logout component
   * @returns {React.Node} - The Logout component
   */
  return (
    <View style={{ alignItems: "center", marginTop: -55 }}>
      {/* Log out button */}
      <TouchableOpacity
        onPress={handleLogOut}
        style={[Styles.buttonPrimary, Styles.buttonPrimaryLarge]}
      >
        <Text style={Styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;
