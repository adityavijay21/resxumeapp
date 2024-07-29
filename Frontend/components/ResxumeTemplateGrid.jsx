import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const TEMPLATE_API_URL = 'http://localhost:3000/api/resxumetemplates';

const ResxumeTemplateGrid = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(TEMPLATE_API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTemplates(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching templates:', error);
      setError('Failed to load templates. Please try again later.');
      setLoading(false);
    }
  };

  const downloadAndSharePDF = async (template) => {
    const { pdfUrl, title } = template;
    const fileName = `${title.replace(/\s+/g, '_')}.pdf`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    try {
      const { uri } = await FileSystem.downloadAsync(pdfUrl, fileUri);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      } else {
        Alert.alert("Sharing not available", "Sharing is not available on your device");
      }
    } catch (error) {
      console.error('Error downloading or sharing PDF:', error);
      Alert.alert("Error", "Failed to download or share the PDF");
    }
  };

  const openTemplateDetails = (template) => {
    setSelectedTemplate(template);
    setModalVisible(true);
  };

  const TemplateItem = ({ template }) => (
    <TouchableOpacity onPress={() => openTemplateDetails(template)}>
      <View style={styles.templateContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: template.banner }} style={styles.banner} />
        </View>
        <Text style={styles.title}>{template.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const ModalContent = () => (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      {selectedTemplate ? (
        <>
          <Text style={styles.modalTitle}>{selectedTemplate.title}</Text>
  
          <View style={styles.featureContainer}>
            {Object.entries(selectedTemplate.features).map(([key, value], index) => (
              <View key={index} style={styles.featureItem}>
                <FontAwesome5 name="circle" size={12} color="black" style={styles.icon} />
                <Text style={styles.featureKey}>{key}</Text>
                <Text style={styles.featureValue}>{value}</Text>
              </View>
            ))}
          </View>
  
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalDownloadButton}
              onPress={() => downloadAndSharePDF(selectedTemplate)}
            >
              <Text style={styles.modalButtonText}>Download and Share PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading templates...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Free ATS Friendly Resume</Text>

      <View style={styles.templateGrid}>
        {templates.map((template) => (
          <TemplateItem key={template.id} template={template} />
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setModalVisible(false)}>
          <ModalContent />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};





const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
    marginTop: 25,
    marginLeft: 25,
  },
  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  templateContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFEFEF',
    borderRadius: 20,
    padding: 10,
  },
  imageContainer: {
    width: 170,
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },
  banner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  featureContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 5,
  },
  featureKey: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#666',
  },
  featureValue: {
    marginLeft: 5,
    color: '#666',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalDownloadButton: {
    backgroundColor: '#188500',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  modalCancelButton: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ResxumeTemplateGrid;
     