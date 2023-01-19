import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics';

const CompletionCelebration = ({ user, plan }) => {
   // Trigger haptic feedback when the screen is shown
  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, []);

  const WhaleAnimation = () => {
    return (
      <Animatable.Image
        source={require('../assets/whale.png')}
        // Attribution link/details: <a href="https://www.freepik.com/free-vector/cute-whale-swimming-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_24331468.htm#query=whaleshark%20cartoon&position=10&from_view=search&track=ais">Image by catalyststuff</a> on Freepik
        animation={{
          1: {
            translateX: -150,
            translateY: 0,
          },
          0.5: {
            translateY: -50,
          },
          0: {
            translateX: 300,
            translateY: 0,
          },
        }}
        duration={5000}
        iterationCount="infinite"
        easing="linear"
        style={styles.shark}
      />
    );
  };

  const BubbleAnimation = ({ x, y, size, duration }) => {
    return (
      <Animatable.Image
        source={require('../assets/bubble.png')}
        animation={{
          from: { translateY: y + size },
          to: { translateY: y - size * 3 },
        }}
        duration={duration}
        iterationCount="infinite"
        easing="linear"
        style={[styles.bubble, { left: x, top: y, width: size, height: size }]}
      />
    );
  };

  const bubbles = Array.from({ length: 10 }, () => ({
    x: Math.random() * 300,
    y: Math.random() * 500,
    size: Math.random() * 40 + 5,
    duration: Math.random() * 6000 + 2000,
  }));

  return (
    <View style={styles.container}>
      {bubbles.map((bubble, index) => (
        <BubbleAnimation key={index} {...bubble} />
      ))}
      <Text style={styles.congratulationsText}>
        Congratulations {user} on completing your {plan.title}!
      </Text>
      <WhaleAnimation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratulationsText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 50,
  },
  shark: {
    width: 150,
    height: 100,
  },
  bubble: {
    position: 'absolute',
  },
});

export default CompletionCelebration;
