import { Accelerometer } from "expo-sensors";

export async function startAccelerometer() {
  const available = await Accelerometer.isAvailableAsync();
  if (!available) {
    throw new Error("Acelerômetro não está disponível.");
  }

  return new Promise((resolve) => {
    const subscription = Accelerometer.addListener((accelerometerData) => {
      subscription.remove();
      resolve(accelerometerData);
    });
  });
}
