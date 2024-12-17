import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type DeviceState = {
  deviceId: string;
  setDeviceId: (id: string) => void;
};

const useDeviceStore = create<DeviceState>()(
  persist(
    (set) => ({
      deviceId: "",
      setDeviceId: (id) => set({ deviceId: id }),
    }),
    {
      name: "device-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useDeviceStore;
