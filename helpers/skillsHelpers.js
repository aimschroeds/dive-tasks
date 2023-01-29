export const renderSkills = (skills, milestoneIndex, toggleSkillStatus) => {
    if (!skills || skills.length === 0) {
      return null;
    }
  
    return skills.map((item, index) => (
      <View key={index} style={Styles.skillItemContainer}>
        <CheckBox
          title=""
          checked={item.status === "complete"}
          onPress={() => toggleSkillStatus(milestoneIndex, index)}
          containerStyle={Styles.skillCheckbox}
          checkedColor="#AA77FF"
          uncheckedColor="#AA77FF"
        />
        <Text style={Styles.skillName}>{item.skill}</Text>
      </View>
    ));
  };
  
  export const areAllSkillsComplete = (skills) => {
    return skills.every((skill) => skill.status === "complete");
  };