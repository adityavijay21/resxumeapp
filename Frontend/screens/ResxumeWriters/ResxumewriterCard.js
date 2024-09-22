import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ResxumeWriterCard = ({ resxumewriter }) => {
  const navigation = useNavigation();

  const hireResxumeWriter = () => {
    if (resxumewriter.whatsapp) {
      const whatsappURL = `https://api.whatsapp.com/send?phone=91${resxumewriter.whatsapp}&text=Hello, I got your number from the official resxume app. I am seeking for a resume writing and came across your profile ${resxumewriter.name}. Are you interested to work together?`;
      Linking.openURL(whatsappURL);
    } else {
      Alert.alert("WhatsApp number not available");
    }
  };

  const handlePress = () => {
    navigation.navigate('ResxumeWritersDetail', { resxumewriter });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: resxumewriter.image }} style={styles.image} />
        <Text style={styles.rating}>{resxumewriter.rating} ⭐</Text>
        <Text style={styles.reviews}>({resxumewriter.reviews} reviews)</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{resxumewriter.name}</Text>
        <Text style={styles.subtitle}>{resxumewriter.currentCompany}</Text>
        <Text style={styles.subtitle}>• Experience of {resxumewriter.experience}+ years</Text>
        <Text style={styles.subtitle}>• Expertise in: {resxumewriter.specialization}</Text>
        <TouchableOpacity style={styles.button} onPress={hireResxumeWriter}>
          <Text style={styles.buttonText}>Hire {resxumewriter.name}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEFEF',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  imageContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 3,
    fontWeight: 'normal',
  },
  reviews: {
    fontSize: 12,
    color: '#666',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#081C15',
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#081C15',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ResxumeWriterCard;