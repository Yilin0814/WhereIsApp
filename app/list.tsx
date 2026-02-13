import AsyncStorage from '@react-native-async-storage/async-storage'; // R4.1: Persistent storage
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// Define the Item structure to prevent "item.id" errors
interface Item {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
}

export default function ListScreen() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]); // Typed as an array of Items
  const [searchQuery, setSearchQuery] = useState(''); // R1.3: Search state

  // Refresh data whenever this screen becomes active
  useFocusEffect(
    React.useCallback(() => {
      loadItems();
    }, [])
  );

  // Load items from local storage
  const loadItems = async () => {
    try {
      const data = await AsyncStorage.getItem('stored_items');
      if (data) {
        setItems(JSON.parse(data));
      }
    } catch (error) {
      console.error("Failed to load items", error);
    }
  };

  // R2.2: Delete an item from storage and UI
  const deleteItem = async (id: string) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to remove this item?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: async () => {
            const updatedItems = items.filter(item => item.id !== id);
            setItems(updatedItems);
            await AsyncStorage.setItem('stored_items', JSON.stringify(updatedItems));
          } 
        }
      ]
    );
  };

  // R1.3: Logic to filter items based on search input
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // R3.1: Render each item in the list
  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity 
      style={styles.itemCard}
      onPress={() => router.push({
        pathname: "/details",
        params: { 
          name: item.name, 
          description: item.description, 
          image: item.image,
          location: item.location // Passing GPS coordinates to details
        }
      })}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemLoc}>📍 {item.location}</Text>
        <Text style={styles.itemDesc} numberOfLines={1}>{item.description}</Text>
        
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* R1.3: Search bar at the top */}
      <TextInput
        style={styles.searchBar}
        placeholder="🔍 Search items by name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
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
  searchBar: {
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    fontSize: 16,
  },
  listContent: { padding: 15 },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: { width: 90, height: 90, borderRadius: 8 },
  itemInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  itemLoc: { fontSize: 12, color: '#007AFF', marginVertical: 2 },
  itemDesc: { fontSize: 14, color: '#666' },
  deleteButton: { marginTop: 8 },
  deleteButtonText: { color: '#FF3B30', fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#999' },
});