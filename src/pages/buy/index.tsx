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

const titleList = [
  "Starter pack",
  "Small pack",
  "Normal pack",
  "Large pack",
  "Point bucket",
];
const pointList = [80, 500, 1200, 2500, 6500];
const priceList = [1200, 5900, 12000, 25000, 65000];
const addList = Array<number>(5)
  .fill(0)
  .map((_, i) =>
    Math.round(pointList[i] - (pointList[0] * priceList[i]) / priceList[0])
  );
const imageList = [Point80, Point500, Point1200, Point2500, Point6500];
const discountRate = Array<number>(5)
  .fill(0)
  .map((_, i) =>
    Math.round(
      100 * (1 - (pointList[0] * priceList[i]) / pointList[i] / priceList[0])
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
          bg="#c2a88b"
          borderRadius="7px"
          w="201px"
          h="340px"
          justifyItems="center"
        >
          <Center bg="#9e8c75" borderRadius="10px 10px 0px 0px" h="45px">
            <Text color="white" fontSize="2xl" fontWeight="bold">
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
            <Text fontSize="4xl" fontWeight="bold" color="white" mr="4px">
              {point}
            </Text>
            <Image src={PointIcon} alt="point" width="33px" height="33px" />
          </Center>
          <Center h="25px" mt={-2}>
            {discountRate !== 0 && (
              <Flex alignItems="center">
                <Text color="#ffd949">+ {add}&nbsp;</Text>
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
                  .post("/api/order", { amount: price })
                  .then((res) => {
                    tossPayments
                      .requestPayment("카드", {
                        amount: res.data.amount,
                        orderId: res.data.id,
                        orderName: `${point} 포인트`,
                        successUrl: `${window.location.origin}/buy/success`,
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
      <Flex align="flex-start" direction="column" mb="20px" mt="10px">
        <Text fontSize="2xl" fontWeight="bold">
          포인트란?
        </Text>
        <HStack>
          <Text fontSize="lg">
            포인트는 SubCloud내에서 자막을 요청하는데 사용할 수 있는 재화입니다.
            자세한 내용은
          </Text>
          <Link href="/qna" passHref>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              variant="outline"
              size="sm"
            >
              QNA
            </Button>
          </Link>
          <Text fontSize="lg">을 참고해 주세요</Text>
        </HStack>
      </Flex>
      <Wrap>
        {pointList.map((point, index) => (
          <WrapItem key={index}>
            <PointCard
              title={titleList[index]}
              discountRate={discountRate[index]}
              point={point}
              add={addList[index]}
              price={priceList[index]}
              src={imageList[index]}
            />
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
}
