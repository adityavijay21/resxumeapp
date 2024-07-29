import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BottomNavBar from './components/BottomNavBar';
import ResumeBuilder from './components/resumeBuilder/ResumeBuilder';
import OpportunitiesScreen from './components/Opportunities/OpportunitiesScreen';
import OpportunityDetailScreen from './components/Opportunities/OpportunityDetailScreen';
import ResxumeWritersScreen from './components/ResxumeWriters/ResxumeWritersScreen';
import ResxumeWriterDetailScreen from './components/ResxumeWriters/ResxumeWriterDetailScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainApp" component={BottomNavBar} />
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
            name="Resumewriters"
            component={ResxumeWritersScreen}
            options={{ title: 'Resxume Writers' }}
          />
          <Stack.Screen
            name="ResxumeWritersDetail"
            component={ResxumeWriterDetailScreen}
            options={({ route }) => ({ title: route.params.resxumewriter.position })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;