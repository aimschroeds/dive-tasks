import { renderSkills, areAllSkillsComplete } from '../../helpers/skillsHelpers';

describe('renderSkills', () => {
  const skills = [
    { skill: 'Skill 1', status: 'incomplete' },
    { skill: 'Skill 2', status: 'complete' },
    { skill: 'Skill 3', status: 'incomplete' },
  ];
  const milestoneIndex = 0;
  const toggleSkillStatus = jest.fn();

  test('renders a skill item for each item in the skills array', () => {
    const renderedSkills = renderSkills(skills, milestoneIndex, toggleSkillStatus);
    expect(renderedSkills).toHaveLength(skills.length);
  });

  test('renders null if skills array is empty', () => {
    const renderedSkills = renderSkills([], milestoneIndex, toggleSkillStatus);
    expect(renderedSkills).toBeNull();
  });

  test('calls toggleSkillStatus when checkbox is pressed', () => {
    const renderedSkills = renderSkills(skills, milestoneIndex, toggleSkillStatus);
    renderedSkills[0].props.onPress();
    expect(toggleSkillStatus).toHaveBeenCalledWith(milestoneIndex, 0);
  });
});

describe('areAllSkillsComplete', () => {
  test('returns true when all skills are complete', () => {
    const skills = [
      { skill: 'Skill 1', status: 'complete' },
      { skill: 'Skill 2', status: 'complete' },
      { skill: 'Skill 3', status: 'complete' },
    ];
    const allComplete = areAllSkillsComplete(skills);
    expect(allComplete).toBeTruthy();
  });

  test('returns false when at least one skill is incomplete', () => {
    const skills = [
      { skill: 'Skill 1', status: 'complete' },
      { skill: 'Skill 2', status: 'incomplete' },
      { skill: 'Skill 3', status: 'complete' },
    ];
    const allComplete = areAllSkillsComplete(skills);
    expect(allComplete).toBeFalsy();
  });

  test('returns true when skills array is empty', () => {
    const allComplete = areAllSkillsComplete([]);
    expect(allComplete).toBeTruthy();
  });
});
