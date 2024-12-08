import { Box } from "@/components/ui/box";
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { router } from "expo-router";
import { Alert } from "react-native";

import credential from "@/data/credential.json";

export default function Index() {
  const handleLowVisionFlux = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.9:3000/proxy/lowVisionAuth",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: credential.id }),
        }
      );

      const result = await response.json();

      const parsedData = JSON.parse(result?.data ?? "{}");
      const id = parsedData?.id;

      console.log(id);

      router.push("./imageCapture");
    } catch (error) {
      console.error("Erro ao conectar ao servidor intermediário:", error);
      Alert.alert("Erro", "Falha ao se comunicar com o servidor intermediário");
    }
  };

  return (
    <Box className="h-full bg-white dark:bg-slate-900">
      <Center className="h-full">
        <ButtonGroup space="4xl">
          <Button
            onPress={handleLowVisionFlux}
            className="h-auto py-10 px-8 rounded-2xl"
          >
            <ButtonText className="text-5xl">Auxíliar de locomoção</ButtonText>
          </Button>
          <Button
            onPress={() => {
              router.push("./carer");
            }}
            className="h-auto py-10 px-8 rounded-2xl"
          >
            <ButtonText className="text-5xl">Sou cuidador</ButtonText>
          </Button>
        </ButtonGroup>
      </Center>
    </Box>
  );
}
