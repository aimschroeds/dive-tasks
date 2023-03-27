import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

import Plan from '../../components/Plan';
import * as planHelpers from '../../helpers/planHelpers';
import * as userDataHelpers from '../../helpers/userDataHelpers';

jest.mock('../../helpers/planHelpers');
jest.mock('../../helpers/userDataHelpers');

const defaultProps = {
  planId: 'samplePlanId',
};

const mockPlan = {
  userId: 'sampleUserId',
  title: 'Sample Plan',
  milestones: [
    {
      name: 'Milestone 1',
      status: true,
      type: 'default',
      skills: [
        {
          name: 'Skill 1',
          status: true,
        },
      ],
    },
  ],
};

planHelpers.getPlanData.mockResolvedValue(mockPlan);
userDataHelpers.getDisplayName.mockResolvedValue('Sample User');
userDataHelpers.getProfilePicture.mockResolvedValue('https://example.com/profile.jpg');

describe('Plan', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Plan component with proper data', async () => {
    const { getByText, getByTestId } = render(<Plan {...defaultProps} />);

    // Verify that the ActivityIndicator is displayed initially
    const activityIndicator = getByTestId('plan-loading-indicator');
    expect(activityIndicator).toBeTruthy();

    // Wait for the data to be loaded
    await waitFor(() => getByText('Sample User'));

    // Verify that the Plan component is displayed with the correct data
    const displayName = getByText('Sample User');
    const planTitle = getByText('Sample Plan');
    const milestoneName = getByText('Milestone 1');
    const skillName = getByText('Skill 1');

    expect(displayName).toBeTruthy();
    expect(planTitle).toBeTruthy();
    expect(milestoneName).toBeTruthy();
    expect(skillName).toBeTruthy();
  });

});
