import { useLocalSearchParams } from 'expo-router'; // Used to get data passed from the list
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen() {
  // R3.3: Get the item data passed through the URL parameters
  const { name, description, image } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      {/* R3.3: Display a large image of the item */}
      <Image source={{ uri: image as string }} style={styles.fullImage} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.divider} />
        
        <Text style={styles.label}>Location / Description:</Text>
        <Text style={styles.description}>{description || "No description provided."}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  fullImage: { width: '100%', height: 300, resizeMode: 'cover' },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  divider: { height: 2, backgroundColor: '#eee', marginVertical: 15 },
  label: { fontSize: 16, color: '#888', marginBottom: 8 },
  description: { fontSize: 18, lineHeight: 26, color: '#444' },
});