import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from './Images'; 
import { getDisplayName, getProfilePicture } from '../helpers/userDataHelpers';
import { calculateBottomTime, calculatePressureUsed, formatStartTime, getDiveData } from '../helpers/diveHelpers';
import { entryTypeOptions, waterTypeOptions, surfOptions } from '../data/diveConditionTypes'

const DiveItem = ({ diveId }) => {
    // const { diveId } = route.params;
    const [displayName, setDisplayName] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [dive, setDive] = useState(null);
    const [bottomTime, setBottomTime] = useState(null);
    const [pressureUsed, setPressureUsed] = useState(null);
    const [diveConditions, setDiveConditions] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get dive
        const fetchDive = async () =>{
          try {
            console.log('DiveItem: fetchDive: diveId: ' + diveId);
            const dive = await getDiveData(diveId);
            console.log('DiveItem: fetchDive: dive: ' + dive);
            setDive(dive);
          } catch (error) {
            console.error('Error fetching dive data:', error);
          }
        }
        if (diveId)
        {
          fetchDive();
        }
    }
    , [diveId]);


  
    useEffect(() => {
      if (dive?.userId)
      {
          const fetchUserData = async () => {
            try {
              const name = await getDisplayName(dive.userId);
              const picture = await getProfilePicture(dive.userId);
              console.log('DiveItem: fetchUserData: picture: ' + picture);
              setDisplayName(name);
              setProfilePicture(picture);
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
        }
        fetchUserData();
    }
    if (dive)
    {
        const bottomTime = calculateBottomTime(dive.startTime, dive.endTime);
        setBottomTime(bottomTime);
        const pressureUsed = calculatePressureUsed(dive.startPressure, dive.endPressure);
        setPressureUsed(pressureUsed);
        const entryType = entryTypeOptions.find((option) => option.value === dive.entryType);
        const waterType = waterTypeOptions.find((option) => option.value === dive.waterType);
        const surf = surfOptions.find((option) => option.value === dive.surf);
        setDiveConditions({ entryType, waterType, surf });
        setLoading(false);
    }
    }, [dive]);
    
    // If loading return ActivityIndicator
    if (loading) {
      return <ActivityIndicator />;
    }

  
    return (
      <View style={styles.container}>
            <View style={styles.header}>
              {profilePicture && (
                <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
              )}
              <View style={{ flexDirection: 'column' }}>
              { displayName && <Text style={styles.displayName}>{displayName}</Text> }
              {dive?.startTime && <Text style={styles.startTime}>{formatStartTime(dive.startTime)}</Text> }
              </View>
            </View>
            {dive?.images && <Images images={dive.images} /> }
            <View style={styles.row}>
              {bottomTime && 
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="clock-outline" size={32} color={"#AA77FF"} />
                  <Text style={[styles.attributeText, {marginHorizontal: 30, marginBottom: 10,}]}>{bottomTime} min</Text> 
                </View>
              }
              {pressureUsed && 
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="gas-cylinder" size={32} color={"#AA77FF"} />
                  <Text style={[styles.attributeText, {marginHorizontal: 30,}]}>{pressureUsed} bar</Text> 
                </View>
              }
            </View>
            <View style={styles.row}>
            {dive?.maxDepth && 
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <MaterialCommunityIcons name="arrow-down-bold" size={32} color={"#AA77FF"} />
                <Text style={styles.attributeText}>{dive.maxDepth} m</Text> 
              </View>
            }
            {dive?.visibility && 
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <MaterialCommunityIcons name="eye" size={32} color={"#AA77FF"} />
              <Text style={[styles.attributeText, {marginHorizontal: 35,}]}>{dive.visibility} m</Text> 
            </View>
            }
            {dive?.waterTemperature && 
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <MaterialCommunityIcons name="thermometer" size={32} color={"#AA77FF"} />
              <Text style={styles.attributeText}>{dive.waterTemperature} °C</Text> 
            </View>
            }
            </View>
            <View style={styles.row}>
            {diveConditions?.entryType && (
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <MaterialCommunityIcons name={diveConditions.entryType.icon} size={32} color={"#AA77FF"}/>
                <Text style={styles.attributeText}>{diveConditions.entryType.label}</Text>
              </View>
            )}
            {diveConditions?.waterType && (
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <MaterialCommunityIcons name={diveConditions.waterType.icon} size={32} color={"#AA77FF"} />
                <Text style={[styles.attributeText, {marginHorizontal: 30,}]}>{diveConditions.waterType.label}</Text>
              </View>
            )}
            {diveConditions?.surf && (
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <MaterialCommunityIcons style={{textAlign: 'center'}} name={diveConditions.surf.icon} size={32} color={"#AA77FF"}/>
                <Text style={styles.attributeText}>{diveConditions.surf.label}</Text>
              </View>
            )}
            </View>
      </View>
    );    
  };

  export default DiveItem;
  
  const styles = StyleSheet.create({
    container: {
      borderWidth: 2,
      borderColor: '#AA77FF',
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
      marginTop: 40,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    profilePicture: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    displayName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    startTime: {
        fontSize: 12,
        marginTop: 3,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingHorizontal: 10,
        marginBottom: 10,
        marginTop: 10,
      },
      attributeText: {
        fontSize: 24,
        // marginRight: 10,
        // Center align text horizontally
        textAlign: 'center',
      },
    });
     
  