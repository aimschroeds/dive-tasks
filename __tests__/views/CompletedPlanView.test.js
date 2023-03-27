import React from 'react';
import { render } from '@testing-library/react-native';

import CompletedPlanView from '../../components/CompletedPlanView';

jest.mock('../../components/PlanItem', () => {
  return () => <></>;
});

const createTestProps = (props) => ({
  route: {
    params: {
      planId: 'testPlanId',
    },
  },
  ...props,
});

describe('CompletedPlanView', () => {
  it('renders correctly', () => {
    const props = createTestProps();
    const { getByTestId } = render(<CompletedPlanView {...props} />);
    const container = getByTestId('container');

    expect(container).toBeTruthy();
  });
});
