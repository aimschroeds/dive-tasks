import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, Image, StyleSheet } from 'react-native';
import { getPlanData, formatEndTime } from '../helpers/planHelpers';
import Images from './Images';
import { getDisplayName, getProfilePicture } from '../helpers/userDataHelpers';
import milestoneTypes from '../data/milestoneTypes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Plan = ({ planId }) => {
  const [displayName, setDisplayName] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Get plan
      const fetchPlan = async () =>{
        try {
          const plan = await getPlanData(planId);
          setPlan(plan);
          console.log(plan);
        } catch (error) {
          console.error('Error fetching plan data:', error);
        }
      }
      if (planId)
      {
        fetchPlan();
      }
  }
  , [planId]);

  useEffect(() => {
    if (plan?.userId)
    {
        const fetchUserData = async () => {
          try {
            const name = await getDisplayName(plan.userId);
            const picture = await getProfilePicture(plan.userId);
            setDisplayName(name);
            setProfilePicture(picture);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
      }
      fetchUserData();
  }
  if (plan)
  {

      setLoading(false);
  }
  }, [plan]);
  
  // Get the icon for the milestone type
  const getMilestoneIcon = (type) => {
    const milestoneType = milestoneTypes.find((m) => m.type === type);
    return milestoneType ? milestoneType.icon : 'dots-horizontal';
  };

  // Render the milestone information
  const renderMilestone = (milestone) => (
    <View key={milestone.name}>
      <View style={styles.milestoneHeader}>
        <MaterialCommunityIcons
          name={getMilestoneIcon(milestone.type)}
          size={24}
          color={"#62CDFF"}
        />
        <Text style={styles.milestoneName}>{milestone.name}</Text>
      </View>
      {/* // Iterate over the skills array with status true and render them */}
      {milestone.skills.map((skill) => {
        if (skill.status) {
          return (
            <View key={skill.name} style={[styles.rowSkill, {marginLeft:40,}]}>
              <MaterialCommunityIcons name="check" size={24} color={"#97DEFF"}/>
              <Text style={styles.skillName}>{skill.skill}</Text>
            </View>
          );
        }
        return null;
      })}      
    </View>
  );  

  // If loading return ActivityIndicator
  if (loading) {
    return <ActivityIndicator testID="plan-loading-indicator" />;
  }



  return (
    <View style={styles.container}>
        <View style={styles.header}>
          {profilePicture && (
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
          )}
          <View style={{ flexDirection: 'column' }}>
          { displayName && <Text style={styles.displayName}>{displayName}</Text> }
          {plan?.completedAt && <Text style={styles.startTime}>{formatEndTime(plan.completedAt)}</Text> }
          </View>
        </View>
        <View style={styles.row}>{plan?.images && <Images images={plan.images} /> }</View>
        <View style={[styles.rowLeft]}>
        <Text style={styles.title}>{plan.title}</Text>
        </View>
        {plan?.milestones?.map((milestone) => {
          if (milestone.status) {
            return renderMilestone(milestone);
          }
          return null;
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#62CDFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginTop: 40,
    marginHorizontal: 10,
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
  title: {
    fontSize: 24,
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
    marginBottom: 10,
    marginTop: 10,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  rowSkill: {
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'flex-start',
    marginBottom: 2,
    marginTop: 2,
    marginHorizontal: 10,
  },
  attributeText: {
    fontSize: 24,
    textAlign: 'center',
  },
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  milestoneName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  skill: {
    fontSize: 14,
    marginLeft: 34,
  },
  skillName: {
    fontSize: 14,
    marginLeft: 10,
  },
});

export default Plan;
