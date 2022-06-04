import { CircularProgress, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function BuyProcess() {
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    if (
      !router.query.orderId &&
      !router.query.paymentKey &&
      !router.query.amount
    ) {
      return;
    }
    axios
      .patch(
        "/api/order",
        { paymentKey: router.query.paymentKey, amount: router.query.amount },
        { params: { id: router.query.orderId } }
      )
      .then((res) => {
        router.push(`/buy/success?id=${res.data.id}`);
      })
      .catch((err) => {
        toast({
          title: "주문 정보를 불러오는데 실패했습니다.",
          status: "error",
          isClosable: true,
          description: err.message,
        });
      });
  }, [router, toast]);

  return (
    <>
      <CircularProgress isIndeterminate />
    </>
  );
}
