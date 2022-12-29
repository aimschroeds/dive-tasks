import { Keyboard, View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, {
    useCallback,
    useLayoutEffect,
    useState,
    useEffect,
  } from "react";
import { navigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Styles from '../styles/Styles';
/**
    * Plans screen
    * @param {*} navigation
    * @returns {JSX.Element}
 */

const PlansView = ({ navigation }) => {
const headerHeight = useHeaderHeight();
const [keyboardStatus, setKeyboardStatus] = useState('not sett');
console.log(headerHeight)


useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  // Set header to contain add new plan button
  useLayoutEffect(() => {
    const unsubscribe = navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => navigation.navigate("Add Plan")}
        >
            <MaterialCommunityIcons name="plus-thick" color="black" size={26} />
        </TouchableOpacity>
      ),
    });
    return unsubscribe;
  }, [navigation]);

    return (
        <KeyboardAvoidingView 
            behaviour={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={headerHeight}
            style={Styles.container}
        >
            <Text style={Styles.title}>Plans</Text>
            <Text style={Styles.text}>This is the plans screen.</Text>
            <Text style={Styles.text}>You are logged in.</Text>
            <Text style={Styles.text}>{keyboardStatus}</Text>
            <TextInput
                placeholder="Search"
                style={Styles.input}
                onSubmitEditing={Keyboard.dismiss}
            >
                Text
            </TextInput>
            <TextInput
                placeholder="Search"
                style={Styles.input}
                onSubmitEditing={Keyboard.dismiss}
            >
            </TextInput>
            <TouchableOpacity
                onPress={() => navigation.navigate("Add Plan")}
            >
                <MaterialCommunityIcons name="plus-thick" color="black" size={26} />
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )};

    export default PlansView;