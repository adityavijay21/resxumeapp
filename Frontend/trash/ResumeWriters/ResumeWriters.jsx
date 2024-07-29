import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ResumeWriterBox from './ResumeWriterBox';
import WritersData from "../../components/data/WritersData";

const ResumeWriters = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Top Resxume Writers</Text>
            {WritersData.map((writer, index) => (
                <ResumeWriterBox key={index} writer={writer} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    heading: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
        marginTop: 25,
    },
    container: {
        marginTop: -25,
        marginLeft: 15,
        marginRight: 15,
        flex: 1,
        padding: 10,
    },
});

export default ResumeWriters;