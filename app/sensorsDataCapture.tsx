import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import useDeviceStore from "@/stores/device";
import { startAccelerometer } from "@/utils/startAccelerometer";
import { startGeolocation } from "@/utils/startGeolocation";
import { startGyroscope } from "@/utils/startGyroscope";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";

export default function SensorsDataCapture() {
  const [accelerometerData, setAccelerometerData] = useState<any>(null);
  const [geolocationData, setGeolocationData] = useState<any>(null);
  const [gyroscopeData, setGyroscopeData] = useState<any>(null);
  const [imageData, setImageData] = useState<string>();
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const { deviceId, setDeviceId } = useDeviceStore();
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (permission?.granted === false) {
      requestPermission();
    }
  }, [permission]);

  const handleDataCapture = async () => {
    setIsLoading(true);

    try {
      const gyroscopeData = await startGyroscope();
      setGyroscopeData(gyroscopeData);

      const accelerometerData = await startAccelerometer();
      setAccelerometerData(accelerometerData);

      const geolocationData = await startGeolocation();
      setGeolocationData(geolocationData);

      await captureImage();
      await sendDataToServer();
    } catch (error) {
      console.error("Erro ao capturar os dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const captureImage = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: true,
          shutterSound: false,
        });

        setImageData(photo?.uri);
      } catch (error) {
        console.error("Erro ao capturar a imagem:", error);
      }
    }
  };

  const sendDataToServer = async () => {
    const data = {
      deviceId,
      accelerometerData,
      gyroscopeData,
      geolocationData,
      imageData,
    };

    try {
      const response = await fetch(
        "http://192.168.1.3:3000/proxy/sensorsDataCapture",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    } catch (error) {
      console.error("Erro ao enviar dados para o servidor proxy:", error);
    }
  };

  return (
    <Box className="h-full bg-white dark:bg-slate-900">
      <Center className="h-full">
        <Button
          onPress={() => {
            router.back();
          }}
          className="h-auto py-5 px-7 rounded-2xl"
        >
          <ButtonText className="text-2xl">Voltar</ButtonText>
        </Button>
        <Button
          onPress={handleDataCapture}
          className="h-auto py-5 px-7 rounded-2xl mt-12"
          isDisabled={isLoading}
        >
          <ButtonText className="text-2xl">Capturar dados</ButtonText>
          {isLoading && <ButtonSpinner size="small" color="white" />}
        </Button>
        {permission?.granted && <CameraView ref={cameraRef} />}
      </Center>
    </Box>
  );
}
