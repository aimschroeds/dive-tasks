import { getWeatherData, renderMilestoneIcon, calculateCompletionPercentage, formatScheduledDate } from '../helpers/milestoneHelpers';
import milestoneTypes from '../data/milestoneTypes';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mock axios for getWeatherData
const mock = new MockAdapter(axios);

// Test getWeatherData
describe('getWeatherData', () => {
  it('returns forecast data', async () => {
    const latitude = 40.7128;
    const longitude = 74.0060;
    const timestamp = Date.now();
    const mockData = { data: { message: 'Mock data' } };

    mock.onGet().reply(200, mockData);

    const result = await getWeatherData(latitude, longitude, timestamp);
    expect(result).toEqual(mockData);
  });

  it('returns null on error', async () => {
    mock.onGet().networkError();

    const result = await getWeatherData(0, 0, 0);
    expect(result).toBeNull();
  });
});

// Test renderMilestoneIcon
describe('renderMilestoneIcon', () => {
  it('returns the correct icon', () => {
    const milestoneType = milestoneTypes[0].type;
    const icon = renderMilestoneIcon(milestoneType);
    expect(icon).toBe(milestoneTypes[0].icon);
  });

  it('returns default icon for unknown type', () => {
    const icon = renderMilestoneIcon('unknown');
    expect(icon).toBe('help-circle');
  });
});

// Test calculateCompletionPercentage
describe('calculateCompletionPercentage', () => {
  it('calculates the correct percentage', () => {
    const milestones = [
      { status: true },
      { status: true },
      { status: false },
      { status: false },
      { status: true },
    ];

    const percentage = calculateCompletionPercentage(milestones);
    expect(percentage).toBe(60);
  });

  it('returns 0 for empty milestones array', () => {
    const percentage = calculateCompletionPercentage([]);
    expect(percentage).toBe(0);
  });
});

// Test formatScheduledDate
describe('formatScheduledDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2023-04-05T15:30:00');
    const formattedDate = formatScheduledDate(date);
    expect(formattedDate).toBe('Apr 5, 2023 15:30');
  });

  it('returns "Schedule" for invalid date', () => {
    const formattedDate = formatScheduledDate('invalid date');
    expect(formattedDate).toBe('Schedule');
  });
});
