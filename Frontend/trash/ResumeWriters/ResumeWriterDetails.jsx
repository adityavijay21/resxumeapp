
import React from 'react';
import { View, Text } from 'react-native';

const ResumeWriterDetails = ({ route }) => {
    const { writerId } = route.params;
    return (
        <View>
            <Text>{writerDetails.name}</Text>
            <Text>{writerDetails.currentCompany}</Text>
            <Text>{writerDetails.specialization}</Text>
            <Text>{writerDetails.experience} years of experience</Text>
            <Text>Rating: {writerDetails.rating}</Text>
            <Text>Reviews: {writerDetails.reviews}</Text>
        </View>
    );
};

export default ResumeWriterDetails;
