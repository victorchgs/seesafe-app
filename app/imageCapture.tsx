import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";

export default function ImageCapture() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const captureInterval = useRef<NodeJS.Timeout | null>(null);

  const stopCapturing = () => {
    if (captureInterval.current) {
      clearInterval(captureInterval.current);
      captureInterval.current = null;
    }

    setIsCapturing(false);
  };

  const captureImage = async () => {
    if (!cameraRef.current || isCapturing) return;

    setIsCapturing(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: true,
      });

      const response = await fetch(
        "http://192.168.1.23:3000/proxy/imageCapture",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: photo?.base64 }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro no envio: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Resposta do servidor:", data);
    } catch (error) {
      console.error("Erro ao capturar/enviar a foto:", error);
    } finally {
      setIsCapturing(false);
    }
  }; //TODO: Estudar a estrutura da requisição (try, then, catch)

  useEffect(() => {
    if (permission?.granted) {
      captureInterval.current = setInterval(captureImage, 3000);
    }

    return () => clearInterval(captureInterval.current!); //TODO: parece não funcionar
  }, [permission?.granted]);

  if (!permission) {
    return <Box />;
  } //TODO: Tratar este caso

  if (!permission.granted) {
    return (
      <Box>
        <Heading>Precisamos de sua permissão para acessar a câmera</Heading>
        <Button onPress={requestPermission}>
          <ButtonText>Fornecer permissões</ButtonText>
        </Button>
      </Box>
    );
  } //TODO: Tratar este caso

  return (
    <Box className="h-full bg-white dark:bg-slate-900">
      <Center className="h-full">
        <Button
          onPress={() => {
            stopCapturing();
            router.back();
          }}
          className="h-auto py-5 px-7 rounded-2xl"
        >
          <ButtonText className="text-2xl">Voltar</ButtonText>
        </Button>
        <CameraView ref={cameraRef} />
      </Center>
    </Box>
  );
}
