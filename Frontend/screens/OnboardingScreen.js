import React from 'react';
import { Image, StyleSheet, Dimensions, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation, route }) => {
  
  const setIsFirstLaunch = route.params?.setIsFirstLaunch;

  if (!setIsFirstLaunch) {
    console.warn('setIsFirstLaunch is not defined');
    return null; // or handle this case appropriately
  }

  const handleDone = () => {
    setIsFirstLaunch(false);
    navigation.navigate('UserDetails');
  };

  const NextButton = ({ ...props }) => (
    <Text style={[styles.buttonText, styles.nextButton]} {...props}>Next</Text>
  );

  const SkipButton = ({ ...props }) => (
    <Text style={[styles.buttonText, styles.skipButton]} {...props}>Skip</Text>
  );

  const DoneButton = ({ ...props }) => (
    <Text style={[styles.buttonText, styles.nextButton]} {...props}>Done</Text>
  );

  return (
    <Onboarding
      pages={[
        {
          image: <Image source={require('../assets/image1.png')} style={styles.image} />,
        },
        {
          image: <Image source={require('../assets/image2.png')} style={styles.image} />,
        },
        {
          image: <Image source={require('../assets/onboarding3.png')} style={styles.image} />,
        },
      ]}
      onSkip={handleDone}
      onDone={handleDone}
      NextButtonComponent={NextButton}
      SkipButtonComponent={SkipButton}
      DoneButtonComponent={DoneButton}
      bottomBarHighlight={false}
      bottomBarColor="black"
      containerStyles={styles.container}
      imageContainerStyles={styles.imageContainer}
      bottomBarStyle={styles.bottomBar}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width,
    height,
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  bottomBar: {
    backgroundColor: 'black',
    paddingVertical: 20,
  },
  buttonText: {
    fontFamily: 'Inter', 
    fontSize: 16,
    color: 'white',
  },
  nextButton: {
    marginRight: 20,
  },
  skipButton: {
    marginLeft: 20,
  },
});

export default OnboardingScreen;