import {
  Text,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import type { Provider } from "next-auth/providers";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import type { GetServerSidePropsContext } from "next/types";
import { Logo } from "../../components/signin/logo";
import OAuthButtonGroup from "../../components/signin/oAuthButtonGroup";
import { PasswordField } from "../../components/signin/passwordField";
import React, { useRef } from "react";

type Props = {
  providers: Provider[];
  csrfToken: string;
};

export default function SignIn({ csrfToken }: Props) {
  const login = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signIn("email-password", {
      email,
      password,
    });
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
              Sign in or sign up to your account
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
          boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <form onSubmit={login}>
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" />
                </FormControl>
                <PasswordField />
              </Stack>
              <HStack justify="space-between">
                {/* <Checkbox defaultChecked>Remember me</Checkbox> */}
                <PasswordReset csrfToken={csrfToken} />
              </HStack>
              <Stack spacing="6">
                <Button type="submit" variant="primary">
                  Sign in
                </Button>
                <HStack>
                  <Divider />
                  <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

function PasswordReset({ csrfToken }: { csrfToken: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button onClick={onOpen} variant="link" colorScheme="blue" size="sm">
        Forgot password?
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Sign in without password</AlertDialogHeader>
          <AlertDialogCloseButton />
          <form method="post" action="/api/auth/signin/email">
            <AlertDialogBody>
              <FormControl>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input type="email" id="email" name="email" />
              </FormControl>
              <Input name="csrfToken" hidden defaultValue={csrfToken} />
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" ml={3} type="submit">
                Send
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

SignIn.hideHeader = true;
SignIn.hideTitle = true;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
}
