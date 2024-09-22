import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ResumeBuilder from '../screens/resumeBuilder/ResumeBuilder';
import OpportunitiesScreen from '../screens/Opportunities/OpportunitiesScreen';
import ProfileScreen from '../screens/profilescreens/Profile';
import Index from '../screens/Index';

const NAVIGATION_ROUTES = [
  { key: 'home', title: 'Home', icon: 'home-outline' },
  { key: 'builder', title: 'Builder', icon: 'document-text-outline' },
  { key: 'opportunities', title: 'Jobs', icon: 'briefcase-outline' },
  { key: 'profile', title: 'Profile', icon: 'person-outline' },
];

const BottomNavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const insets = useSafeAreaInsets();

  const renderScreen = () => {
    switch (NAVIGATION_ROUTES[activeIndex].key) {
      case 'home': return <Index />;
      case 'builder': return <ResumeBuilder />;
      case 'opportunities': return <OpportunitiesScreen />;
      case 'profile': return <ProfileScreen />;
      default: return null;
    }
  };

  const handlePress = (index) => {
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom }]}>
        {NAVIGATION_ROUTES.map((route, index) => (
          <TouchableOpacity
            key={route.key}
            style={styles.navItem}
            onPress={() => handlePress(index)}
          >
            <Ionicons
              name={route.icon}
              size={24}
              color={index === activeIndex ? '#000000' : '#808080'}
            />
            <Text style={[
              styles.navText,
              { color: index === activeIndex ? '#000000' : '#808080' }
            ]}>
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomNavBar;