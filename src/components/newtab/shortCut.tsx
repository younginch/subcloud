import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactElement } from "react";

type Props = {
  icon?: ReactElement;
  href: string;
  title: string;
};

export default function ShortCut({ icon, href, title }: Props) {
  return (
    <NextLink href={href}>
      <Box as={Button} bg="transparent" h="fit-content" border="none">
        <VStack>
          <Center borderRadius="50%" bg="white" w={10} h={10}>
            {icon}
          </Center>
          <Text color="gray.300">{title}</Text>
        </VStack>
      </Box>
    </NextLink>
  );
}
