import AsyncStorage from '@react-native-async-storage/async-storage'; // R4.1: Fetching persisted data
import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function ListScreen() {
  const [items, setItems] = useState([]);

  // Refresh the list every time the user navigates to this screen
  useFocusEffect(
    React.useCallback(() => {
      loadItems();
    }, [])
  );

  const loadItems = async () => {
    try {
      const data = await AsyncStorage.getItem('stored_items');
      if (data) {
        setItems(JSON.parse(data)); // Parse the string back into an array
      }
    } catch (error) {
      console.error("Failed to load items", error);
    }
  };

  // R3.1: Component to render each individual item in the list
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items saved yet. Go back and add one!</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  listContent: { padding: 15 },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 10,
    // Shadow for UI polish
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: { width: 80, height: 80, borderRadius: 8 },
  itemInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  itemDesc: { fontSize: 14, color: '#666', marginTop: 4 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#999' },
});