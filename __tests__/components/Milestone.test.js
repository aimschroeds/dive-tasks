import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Milestone from '../../components/Milestone';

jest.mock('../../helpers/milestoneHelpers', () => {
  return {
    formatScheduledDate: jest.fn(() => 'No Date'),
    getWeatherData: jest.fn(() => Promise.resolve({ list: [] })),
  };
});

const defaultProps = {
  item: {
    name: 'Test Milestone',
    status: false,
    skills: [],
  },
  index: 0,
  toggleMilestoneStatus: jest.fn(),
  renderMilestoneIcon: jest.fn(() => 'star'),
  toggleSkillStatus: jest.fn(),
  locationSelectionVisible: jest.fn(),
  onSchedule: jest.fn(),
};

describe('Milestone', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Milestone component', () => {
    const { getByText } = render(<Milestone {...defaultProps} />);

    const milestoneName = getByText('Test Milestone');
    expect(milestoneName).toBeTruthy();
  });

  it('should call toggleMilestoneStatus when CheckBox is pressed', () => {
    const { getByA11yRole } = render(<Milestone {...defaultProps} />);

    const checkBox = getByA11yRole('checkbox');
    fireEvent.press(checkBox);

    expect(defaultProps.toggleMilestoneStatus).toHaveBeenCalledWith(0);
  });
});
