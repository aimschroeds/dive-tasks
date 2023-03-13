import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const IconPicker = ({ options, selectedValue, onValueChange }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.iconContainer}
          onPress={() => onValueChange(option.value)}
        >
          <MaterialCommunityIcons
            name={option.icon}
            size={32}
            color={selectedValue === option.value ? '#AA77FF' : 'gray'}
          />
          <Text>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
});

export default IconPicker;
