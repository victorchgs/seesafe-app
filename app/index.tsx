import { Box } from "@/components/ui/box";
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import useDeviceStore from "@/stores/device";
import { router } from "expo-router";

export default function Index() {
  const { deviceId, setDeviceId } = useDeviceStore();

  const handleLowVisionFlux = () => {
    fetch("http://192.168.1.10:3000/proxy/deviceAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deviceId }),
    })
      .then((response) => response.json())
      .then((data) => { //TODO: Mudar esse if?
        if (data.data.deviceId) {
          setDeviceId(data.data.deviceId);
        }

        router.push("/imageCapture");
      })
      .catch((error) => {
        console.error(
          "Erro ao fazer a requisição para o servidor proxy:",
          error
        );
      });
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
