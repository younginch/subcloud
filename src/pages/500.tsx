import { Center, Heading, Divider, Text, Stack } from "@chakra-ui/react";
import { PageOptions } from "../utils/types";

export default function Page500() {
  return (
    <Center marginTop="20vh">
      <Stack>
        <Heading
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="9xl"
          fontWeight="extrabold"
        >
          500
        </Heading>
        <Divider />
        <Text fontSize="4xl" fontWeight="extrabold">
          Server error
        </Text>
      </Stack>
    </Center>
  );
}

Page500.options = { auth: false, hideTitle: true } as PageOptions;
