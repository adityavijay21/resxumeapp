import React from 'react';
import { ScrollView } from 'react-native';
import ResxumeWritersScreen from './ResxumeWriters/ResxumeWritersScreen';
import ResxumeTemplateGrid from './ResxumeTemplateGrid';
import Slider from './Slider';

const Index = () => {
  return (
    <ScrollView>
      <Slider />
      <ResxumeWritersScreen />
      <ResxumeTemplateGrid />
    </ScrollView>
  );
};

export default Index;