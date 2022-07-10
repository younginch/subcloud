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
  FormErrorMessage,
  Center,
} from "@chakra-ui/react";
import type { Provider } from "next-auth/providers";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import type { GetServerSidePropsContext } from "next/types";
import OAuthButtonGroup from "../../components/signin/oAuthButtonGroup";
import { PasswordField } from "../../components/signin/passwordField";
import React, { useRef } from "react";
import { PageOptions } from "../../utils/types";
import { useForm } from "react-hook-form";
import { SubcloudIcon } from "../../components/icons/customIcons";

type Props = {
  providers: Provider[];
  csrfToken: string;
};

type LoginFormData = {
  email: string;
  password: string;
};

export default function SignIn({ csrfToken }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  async function onSubmit(values: LoginFormData) {
    signIn("email-password", {
      email: values.email,
      password: values.password,
    });
  }

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="3">
          <Center>
            <SubcloudIcon size={100} fill="gray.600" />
          </Center>
          <Center>
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
              Sign in or sign up to your account
            </Heading>
          </Center>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
          boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="5">
                <FormControl isInvalid={errors.email !== undefined}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" {...register("email")} />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <PasswordField
                  isInvalid={errors.password !== undefined}
                  register={register("password")}
                  errorMessage={errors.password && errors.password.message}
                />
              </Stack>
              <HStack justify="space-between">
                {/* <Checkbox defaultChecked>Remember me</Checkbox> */}
                <PasswordReset csrfToken={csrfToken} />
              </HStack>
              <Stack spacing="6">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
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

SignIn.options = {
  auth: false,
  hideHeader: true,
  hideTitle: true,
} as PageOptions;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
}
