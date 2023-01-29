import milestoneTypes from '../data/milestoneTypes';

export const renderMilestoneIcon = (_milestoneType) => {
  const milestone = milestoneTypes.find((item) => item.type === _milestoneType);
  if (milestone) {
    return milestone.icon;
  } else {
    return "help-circle"; // Default icon
  }
};

export const calculateCompletionPercentage = (milestones) => {
    const totalMilestones = milestones.length;
    const completedMilestones = milestones.filter((milestone) => milestone.status).length;
    return (completedMilestones / totalMilestones) * 100;
  };