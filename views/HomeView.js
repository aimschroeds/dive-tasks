import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Styles from '../styles/Styles';

import Logout from '../components/Logout';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc, onSnapshot, query, where, orderBy } from 'firebase/firestore';

/**
 * Home screen
 * @param {*} navigation
 * @returns {JSX.Element}
 */

const HomeView = () => {
    const navigation = useNavigation();
    const [userId, setUserId] = useState(null);
    const [dives, setDives] = useState(null);
    const [plans, setPlans] = useState(null);

    
    useEffect(() => {
        if (userId) {
            // Get dives logged by user or by any of their friends
          const unsubscribe = onSnapshot(
            query(
              collection(db, "dives"),
              where("userId", "==", userId),
              orderBy("startTime", "desc")
            ),
            (querySnapshot) => {
              const dives = [];
              querySnapshot.forEach((doc) => {
                dives.push({ ...doc.data(), id: doc.id });
              });
              setDives(dives);
            }
          );
          return () => unsubscribe();
        }
      }, [userId]);

      useEffect(() => {
        if (userId) {
          // Get plans completed by user
            const unsubscribe = onSnapshot(
                query(
                    collection(db, "plans"),
                    where("userId", "==", userId),
                    orderBy("completedAt", "desc")
                ),
                (querySnapshot) => {
                    const plans = [];
                    querySnapshot.forEach((doc) => {
                        plans.push({ ...doc.data(), id: doc.id });
                    });
                    setPlans(plans);
                });
            return () => unsubscribe();
        }
      }, [userId]);

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
                {/* List of dive ids that link via Touchable Opacity to DiveView when tapped */}
                {dives && dives.map((dive) => (
                    <TouchableOpacity key={dive.id} onPress={() => navigation.navigate('Dive', { diveId: dive.id })}>
                        <Text style={Styles.text}>{dive.id}</Text>
                    </TouchableOpacity>
                ))}
                <Text style={Styles.text}>Plans</Text>
                {/* List of plan ids that link via Touchable Opacity to PlanView when tapped */}
                {plans && plans.map((plan) => (
                    <TouchableOpacity key={plan.id} onPress={() => navigation.navigate('Completed Plan', { planId: plan.id })}>
                        <Text style={Styles.text}>{plan.id}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Logout />
        </View>
    )};

export default HomeView;