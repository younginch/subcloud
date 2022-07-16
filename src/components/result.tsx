import { Stack, useColorModeValue } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export default function Result({ children }: Props) {
  const bgColor = useColorModeValue("white", "gray.700");
  return (
    <Stack alignItems="center" justifyContent="center" w="100%" h="60vh">
      <Stack
        w="400px"
        maxW="90%"
        alignItems="center"
        bg={bgColor}
        borderRadius="15px"
        boxShadow="2xl"
        p="40px 25px 30px 25px"
        spacing="15px"
      >
        {children}
      </Stack>
    </Stack>
  );
}
