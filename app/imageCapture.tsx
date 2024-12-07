import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { router } from "expo-router";

export default function ImageCapture() {
  return (
    <Box className="h-full bg-white dark:bg-slate-900">
      <Center className="h-full">
        <Button
          onPress={() => {
            router.back();
          }}
          className="h-auto py-10 px-8 rounded-2xl"
        >
          <ButtonText className="text-5xl">Voltar</ButtonText>
        </Button>
      </Center>
    </Box>
  );
}
