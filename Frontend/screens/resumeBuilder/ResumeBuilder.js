import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { printToFileAsync } from 'expo-print';
import { Ionicons } from '@expo/vector-icons';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: '', email: '', phone: '', location: '' },
    summary: '',
    experience: [{ title: '', company: '', startDate: '', endDate: '', responsibilities: '' }],
    education: [{ degree: '', school: '', graduationDate: '' }],
    skills: [],
  });

  const updateField = (section, field, value, index = 0) => {
    setResumeData(prevData => {
      if (Array.isArray(prevData[section])) {
        const newArray = [...prevData[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prevData, [section]: newArray };
      } else if (typeof prevData[section] === 'object') {
        return { ...prevData, [section]: { ...prevData[section], [field]: value } };
      } else {
        return { ...prevData, [section]: value };
      }
    });
  };

  const addSection = (section) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: [...prevData[section], section === 'experience' 
        ? { title: '', company: '', startDate: '', endDate: '', responsibilities: '' }
        : { degree: '', school: '', graduationDate: '' }
      ]
    }));
  };

  const removeSection = (section, index) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: prevData[section].filter((item, i) => i !== index)
    }));
  };

  const renderInputField = (label, value, onChangeText, placeholder = '') => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || label}
      />
    </View>
  );

  const renderSection = (title, fields, section) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {fields.map((item, index) => (
        <View key={index} style={styles.sectionItem}>
          {Object.entries(item).map(([key, value]) => 
            renderInputField(
              key.charAt(0).toUpperCase() + key.slice(1),
              value,
              (text) => updateField(section, key, text, index),
              `Enter ${key}`
            )
          )}
          <TouchableOpacity style={styles.removeButton} onPress={() => removeSection(section, index)}>
            <Ionicons name="remove-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={() => addSection(section)}>
        <Ionicons name="add-circle-outline" size={24} color="black" />
        <Text style={styles.addButtonText}>Add {title}</Text>
      </TouchableOpacity>
    </View>
  );

  const generateResumePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #333; }
            .section { margin-bottom: 20px; }
            .section-title { color: #666; }
          </style>
        </head>
        <body>
          <h1>${resumeData.personalInfo.name}</h1>
          <p>${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}</p>
          
          <div class="section">
            <h2 class="section-title">Professional Summary</h2>
            <p>${resumeData.summary}</p>
          </div>
          
          <div class="section">
            <h2 class="section-title">Experience</h2>
            ${resumeData.experience.map(exp => `
              <h3>${exp.title} at ${exp.company}</h3>
              <p>${exp.startDate} - ${exp.endDate}</p>
              <p>${exp.responsibilities}</p>
            `).join('')}
          </div>
          
          <div class="section">
            <h2 class="section-title">Education</h2>
            ${resumeData.education.map(edu => `
              <h3>${edu.degree} - ${edu.school}</h3>
              <p>Graduated: ${edu.graduationDate}</p>
            `).join('')}
          </div>
          
          <div class="section">
            <h2 class="section-title">Skills</h2>
            <p>${resumeData.skills.join(', ')}</p>
          </div>
        </body>
      </html>
    `;

    try {
      const { uri } = await printToFileAsync({
        html: htmlContent,
        base64: false
      });

      const pdfName = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
      const pdfPath = `${FileSystem.documentDirectory}${pdfName}`;

      await FileSystem.moveAsync({
        from: uri,
        to: pdfPath
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(pdfPath);
      } else {
        Alert.alert('Error', 'Sharing is not available on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resume Builder</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        {Object.entries(resumeData.personalInfo).map(([key, value]) => 
          renderInputField(
            key.charAt(0).toUpperCase() + key.slice(1),
            value,
            (text) => updateField('personalInfo', key, text),
            `Enter your ${key}`
          )
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          multiline
          numberOfLines={4}
          value={resumeData.summary}
          onChangeText={(text) => updateField('summary', null, text)}
          placeholder="Write a brief professional summary"
        />
      </View>

      {renderSection('Work Experience', resumeData.experience, 'experience')}
      {renderSection('Education', resumeData.education, 'education')}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <TextInput
          style={styles.input}
          value={resumeData.skills.join(', ')}
          onChangeText={(text) => setResumeData(prev => ({ ...prev, skills: text.split(',').map(skill => skill.trim()) }))}
          placeholder="Enter skills, separated by commas"
        />
      </View>

      <TouchableOpacity style={styles.generateButton} onPress={generateResumePDF}>
        <Ionicons name="document-text-outline" size={24} color="white" />
        <Text style={styles.generateButtonText}>Generate PDF Resume</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  sectionItem: {
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#000000',
    marginLeft: 5,
  },
  removeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  generateButton: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  generateButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ResumeBuilder;