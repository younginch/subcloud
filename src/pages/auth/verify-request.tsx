import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { PageOptions } from "../../utils/types";
import { SiMinutemailer } from "react-icons/si";

export default function VerifyRequest() {
  return (
    <Container maxW={"3xl"}>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Center>
          <Box color="blue.400" w={70} h={70}>
            <SiMinutemailer color="inherit" size="max" />
          </Box>
        </Center>
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          <Text as={"span"} color={"blue.400"}>
            Verify your email
          </Text>
        </Heading>
        <Text
          color={"gray.500"}
          fontSize={{ base: "lg", sm: "1xl", md: "2xl" }}
        >
          We&apos;ve sent an email to verify your email address and activate
          your account. The link in the email will expire in 24 hours.
        </Text>
      </Stack>
    </Container>
  );
}

VerifyRequest.options = {
  auth: false,
  hideTitle: true,
} as PageOptions;
