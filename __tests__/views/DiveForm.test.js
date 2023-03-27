import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import DiveForm from '../../views/DiveForm';
import '@testing-library/jest-native/extend-expect';

describe('DiveForm', () => {
    test('renders the DiveForm component correctly', () => {
      const { getByPlaceholderText } = render(<DiveForm />);
  
      expect(getByPlaceholderText('Start Pressure (bar)')).toBeTruthy();
      expect(getByPlaceholderText('End Pressure (bar)')).toBeTruthy();
      expect(getByPlaceholderText('Max Depth (m)')).toBeTruthy();
      expect(getByPlaceholderText('Water Temperature (C)')).toBeTruthy();
      expect(getByPlaceholderText('Visibility (m)')).toBeTruthy();
    });
  
    test('handles metric/imperial switch', async () => {
      const { getByText, getByPlaceholderText } = render(<DiveForm />);
  
      const switchElement = getByText('Metric');
      await act(async () => {
        fireEvent(switchElement, 'onValueChange', false);
      });
  
      expect(getByPlaceholderText('Start Pressure (psi)')).toBeTruthy();
      expect(getByPlaceholderText('End Pressure (psi)')).toBeTruthy();
      expect(getByPlaceholderText('Max Depth (ft)')).toBeTruthy();
      expect(getByPlaceholderText('Water Temperature (F)')).toBeTruthy();
      expect(getByPlaceholderText('Visibility (ft)')).toBeTruthy();
    });
  
  });
  