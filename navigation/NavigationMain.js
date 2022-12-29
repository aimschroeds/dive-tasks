// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeView from '../views/HomeView';
import PlansView from '../views/PlansView';
import PlanAddView from '../views/PlanAddView';

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
    activeColor="#C9EEFF"
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
    </Tab.Navigator>
    );}

export default NavigationMain;