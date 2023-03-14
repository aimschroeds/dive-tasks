import React from 'react';
import { View, StyleSheet } from 'react-native';
import DiveItem from '../components/DiveItem';

const DiveView = ({ route }) => {
  const { diveId } = route.params;
  console.log('DiveView: ', diveId);

  return (
    <View style={styles.container}>
      <DiveItem diveId={diveId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default DiveView;
