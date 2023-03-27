import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import MilestoneAdd from '../../components/MilestoneAdd';

const defaultProps = {
  milestone: {
    name: '',
    status: false,
    type: null,
    skills: [],
  },
  setMilestone: jest.fn(),
  index: 0,
  deleteMilestone: jest.fn(),
};

describe('MilestoneAdd', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the MilestoneAdd component', () => {
    const { getByPlaceholderText } = render(<MilestoneAdd {...defaultProps} />);

    const milestoneNameInput = getByPlaceholderText('Name of Milestone');
    expect(milestoneNameInput).toBeTruthy();
  });

  it('should update milestone name when TextInput is changed', () => {
    const { getByPlaceholderText } = render(<MilestoneAdd {...defaultProps} />);

    const milestoneNameInput = getByPlaceholderText('Name of Milestone');
    fireEvent.changeText(milestoneNameInput, 'Test Milestone');

    expect(defaultProps.setMilestone).toHaveBeenCalledWith({
      name: 'Test Milestone',
      status: false,
      type: null,
      skills: [],
    });
  });

});
