import { StyleSheet, Text, View } from "react-native";

export default function CreateScreen() {
  return (
    <View style={styles.container}>
      {/* R2.1: Create Screen */}
      <Text style={styles.title}>Add New Item</Text>
      <Text>add details later 📷</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});