import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ResxumeWriterDetailScreen = ({ route }) => {
  const { resxumewriter } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Image source={{ uri: resxumewriter.image }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{resxumewriter.name}</Text>
          <Text style={styles.specialization}>{resxumewriter.currentCompany}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{resxumewriter.reviews}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{resxumewriter.specialization}</Text>
          <Text style={styles.statLabel}>Specialization</Text>
        </View>
      </View>
      <Text style={styles.description}>{resxumewriter.description}</Text>
      <View style={styles.testimonials}>
        <Text style={styles.testimonialTitle}>What clients say</Text>
        {testimonials.map((testimonial, index) => (
          <View key={index} style={styles.testimonialContainer}>
            <Text style={styles.testimonialText}>{testimonial}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.hireButton}>
        <Text style={styles.hireButtonText}>Hire {resxumewriter.name}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const testimonials = [
  `"I was impressed with the quality of work and the professionalism of {name}. I would highly recommend them to anyone looking for a top-notch writer." - Aditya Vijay`,
  `"I was blown away by the speed and accuracy of {name}'s work. They truly exceeded my expectations." - Vidhan Bhai`,
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFEF',
  },
  contentContainer: {
    padding: 24,
    marginTop: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginRight: 24,
    borderColor: '#ddd',
    borderWidth: 2,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  specialization: {
    fontSize: 18,
    color: '#666',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  statLabel: {
    fontSize: 16,
    color: '#999',
  },
  description: {
    fontSize: 18,
    lineHeight: 28,
    color: '#666',
    marginBottom: 48,
  },
  testimonials: {
    marginBottom: 48,
  },
  testimonialTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  testimonialContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  testimonialText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 8,
  },
  hireButton: {
    backgroundColor: 'black',
    padding: 18,
    borderRadius: 6,
    alignItems: 'center',
  },
  hireButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default ResxumeWriterDetailScreen;