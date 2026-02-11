import * as ImagePicker from 'expo-image-picker'; // Hardware API for Camera
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function CreateScreen() {
  // R2.1: State for text inputs
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  // R8.1: State to store the URI of the taken photo
  const [image, setImage] = useState<string | null>(null);

  // R8.1: Function to trigger the device camera
  const takePhoto = async () => {
    // Request camera permissions
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "You need to allow camera access to take a photo!");
      return;
    }

    // Launch the camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5, // Compressed for easier storage later
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Save the image path to state
    }
  };

  const handleSave = () => {
    if (!name || !image) {
      Alert.alert("Missing Info", "Please provide a name and take a photo! [R8.1]");
      return;
    }
    console.log("Saving Item:", { name, description, image });
    Alert.alert("Success", "Item data is ready to be saved locally!");
  };

  return (
    <ScrollView style={styles.container}>
      {/* R2.1: Item Name Input */}
      <Text style={styles.label}>Item Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Office Laptop"
        value={name}
        onChangeText={setName}
      />

      {/* R2.1: Description Input */}
      <Text style={styles.label}>Description / Location:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="e.g., Hidden in the bottom drawer"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* R8.1: Camera Section */}
      <Text style={styles.label}>Item Photo:</Text>
      {image && <Image source={{ uri: image }} style={styles.previewImage} />}
      
      <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
        <Text style={styles.buttonText}>{image ? "Retake Photo 📷" : "Take Photo 📷"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
  textArea: { height: 80, textAlignVertical: 'top' },
  previewImage: { width: '100%', height: 200, borderRadius: 10, marginVertical: 10 },
  cameraButton: { backgroundColor: '#6c757d', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  saveButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, marginTop: 30, marginBottom: 50, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});