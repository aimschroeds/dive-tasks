import React, { useLayoutEffect, useState, useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { db, auth } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';


export const getUnreadNotificationsCount = async (userId) => {
  console.log('getUnreadNotificationsCount', userId)
  const notificationsRef = collection(db, 'notifications');
  const q = query(
    notificationsRef,
    where('recipientId', '==', userId),
    where('read', '==', false),
  );

  const querySnapshot = await getDocs(q);
  console.log("querySnapshot.size: ", querySnapshot.size)
  return querySnapshot.size;
};

/**
 * GetHeaderRightButton component for rendering the right header button based on the focused route
 * @component
 * @param {Object} props - Component properties
 * @param {Object} props.route - Route object
 * @returns {React.Node} - GetHeaderRightButton component
 */
const GetHeaderRightButton = (props) => {
  const { route, user } = props;
  const navigation = useNavigation();
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [routeName, setRouteName] = useState(
    getFocusedRouteNameFromRoute(route) ?? "Home"
  );

  useLayoutEffect(() => {
    const currentRouteName = getFocusedRouteNameFromRoute(route);
    setRouteName(currentRouteName);
  }, [navigation, route]);

  useEffect(() => {
    const fetchUnreadNotificationsCount = async () => {
      try {
        console.log("fetchUnreadNotificationsCount1: ", user.uid);
        const count = await getUnreadNotificationsCount(user.uid);
        setUnreadNotificationsCount(count);
        console.log(count);
      } catch (error) {
        console.error('Error in fetchUnreadNotificationsCount:', error);
      }
    };
    

    if (user?.uid)
    {
      fetchUnreadNotificationsCount();
      console.log("useEffect fetchUnreadNotificationsCount: ", user?.uid)
    }

    
  }, [user]);

  /**
   * Render the GetHeaderRightButton component
   * @returns {React.Node} - The GetHeaderRightButton component
   */
  return (
    <>
      {routeName === "Plans" ? (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("Plan Form")}
        >
          <MaterialCommunityIcons
            name="plus-thick"
            color="#AA77FF"
            size={26}
          />
        </TouchableOpacity>
      ) : routeName === "Home" ? (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("Notifications")}
        >
          {unreadNotificationsCount > 0 ? (
            <MaterialCommunityIcons name="bell" size={24} color="#AA77FF" />
          ) : (
            <MaterialCommunityIcons name="bell-outline" size={24} color="#AA77FF" />
          )}
        </TouchableOpacity>
      ) : (
        <Text></Text>
      )}
    </>
  );
};

export default GetHeaderRightButton;
