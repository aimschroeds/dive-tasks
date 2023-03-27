import React from 'react';
import { render } from '@testing-library/react-native';
import CompletionCelebration from '../../components/CompletionCelebration';

describe('CompletionCelebration', () => {
  const user = 'John Doe';
  const plan = { title: 'Scuba Diving Plan' };

  it('renders correctly', () => {
    const { toJSON } = render(<CompletionCelebration user={user} plan={plan} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays the correct text', () => {
    const { getByText } = render(<CompletionCelebration user={user} plan={plan} />);
    expect(getByText(`Congratulations ${user} on completing your ${plan.title}!`)).toBeTruthy();
  });
});
