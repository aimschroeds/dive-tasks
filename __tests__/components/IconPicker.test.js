import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IconPicker from '../../components/IconPicker';

const options = [
  { value: 'option1', label: 'Option 1', icon: 'alpha-a' },
  { value: 'option2', label: 'Option 2', icon: 'alpha-b' },
  { value: 'option3', label: 'Option 3', icon: 'alpha-c' },
];

describe('IconPicker', () => {
  it('renders correctly', () => {
    const { getByText } = render(<IconPicker options={options} />);
    options.forEach((option) => {
      expect(getByText(option.label)).toBeDefined();
    });
  });

  it('triggers onValueChange with the correct value on button press', () => {
    const onValueChangeMock = jest.fn();
    const { getByText } = render(
      <IconPicker options={options} onValueChange={onValueChangeMock} />
    );

    fireEvent.press(getByText(options[1].label));
    expect(onValueChangeMock).toHaveBeenCalledWith(options[1].value);
  });
});
