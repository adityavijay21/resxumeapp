import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const EducationScreen = ({ navigation, route }) => {
  const [degree, setDegree] = React.useState('');
  const [school, setSchool] = React.useState('');

  const handleNext = () => {
    const { personal } = route.params;
    navigation.navigate('Experience', { 
      personal,
      education: { degree, school }
    });
  };

  return (
    <View>
      <TextInput label="Degree" value={degree} onChangeText={setDegree} />
      <TextInput label="School" value={school} onChangeText={setSchool} />
      <Button onPress={handleNext}>Next</Button>
    </View>
  );
};

export default EducationScreen;