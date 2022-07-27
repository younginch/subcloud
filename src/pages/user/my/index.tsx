import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { Role, Sub, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import {
  PageOptions,
  ResRequestSearch,
  ResSubSearch,
} from "../../../utils/types";
import RoleBadge from "../../../components/badges/roleBadge";
import CalendarChart from "../../../components/user/graphs/calanderChart";
import RecentReviews from "../../../components/user/my/recentReviews";
import DetailViewGraph from "../../../components/user/my/detailViewGraph";
import SubStatusPreview from "../../../components/user/my/subStatusPreview";
import ActivityHeader from "../../../components/user/my/activityHeader";

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
  const [isPc] = useMediaQuery("(min-width: 1180px)");
  console.log(isPc);

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
            color="white"
            rounded="md"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            {t("dash_public_profile")}
          </Button>
        </Link>
      </HStack>
      <Box overflowY="scroll" h="calc(90vh - 170px)">
        <ActivityHeader
          requests={requests?.length ?? 0}
          views={views ?? 0}
          points={session.data?.user.point ?? 0}
        />
        <Grid
          templateRows={isPc ? "repeat(10, 1fr)" : "repeat(4, 1fr)"}
          templateColumns="repeat(10, 1fr)"
          gap={isPc ? 5 : 4}
          p={5}
        >
          <GridItem rowStart={1} rowEnd={isPc ? 5 : 2} colSpan={isPc ? 5 : 10}>
            <Box
              h="100%"
              bg={panelColor}
              boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
              borderRadius="12px"
              p="20px"
              overflow="hidden"
              borderWidth={useColorModeValue("1px", "none")}
              className="private-heatmap"
            >
              <Text fontSize="lg" fontWeight="bold" mb="4px">
                {t("dash_stat_sub")}
              </Text>
              <HStack>
                <Spacer />
                <Text fontSize="md" fontWeight="medium" color="gray.500">
                  {t("dash_total_sub")} : {subs?.length ?? 0}
                </Text>
              </HStack>
              <CalendarChart
                range={150}
                type="day"
                userId={session.data?.user.id}
              />
            </Box>
          </GridItem>
          <GridItem
            rowStart={isPc ? 1 : 2}
            rowEnd={isPc ? 5 : 3}
            colSpan={isPc ? 5 : 10}
          >
            <Box
              h="100%"
              bg={panelColor}
              boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
              borderRadius="12px"
              pt="15px"
              pl="15px"
              borderWidth={useColorModeValue("1px", "none")}
            >
              <Text fontSize="lg" fontWeight="bold">
                {t("dash_recent_review")}
              </Text>
              <RecentReviews />
            </Box>
          </GridItem>
          <GridItem
            rowStart={isPc ? 5 : 3}
            rowEnd={isPc ? 11 : 4}
            colSpan={isPc ? 6 : 10}
          >
            <Box
              bg={panelColor}
              boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
              borderRadius="12px"
              p="20px"
              borderWidth={useColorModeValue("1px", "none")}
            >
              <Text fontSize="lg" fontWeight="bold" mb="4px">
                {t("dash_sub_view")}
              </Text>
              <DetailViewGraph subId={undefined} />
            </Box>
          </GridItem>
          <GridItem
            rowStart={isPc ? 5 : 4}
            rowEnd={isPc ? 11 : 5}
            colSpan={isPc ? 4 : 10}
          >
            <Box
              bg={panelColor}
              boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
              borderRadius="12px"
              p="20px"
              pr="0px"
              borderWidth={useColorModeValue("1px", "none")}
            >
              <Text fontSize="lg" fontWeight="bold" mb="4px">
                {t("dash_sub_review")}
              </Text>
              <Box maxH="300px" overflowY="auto">
                <SubStatusPreview />
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Stack>
  );
}

UserMyIndex.options = {
  role: Role.User,
  hideTitle: true,
  hideFooter: true,
  bgColorLight: "#F7FAFC",
} as PageOptions;
