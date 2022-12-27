import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";

import Styles from "../styles/Styles";
import { useNavigation } from "@react-navigation/native";

const Logout = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();

  // Handle user wanting to log out
  const handleLogOut = () => {
      signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => setErrorMessage(error.message));
  };
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
