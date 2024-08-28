import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: 'Aditya Vijay',
    email: 'adityavijay110@gmail.com',
  });

  const accountSettings = [
    { title: 'Edit Profile', icon: 'edit' },
    { title: 'Personal information', icon: 'person' },
    { title: 'Saved Collections', icon: 'bookmark' },
    { title: 'Service History', icon: 'access-time' },
    { title: 'Help & Support', icon: 'help' },
    { title: 'Privacy policy', icon: 'privacy-tip' },
    { title: 'Terms & Conditions', icon: 'description' },
    { title: 'FAQ & Help', icon: 'question-answer' },
    { title: 'Log out', icon: 'exit-to-app' },
  ];

  const handlePress = useCallback((title) => {
    if (title === 'Edit Profile') {
      navigation.navigate('EditProfile');
    } else if (title === 'Log out') {
      // Implement logout logic here
      console.log('Logging out...');
    } else {
      navigation.navigate('DetailScreen', { title });
    }
  }, [navigation]);

  const renderSettingItem = useCallback(({ item }) => (
    <TouchableOpacity style={styles.section} onPress={() => handlePress(item.title)}>
      <View style={styles.sectionContent}>
        <MaterialIcons name={item.icon} size={24} color="#555" style={styles.icon} />
        <Text style={styles.sectionTitle}>{item.title}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#555" />
    </TouchableOpacity>
  ), [handlePress]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>
            <View style={styles.profileContainer}>
                <Image source={{ uri: 'https://avatars.githubusercontent.com/u/79340120?v=4' }} style={styles.profileImage} />
                <Text style={styles.profileName}>{userData.name}</Text>
                <Text style={styles.profileEmail}>{userData.email}</Text>
            </View>
            <FlatList
                data={accountSettings}
                renderItem={renderSettingItem}
                keyExtractor={(item) => item.title}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:
    { flex: 1, backgroundColor: '#f5f5f5' },
    header:
    { padding: 20, backgroundColor: '#fff', },
    headerTitle:
    { fontSize: 34, fontWeight: 'bold' },
    profileContainer:
    { alignItems: 'center', padding: 20, backgroundColor: '#fff', marginBottom: 10 },
    profileImage:
    { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
    profileName:
    { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
    profileEmail:
    { fontSize: 16, color: '#666' },
    listContainer:
    { paddingHorizontal: 15 },
    section:
    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#fff', marginBottom: 3, borderRadius: 10 },
    sectionContent:
    { flexDirection: 'row', alignItems: 'center' },
    icon:
    { marginRight: 15 },
    sectionTitle:
    { fontSize: 16 },
});

export default ProfileScreen;