import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const API_URL = 'https://resxumeapp.onrender.com/api/sliders';

const Slider = () => {
  const [greeting, setGreeting] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTimeOfDay = useCallback(() => {
    const currentHour = new Date().getHours();
    return currentHour < 12 ? 'Morning' : currentHour < 18 ? 'Afternoon' : 'Evening';
  }, []);

  const fetchSliderData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSliderData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setGreeting(`Good ${getTimeOfDay()},`);
    fetchSliderData();
  }, [getTimeOfDay, fetchSliderData]);

  const handlePress = useCallback((link) => {
    Linking.openURL(link || 'https://youtube.com').catch(() => {});
  }, []);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.link)}>
      <View style={styles.slide}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      </View>
    </TouchableOpacity>
  ), [handlePress]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading slider data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchSliderData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{greeting}</Text>
      {sliderData.length > 0 ? (
        <>
          <Carousel
            data={sliderData}
            renderItem={renderItem}
            sliderWidth={450}
            itemWidth={300}
            loop
            autoplay
            autoplayInterval={3000}
            lockScrollWhileSnapping
            inactiveSlideScale={0.9}
            inactiveSlideOpacity={0.7}
            onSnapToItem={setActiveIndex}
          />
          <Pagination
            dotsLength={sliderData.length}
            activeDotIndex={activeIndex}
            dotStyle={styles.activeDot}
            inactiveDotStyle={styles.inactiveDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            containerStyle={styles.paginationContainer}
          />
        </>
      ) : (
        <Text style={styles.noDataText}>No slider data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: 'white',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 20,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 7,
    marginLeft: 5,
    marginRight: 5,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    marginBottom: 0,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginBottom: 0,
  },
  paginationContainer: {
    paddingVertical: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Slider;