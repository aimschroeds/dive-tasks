import { addToCalendarExpo } from '../path/to/your/helpers';
import * as Calendar from 'expo-calendar';
import { Alert } from 'react-native';

describe('addToCalendarExpo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('adds event to calendar', async () => {
    Calendar.requestCalendarPermissionsAsync.mockResolvedValue({ status: 'granted' });
    Calendar.getCalendarsAsync.mockResolvedValue([{ source: { name: 'Default', id: '1' } }]);
    Calendar.createCalendarAsync.mockResolvedValue('calendarId');
    Calendar.createEventAsync.mockResolvedValue('eventId');

    const title = 'Test Event';
    const startDate = new Date('2023-05-01T12:00:00Z');
    const endDate = new Date('2023-05-01T13:00:00Z');
    const location = 'Test Location';

    await addToCalendarExpo(title, startDate, endDate, location);

    expect(Calendar.requestCalendarPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(Calendar.getCalendarsAsync).toHaveBeenCalledTimes(1);
    expect(Calendar.createCalendarAsync).toHaveBeenCalledTimes(1);
    expect(Calendar.createEventAsync).toHaveBeenCalledTimes(1);
    expect(Alert.alert).toHaveBeenCalledTimes(1);
  });

  it('does not add event if permission is not granted', async () => {
    Calendar.requestCalendarPermissionsAsync.mockResolvedValue({ status: 'denied' });

    await addToCalendarExpo('Test Event', new Date(), new Date(), 'Test Location');

    expect(Calendar.requestCalendarPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(Alert.alert).toHaveBeenCalledTimes(1);
    expect(Calendar.createCalendarAsync).toHaveBeenCalledTimes(0);
    expect(Calendar.createEventAsync).toHaveBeenCalledTimes(0);
  });

  it('handles error while adding event', async () => {
    Calendar.requestCalendarPermissionsAsync.mockResolvedValue({ status: 'granted' });
    Calendar.getCalendarsAsync.mockRejectedValue(new Error('Error'));

    await addToCalendarExpo('Test Event', new Date(), new Date(), 'Test Location');

    expect(Calendar.requestCalendarPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(Calendar.getCalendarsAsync).toHaveBeenCalledTimes(1);
    expect(Calendar.createCalendarAsync).toHaveBeenCalledTimes(0);
    expect(Calendar.createEventAsync).toHaveBeenCalledTimes(0);
  });
});
