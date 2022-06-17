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
import React, { useRef } from "react";
import useSWR, { KeyedMutator, mutate } from "swr";
import { PageOptions } from "../../../utils/types";

export default function UserMyOrder() {
  const session = useSession();
  const { data, mutate } = useSWR<Order[]>(
    `/api/order/search?userId=${session.data?.user.id}`
  );

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th isNumeric>Amount</Th>
            <Th>Status</Th>
            <Th>작업</Th>
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
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  function handleRefund() {
    axios
      .delete(`/api/order?id=${id}`)
      .then(() => {
        toast({
          title: "주문이 취소되었습니다.",
          status: "success",
        });
        onClose();
      })
      .catch((err) => {
        toast({
          title: "주문 취소 실패",
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
        Refund order
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Refund order
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleRefund();
                }}
                ml={3}
              >
                Refund
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

UserMyOrder.options = { role: Role.User, hideTitle: true } as PageOptions;
