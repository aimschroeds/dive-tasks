import { Text, View, TextInput } from 'react-native';
import Styles from '../styles/Styles';

import Logout from '../components/Logout';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
/**
 * Home screen
 * @param {*} navigation
 * @returns {JSX.Element}
 */

const HomeView = () => {
    const navigation = useNavigation();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUserId(user.uid);
            } else {
                // User is signed out
                setUserId(null);
                navigation.navigate('Login');
            }
        })
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={Styles.container}>
            <View style={Styles.container}>
                <Text style={Styles.title}>Home</Text>
                <Text style={Styles.text}>Welcome to Dive Tasks!</Text>
                <Text style={Styles.text}>This is the home screen.</Text>
                <Text style={Styles.text}>You are logged in.</Text>
            </View>
            <Logout />
        </View>
    )};

export default HomeView;