import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { registerRootComponent } from "expo";

import LoginView from "./views/LoginView";
import RegistrationView from "./views/RegistrationView";
import ResetPasswordView from "./views/ResetPasswordView";
import NavigationMain from "./navigation/NavigationMain";
import PlanFormView from "./views/PlanFormView";
import PlanView from "./views/PlanView";
import LocationNew from "./views/LocationNew";
import LocationSelection from "./views/LocationSelection";

import { getHeaderTitle } from "./helpers/getHeaderTitle";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GetHeaderRightButton from "./components/GetHeaderRightButton";
import * as Calendar from 'expo-calendar';
import OtherProfileView from "./views/OtherProfileView";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      }
    })();
  }, []);

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
                headerRight: () =>
                  <GetHeaderRightButton route={route} />,
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
          <Stack.Screen name='Plan Form' component={PlanFormView} />
          <Stack.Screen name='Location New' component={LocationNew} />
          <Stack.Screen name='Location Selection' component={LocationSelection} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen 
            name='View Plan' 
            component={PlanView} 
          />
          <Stack.Screen
            name='Other Profile'
            component={OtherProfileView}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);