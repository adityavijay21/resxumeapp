import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TextInput, Text } from 'react-native';
import ResxumeWriterCard from './ResxumewriterCard';

const API_URL = 'https://resxumeapp.onrender.com';
// const API_URL = 'http://10.0.2.2:3000/';

const ResxumeWritersScreen = () => {
  const [ResxumeWriters, setResxumeWriters] = useState([]);
  const [filteredResxumeWriters, setFilteredResxumeWriters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchResxumeWriters();
  }, []);

  const fetchResxumeWriters = async () => {
    try {
      const response = await fetch(`${API_URL}/api/ResxumeWriters`);
      const data = await response.json();
      setResxumeWriters(data);
      setFilteredResxumeWriters(data);
    } catch (error) {
      console.error('Error fetching ResxumeWriters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    const filteredData = ResxumeWriters.filter((item) => {
      const itemName = item.name.toLowerCase();
      const queryName = text.toLowerCase();
      return itemName.includes(queryName);
    });
    setFilteredResxumeWriters(filteredData);
    setSearchQuery(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Resxume Writers</Text>
      {/* <TextInput
        style={styles.searchBar}
        placeholder="Search ResxumeWriters..."
        value={searchQuery}
        onChangeText={handleSearch}
      /> */}
      <FlatList
        data={filteredResxumeWriters}
        renderItem={({ item }) => <ResxumeWriterCard resxumewriter={item} />}
        keyExtractor={item => item.id.toString()}
        refreshing={loading}
        onRefresh={fetchResxumeWriters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  heading: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
    marginTop: 25,
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

export default ResxumeWritersScreen;