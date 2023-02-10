// From: https://reactnavigation.org/docs/screen-options-resolution/#setting-parent-screen-options-based-on-child-navigators-state

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';

const GetHeaderRightButton = (props) => {
  const { route } = props;
  const navigation = useNavigation();
  const [routeName, setRouteName] = useState(getFocusedRouteNameFromRoute(route) ?? 'Home');

  useLayoutEffect(() => {
    const currentRouteName = getFocusedRouteNameFromRoute(route);
    setRouteName(currentRouteName);
  }, [navigation, route]);

  return (
    <>
    {
      routeName == 'Plans' ? (
        <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() => navigation.navigate("Plan Form")}
                >
                    <MaterialCommunityIcons name="plus-thick" color="#AA77FF" size={26} />
        </TouchableOpacity>
      ) : 
      routeName == 'Profile' ? (
        <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() => navigation.navigate("Edit Profile")}
                >
                    <MaterialCommunityIcons name="account-edit" color="#AA77FF" size={26} />
        </TouchableOpacity>
      )
      :
      (
        <Text> Home</Text>
      )

    }
    </>
  );
};

export default GetHeaderRightButton;