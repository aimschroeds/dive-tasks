import React from 'react';
import { View, StyleSheet } from 'react-native';
import PlanItem from '../components/PlanItem';

const CompletedPlanView = ({ route }) => {
  const { planId } = route.params;

  return (
    <View style={styles.container}>
      <PlanItem planId={planId} />
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

export default CompletedPlanView;
