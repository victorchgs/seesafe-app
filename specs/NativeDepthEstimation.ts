import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  getDepthMap(imagePath: string): Promise<Float32Array[][]>;
}

export default TurboModuleRegistry.getEnforcing<Spec>("NativeDepthEstimation");
