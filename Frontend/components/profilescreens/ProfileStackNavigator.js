import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './Profile';
import EditProfileScreen from './EditProfileScreen';
// import DetailScreen from './DetailScreen';

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
      {/* <Stack.Screen name="DetailScreen" component={DetailScreen} /> */}
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;