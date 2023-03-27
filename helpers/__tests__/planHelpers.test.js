import { getPlanData, formatEndTime } from '../planHelpers';

describe('getPlanData', () => {
  test('returns null if plan does not exist', async () => {
    const planId = 'non-existent-plan-id';
    const planData = await getPlanData(planId);
    expect(planData).toBe(null);
  });

  test('returns plan data if plan exists', async () => {
    const planId = 'existing-plan-id';
    // Mock Firestore's getDoc function
    const getDocMock = jest.fn(() => Promise.resolve({ exists: true, data: () => ({ id: planId }) }));
    jest.mock('firebase/firestore', () => ({ getDoc: getDocMock }));

    const planData = await getPlanData(planId);
    expect(getDocMock).toHaveBeenCalledWith(expect.anything(), planId);
    expect(planData).toEqual({ id: planId });

    jest.unmock('firebase/firestore');
  });
});

describe('formatEndTime', () => {
  test('returns "Incomplete" if date is falsy or not valid', () => {
    expect(formatEndTime(null)).toBe('Incomplete');
    expect(formatEndTime(undefined)).toBe('Incomplete');
    expect(formatEndTime('invalid-date')).toBe('Incomplete');
    expect(formatEndTime({})).toBe('Incomplete');
  });

  test('returns formatted date with time if date is valid', () => {
    const date = new Date('2023-03-26T10:05:00.000Z');
    const formattedDate = format(date, 'PPp');
    const timeIn24HourFormat = new Date(date).toLocaleString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const formattedDateWithoutTime = formattedDate.slice(0, -9);
    const expectedOutput = `Completed At: ${formattedDateWithoutTime} ${timeIn24HourFormat}`;

    expect(formatEndTime(date)).toBe(expectedOutput);

    // Test for date object with seconds property
    const dateObject = { seconds: date.getTime() / 1000 };
    expect(formatEndTime(dateObject)).toBe(expectedOutput);
  });
});
