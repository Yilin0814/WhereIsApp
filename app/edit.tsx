import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [name, setName] = useState(params.name as string || '');
  const [description, setDescription] = useState(params.description as string || '');
  const [image, setImage] = useState<string | null>(params.image as string || null);
  const [coords, setCoords] = useState<string>(params.location as string || 'Not fetched yet');

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Denied", "Location access is required.");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCoords(`${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)}`);
    } catch (error) {
      Alert.alert("Error", "Could not fetch location.");
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchCameraAsync({ quality: 0.5 });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSave = async () => {
    if (!name || !description) {
      Alert.alert("Error", "Name and description are required!");
      return;
    }
    try {
      const data = await AsyncStorage.getItem('stored_items');
      const items = data ? JSON.parse(data) : [];
      const updatedItems = items.map((item: any) =>
        item.id === params.id
          ? { ...item, name, description, image, location: coords }
          : item
      );
      await AsyncStorage.setItem('stored_items', JSON.stringify(updatedItems));
      // Go back to list (pop details + edit)
      router.dismiss(2);
    } catch (error) {
      Alert.alert("Error", "Storing of the record failed!");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Item Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="e.g., Hidden in the bottom drawer"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.locationBox}>
        <Text style={styles.locationText}>Coordinates: {coords}</Text>
        <TouchableOpacity style={styles.locButton} onPress={getLocation}>
          <Text style={{ color: 'white' }}>Update GPS 📍</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
        <Text style={{ color: 'white' }}>{image ? "Change Photo" : "Take Photo 📷"}</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginTop: 5 },
  textArea: { height: 80, textAlignVertical: 'top' },
  locationBox: { padding: 15, backgroundColor: '#f0f0f0', borderRadius: 10, marginTop: 20, alignItems: 'center' },
  locationText: { fontSize: 14, marginBottom: 10, fontWeight: '600' },
  locButton: { backgroundColor: '#007AFF', padding: 8, borderRadius: 5 },
  cameraButton: { backgroundColor: '#555', padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  preview: { width: '100%', height: 200, marginTop: 10, borderRadius: 10 },
  saveButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, marginTop: 30, alignItems: 'center', marginBottom: 50 },
});
