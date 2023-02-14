import * as Calendar from 'expo-calendar';
import { Alert, Platform } from 'react-native';

export const addToCalendarExpo = async (title, startDate, endDate, location) => {
  try {
    // Check and request calendar permissions
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need calendar permissions to make this work!');
      return;
    }

    // Find the default calendar source for the device
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };

    // Create a new calendar
    const calendarId = await Calendar.createCalendarAsync({
      title: 'Milestones Calendar',
      color: '#AA77FF',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'DivePlanAppCalendar',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });

    // Add the event to the calendar
    const eventId = await Calendar.createEventAsync(calendarId, {
      title,
      startDate,
      endDate,
      timeZone: 'UTC',
      location,
      notes: 'Created by the Scuba Diving App',
      alarms: [
        {
          method: Calendar.AlarmMethod.ALERT,
          relativeOffset: -60, // Reminder 60 minutes before the event
        },
      ],
    });
    Alert.alert('Event Added', 
                'The scheduled milestone has been added to your calendar. You will receive a reminder 1 hour before the event.',
                [{text: 'OK'},],
    )
    console.log(`Event created with ID: ${eventId}`);
  } catch (error) {
    console.error('Error adding event to calendar:', error);
  }
};

// Helper function to get the default calendar source for iOS devices
async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  const defaultCalendars = calendars.filter((each) => each.source.name === 'Default');
  return defaultCalendars[0].source;
}
