import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CreateScreen() {
  // R2.1: Using State to manage user input for name and description
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    // Basic validation to ensure the item has a name
    if (!name) {
      Alert.alert("Error", "Please enter an item name!");
      return;
    }

    // Placeholder for local storage logic (AsyncStorage) to be implemented later
    console.log("Saving Item Data:", { name, description });
    Alert.alert("Success", `Item "${name}" has been prepared for saving!`);
  };

  return (
    <View style={styles.container}>
      {/* R2.1: Input field for the Item Name */}
      <Text style={styles.label}>Item Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., My Car Keys"
        value={name}
        onChangeText={setName} // Updates the 'name' state as the user types
      />

      {/* R2.1: Input field for the Description or Location */}
      <Text style={styles.label}>Description / Location:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="e.g., On the kitchen counter next to the fruit bowl"
        value={description}
        onChangeText={setDescription}
        multiline={true} // Allows multiple lines of text
        numberOfLines={4}
      />

      {/* Button to trigger the save action */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fdfdfd',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top', // Ensures text starts at the top-left on Android
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    marginTop: 32,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});