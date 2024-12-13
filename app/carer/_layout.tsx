import "@/global.css";
import { Stack } from "expo-router";

export default function CarerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="infosView" />
    </Stack>
  );
}
