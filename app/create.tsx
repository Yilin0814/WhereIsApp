import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location'; // R2.1: Import for GPS
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CreateScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [coords, setCoords] = useState<string>('Not fetched yet'); // R2.1 State

  // R2.1: Function to get GPS coordinates
  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync(); // This is the line that was erroring
      if (status !== 'granted') {
        Alert.alert("Permission Denied", "Location access is required for this app.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const currentCoords = `${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)}`;
      setCoords(currentCoords);
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
    if (!name || !image || coords === 'Not fetched yet') {
      Alert.alert("Error", "Please provide name, photo, and coordinates! [R2.1]");
      return;
    }
    const newItem = { id: Date.now().toString(), name, description, image, location: coords };
    const data = await AsyncStorage.getItem('stored_items');
    const items = data ? JSON.parse(data) : [];
    items.push(newItem);
    await AsyncStorage.setItem('stored_items', JSON.stringify(items));
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Item Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />

      {/* R2.1 Location UI based on your sketch */}
      <View style={styles.locationBox}>
        <Text style={styles.locationText}>Coordinates: {coords}</Text>
        <TouchableOpacity style={styles.locButton} onPress={getLocation}>
          <Text style={{color: 'white'}}>Get GPS 📍</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
        <Text style={{color: 'white'}}>{image ? "Change Photo" : "Take Photo 📷"}</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Save Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginTop: 5 },
  locationBox: { padding: 15, backgroundColor: '#f0f0f0', borderRadius: 10, marginTop: 20, alignItems: 'center' },
  locationText: { fontSize: 14, marginBottom: 10, fontWeight: '600' },
  locButton: { backgroundColor: '#007AFF', padding: 8, borderRadius: 5 },
  cameraButton: { backgroundColor: '#555', padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  preview: { width: '100%', height: 200, marginTop: 10, borderRadius: 10 },
  saveButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, marginTop: 30, alignItems: 'center', marginBottom: 50 }
});