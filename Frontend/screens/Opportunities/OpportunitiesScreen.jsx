import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TextInput, Text, ActivityIndicator } from 'react-native';
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
        placeholder="Search opportunities..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredOpportunities}
          renderItem={({ item }) => <OpportunityCard opportunity={item} />}
          keyExtractor={item => item.id.toString()}
          refreshing={loading}
          onRefresh={fetchOpportunities}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 40,
    marginBottom: 20,
    color: '#000',
  },
  searchBar: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
  },
  listContainer: {
    paddingBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OpportunitiesScreen;