import { Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { PageOptions } from "../../utils/types";

export default function VerifyRequest() {
  return (
    <>
      <Heading>Check your email</Heading>
      <Text>A sign in link has been sent to your email address.</Text>
      <Link href="/">subcloud.app</Link>
    </>
  );
}

VerifyRequest.options = {
  auth: false,
} as PageOptions;
