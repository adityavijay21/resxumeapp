import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { printToFileAsync } from 'expo-print';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: '', email: '', phone: '', location: '' },
    summary: '',
    experience: [{ title: '', company: '', dates: '', responsibilities: '' }],
    education: [{ degree: '', school: '', graduationDate: '' }],
    skills: '',
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
        ? { title: '', company: '', dates: '', responsibilities: '' }
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

  const renderInputField = (label, value, onChangeText) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
      />
    </View>
  );

  const renderSection = (title, fields, section) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {fields.map((item, index) => (
        <View key={index}>
          {Object.entries(item).map(([key, value]) => 
            renderInputField(
              key.charAt(0).toUpperCase() + key.slice(1),
              value,
              (text) => updateField(section, key, text, index)
            )
          )}
          <TouchableOpacity style={styles.removeButton} onPress={() => removeSection(section, index)}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={() => addSection(section)}>
        <Text style={styles.addButtonText}>Add {title}</Text>
      </TouchableOpacity>
    </View>
  );

  const generateResumePDF = async () => {
    const htmlContent = `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Professional Resume</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 20px;
    }
    h1, h2, h3 {
      color: #0056b3;
    }
    h1 {
      font-size: 24px;
    }
    h2 {
      font-size: 20px;
      margin-top: 30px;
    }
    h3 {
      font-size: 18px;
      margin-bottom: 5px;
    }
    p {
      margin: 5px 0;
    }
    .personal-info, .summary, .experience, .education, .skills {
      margin-bottom: 20px;
    }
    .experience-item, .education-item {
      margin-bottom: 15px;
    }
  </style>
</head>
<body>
  <h1>${resumeData.personalInfo.name}</h1>
  <p class="personal-info">${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}</p>
  
  <div class="summary">
    <h2>Professional Summary</h2>
    <p>${resumeData.summary}</p>
  </div>
  
  <div class="experience">
    <h2>Work Experience</h2>
    ${resumeData.experience.map(exp => `
      <div class="experience-item">
        <h3>${exp.title} at ${exp.company}</h3>
        <p>${exp.dates}</p>
        <p>${exp.responsibilities}</p>
      </div>
    `).join('')}
  </div>
  
  <div class="education">
    <h2>Education</h2>
    ${resumeData.education.map(edu => `
      <div class="education-item">
        <h3>${edu.degree} from ${edu.school}</h3>
        <p>Graduated: ${edu.graduationDate}</p>
      </div>
    `).join('')}
  </div>
  
  <div class="skills">
    <h2>Skills</h2>
    <p>${resumeData.skills}</p>
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
      <Text style={[styles.title, { marginTop: 60 }]}>ATS-Friendly Resume Builder</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        {Object.entries(resumeData.personalInfo).map(([key, value]) => 
          renderInputField(
            key.charAt(0).toUpperCase() + key.slice(1),
            value,
            (text) => updateField('personalInfo', key, text)
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
          placeholder="Brief professional summary"
        />
      </View>

      {renderSection('Work Experience', resumeData.experience, 'experience')}
      {renderSection('Education', resumeData.education, 'education')}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          multiline
          numberOfLines={4}
          value={resumeData.skills}
          onChangeText={(text) => updateField('skills', null, text)}
          placeholder="List your key skills, separated by commas"
        />
      </View>

      <TouchableOpacity style={[styles.generateButton, { backgroundColor: 'black' }]} onPress={generateResumePDF}>
        <Text style={styles.generateButtonText}>Generate and Save PDF Resume</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  removeButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  generateButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  generateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ResumeBuilder;