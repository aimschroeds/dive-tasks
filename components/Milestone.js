import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import Styles from '../styles/Styles';
import Skills from './Skills';

const Milestone = ({ item, index, toggleMilestoneStatus, renderMilestoneIcon, toggleSkillStatus, locationSelectionVisible }) => {

  return (
    <View style={Styles.milestoneItemContainer} key={index}>
      <View style={Styles.milestoneContent}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <CheckBox
            title=''
            checked={item.status}
            onPress={() => toggleMilestoneStatus(index)}
            containerStyle={Styles.milestoneCheckbox}
            checkedColor='#AA77FF'
            uncheckedColor='#AA77FF'
          />
          <View style={Styles.milestoneContent}>
            <Text style={Styles.milestoneName}>{item.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {item.geo ? (
                <TouchableOpacity onPress={() => locationSelectionVisible(true)}>
                <Text style={Styles.locationLabel}>
                  <MaterialCommunityIcons name='map-marker' size={16} color='white'/>
                  {item.geo.name}
                </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => locationSelectionVisible(true)}>
                  <Text style={{ color: '#AA77FF' }}>Select Location</Text>
                </TouchableOpacity>
              )}
            </View>
            <Skills skills={item.skills} milestoneIndex={index} toggleSkillStatus={toggleSkillStatus} />
          </View>
          <MaterialCommunityIcons
            name={renderMilestoneIcon(item.type)}
            size={24}
            color='#AA77FF'
            style={Styles.milestoneIcon}
          />
        </View>
      </View>
    </View>
  );
};

export default Milestone;
