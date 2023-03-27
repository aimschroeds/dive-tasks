import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '@testing-library/react-native';

import SkillsAdd from '../../components/SkillsAdd';

const defaultProps = {
  skills: [
    { skill: 'Sample Skill 1', status: false },
    { skill: 'Sample Skill 2', status: false },
  ],
  setSkills: jest.fn(),
};

describe('SkillsAdd', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the SkillsAdd component', () => {
    const { getByPlaceholderText, getByText } = render(<SkillsAdd {...defaultProps} />);

    const input = getByPlaceholderText('Skill');
    const addButton = getByText('Add');

    expect(input).toBeTruthy();
    expect(addButton).toBeTruthy();
  });

  it('should call the setSkills function when adding a new skill', () => {
    const { getByPlaceholderText, getByText } = render(<SkillsAdd {...defaultProps} />);
    const input = getByPlaceholderText('Skill');
    const addButton = getByText('Add');

    fireEvent.changeText(input, 'Sample Skill 3');
    fireEvent.press(addButton);

    expect(defaultProps.setSkills).toHaveBeenCalledWith([
      ...defaultProps.skills,
      { skill: 'Sample Skill 3', status: false },
    ]);
  });

  it('should call the setSkills function when deleting a skill', () => {
    const { getAllByRole } = render(<SkillsAdd {...defaultProps} />);
    const deleteButtons = getAllByRole('button');

    fireEvent.press(deleteButtons[0]);

    expect(defaultProps.setSkills).toHaveBeenCalledWith([
      { skill: 'Sample Skill 2', status: false },
    ]);
  });

});
