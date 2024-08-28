import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ResumeBuilder from '../screens/resumeBuilder/ResumeBuilder';
import ResxumeWritersScreen from '../screens/ResxumeWriters/ResxumeWritersScreen';
import OpportunitiesScreen from '../screens/Opportunities/OpportunitiesScreen';
import ProfileScreen from '../screens/profilescreens/Profile';
import ResxumeTemplateGrid from '../screens/ResxumeTemplateGrid';
import Index from '../screens/Index';

const NAVIGATION_ROUTES = [
  {
    key: 'home',
    title: 'Home',
    focusedIcon: 'home',
    unfocusedIcon: 'home-outline',
  },
  {
    key: 'builder',
    title: 'Builder',
    focusedIcon: 'document-text',
    unfocusedIcon: 'document-text-outline',
  },
  {
    key: 'opportunities',
    title: 'Opportunities',
    focusedIcon: 'podium',
    unfocusedIcon: 'podium-outline',
  },
  {
    key: 'profile',
    title: 'Profile',
    focusedIcon: 'person',
    unfocusedIcon: 'person-outline',
  },
];

const BottomNavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderScreen = () => {
    switch (NAVIGATION_ROUTES[activeIndex].key) {
      case 'home':
        return (
          <Index />
        );
      case 'builder':
        return <ResumeBuilder />;
      case 'opportunities':
        return <OpportunitiesScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <View style={styles.bottomNav}>
        {NAVIGATION_ROUTES.map((route, index) => (
          <TouchableOpacity
            key={route.key}
            style={styles.navItem}
            onPress={() => setActiveIndex(index)}
          >
            <Ionicons
              name={index === activeIndex ? route.focusedIcon : route.unfocusedIcon}
              size={24}
              color={index === activeIndex ? '#000' : '#666'}
            />
            <Text style={[
              styles.navText,
              { color: index === activeIndex ? '#000' : '#666' }
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
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomNavBar;