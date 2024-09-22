import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const OpportunityCard = ({ opportunity }) => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  const handlePress = () => {
    navigation.navigate('OpportunityDetail', { opportunity });
  };

  const handleApply = () => {
    navigation.navigate('OpportunityDetail', { opportunity });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#f0f0f0']}
        style={[styles.card, { width: screenWidth - 32 }]}
      >
        <CardHeader opportunity={opportunity} />
        <CardDetails opportunity={opportunity} />
        <CardDescription description={opportunity.description} />
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <LinearGradient
            colors={['#000000', '#333333']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.applyButtonGradient}
          >
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const CardHeader = ({ opportunity }) => (
  <View style={styles.header}>
    <Image source={{ uri: opportunity.logoUrl }} style={styles.logo} />
    <View style={styles.headerText}>
      <Text style={styles.position}>{opportunity.position}</Text>
      <Text style={styles.companyName}>{opportunity.companyName}</Text>
    </View>
  </View>
);

const CardDetails = ({ opportunity }) => (
  <View style={styles.details}>
    <DetailItem icon="location-on" text={opportunity.location} />
    <DetailItem icon="attach-money" text={opportunity.salary} />
    <DetailItem icon="access-time" text={`Posted: ${opportunity.postedDate}`} />
  </View>
);

const CardDescription = ({ description }) => (
  <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
    {description}
  </Text>
);

const DetailItem = ({ icon, text }) => (
  <View style={styles.detailItem}>
    <MaterialIcons name={icon} size={16} color="#555" />
    <Text style={styles.detailText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  position: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  companyName: {
    fontSize: 14,
    color: '#555',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
    lineHeight: 20,
  },
  applyButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  applyButtonGradient: {
    padding: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OpportunityCard;