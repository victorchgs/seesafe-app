import { Box } from "@/components/ui/box";
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
} from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  EyeIcon,
  EyeOffIcon,
} from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

export default function Index() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = () => {
    if (inputValue.length < 6) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <Box className="h-full bg-white dark:bg-slate-900">
      <Center className="h-full">
        <VStack space="2xl" className="w-2/3">
          <Heading className="text-4xl">Acesse sua conta</Heading>
          <FormControl
            isInvalid={isInvalid}
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <VStack space="sm">
              <FormControlLabel>
                <FormControlLabelText className="text-2xl">
                  E-mail
                </FormControlLabelText>
              </FormControlLabel>
              <Input className="h-auto">
                <InputField
                  type="text"
                  placeholder="Email"
                  value={inputValue}
                  onChangeText={(text) => setInputValue(text)}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>Campo obrigatório</FormControlErrorText>
              </FormControlError>
            </VStack>
          </FormControl>
          <FormControl
            isInvalid={isInvalid}
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <VStack space="sm">
              <FormControlLabel>
                <FormControlLabelText className="text-2xl">
                  Senha
                </FormControlLabelText>
              </FormControlLabel>
              <Input className="h-auto">
                <InputField type="password" placeholder="Senha" />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>Campo obrigatório</FormControlErrorText>
              </FormControlError>
            </VStack>
          </FormControl>
          <Button variant="link" className="self-end">
            <ButtonText>Esqueceu sua senha?</ButtonText>
          </Button>
          <Button onPress={handleSubmit}>
            <ButtonText>Entrar</ButtonText>
          </Button>
          <Button variant="link">
            <ButtonText>Não possui uma conta? Faça o cadastro</ButtonText>
          </Button>
        </VStack>
      </Center>
    </Box>
  );
}
