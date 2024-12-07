import { Box } from "@/components/ui/box";
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { router } from "expo-router";

export default function Index() {
  return (
    <Box className="h-full bg-white dark:bg-slate-900">
      <Center className="h-full">
        <ButtonGroup>
          <Button
            onPress={() => {
              router.push("./imageCapture");
            }}
            className="h-auto py-10 px-8 rounded-2xl"
          >
            <ButtonText className="text-5xl">Auxíliar locomoção</ButtonText>
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
