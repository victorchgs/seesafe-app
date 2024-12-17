import { Gyroscope } from "expo-sensors";

export async function startGyroscope() {
  const available = await Gyroscope.isAvailableAsync();
  if (!available) {
    throw new Error("Giroscópio não está disponível.");
  }

  return new Promise((resolve) => {
    const subscription = Gyroscope.addListener((gyroscopeData) => {
      subscription.remove();
      resolve(gyroscopeData);
    });
  });
}
