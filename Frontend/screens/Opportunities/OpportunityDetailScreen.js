import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const OpportunityDetailScreen = ({ route }) => {
  const { opportunity } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: opportunity.logoUrl }} style={styles.logo} />
      <Text style={styles.companyName}>{opportunity.companyName}</Text>
      <Text style={styles.position}>{opportunity.position}</Text>
      <View style={styles.detailsContainer}>
        <DetailItem icon="location-on" text={opportunity.location} />
        <DetailItem icon="attach-money" text={opportunity.salary} />
        <DetailItem icon="access-time" text={`Posted: ${opportunity.postedDate}`} />
      </View>
      <Text style={styles.sectionTitle}>Job Description</Text>
      <Text style={styles.description}>{opportunity.description}</Text>
    </ScrollView>
  );
};

const DetailItem = ({ icon, text }) => (
  <View style={styles.detailItem}>
    <MaterialIcons name={icon} size={18} color="#000" />
    <Text style={styles.detailText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
  companyName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#000000',
  },
  position: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000000',
  },
  detailsContainer: {
    marginBottom: 24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#000000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#000000',
  },
});

export default OpportunityDetailScreen;
