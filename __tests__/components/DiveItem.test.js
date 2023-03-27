import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import DiveItem from '../../components/DiveItem';

jest.mock('../helpers/diveHelpers', () => ({
  getDiveData: jest.fn(() => Promise.resolve({
    userId: 'testUserId',
    startTime: new Date(),
    endTime: new Date(),
    startPressure: 200,
    endPressure: 50,
    entryType: 'shore',
    waterType: 'salt',
    surf: 'calm',
    maxDepth: 20,
    visibility: 10,
    waterTemperature: 26,
  })),
  calculateBottomTime: jest.fn(() => 50),
  calculatePressureUsed: jest.fn(() => 150),
  formatStartTime: jest.fn(() => '10:00 AM'),
}));

jest.mock('../helpers/userDataHelpers', () => ({
  getDisplayName: jest.fn(() => Promise.resolve('Test User')),
  getProfilePicture: jest.fn(() => Promise.resolve('https://example.com/profile_picture.jpg')),
}));

describe('DiveItem', () => {
  const diveId = 'testDiveId';

  it('renders correctly', async () => {
    const { toJSON } = render(<DiveItem diveId={diveId} />);
    await waitFor(() => expect(toJSON()).toMatchSnapshot());
  });
});
