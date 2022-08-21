import { Stack, useColorModeValue } from "@chakra-ui/react";

type Props = {
  h: string;
  children: React.ReactNode;
};

export default function NewItemCard({ h, children }: Props) {
  return (
    <Stack
      w="300px"
      h={h}
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="10px"
      overflow="hidden"
      boxShadow="base"
      position="relative"
    >
      {children}
    </Stack>
  );
}
