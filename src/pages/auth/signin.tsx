import { Box, Button, Center, Heading, Stack } from "@chakra-ui/react";
import type { Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import type { GetServerSidePropsContext } from "next/types";
import Layout from "../../components/layout";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/router";

type Props = {
  providers: Provider[];
};

export default function SignIn({ providers }: Props) {
  const router = useRouter();

  return (
    <Layout hideNavBar hideTitle>
      <Center marginLeft="-150px" position="absolute" top="30%" left="50%">
        <Box w="300px" borderRadius={12} borderWidth={1}>
          <Stack margin={6}>
            <Heading>Sign In</Heading>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <Button
                  leftIcon={<FaGithub />}
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: router.query["callbackUrl"] as string,
                    })
                  }
                >
                  Sign in with {provider.name}
                </Button>
              </div>
            ))}
          </Stack>
        </Box>
      </Center>
    </Layout>
  );
}

export async function getServerSideProps(_: GetServerSidePropsContext) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
