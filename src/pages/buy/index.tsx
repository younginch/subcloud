import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Text,
  useToast,
  Wrap,
  WrapItem,
  Stack,
  Heading,
  VStack,
  useColorModeValue,
  ListItem,
  ListIcon,
  useMediaQuery,
} from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import axios from "axios";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { OrderType, Role } from "@prisma/client";
import { FaCheckCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import Point1 from "../../../public/IAPs/point1.png";
import Point2 from "../../../public/IAPs/point2.png";
import Point3 from "../../../public/IAPs/point3.png";
import Point4 from "../../../public/IAPs/point4.png";
import Point5 from "../../../public/IAPs/point5.png";
import PointIcon from "../../../public/point.png";
import InViewProvider from "../../components/inviewProvider";
import { Products } from "../../utils/products";
import { PageOptions } from "../../utils/types";
import SubscribeItem from "../../components/buy/subscribeItem";

const addList = Array<number>(5)
  .fill(0)
  .map((_, i) =>
    Math.round(
      Products[i].point -
        (Products[0].point * Products[i].price) / Products[0].price
    )
  );
const imageList = [Point1, Point2, Point3, Point4, Point5];
const discountRate = Array<number>(5)
  .fill(0)
  .map((_, i) =>
    Math.round(
      100 *
        (1 -
          (Products[0].point * Products[i].price) /
            Products[i].point /
            Products[0].price)
    )
  );

type PointCardProps = {
  title: string;
  discountRate: number;
  point: number;
  add: number;
  price: number;
  src: StaticImageData;
};

function PointCard({
  title,
  discountRate,
  point,
  add,
  price,
  src,
}: PointCardProps) {
  const toast = useToast();
  const [toss, setToss] = useState<any>();
  const { data } = useSession();
  const textColor = useColorModeValue("gray.700", "white");

  useEffect(() => {
    loadTossPayments("test_ck_5GePWvyJnrK4bNAaAZe8gLzN97Eo").then(
      (tossPayments) => {
        setToss(tossPayments);
      }
    );
  }, []);

  return (
    <InViewProvider whileHover={1.05} initialScale={0.95}>
      <Box
        bg={useColorModeValue("gray.50", "gray.700")}
        w="201px"
        h="340px"
        justifyItems="center"
        mb={4}
        shadow="base"
        borderWidth="1px"
        alignSelf={{ base: "center", lg: "flex-start" }}
        borderColor={useColorModeValue("gray.200", "gray.500")}
        borderRadius="xl"
      >
        <Center
          bg={useColorModeValue("gray.200", "gray.600")}
          borderRadius="10px 10px 0px 0px"
          h="45px"
        >
          <Text color={textColor} fontSize="2xl" fontWeight="bold">
            {title}
          </Text>
        </Center>
        <Flex justifyContent="flex-end" h="30px" mt="2px" mb="-5x">
          {discountRate !== 0 && (
            <Text color="red.500" mr="7px" fontSize="lg" fontWeight="bold">
              -{discountRate}%
            </Text>
          )}
        </Flex>
        <Center paddingTop="10x">
          <Image src={src} alt="title" width="130px" height="130px" />
        </Center>
        <Center paddingTop="10x">
          <Text color={textColor} fontSize="4xl" fontWeight="bold" mr="4px">
            {point}
          </Text>
          <Image src={PointIcon} alt="point" width="33px" height="33px" />
        </Center>
        <Center h="25px" mt={-2}>
          {discountRate !== 0 && (
            <Flex alignItems="center">
              <Text color="yellow.600" fontWeight="bold">
                + {add}&nbsp;
              </Text>
              <Box width="20px" height="20px">
                <Image src={PointIcon} alt="title" />
              </Box>
            </Flex>
          )}
        </Center>
        <Center paddingTop="10x" mt="10px">
          <Button
            onClick={() => {
              axios
                .post("/api/user/order", {
                  type: OrderType.ChargePoint,
                  amount: price,
                })
                .then((res) => {
                  toss
                    .requestPayment("카드", {
                      amount: res.data.amount,
                      orderId: res.data.id,
                      orderName: `${point} 포인트`,
                      successUrl: `${window.location.origin}/buy/order/process`,
                      failUrl: `${window.location.origin}/buy/order/fail`,
                      customerName: data?.user?.name,
                      customerEmail: data?.user?.email,
                    })
                    .catch(() => {
                      toast({
                        title: "결제 취소",
                        description: "사용자가 결제를 취소하였습니다.",
                        status: "error",
                        isClosable: true,
                      });
                    });
                })
                .catch(() => {
                  toast({
                    title: "주문 생성 실패",
                    description: "주문 생성에 실패하였습니다.",
                    status: "error",
                    isClosable: true,
                  });
                });
            }}
            w="120px"
            colorScheme="green"
            shadow="md"
            borderRadius="15px"
            fontWeight="bold"
          >
            {price} 원
          </Button>
        </Center>
      </Box>
    </InViewProvider>
  );
}

export default function Buy() {
  const { t } = useTranslation("goods");
  const [isMedium] = useMediaQuery("(min-width: 1200px)");
  const showMembership = false;

  return (
    <Box py={12} mt={15}>
      <Box py={12} pl={3} pr={3}>
        <VStack spacing={2}>
          <Heading as="h1" fontSize="4xl">
            {t("buy_point_subtitle")}
          </Heading>
          <Flex direction={isMedium ? "row" : "column"}>
            <HStack>
              <Text fontSize={{ base: "15px", md: "20px" }}>
                {t("buy_point")}&nbsp;
              </Text>
            </HStack>
            <HStack alignItems="center" fontSize={{ base: "15px", md: "20px" }}>
              <Text>{t("buy_point_front")}</Text>
              <Link href="/qna" passHref>
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme="teal"
                  variant="outline"
                  width={{ base: "60px", md: "80px" }}
                  height={{ base: "25px", md: "30px" }}
                  fontSize={{ base: "13px", md: "17px" }}
                >
                  QNA
                </Button>
              </Link>
              <Text>{t("buy_point_back")}</Text>
            </HStack>
          </Flex>
        </VStack>
        <Flex justifyContent="center" py={6}>
          <Wrap justifyContent="center" spacing={4} className="buyWrap">
            {Products.map((product, index) => (
              <WrapItem key={product.point}>
                <PointCard
                  title={product.title}
                  discountRate={discountRate[index]}
                  point={product.point}
                  add={addList[index]}
                  price={product.price}
                  src={imageList[index]}
                />
              </WrapItem>
            ))}
          </Wrap>
        </Flex>
      </Box>
      {showMembership && (
        <>
          <VStack spacing={2} textAlign="center" mt="100px">
            <Heading as="h1" fontSize="4xl">
              {t("membership")}
            </Heading>
            <Text fontSize="lg" color="gray.500">
              {t("membership_explain")}
            </Text>
          </VStack>
          <Stack
            direction={{ base: "column", md: "row" }}
            textAlign="center"
            justify="center"
            spacing={{ base: 4, lg: 10 }}
            py={10}
          >
            <SubscribeItem price="2" title="Basic" disabled>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {t("remove_ads")}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {t("free_points")}
                {t("$1")}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {t("subtitle_access")}
              </ListItem>
            </SubscribeItem>
            <SubscribeItem price="4" header="MOST POPULAR" title="Pro" disabled>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {t("remove_ads")}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {t("free_points")}
                {t("$2")}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {t("subtitle_access")}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="blue.500" />
                {t("lang_pair")}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="blue.500" />
                {t("custom_voca")}
              </ListItem>
            </SubscribeItem>
            <SubscribeItem price="+5" title="Ultimate" disabled>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                {t("upgrade_pro")}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="yellow.500" />
                {t("portfolio")}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="yellow.500" />
                {t("sub_co_creation")}
              </ListItem>
            </SubscribeItem>
          </Stack>
        </>
      )}
    </Box>
  );
}

Buy.options = { role: Role.User, hideTitle: true } as PageOptions;
