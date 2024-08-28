import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import OnboardingScreen from './screens/OnboardingScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import ResumeBuilder from './screens/resumeBuilder/ResumeBuilder';
import OpportunitiesScreen from './screens/Opportunities/OpportunitiesScreen';
import OpportunityDetailScreen from './screens/Opportunities/OpportunityDetailScreen';
import ResxumeWritersScreen from './screens/ResxumeWriters/ResxumeWritersScreen';
import ResxumeWriterDetailScreen from './screens/ResxumeWriters/ResxumeWriterDetailScreen';
import BottomNavBar from './components/BottomNavBar';
import Index from './screens/Index';

const Stack = createStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    async function hideSplashScreen() {
      await SplashScreen.hideAsync();
    }
    hideSplashScreen();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isFirstLaunch ? (
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              initialParams={{ setIsFirstLaunch: setIsFirstLaunch }}
            />
          ) : !userDetails ? (
            <Stack.Screen
              name="UserDetails"
              component={UserDetailsScreen}
              initialParams={{ setUserDetails: setUserDetails }}
            />
          ) : (
            <>
              <Stack.Screen name="MainApp" component={BottomNavBar} />
              <Stack.Screen name="Index" component={Index} />
              <Stack.Screen name="ResumeBuilder" component={ResumeBuilder} />
              <Stack.Screen
                name="Opportunities"
                component={OpportunitiesScreen}
                options={{ title: 'Job Opportunities' }}
              />
              <Stack.Screen
                name="OpportunityDetail"
                component={OpportunityDetailScreen}
                options={({ route }) => ({ title: route.params.opportunity.position })}
              />
              <Stack.Screen
                name="ResxumeWriters"
                component={ResxumeWritersScreen}
                options={{ title: 'Resxume Writers' }}
              />
              <Stack.Screen
                name="ResxumeWritersDetail"
                component={ResxumeWriterDetailScreen}
                options={({ route }) => ({ title: route.params.resxumewriter.position })}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}