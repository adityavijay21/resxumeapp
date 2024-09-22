import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, SegmentedButtons, Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { initializeApp } from 'firebase/app';
import { updateDoc , getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import BottomNavBar from '../components/BottomNavBar';



// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9EmcL0bjpcGtPcjoQAB-tMbbev06h4zw",
  authDomain: "palletcam21.firebaseapp.com",
  projectId: "palletcam21",
  storageBucket: "palletcam21.appspot.com",
  messagingSenderId: "291502064119",
  appId: "1:291502064119:web:c96d7a5c90db3f605d2ef2",
  measurementId: "G-HSEJ0ED6FT"
};

// Initialize Firebase
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

const theme = {
  colors: {
    primary: '#2D3748',
    accent: '#bacbe0',
    background: '#EDF2F7',
    text: '#1A202C',
    placeholder: '#A0AEC0',
    surface: '#FFFFFF',
  },
};

SplashScreen.preventAutoHideAsync();

const UserDetailsScreen = ({ navigation, route }) => {
  const { setUserDetails } = route.params;
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');

  const [fontsLoaded] = useFonts({
    'CormorantInfant-Regular': require('../assets/fonts/CormorantInfant-Regular.ttf'),
    'CormorantInfant-Bold': require('../assets/fonts/CormorantInfant-Bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleSubmit = async () => {
    if (name && age && occupation && email) {
      const userDetails = { name, age, occupation, email };
      setUserDetails(userDetails);
  
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.docs.length > 0) {
          alert('Welcome Back!');
        } else {
          console.log("Attempting to add document to Firestore...");
          const docRef = await addDoc(usersRef, userDetails);
          console.log("Document written with ID: ", docRef.id);
  
          // Add login log to user document
          const loginLog = {
            timestamp: new Date(),
            ipAddress: '127.0.0.1', // Replace with actual IP address
          };
          await updateDoc(docRef, { loginLogs: [loginLog] });
  
          navigation.navigate('MainApp');
        }
      } catch (error) {
        console.error("Error adding document: ", error);
        alert('Error saving user data. Please try again. Error: ' + error.message);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const occupations = [
    { value: 'student', label: 'Student' },
    { value: 'designer', label: 'Designer' },
    { value: 'developer', label: 'Developer' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <PaperProvider theme={theme}>
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.title}>Tell us about yourself</Text>
      
      <TextInput
        label="Your Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />
      
      <TextInput
        label="Your Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
      />
      
      <TextInput
        label="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        mode="outlined"
        style={styles.input}
      />
      
      <Text style={styles.label}>I am a:</Text>
      <SegmentedButtons
        value={occupation}
        onValueChange={setOccupation}
        buttons={occupations}
        style={styles.segmentedButtons}
        theme={{
          colors: {
            primary: theme.colors.primary,
            secondaryContainer: theme.colors.accent,
          },
        }}
      />
      
      <Button 
        mode="contained" 
        onPress={handleSubmit}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Start Using the App
      </Button>
    </View>
  </PaperProvider>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 20,
  justifyContent: 'center',
  backgroundColor: theme.colors.background,
},
title: {
  fontFamily: 'CormorantInfant-Bold',
  fontSize: 32,
  marginBottom: 30,
  textAlign: 'center',
  color: theme.colors.primary,
},
input: {
  marginBottom: 15,
  backgroundColor: theme.colors.surface,
},
label: {
  fontSize: 18,
  marginBottom: 10,
  color: theme.colors.text,
},
segmentedButtons: {
  marginBottom: 20,
},
button: {
  marginTop: 10,
  padding: 5,
  backgroundColor: theme.colors.primary,
},
buttonText: {
  fontSize: 16,
  color: theme.colors.surface,
},
});

export default UserDetailsScreen;