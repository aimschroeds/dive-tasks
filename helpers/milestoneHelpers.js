import milestoneTypes from '../data/milestoneTypes';
import { format, isValid } from 'date-fns';
import Creds from '../config/weatherAPIKey';
import axios from 'axios';

export const getWeatherData = async (latitude, longitude, timestamp) => {
  const url =  `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=-${longitude}&appid=${Creds.WEATHER_API_KEY}&units=${Creds.WEATHER_API_UNITS}`;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=-${longitude}&appid=${Creds.WEATHER_API_KEY}&units=${Creds.WEATHER_API_UNITS}`
    );
    const forecast = response.data;
    return forecast;
  } catch (error) {
    console.error('Error fetching weather data:', error); // Doesn't get logged
    return null;
  }
};


export const renderMilestoneIcon = (_milestoneType) => {
  const milestone = milestoneTypes.find((item) => item.type === _milestoneType);
  if (milestone) {
    return milestone.icon;
  } else {
    return "help-circle"; // Default icon
  }
};

export const calculateCompletionPercentage = (milestones) => {
    const totalMilestones = milestones.length;
    const completedMilestones = milestones.filter((milestone) => milestone.status).length;
    return (completedMilestones / totalMilestones) * 100;
  };

  export const formatScheduledDate = (date) => {
    if (typeof date === 'object' && 'seconds' in date) {
      date = date.seconds * 1000;
    }
    if (date && isValid(new Date(date))) {
      const formattedDate = format(date, 'PPp');
      const timeIn24HourFormat = new Date(date).toLocaleString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
      const formattedDateWithoutTime = formattedDate.slice(0, -9);
      return `${formattedDateWithoutTime} ${timeIn24HourFormat}`;
    }
    return 'Schedule';
  }