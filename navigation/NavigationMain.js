// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeView from '../views/HomeView';
import PlansView from '../views/PlansView';
import PlanFormView from '../views/PlanFormView';
import ProfileView from '../views/ProfileView';
import SearchUsersView from '../views/SearchUsersView';

import { auth } from '../firebase';

const Tab = createMaterialBottomTabNavigator();

/**
 * Primary bottom tab navigation for the app (logged in users only)
 * @returns {JSX.Element} 
 */

function NavigationMain() {
    return (
    <Tab.Navigator
    initialRouteName='Home'
    activeColor="#311D50"
    inactiveColor="#3e2465"
    barStyle={{ backgroundColor: '#AA77FF' }}
    >
      <Tab.Screen
          name='Home'
          component={HomeView}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
      />    
      <Tab.Screen
          name='Plans'
          component={PlansView}
            options={{
                tabBarLabel: 'Plans',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="certificate" color={color} size={26} />
                ),
            }}
      />    
      <Tab.Screen
          name='Profile'
          component={ProfileView}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }}
      />
      <Tab.Screen 
        name='Search Users'
        component={SearchUsersView}
        options={{
          tabBarLabel: 'Search Users',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-search" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
    );}

export default NavigationMain;