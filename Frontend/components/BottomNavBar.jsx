import React, { useState } from 'react';
import { BottomNavigation, DefaultTheme } from 'react-native-paper';
import Index from '../Index';
import ResumeBuilder from './resumeBuilder/ResumeBuilder';
import OpportunitiesScreen from './Opportunities/OpportunitiesScreen';
import ProfileScreen from './profilescreens/Profile';

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
    focusedIcon: 'file-document-edit-outline',
  },
  {
    key: 'opportunities',
    title: 'Opportunities',
    focusedIcon: 'go-kart-track',
  },
  {
    key: 'profile',
    title: 'Profile',
    focusedIcon: 'face-man',
  },
];

const SCENE_MAP = {
  home: Index,
  builder: ResumeBuilder,
  opportunities: OpportunitiesScreen,
  profile: ProfileScreen,
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFEFEF',
  },
};

const BottomNavBar = () => {
  const [index, setIndex] = useState(0);

  return (
    <BottomNavigation
      navigationState={{ index, routes: NAVIGATION_ROUTES }}
      onIndexChange={setIndex}
      renderScene={BottomNavigation.SceneMap(SCENE_MAP)}
      barStyle={{ backgroundColor: '#F8F9FA'}}
      theme={theme}
    />
  );
};

export default BottomNavBar;