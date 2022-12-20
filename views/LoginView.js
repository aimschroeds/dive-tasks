import {
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { TabActions } from "@react-navigation/native";
  import { useNavigation } from "@react-navigation/native";
  import { auth } from "../firebase";
  import { signInWithEmailAndPassword } from "firebase/auth";
  
  import StyleSheet from "../styles/StyleSheet";
  
  // Adapted from: https://www.youtube.com/watch?v=ql4J6SpLXZA
  
  const LoginView = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
  
    const navigation = useNavigation();
  
    // Handle auth when user attempts to login
    const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(user);
        })
        .catch((error) => setErrorMessage(error.message));
    };
    // If user becomes logged in, redirect to Home screen
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user && navigation) {
          navigation.navigate("NavigationMain", { name: "Home" });
        }
      });
      return unsubscribe;
    }, [navigation]);
  
    return (
      <KeyboardAvoidingView style={StyleSheet.container} behavior="padding">
        {/* Email and password input for login */}
        <View style={StyleSheet.containerInput}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={StyleSheet.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={StyleSheet.input}
            secureTextEntry
          />
        </View>
        <View style={StyleSheet.containerButton}>
          {/* Login button */}
          <TouchableOpacity
            onPress={handleLogin}
            style={[StyleSheet.buttonPrimary, StyleSheet.buttonPrimaryLarge]}
          >
            <Text style={StyleSheet.buttonText}>Login</Text>
          </TouchableOpacity>
          {/* Login error message to user */}
          {errorMessage && (
            <Text style={StyleSheet.messageError}>{errorMessage}</Text>
          )}
          {/* Button to redirect user to registration screen */}
          <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
            <Text style={StyleSheet.linkText}>
              Want to Sign Up? Register.{" "}
            </Text>
          </TouchableOpacity>
          {/* Button to redirect user to password reset screen */}
          <TouchableOpacity onPress={() => navigation.navigate("Reset Password")}>
            <Text style={StyleSheet.linkText}>
              Forgotten Password? Reset Password.{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default LoginView;
  