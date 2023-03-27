import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DeleteMilestone from '../../components/DeleteMilestone'

describe('DeleteMilestone', () => {
  const deleteMilestone = jest.fn();

  it('renders correctly', () => {
    const { toJSON } = render(<DeleteMilestone deleteMilestone={deleteMilestone} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls deleteMilestone function when button is pressed', () => {
    const { getByText } = render(<DeleteMilestone deleteMilestone={deleteMilestone} />);
    fireEvent.press(getByText('Delete Milestone'));
    expect(deleteMilestone).toHaveBeenCalled();
  });
});
