import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "./firebase";
import { registerRootComponent } from "expo";

import LoginView from "./views/LoginView";
import RegistrationView from "./views/RegistrationView";
import ResetPasswordView from "./views/ResetPasswordView";
import NavigationMain from "./navigation/NavigationMain";
import PlanAddView from "./views/PlanAddView";

import { getHeaderTitle } from "./helpers/routeName";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
            <Stack.Screen
              name="NavigationMain"
              component={NavigationMain}
              options={({ route }) => ({
                headerShown: true,
                title: getHeaderTitle(route),
              })}
            />
          <Stack.Screen
            name="Login"
            component={LoginView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Reset Password"
            component={ResetPasswordView}
            options={{ headerShown: false }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name='Add Plan' component={PlanAddView} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);