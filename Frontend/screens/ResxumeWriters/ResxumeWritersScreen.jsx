import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ResxumeWriterCard from './ResxumewriterCard';

const API_URL = 'https://resxumeapp.onrender.com';

const ResxumeWritersScreen = () => {
  const [resxumeWriters, setResxumeWriters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResxumeWriters();
  }, []);

  const fetchResxumeWriters = async () => {
    try {
      const response = await fetch(`${API_URL}/api/ResxumeWriters`);
      const data = await response.json();
      setResxumeWriters(data);
    } catch (error) {
      console.error('Error fetching ResxumeWriters:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Resume Writers</Text>
      <FlatList
        data={resxumeWriters}
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
    padding: 16,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
    marginTop: 25,
  },
});

export default ResxumeWritersScreen;