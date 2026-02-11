import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Hide the header for the index screen */}
      <Stack.Screen name="index" options={{ headerShown: false,title: ""}} />
      <Stack.Screen name="create" options={{ 
          title: "Add New Item",
        }} 
      />
    </Stack>
    
  );
}