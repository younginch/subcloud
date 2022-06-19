import {
  Avatar,
  Box,
  Button,
  HStack,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Role, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { PageOptions } from "../../../utils/types";
import Link from "next/link";
import TierBadge from "../../../components/user/tierBadge";
import { UserTier } from "../../../utils/tier";
import RoleBadge from "../../../components/user/roleBadge";
import CalendarChart from "../../../components/user/graphs/calanderChart";
import { faker } from "@faker-js/faker";
import RecentReviews from "../../../components/user/my/recentReviews";
import DetailViewGraph from "../../../components/user/my/detailViewGraph";

export default function UserMyIndex() {
  const session = useSession();

  const { data } = useSWR<User>(`/api/user?id=${session.data?.user.id}`);
  const panelColor = useColorModeValue("white", "gray.700");

  const activityRange = 150;
  const activityArray = Array.apply(null, Array(activityRange)).map(
    function () {
      return faker.datatype.number({ min: 0, max: 3 });
    }
  );

  return (
    <Stack>
      <HStack
        marginBottom="18px"
        bg={panelColor}
        w="100%"
        h="170px"
        pr="40px"
        pl="40px"
        borderBottomWidth="2px"
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
            <TierBadge tier={UserTier.Master} />
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
            내 퍼블릭 프로필
          </Button>
        </Link>
      </HStack>
      <Wrap p="30px">
        <WrapItem>
          <Box
            w="500px"
            h="250px"
            bg={panelColor}
            boxShadow={"0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"}
            borderRadius="12px"
            p="20px"
            overflow="hidden"
          >
            <Text fontSize="lg" fontWeight="bold" mb="4px">
              자막 제작 통계
            </Text>
            <HStack>
              <Spacer />
              <Text fontSize="md" fontWeight="medium" color="gray.500">
                총 자막 수 :{" "}
                {activityArray.reduce(function add(sum: number, value: number) {
                  return sum + value;
                }, 0)}
              </Text>
            </HStack>
            <CalendarChart subRange={activityRange} subArray={activityArray} />
          </Box>
        </WrapItem>
        <WrapItem>
          <Box
            w="500px"
            h="350px"
            bg={panelColor}
            boxShadow={"0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"}
            borderRadius="12px"
            pt="15px"
            pl="15px"
          >
            <Text fontSize="lg" fontWeight="bold">
              최근 리뷰
            </Text>
            <RecentReviews />
          </Box>
        </WrapItem>
        <WrapItem>
          <Box
            w="250px"
            h="100px"
            bg={panelColor}
            boxShadow={"0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"}
            borderRadius="12px"
            p="20px"
          >
            <Text fontSize="lg" fontWeight="bold" mb="4px">
              보유 포인트
            </Text>
            <Text>{data?.point} 포인트</Text>
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
          >
            <Text fontSize="lg" fontWeight="bold" mb="4px">
              자막 조회수
            </Text>
            <DetailViewGraph />
          </Box>
        </WrapItem>
      </Wrap>
    </Stack>
  );
}

UserMyIndex.options = {
  role: Role.User,
  hideTitle: true,
  bgColorLight: "#F7FAFC",
} as PageOptions;
