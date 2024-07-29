import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const GenerateResumeScreen = ({ route }) => {
  const { personal, education, experience } = route.params;

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <body>
          <h1>Resume</h1>
          <h2>Personal Information</h2>
          <p>Name: ${personal.name}</p>
          <p>Email: ${personal.email}</p>
          <h2>Education</h2>
          <p>Degree: ${education.degree}</p>
          <p>School: ${education.school}</p>
          <h2>Experience</h2>
          <p>Company: ${experience.company}</p>
          <p>Position: ${experience.position}</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('PDF file saved to:', uri);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        console.log('Sharing is not available on this platform');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <View>
      <Text>Your resume is ready to be generated!</Text>
      <Button onPress={generatePDF}>Generate PDF</Button>
    </View>
  );
};

export default GenerateResumeScreen;