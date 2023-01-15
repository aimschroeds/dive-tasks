import { Text, View } from 'react-native';
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from '../firebase';

import Styles from '../styles/Styles';

/**
 * PlansView component displays a list of plans created by the current user.
 * Each plan item includes a title and a status icon indicating completion.
 *
 * @param {Object} route - Route object containing route-related information.
 * @param {Object} navigation - Navigation object containing navigation-related methods.
 * @returns {JSX.Element} - Rendered PlansView component.
 */

const PlansView = ({ route, navigation }) => {
    // Initialize state variables for plans, userId, and messageError
    const [plans, setPlans] = useState([]);
    const [userId, setUserId] = useState(null);
    const [messageError, setMessageError] = useState(null);

    // Update userId when auth.currentUser changes
    useEffect(() => {
        if (auth.currentUser) {
            setUserId(auth.currentUser.uid);
        }
    }, [auth.currentUser]);

    // Fetch plans when userId is set or updated
    useEffect(() => {
        if (userId) {
            getPlans();
        }
    }, [userId]);

    // Fetch plans from the database for the current user
    const getPlans = async () => {
        // Return early if userId is not set
        if (!userId) {
            setMessageError("UserId is null");
            return;
        }
        
        // Define query to fetch plans for the current user
        const q = query(collection(db, "plans"), where("plan.userId", "==", userId));
        
        // Execute query and store results in fetchedPlans
        const querySnapshot = await getDocs(q);
        const fetchedPlans = [];
        querySnapshot.forEach((doc) => {
            fetchedPlans.push({ ...doc.data(), id: doc.id });
        });
        
        // Update plans state and clear messageError
        setPlans(fetchedPlans);
        setMessageError(null);
    };

    

    return (
        <View>
            {/* Display error message if it exists */}
            {messageError && <Text style={Styles.messageError}>{messageError}</Text>}
            
            {/* Render list of plans */}
            {plans && plans.map((plan) => (
                <View key={plan.id} style={Styles.planContainer}>
                {/* Display status icon based on plan's completion status */}
                <MaterialCommunityIcons
                    name={plan.plan.status ? "check-circle" : "circle-outline"}
                    size={24}
                    color={plan.plan.status ? "green" : "gray"}
                />
                
                {/* Display plan title */}
                <Text style={Styles.planText}>{plan.plan.title}</Text>
                </View>
            ))}
            </View>
                )};

    export default PlansView;