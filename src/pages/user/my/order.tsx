import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Order, Role } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import React, { useRef } from "react";
import useSWR, { KeyedMutator, mutate } from "swr";
import { PageOptions } from "../../../utils/types";

export default function UserMyOrder() {
  const { t } = useTranslation("privateProfile");
  const session = useSession();
  const { data, mutate } = useSWR<Order[]>(
    `/api/user/order/search?userId=${session.data?.user.id}`
  );

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{t("orders_type")}</Th>
            <Th isNumeric>{t("orders_amount")}</Th>
            <Th>{t("status")}</Th>
            <Th>{t("task")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((order) => {
            return (
              <Tr key={order.id}>
                <Td>{order.type}</Td>
                <Td isNumeric>{order.amount}</Td>
                <Td>{order.status}</Td>
                <Td>
                  <DeleteOrderButton id={order.id} mutate={mutate} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

type DeleteOrderButtonProps = {
  id: string;
  mutate: KeyedMutator<Order[]>;
};

function DeleteOrderButton({ id, mutate }: DeleteOrderButtonProps) {
  const { t } = useTranslation("privateProfile");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  function handleRefund() {
    axios
      .delete(`/api/user/order?id=${id}`)
      .then(() => {
        toast({
          title: t("orders_refund_com"),
          status: "success",
        });
        onClose();
      })
      .catch((err) => {
        toast({
          title: t("orders_refund_fail"),
          description: err.message,
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => {
        mutate();
        onClose();
      });
  }

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        {t("orders_refund")}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t("orders_refund")}
            </AlertDialogHeader>

            <AlertDialogBody>{t("orders_sure")}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t("cancel")}
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleRefund();
                }}
                ml={3}
              >
                {t("orders_refund")}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

UserMyOrder.options = {
  role: Role.User,
  hideTitle: true,
  hideFooter: true,
} as PageOptions;
