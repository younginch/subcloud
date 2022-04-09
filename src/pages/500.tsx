import { Center, Heading, Divider, Text, Stack } from "@chakra-ui/react";
import Layout from "../components/layout";

export default function Page500() {
  return (
    <Layout hideTitle>
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
    </Layout>
  );
}
