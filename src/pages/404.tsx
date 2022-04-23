import { Center, Heading, Divider, Text, Stack } from "@chakra-ui/react";

export default function Page404() {
  return (
    <>
      <Center marginTop="20vh">
        <Stack>
          <Heading
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="9xl"
            fontWeight="extrabold"
          >
            404
          </Heading>
          <Divider />
          <Text fontSize="4xl" fontWeight="extrabold">
            Page not found
          </Text>
        </Stack>
      </Center>
    </>
  );
}

Page404.hideTitle = true;
