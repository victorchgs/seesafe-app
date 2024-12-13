import { Box } from "@/components/ui/box";
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { router } from "expo-router";

export default function Index() {
  const handleLowVisionFlux = () => {
    router.push("/imageCapture");
  };

  return (
    <Box className="h-full bg-white dark:bg-slate-900">
      <Center className="h-full">
        <ButtonGroup space="4xl">
          <Button
            onPress={handleLowVisionFlux}
            className="h-auto py-5 px-7 rounded-2xl"
          >
            <ButtonText className="text-2xl">Auxíliar de locomoção</ButtonText>
          </Button>
          <Button
            onPress={() => {
              router.push("/carer");
            }}
            className="h-auto py-5 px-7 rounded-2xl"
          >
            <ButtonText className="text-2xl">Sou cuidador</ButtonText>
          </Button>
        </ButtonGroup>
      </Center>
    </Box>
  );
}
