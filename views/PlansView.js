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
import { useNavigation } from '@react-navigation/native';

import Styles from '../styles/Styles';
/**
    * Plans screen
    * @param {*} navigation
    * @returns {JSX.Element}
 */

const PlansView = ({ route, navigation }) => {
const headerHeight = useHeaderHeight();
const [keyboardStatus, setKeyboardStatus] = useState('not sett');
console.log(headerHeight)

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