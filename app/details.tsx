import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetailsScreen() {
  const router = useRouter();
  const { id, name, description, image, location } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      {image ? (
        <Image source={{ uri: image as string }} style={styles.fullImage} />
      ) : (
        <View style={[styles.fullImage, styles.noImage]}>
          <Text style={styles.noImageText}>No Photo</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.divider} />

        <Text style={styles.label}>Description:</Text>
        <Text style={styles.description}>{description || "No description provided."}</Text>

        {location ? (
          <>
            <Text style={styles.label}>GPS Location:</Text>
            <Text style={styles.description}>📍 {location}</Text>
          </>
        ) : null}

        {/* R5.1: Edit button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push({
            pathname: "/edit",
            params: { id, name, description, image, location }
          })}
        >
          <Text style={styles.editButtonText}>Edit Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  fullImage: { width: '100%', height: 300, resizeMode: 'cover' },
  noImage: { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  noImageText: { color: '#999', fontSize: 16 },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  divider: { height: 2, backgroundColor: '#eee', marginVertical: 15 },
  label: { fontSize: 16, color: '#888', marginBottom: 8 },
  description: { fontSize: 18, lineHeight: 26, color: '#444' },
  editButton: {
    backgroundColor: '#FF9500',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  editButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
