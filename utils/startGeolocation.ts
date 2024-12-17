import * as Location from "expo-location";

export async function startGeolocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permissão para acessar a localização foi negada.");
  }

  return new Promise((resolve, reject) => {
    Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    })
      .then((location) => resolve(location))
      .catch((error) => reject(error));
  });
}
