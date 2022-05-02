import { Box, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box paddingX="36px">
      <Text fontSize="2xl" marginTop="48px">
        우리 모두를 위한
      </Text>
      <Text fontSize="2xl">단 하나의 자막 플랫폼</Text>
      <Heading size="4xl" marginY="56px">
        SubCloud
      </Heading>
      <Button>무료로 시작하기</Button>
      <HStack marginY="48px">
        <Stack>
          <Button>Chrome</Button>
          <Text>1000 + Users</Text>
        </Stack>
        <Stack>
          <Button isDisabled>Safari</Button>
          <Text>Comming soon</Text>
        </Stack>
        <Stack>
          <Button isDisabled>Firefox</Button>
          <Text>Comming soon</Text>
        </Stack>
      </HStack>
    </Box>
  );
}

Home.hideTitle = true;
