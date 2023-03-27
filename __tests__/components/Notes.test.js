import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Notes from '../../components/Notes';

const defaultProps = {
  notes: 'Sample note',
  updateNotes: jest.fn(),
};

describe('Notes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Notes component', () => {
    const { getByText } = render(<Notes {...defaultProps} />);

    const notesTitle = getByText('Notes:');
    expect(notesTitle).toBeTruthy();
  });

  it('should call updateNotes with the updated notes when onBlur event is triggered', () => {
    const { getByTestId } = render(<Notes {...defaultProps} />);
    const input = getByTestId('notes-input');

    fireEvent.changeText(input, 'Updated note');
    fireEvent.blur(input);

    expect(defaultProps.updateNotes).toHaveBeenCalledWith('Updated note');
  });

});
