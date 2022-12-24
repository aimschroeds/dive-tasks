import {
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { auth } from "../firebase";
  import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
  import Styles from "../styles/Styles";

  // Adapted from: https://www.youtube.com/watch?v=ql4J6SpLXZA
  
  /**
   * Enable user to register
   * @param {*} navigation
   * @returns
   */
  
  const RegistrationView = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
  
    // If user becomes logged in, redirect to Home screen
    // useEffect(() => {
    //   const unsubscribe = auth.onAuthStateChanged((user) => {
    //     if (user) {
    //       navigation.navigate("NavigationMain", { screen: "Home" });
    //     }
    //   });
    //   return unsubscribe;
    // }, [navigation]);
  
    // Handle user signup; create account
    const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(user.email);
          sendEmailVerification(user)
            .then(() => {
                console.log("Email verification sent!");
                setSuccessMessage("Email verification sent!");
                })
            .catch((error) => setErrorMessage(error.message)
            )
        })
        .catch((error) => setErrorMessage(error.message));
    };
  
    return (
      <KeyboardAvoidingView style={Styles.container} behavior="padding">
        {/* Email and password input fields */}
        <View style={Styles.containerInput}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={Styles.input}
            autoComplete="email"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={Styles.input}
            secureTextEntry
            autoComplete="new-password"
          />
        </View>
        <View style={Styles.containerButton}>
          {errorMessage && (
            <Text style={Styles.messageError}>{errorMessage}</Text>
          )}
          {successMessage && (
            <Text style={Styles.messageSuccess}>{successMessage}</Text>
          )}
          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            style={[Styles.buttonPrimary, Styles.buttonPrimaryLarge]}
          >
            <Text style={Styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={Styles.linkText}>
              Already Signed Up? Login.{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default RegistrationView;
  