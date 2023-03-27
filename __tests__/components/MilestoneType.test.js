import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import MilestoneType from '../../components/MilestoneType';

const defaultProps = {
  milestoneType: null,
  setMilestoneType: jest.fn(),
};

describe('MilestoneType', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the MilestoneType component', () => {
    const { getByText } = render(<MilestoneType {...defaultProps} />);

    const label = getByText('Hike');
    expect(label).toBeTruthy();
  });

  it('should call setMilestoneType with the correct type when a type is pressed', () => {
    const { getByText } = render(<MilestoneType {...defaultProps} />);

    const label = getByText('Hike');
    fireEvent.press(label);

    expect(defaultProps.setMilestoneType).toHaveBeenCalledWith('hike');
  });

});
