import * as RN from 'react-native';

export * from 'react-native';

export const Alert = {
  ...RN.Alert,
  alert: jest.fn(),
};
