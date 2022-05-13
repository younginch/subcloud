import { Box, Button, Text } from "@chakra-ui/react";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import axios from "axios";
import { useEffect, useState } from "react";

const pointList = [80, 500, 1200, 2500, 6500];
const priceList = [1200, 5900, 12000, 25000, 65000];

export default function Buy() {
  const [tossPayments, setTossPayments] = useState<any>();

  useEffect(() => {
    loadTossPayments("test_ck_5GePWvyJnrK4bNAaAZe8gLzN97Eo").then(
      (tossPayments) => {
        setTossPayments(tossPayments);
      }
    );
  }, []);

  return (
    <>
      <Box>
        <Text>15000 포인트</Text>
        <Button
          onClick={() => {
            axios.post("/api/order", { amount: 15000 }).then((res) => {
              tossPayments.requestPayment("카드", {
                amount: res.data.amount,
                orderId: res.data.id,
                orderName: "15000 포인트",
                customerName: "오승빈",
                successUrl: `${window.location.origin}/buy/success`,
                failUrl: `${window.location.origin}/buy/fail`,
              });
            });
          }}
        >
          Buy
        </Button>
      </Box>
    </>
  );
}
