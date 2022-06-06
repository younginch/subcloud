import { ReactNode } from "react";
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
  List,
  ListItem,
  ListIcon,
  useMediaQuery,
} from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import axios from "axios";
import { useEffect, useState } from "react";
import Point80 from "../../../public/IAPs/point80.png";
import Point500 from "../../../public/IAPs/point500.png";
import Point1200 from "../../../public/IAPs/point1200.png";
import Point2500 from "../../../public/IAPs/point2500.png";
import Point6500 from "../../../public/IAPs/point6500.png";
import PointIcon from "../../../public/point.png";
import InViewProvider from "../../components/inviewProvider";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { OrderType, Role } from "@prisma/client";
import { Products } from "../../utils/products";
import { FaCheckCircle } from "react-icons/fa";

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

const addList = Array<number>(5)
  .fill(0)
  .map((_, i) =>
    Math.round(
      Products[i].point -
        (Products[0].point * Products[i].price) / Products[0].price
    )
  );
const imageList = [Point80, Point500, Point1200, Point2500, Point6500];
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

export default function Buy() {
  const toast = useToast();
  const [tossPayments, setTossPayments] = useState<any>();
  const textColor = useColorModeValue("gray.700", "white");
  const [isMedium] = useMediaQuery("(min-width: 1200px)");

  useEffect(() => {
    loadTossPayments("test_ck_5GePWvyJnrK4bNAaAZe8gLzN97Eo").then(
      (tossPayments) => {
        setTossPayments(tossPayments);
      }
    );
  }, []);

  function PointCard({
    title,
    discountRate,
    point,
    add,
    price,
    src,
  }: PointCardProps) {
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
          borderRadius={"xl"}
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
                  .post("/api/order", {
                    type: OrderType.ChargePoint,
                    amount: price,
                  })
                  .then((res) => {
                    tossPayments
                      .requestPayment("카드", {
                        amount: res.data.amount,
                        orderId: res.data.id,
                        orderName: `${point} 포인트`,
                        successUrl: `${window.location.origin}/buy/process`,
                        failUrl: `${window.location.origin}/buy/fail`,
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

  return (
    <>
      <Box py={12} mt={15}>
        <VStack spacing={2} textAlign="center">
          <Heading as="h1" fontSize="4xl">
            Plans that fit your need
          </Heading>
          <Text fontSize="lg" color={"gray.500"}>
            Start with 14-day free trial. No credit card needed. Cancel at
            anytime.
          </Text>
        </VStack>
        <Stack
          direction={{ base: "column", md: "row" }}
          textAlign="center"
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={10}
        >
          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Pro
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  $
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  2
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /month
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue("gray.50", "gray.700")}
              py={4}
              borderBottomRadius={"xl"}
            >
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Remove Ads
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Receive free points up to $1
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Subtitles early access
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="red" variant="outline">
                  Start trial
                </Button>
              </Box>
            </VStack>
          </PriceWrapper>

          <PriceWrapper>
            <Box position="relative">
              <Box
                position="absolute"
                top="-16px"
                left="50%"
                style={{ transform: "translate(-50%)" }}
              >
                <Text
                  textTransform="uppercase"
                  bg={useColorModeValue("red.300", "red.700")}
                  px={3}
                  py={1}
                  color={useColorModeValue("gray.900", "gray.300")}
                  fontSize="sm"
                  fontWeight="600"
                  rounded="xl"
                >
                  Most Popular
                </Text>
              </Box>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  Education
                </Text>
                <HStack justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    $
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    4
                  </Text>
                  <Text fontSize="3xl" color="gray.500">
                    /month
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue("gray.50", "gray.700")}
                py={4}
                borderBottomRadius={"xl"}
              >
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Remove Ads
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Receive free points up to $2
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Subtitles early access
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="blue.500" />
                    Support language pair subtitles
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="blue.500" />
                    Support custom vocabulary
                  </ListItem>
                </List>
                <Box w="80%" pt={7}>
                  <Button w="full" colorScheme="red">
                    Start trial
                  </Button>
                </Box>
              </VStack>
            </Box>
          </PriceWrapper>
          <PriceWrapper>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Maker
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  plus $
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  5
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /month
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue("gray.50", "gray.700")}
              py={4}
              borderBottomRadius={"xl"}
            >
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Upgrade your Pro plans
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="yellow.500" />
                  unlimited portfolio update
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="yellow.500" />
                  Enable subtitle co-creation
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="red" variant="outline">
                  Start trial
                </Button>
              </Box>
            </VStack>
          </PriceWrapper>
        </Stack>
        <Box py={12} pl={3} pr={3}>
          <VStack spacing={2}>
            <Heading as="h1" fontSize="4xl">
              Buy Points
            </Heading>
            <Flex direction={isMedium ? "row" : "column"}>
              <HStack>
                <Text fontSize={{ base: "15px", md: "20px" }}>
                  포인트는 SubCloud내에서 자막을 요청하는데 사용할 수 있는
                  재화입니다.&nbsp;
                </Text>
              </HStack>
              <HStack
                alignItems="center"
                fontSize={{ base: "15px", md: "20px" }}
              >
                <Text>자세한 내용은</Text>
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
                <Text>을 참고해 주세요</Text>
              </HStack>
            </Flex>
          </VStack>
          <Flex justifyContent="center" py={6}>
            <Wrap justifyContent="center" spacing={4} className="buyWrap">
              {Products.map((product, index) => (
                <WrapItem key={index}>
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
      </Box>
    </>
  );
}

Buy.auth = Role.User;
Buy.hideTitle = true;
