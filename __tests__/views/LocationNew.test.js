import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LocationNew from '../components/LocationNew';

describe('LocationNew', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<LocationNew />);
    expect(getByText('Back')).not.toBeNull();
    expect(getByText('Drag the pin to your planned location')).not.toBeNull();
    expect(getByPlaceholderText('Location Name')).not.toBeNull();
    expect(getByText('Add')).not.toBeNull();
  });

  test('adds location', () => {
    const onClose = jest.fn();
    const onSelectLocation = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <LocationNew onClose={onClose} onSelectLocation={onSelectLocation} />
    );
    const locationNameInput = getByPlaceholderText('Location Name');
    fireEvent.changeText(locationNameInput, 'Test Location');
    fireEvent.press(getByText('Add'));
    expect(onSelectLocation).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
