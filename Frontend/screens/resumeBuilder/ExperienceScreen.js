import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const ExperienceScreen = ({ navigation, route }) => {
  const [company, setCompany] = React.useState('');
  const [position, setPosition] = React.useState('');

  const handleNext = () => {
    const { personal, education } = route.params;
    navigation.navigate('GenerateResume', { 
      personal,
      education,
      experience: { company, position }
    });
  };

  return (
    <View>
      <TextInput label="Company" value={company} onChangeText={setCompany} />
      <TextInput label="Position" value={position} onChangeText={setPosition} />
      <Button onPress={handleNext}>Generate Resume</Button>
    </View>
  );
};

export default ExperienceScreen;
