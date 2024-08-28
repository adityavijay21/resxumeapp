import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const OpportunityCard = ({ opportunity }) => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  const handlePress = () => {
    navigation.navigate('OpportunityDetail', { opportunity });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={[styles.card, { width: screenWidth - 32 }]}>
        <View style={styles.header}>
          <Image source={{ uri: opportunity.logoUrl }} style={styles.logo} />
          <View style={styles.headerText}>
            <Text style={styles.position}>{opportunity.position}</Text>
            <Text style={styles.companyName}>{opportunity.companyName}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.details}>
          <DetailItem icon="location-on" text={opportunity.location} color="black" />
          <View style={{ height: 10 }} />
          <View style={styles.rowdetails}>
          <DetailItem icon="attach-money" text={opportunity.salary} color="black" />
          <DetailItem icon="access-time" text={`Posted: ${opportunity.postedDate}`} color="black" />
          </View>
        </View>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
          {opportunity.description}
        </Text>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const DetailItem = ({ icon, text, color }) => (
  <View style={styles.detailItem}>
    <MaterialIcons name={icon} size={16} color={color} />
    <Text style={[styles.detailText, { color }]}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderColor: 'black',
  },
  card: {
    backgroundColor: '#FFEFEF',
    borderRadius: 12,
    padding: 16,
    borderColor: 'black',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    color: '#212529',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    color: '#495057',
  },
  divider: {
    height: 1,
    backgroundColor: '#212529',
    marginVertical: 12,
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rowdetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  applyButton: {
    backgroundColor: '#212529',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#F8F9FA',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OpportunityCard;