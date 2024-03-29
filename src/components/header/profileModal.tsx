import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Stack,
  useColorModeValue,
  Text,
  Heading,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { Role } from "@prisma/client";
import axios from "axios";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import router from "next/router";
import useSWR from "swr";
import isRightRole from "../../utils/role";

export default function ProfileModal() {
  const { t } = useTranslation("profileModal");
  const { data: session } = useSession();
  const { data } = useSWR<Session>("/api/auth/session");
  const { data: subData } = useSWR(
    `/api/public/search/sub?userId=${session?.user.id}&status=Approved`
  );
  const { data: requestData } = useSWR(
    `/api/public/search/request?userId=${session?.user.id}`
  );

  return (
    <Center>
      <Box
        w="full"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="2xl"
        rounded="md"
        overflow="hidden"
      >
        <Image
          h="80px"
          w="full"
          src="https://demos.creative-tim.com/purity-ui-dashboard/static/media/ProfileBackground.4dc796b0.png"
          objectFit="cover"
          alt="Profile image"
        />
        <Flex justify="center" mt={-12}>
          <Avatar
            size="xl"
            src={data?.user.image ?? undefined}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>
        <Box p={6}>
          <Stack spacing={0} align="center" mb={5}>
            <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
              {data?.user.name}
            </Heading>
            <Text color="gray.500">{data?.user.email}</Text>
          </Stack>

          <Stack direction="row" justify="center" spacing={6}>
            <Stack spacing={0} align="center">
              <Text fontWeight={600}>{requestData?.length ?? 0}</Text>
              <Text fontSize="sm" color="gray.500">
                {t("request")}
              </Text>
            </Stack>
            <Stack spacing={0} align="center">
              <Text fontWeight={600}>{subData?.length ?? 0}</Text>
              <Text fontSize="sm" color="gray.500">
                {t("subtitle")}
              </Text>
            </Stack>
          </Stack>
          <Link href="/user/my" passHref>
            <Button
              w="full"
              bg={useColorModeValue("#151f21", "gray.900")}
              color="white"
              rounded="md"
              mt={5}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              {t("profile")}
            </Button>
          </Link>
          <HStack mt={4}>
            <Button
              colorScheme="blue"
              onClick={() => {
                signOut();
              }}
            >
              {t("signOut")}
            </Button>
            <Spacer />
            {(isRightRole(session?.user.role, Role.Admin) ||
              process.env.NODE_ENV !== "production") && (
              <Button
                onClick={async () => {
                  if (process.env.NODE_ENV !== "production") {
                    await axios.patch("/api/user/debug", {
                      id: session?.user.id,
                    });
                  }
                  router.push("/admin");
                }}
              >
                Admin
              </Button>
            )}
            {(isRightRole(session?.user.role, Role.Reviewer) ||
              process.env.NODE_ENV !== "production") && (
              <Button
                onClick={async () => {
                  if (process.env.NODE_ENV !== "production") {
                    await axios.patch("/api/user/debug", {
                      id: session?.user.id,
                    });
                  }
                  router.push("/review");
                }}
              >
                {t("review")}
              </Button>
            )}
          </HStack>
        </Box>
      </Box>
    </Center>
  );
}
