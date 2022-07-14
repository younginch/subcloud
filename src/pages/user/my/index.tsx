import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Role, Sub, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import {
  PageOptions,
  ResRequestSearch,
  ResSubSearch,
} from "../../../utils/types";
import Link from "next/link";
import TierBadge from "../../../components/badges/tierBadge";
import { UserTier } from "../../../utils/tier";
import RoleBadge from "../../../components/badges/roleBadge";
import CalendarChart from "../../../components/user/graphs/calanderChart";
import RecentReviews from "../../../components/user/my/recentReviews";
import DetailViewGraph from "../../../components/user/my/detailViewGraph";
import SubStatusPreview from "../../../components/user/my/subStatusPreview";
import ActivityHeader from "../../../components/user/my/activityHeader";
import SwingProvider from "../../../components/swingProvider";
import useTranslation from "next-translate/useTranslation";

export default function UserMyIndex() {
  const { t } = useTranslation("privateProfile");
  const session = useSession();

  const { data } = useSWR<User>(`/api/user?id=${session.data?.user.id}`);
  const { data: requests } = useSWR<ResRequestSearch>(
    `/api/public/search/request?userId=${session.data?.user.id}`
  );
  const { data: subs } = useSWR<ResSubSearch>(
    `/api/public/search/sub?userId=${session.data?.user.id}`
  );
  const views = subs?.reduce((prev: number, curr: Sub) => prev + curr.views, 0);
  const panelColor = useColorModeValue("white", "gray.700");

  return (
    <Stack w="fit-content">
      <HStack
        marginBottom="10px"
        bg={panelColor}
        w="100%"
        h="170px"
        pr="40px"
        pl="40px"
        borderBottomWidth={useColorModeValue("2px", "none")}
      >
        <Avatar
          size="xl"
          name={data?.name ?? undefined}
          src={data?.image ?? undefined}
          mr="22px"
        />
        <Stack>
          <HStack>
            <Text
              minW="55px"
              fontSize={{ base: "lg", lg: "xl" }}
              fontWeight="bold"
              ms={{ base: "8px", md: "0px" }}
            >
              {data?.name}
            </Text>
            <RoleBadge role={data?.role} />
          </HStack>
          <Text
            fontSize={{ base: "sm", lg: "md" }}
            color={useColorModeValue("gray.400", "gray.300")}
            fontWeight="semibold"
          >
            {data?.email}
          </Text>
        </Stack>
        <Spacer />
        <Link href={`/user/${session.data?.user.id}`} passHref>
          <Button
            minW="140px"
            bg={useColorModeValue("#151f21", "gray.900")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            {t("public_profile")}
          </Button>
        </Link>
      </HStack>
      <Box overflowY="scroll" h="calc(90vh - 170px)">
        <ActivityHeader
          requests={requests?.length ?? 0}
          views={views ?? 0}
          points={session.data?.user.point ?? 0}
        />
        <Wrap p="30px" spacing={"20px"}>
          <WrapItem>
            <Box
              w="500px"
              h="250px"
              bg={panelColor}
              boxShadow={"0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"}
              borderRadius="12px"
              p="20px"
              overflow="hidden"
              borderWidth={useColorModeValue("1px", "none")}
            >
              <Text fontSize="lg" fontWeight="bold" mb="4px">
                {t("stat_sub")}
              </Text>
              <HStack>
                <Spacer />
                <Text fontSize="md" fontWeight="medium" color="gray.500">
                  {t("total_sub")} : {subs?.length ?? 0}
                </Text>
              </HStack>
              <CalendarChart
                range={150}
                type={"day"}
                userId={session.data?.user.id}
              />
            </Box>
          </WrapItem>
          <WrapItem>
            <Box
              w="500px"
              maxH="350px"
              bg={panelColor}
              boxShadow={"0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"}
              borderRadius="12px"
              pt="15px"
              pl="15px"
              borderWidth={useColorModeValue("1px", "none")}
            >
              <Text fontSize="lg" fontWeight="bold">
                {t("recent_review")}
              </Text>
              <RecentReviews />
            </Box>
          </WrapItem>
          <WrapItem>
            <Box
              w="180px"
              h="170px"
              bg={panelColor}
              boxShadow={"0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"}
              borderRadius="12px"
              p="20px"
              borderWidth={useColorModeValue("1px", "none")}
            >
              <Text fontSize="lg" fontWeight="bold" mb="4px">
                {t("membership")}
              </Text>
              <Center>
                <SwingProvider>
                  <Text
                    fontSize={50}
                    fontWeight={"bold"}
                    bgGradient={useColorModeValue(
                      "linear(to-l, #7928CA, #FF0080)",
                      "linear(to-l, #8e50cc, #fb52a7)"
                    )}
                    bgClip="text"
                  >
                    PRO
                  </Text>
                </SwingProvider>
              </Center>
              <Link href={`/buy`}>
                <Text
                  color={useColorModeValue("gray.800", "gray.200")}
                  _hover={{ textDecoration: "underline" }}
                  mt="10px"
                >
                  {t("upgrade")}
                </Text>
              </Link>
            </Box>
          </WrapItem>
          <WrapItem>
            <Box
              w="700px"
              h="350px"
              bg={panelColor}
              boxShadow={"0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"}
              borderRadius="12px"
              p="20px"
              borderWidth={useColorModeValue("1px", "none")}
            >
              <Text fontSize="lg" fontWeight="bold" mb="4px">
                {t("sub_view")}
              </Text>
              <DetailViewGraph subId={undefined} />
            </Box>
          </WrapItem>
          <WrapItem>
            <Box
              w="500px"
              h="350px"
              bg={panelColor}
              boxShadow={"0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"}
              borderRadius="12px"
              p="20px"
              pr="0px"
              borderWidth={useColorModeValue("1px", "none")}
            >
              <Text fontSize="lg" fontWeight="bold" mb="4px">
                {t("sub_review")}
              </Text>
              <Box maxH="300px" overflowY="scroll">
                <SubStatusPreview />
              </Box>
            </Box>
          </WrapItem>
        </Wrap>
      </Box>
    </Stack>
  );
}

UserMyIndex.options = {
  role: Role.User,
  hideTitle: true,
  bgColorLight: "#F7FAFC",
} as PageOptions;
