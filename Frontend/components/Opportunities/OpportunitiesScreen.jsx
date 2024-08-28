import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TextInput, Text} from 'react-native';
import OpportunityCard from './OpportunityCard';
// const API_URL = 'http://10.0.2.2:3000/';
const API_URL = 'https://resxumeapp.onrender.com';

const OpportunitiesScreen = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOpportunities();
  }, []);

  useEffect(() => {
    const filtered = opportunities.filter(opportunity =>
      opportunity.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOpportunities(filtered);
  }, [searchQuery, opportunities]);

  const fetchOpportunities = async () => {
    try {
      const response = await fetch(`${API_URL}/api/opportunities`);
      const data = await response.json();
      setOpportunities(data);
      setFilteredOpportunities(data);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Opportunities</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Opportunities..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredOpportunities}
        renderItem={({ item }) => <OpportunityCard opportunity={item} />}
        keyExtractor={item => item.id.toString()}
        refreshing={loading}
        onRefresh={fetchOpportunities}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 10,
  },
  heading: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 60,
    marginBottom: 20,
    color: '#333',
  },
  searchBar: {
    height: 40,
    borderColor: '#ADB5BD',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default OpportunitiesScreen;