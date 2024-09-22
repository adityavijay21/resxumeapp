import React, { useCallback } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation, route }) => {
  const setIsFirstLaunch = route.params?.setIsFirstLaunch;

  if (!setIsFirstLaunch) {
    console.warn('setIsFirstLaunch is not defined');
    return null;
  }

  const handleDone = useCallback(() => {
    setIsFirstLaunch(false);
    navigation.navigate('UserDetails');
  }, [setIsFirstLaunch, navigation]);

  const AnimatedIcon = ({ name, delay }) => {
    const animatedValue = new Animated.Value(0);

    React.useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

    const scale = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.2],
    });

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <MaterialIcons name={name} size={80} color="white" />
      </Animated.View>
    );
  };

  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#4A90E2',
          image: <AnimatedIcon name="description" delay={0} />,
          title: 'Build Your Resume',
          subtitle: 'Create a professional resume with our easy-to-use builder',
        },
        {
          backgroundColor: '#50C878',
          image: <AnimatedIcon name="style" delay={500} />,
          title: 'Choose Templates',
          subtitle: 'Select from a variety of modern resume templates',
        },
        {
          backgroundColor: '#FF6B6B',
          image: <AnimatedIcon name="work" delay={1000} />,
          title: 'Find Opportunities',
          subtitle: 'Connect with top employers and freelance projects',
        },
        {
          backgroundColor: '#FFD700',
          image: <AnimatedIcon name="person" delay={1500} />,
          title: 'Hire Resume Writers',
          subtitle: 'Get expert help to perfect your resume',
        },
      ]}
      onSkip={handleDone}
      onDone={handleDone}
      bottomBarHighlight={false}
      containerStyles={styles.container}
      imageContainerStyles={styles.imageContainer}
      bottomBarStyle={styles.bottomBar}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width,
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    backgroundColor: 'transparent',
    paddingVertical: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default OnboardingScreen;