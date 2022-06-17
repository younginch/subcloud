import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Role, Settle, SettlePoint } from "@prisma/client";
import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";
import useSWR from "swr";
import { PageOptions } from "../../utils/types";

export default function AdminSettle() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [point, setPoint] = useState(0);
  const { data, mutate } = useSWR<
    (Settle & {
      settlePoints: SettlePoint[];
    })[]
  >("/api/admin/settle");

  async function handleSettle() {
    axios
      .post(`/api/admin/settle`, {
        startAt: new Date(0),
        endAt: new Date(),
        totalPoint: point,
      })
      .then(() => {
        mutate();
        toast({
          title: "Success",
          description: "All settlement are distributed",
          status: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
        });
      })
      .finally(onClose);
  }

  function handleDelete(id: string) {
    axios
      .delete(`/api/admin/settle`, {
        params: { id },
      })
      .then(() => {
        mutate();
        toast({
          title: "Success",
          description: "Settlement are rollbacked",
          status: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
        });
      });
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPoint(Number(event.target.value));

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        수익 정산
      </Button>
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>총 정산 포인트</Th>
              <Th>정산시작 날짜</Th>
              <Th>정산종료 날짜</Th>
              <Th>정산 명수</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((record) => {
              return (
                <Tr key={record.id}>
                  <Td>{record.totalPoint}</Td>
                  <Td>{record.startAt.toString()}</Td>
                  <Td>{record.endAt.toString()}</Td>
                  <Td>{record.settlePoints.length}</Td>
                  <Td>
                    <Button
                      id={record.id}
                      onClick={() => handleDelete(record.id)}
                    >
                      삭제
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              정산하기
            </AlertDialogHeader>
            <Input
              value={point}
              onChange={handleChange}
              placeholder="Here is a sample placeholder"
              size="sm"
            />
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleSettle} ml={3}>
                Update
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

AdminSettle.options = { role: Role.Admin, hideTitle: true } as PageOptions;
