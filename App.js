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
import NotificationDrawer from "./views/NotificationDrawer";
import DiveForm from "./views/DiveForm";
import DiveView from "./views/DiveView";
import CompletedPlanView from "./views/CompletedPlanView";

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

  // Set user state when authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
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
                  <GetHeaderRightButton route={route} user={user}/>,
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
          <Stack.Screen name='Dive Form' component={DiveForm} />
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
          <Stack.Screen name='Notifications' component={NotificationDrawer} />
          <Stack.Screen name='Dive' component={DiveView} />
          <Stack.Screen name='Completed Plan' component={CompletedPlanView} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);