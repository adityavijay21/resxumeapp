// PersonalInfoScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title, useTheme, HelperText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PersonalInfoScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [errors, setErrors] = useState({});

  const theme = useTheme();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(phone);
  };

  const validateInputs = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(phone)) newErrors.phone = "Invalid phone number format";
    if (!address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateInputs()) {
      navigation.navigate('Education', { personal: { name, email, phone, address, linkedin } });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Personal Information</Title>
      
      <TextInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        left={<TextInput.Icon icon={() => <Icon name="account" size={24} color={theme.colors.primary} />} />}
        error={!!errors.name}
      />
      <HelperText type="error" visible={!!errors.name}>
        {errors.name}
      </HelperText>
      
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        left={<TextInput.Icon icon={() => <Icon name="email" size={24} color={theme.colors.primary} />} />}
        error={!!errors.email}
      />
      <HelperText type="error" visible={!!errors.email}>
        {errors.email}
      </HelperText>
      
      <TextInput
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
        left={<TextInput.Icon icon={() => <Icon name="phone" size={24} color={theme.colors.primary} />} />}
        error={!!errors.phone}
      />
      <HelperText type="error" visible={!!errors.phone}>
        {errors.phone}
      </HelperText>
      
      <TextInput
        label="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
        left={<TextInput.Icon icon={() => <Icon name="home" size={24} color={theme.colors.primary} />} />}
        error={!!errors.address}
      />
      <HelperText type="error" visible={!!errors.address}>
        {errors.address}
      </HelperText>
      
      <TextInput
        label="LinkedIn Profile (optional)"
        value={linkedin}
        onChangeText={setLinkedin}
        style={styles.input}
        left={<TextInput.Icon icon={() => <Icon name="linkedin" size={24} color={theme.colors.primary} />} />}
      />
      
      <Button 
        mode="contained" 
        onPress={handleNext} 
        style={styles.button}
        icon={() => <Icon name="arrow-right" size={20} color="white" />}
      >
        Next
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    marginBottom: 5,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
    backgroundColor: '#000000',
  },
});

export default PersonalInfoScreen;