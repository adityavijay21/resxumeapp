import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const OpportunityDetailScreen = ({ route }) => {
  const { opportunity } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: opportunity.logoUrl }} style={styles.logo} />
      <Text style={styles.companyName}>{opportunity.companyName}</Text>
      <Text style={styles.position}>{opportunity.position}</Text>
      <Text style={styles.location}>{opportunity.location}</Text>
      <Text style={styles.salary}>{opportunity.salary}</Text>
      <Text style={styles.postedDate}>Posted: {opportunity.postedDate}</Text>
      <Text style={styles.description}>{opportunity.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFEFEF',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  position: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  salary: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 5,
  },
  postedDate: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default OpportunityDetailScreen;
