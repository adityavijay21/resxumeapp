import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const EditProfileScreen = ({ route, navigation }) => {
    const { userData: initialUserData } = route.params;
    const [userData, setUserData] = useState(initialUserData);

    const handleInputChange = (key, value) => {
        setUserData(prevState => ({ ...prevState, [key]: value }));
    };

    const handleSave = () => {
        // Implement save logic here
        console.log('Saving user data:', userData);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Edit Profile</Text>
            </View>
            <View style={styles.form}>
                {Object.entries(userData).map(([key, value]) => (
                    <TextInput
                        key={key}
                        style={styles.input}
                        value={value}
                        onChangeText={(text) => handleInputChange(key, text)}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    />
                ))}
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
    headerTitle: { fontSize: 24, fontWeight: 'bold' },
    form: { padding: 20 },
    input: { fontSize: 16, padding: 15, marginBottom: 15, backgroundColor: '#fff', borderRadius: 10 },
    saveButton: { backgroundColor: '#000', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
    saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default EditProfileScreen;