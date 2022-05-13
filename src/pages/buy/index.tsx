import { Box, Button, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import axios from "axios";
import { useEffect, useState } from "react";

const pointList = [80, 500, 1200, 2500, 6500];
const priceList = [1200, 5900, 12000, 25000, 65000];

type PointCardProps = {
  point: number;
  price: number;
};

export default function Buy() {
  const [tossPayments, setTossPayments] = useState<any>();

  useEffect(() => {
    loadTossPayments("test_ck_5GePWvyJnrK4bNAaAZe8gLzN97Eo").then(
      (tossPayments) => {
        setTossPayments(tossPayments);
      }
    );
  }, []);

  function PointCard({ point, price }: PointCardProps) {
    return (
      <Box>
        <Text>{point} 포인트</Text>
        <Text>{price} 원</Text>
        <Button
          onClick={() => {
            axios.post("/api/order", { amount: price }).then((res) => {
              tossPayments.requestPayment("카드", {
                amount: res.data.amount,
                orderId: res.data.id,
                orderName: `${point} 포인트`,
                successUrl: `${window.location.origin}/buy/success`,
                failUrl: `${window.location.origin}/buy/fail`,
              });
            });
          }}
        >
          Buy
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Wrap>
        {pointList.map((point, index) => (
          <WrapItem key={index}>
            <PointCard point={point} price={priceList[index]} />
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
}
