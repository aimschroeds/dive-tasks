import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '@testing-library/react-native';

import Skills from '../../components/Skills';

const defaultProps = {
  skills: [
    {
      skill: 'Sample Skill 1',
      status: 'complete',
    },
    {
      skill: 'Sample Skill 2',
      status: 'incomplete',
    },
  ],
  milestoneIndex: 0,
  toggleSkillStatus: jest.fn(),
};

describe('Skills', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Skills component with the provided skills', () => {
    const { getByText } = render(<Skills {...defaultProps} />);

    const skill1 = getByText('Sample Skill 1');
    const skill2 = getByText('Sample Skill 2');

    expect(skill1).toBeTruthy();
    expect(skill2).toBeTruthy();
  });

  it('should call the toggleSkillStatus function when a checkbox is pressed', () => {
    const { getAllByRole } = render(<Skills {...defaultProps} />);
    const checkBoxes = getAllByRole('checkbox');

    fireEvent.press(checkBoxes[0]);
    expect(defaultProps.toggleSkillStatus).toHaveBeenCalledWith(0, 0);

    fireEvent.press(checkBoxes[1]);
    expect(defaultProps.toggleSkillStatus).toHaveBeenCalledWith(0, 1);
  });

});
