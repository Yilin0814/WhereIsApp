import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {

  const router = useRouter();// init router

  return (
    <View style={styles.container}>
      {/* R1.1:  Title */}
      <Text style={styles.header}>Where Is App</Text>

      {/* R1.1: Add New Item  */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push("/create")}
        // onPress={() => console.log("Clicked Add New Item")}
      >
        <Text style={styles.buttonText}>Add New Item</Text>
      </TouchableOpacity>

      {/* R1.1: List Items  */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push("/list")}
        // onPress={() => console.log("Clicked List Items")}
      >
        <Text style={styles.buttonText}>List Items</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 50,
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: 250,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});