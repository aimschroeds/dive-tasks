import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Styles from '../styles/Styles';

import Logout from '../components/Logout';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import {getFriends} from '../helpers/friendsHelpers';
import PlanItem from '../components/PlanItem';
import DiveItem from '../components/DiveItem';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * Home screen
 * @param {*} navigation
 * @returns {JSX.Element}
 */

const HomeView = ({ navigation }) => {
    const [userId, setUserId] = useState(null);
    const [dives, setDives] = useState(null);
    const [plans, setPlans] = useState(null);
    const [friends, setFriends] = useState(null);
    const [feed, setFeed] = useState(null);

    useEffect(() => {
        if (userId) {
        const fetchFriends = async () =>{
            try {
                const _friends = await getFriends(userId);
                setFriends(_friends);
                console.log('Home: Friends ' + friends);
            } catch (error) {
                console.error('Error fetching friend data:', error);
            }
            }
            if (userId)
            {
                fetchFriends();
            }
        }
    }, [userId, navigation]);

    
    useEffect(() => {
        if (userId && friends) {
          const usersToQuery = [userId, ...friends];
          const unsubscribe = onSnapshot(
            query(
              collection(db, "dives"),
              where("userId", "in", usersToQuery),
              orderBy("startTime", "desc")
            ),
            (querySnapshot) => {
              const dives = [];
              querySnapshot.forEach((doc) => {
                dives.push({ id: doc.id, type: 'dive' });
              });
              setDives(dives);
            }
          );
          return () => unsubscribe();
        }
      }, [userId, friends]);

      useEffect(() => {
        if (userId && friends) {
          const usersToQuery = [userId, ...friends];
          const unsubscribe = onSnapshot(
            query(
              collection(db, "plans"),
              where("userId", "in", usersToQuery),
              orderBy("completedAt", "desc")
            ),
            (querySnapshot) => {
              const plans = [];
              querySnapshot.forEach((doc) => {
                plans.push({ id: doc.id, type: 'plan' });
              });
              setPlans(plans);
            }
          );
          return () => unsubscribe();
        }
      }, [userId, friends]);

      useEffect(() => {
        if (dives && plans) {
          const mergedList = [...dives, ...plans].sort((a, b) => {
            const timestampA = a.type === 'dive' ? a.startTime : a.completedAt;
            const timestampB = b.type === 'dive' ? b.startTime : b.completedAt;
            return timestampA - timestampB;
          });
          setFeed(mergedList);
        }
      }, [dives, plans]);

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
        
            <ScrollView><View style={[Styles.container, {marginHorizontal: 20,}]}>
                {/* Combined list of dives and plans */}
                { feed && feed.length > 0 && feed.map((item) => {
                const uniqueKey = `${item.type}-${item.id}`;
                if (item.type === 'dive') {
                    return (
                    <DiveItem
                        key={uniqueKey}
                        diveId={item.id}
                        onPress={() =>
                        navigation.navigate('Dive', { diveId: item.id })
                        }
                    />
                    );
                } else {
                    return (
                    <PlanItem
                        key={uniqueKey}
                        planId={item.id}
                        onPress={() =>
                        navigation.navigate('Completed Plan', { planId: item.id })
                        }
                    />
                    );
                }
                })}
             </View></ScrollView>
       
    )};

export default HomeView;