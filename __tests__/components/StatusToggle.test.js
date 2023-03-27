import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '@testing-library/react-native';

import StatusToggle from '../../components/StatusToggle';

const defaultProps = {
  milestoneStatus: false,
  setMilestoneStatus: jest.fn(),
};

describe('StatusToggle', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the StatusToggle component', () => {
    const { getByText } = render(<StatusToggle {...defaultProps} />);

    const notCompletedButton = getByText('Not Completed');
    const completedButton = getByText('Completed');

    expect(notCompletedButton).toBeTruthy();
    expect(completedButton).toBeTruthy();
  });

  it('should call the setMilestoneStatus function when changing the status', () => {
    const { getByText } = render(<StatusToggle {...defaultProps} />);
    const notCompletedButton = getByText('Not Completed');
    const completedButton = getByText('Completed');

    fireEvent.press(completedButton);
    expect(defaultProps.setMilestoneStatus).toHaveBeenCalledWith(true);

    fireEvent.press(notCompletedButton);
    expect(defaultProps.setMilestoneStatus).toHaveBeenCalledWith(false);
  });

});
