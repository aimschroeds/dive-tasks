import React, { useEffect, useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Styles from '../styles/Styles';
import Skills from './Skills';
import { formatScheduledDate, getWeatherData } from '../helpers/milestoneHelpers';

/**
 * Milestone component to display a single milestone
 * @component
 * @param {Object} props - Props containing milestone data and various callback functions
 * @returns {React.Node} - Milestone component
 */
const Milestone = ({ item, index, toggleMilestoneStatus, renderMilestoneIcon, toggleSkillStatus, locationSelectionVisible, onSchedule }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const currentTime = Date.now();
    const fiveDaysFuture = currentTime + 5 * 24 * 60 * 60 * 1000;
    const scheduledAt = item.scheduledAt.seconds * 1000 + item.scheduledAt.nanoseconds / 1000000;
    if (
      scheduledAt &&
      item.geo?.latitude &&
      item.geo?.longitude &&
      scheduledAt > currentTime &&
      scheduledAt <= fiveDaysFuture
    ) {
      const fetchWeatherData = async () => {
        try {
          const weather = await getWeatherData(item.geo.latitude, item.geo.longitude, scheduledAt);
          // Find the weather data closest to the scheduled date and time
          const closestWeatherData = weather.list.reduce((prev, curr) => {
            return Math.abs(curr.dt - item.scheduledAt.seconds) < Math.abs(prev.dt - item.scheduledAt.seconds) ? curr : prev;
          });
          console.log("Closest weather data:", closestWeatherData)
          setWeatherData(closestWeatherData);
        } catch (error) {
          console.error("Error in fetchWeatherData:", error);
        }
      };
      fetchWeatherData();
    }
  }, [item.scheduledAt, item.geo]);

  /**
   * Render the Milestone component
   * @returns {React.Node} - The Milestone component
   */

  return (
    <View style={Styles.milestoneItemContainer} key={index}>
      <View style={Styles.milestoneContent}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <CheckBox
            title=''
            checked={item.status}
            onPress={() => toggleMilestoneStatus(index)}
            containerStyle={Styles.milestoneCheckbox}
            checkedColor='#AA77FF'
            uncheckedColor='#AA77FF'
          />
          <View style={Styles.milestoneContent}>
            <Text style={Styles.milestoneName}>{item.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {item.geo ? (
                <TouchableOpacity onPress={() => locationSelectionVisible(true)}>
                <Text style={Styles.locationLabel}>
                  <MaterialCommunityIcons name='map-marker' size={16} color='white'/>
                  {item.geo.name}
                </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => locationSelectionVisible(true)}>
                  <Text style={Styles.locationLabel}>
                  <MaterialCommunityIcons name='map-marker' size={16} color='white'/>
                    Select Location
                    </Text>
                </TouchableOpacity>
              )}
            <TouchableOpacity onPress={() => onSchedule(index)}>
              <Text style={Styles.scheduleLabel}>
              <MaterialCommunityIcons name='calendar-range' size={16} color='white'/>
                {formatScheduledDate(item.scheduledAt)}
              </Text>
            </TouchableOpacity>
            </View>
            
            {weatherData && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }} style={Styles.weatherIcon} />
                <Text style={Styles.weatherText}>{Math.round(weatherData.main.temp)}°C
              </Text></View>
            )}
            
            <Skills skills={item.skills} milestoneIndex={index} toggleSkillStatus={toggleSkillStatus} />
          </View>
          <MaterialCommunityIcons
            name={renderMilestoneIcon(item.type)}
            size={24}
            color='#AA77FF'
            style={Styles.milestoneIcon}
          />
        </View>
      </View>
    </View>
  );
};

export default Milestone;
