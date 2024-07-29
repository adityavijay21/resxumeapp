import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const ResumeWriterBox = ({ writer }) => {
    // Function to handle hiring the resume writer
    const hireWriter = () => {
        // Check if the writer has a WhatsApp number
        if (writer.whatsapp) {
            // Open WhatsApp with the writer's number
            const whatsappURL = `https://api.whatsapp.com/send?phone=91${writer.whatsapp}&text=Hello, I got your number from official resxume app. I am seeking for a resume writing and came across your profile ${writer.name} sir, are you intrested to work together?`;
            Linking.openURL(whatsappURL);
        } else {
            // If WhatsApp number is not available, display a message
            alert("WhatsApp number not available");
        }
    };

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: writer.image }} style={styles.image} />
                    <Text style={styles.rating}>{writer.rating} ⭐</Text>
                    <Text style={styles.reviews}>({writer.reviews} reviews)</Text>
            </View>
            <View style={styles.details}>
                <Text style={styles.name}>{writer.name}</Text>
                <Text style={styles.subtitle}>{writer.currentCompany}</Text>
                <Text style={styles.subtitle}>• Exprience of {writer.experience}+ years</Text>
                <Text style={styles.subtitle}>• Expertise in: {writer.specialization}</Text>


                {/* Hire Resume Writer Button */}
                <TouchableOpacity style={styles.button} onPress={hireWriter}>
                    <Text style={styles.buttonText}>Hire {writer.name}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFEFEF',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 3, // Add shadow
    },
    imageContainer: {
        alignItems: 'center',
        marginRight: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 5,
    },
    experience: {
        fontSize: 14,
    },
    rating: {
        fontSize: 14,
        marginTop: 5,
        marginBottom: 3,
        fontWeight: 'normal',
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviews: {
        fontSize: 14,
    },
    button: {
        marginTop: 10,
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ResumeWriterBox;
