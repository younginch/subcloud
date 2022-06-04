import { Button, Text, useToast } from "@chakra-ui/react";
import { Order } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BuySuccess() {
  const router = useRouter();
  const session = useSession();
  const toast = useToast();

  const [order, setOrder] = useState<Order>();
  useEffect(() => {
    if (!router.query.id) {
      return;
    }
    axios
      .get("/api/order", { params: { id: router.query.id } })
      .then((res) => {
        setOrder(res.data);
      })
      .catch(() => {
        toast({
          title: "주문 정보를 불러오는데 실패했습니다.",
          status: "error",
          isClosable: true,
        });
      });
  }, [router.query.id, toast]);

  return (
    <>
      <Text>결제 성공</Text>
      <Text>결제 ID: {order?.id}</Text>
      <Text>결제 금액: {order?.amount}</Text>
      <Text>결제 상태: {order?.status}</Text>
      <Button
        onClick={() => {
          router.push(`/user/${session?.data?.user.id}`);
        }}
      >
        프로필 페이지로 이동
      </Button>
    </>
  );
}
