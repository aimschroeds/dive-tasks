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
  
  import Styles from "../styles/Styles";
  
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
      <KeyboardAvoidingView style={Styles.container} behavior="padding">
        {/* Email and password input for login */}
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
            autoComplete="current-password"
          />
        </View>
        <View style={Styles.containerButton}>
          {/* Login button */}
          <TouchableOpacity
            onPress={handleLogin}
            style={[Styles.buttonPrimary, Styles.buttonPrimaryLarge]}
          >
            <Text style={Styles.buttonText}>Login</Text>
          </TouchableOpacity>
          {/* Login error message to user */}
          {errorMessage && (
            <Text style={Styles.messageError}>{errorMessage}</Text>
          )}
          {/* Button to redirect user to registration screen */}
          <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
            <Text style={Styles.linkText}>
              Want to Sign Up? Register.{" "}
            </Text>
          </TouchableOpacity>
          {/* Button to redirect user to password reset screen */}
          <TouchableOpacity onPress={() => navigation.navigate("Reset Password")}>
            <Text style={Styles.linkText}>
              Forgotten Password? Reset Password.{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default LoginView;
  