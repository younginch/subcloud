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
import { Role, SettleRecord } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import AdminLayout from "../../components/adminLayout";

export default function AdminProfit() {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [point, setPoint] = useState(0);
  const [records, setRecords] = useState<SettleRecord[]>([]);

  async function handleSettle() {
    axios
      .post(`/api/admin/settle`, {
        startAt: new Date(0),
        endAt: new Date(),
        totalPoint: point,
      })
      .then(() => {
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

  async function handleDelete(id: string) {
    axios
      .delete(`/api/admin/settle?id=${id}`)
      .then(() => {
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

  useEffect(() => {
    axios.get(`/api/admin/settle`).then((res) => {
      setRecords(res.data);
    });
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPoint(Number(event.target.value));

  return (
    <AdminLayout>
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
            </Tr>
          </Thead>
          <Tbody>
            {records.map((record) => {
              return (
                <Tr key={record.id}>
                  <Td>{record.totalPoint}</Td>
                  <Td>{record.startAt.toString()}</Td>
                  <Td>{record.endAt.toString()}</Td>
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
    </AdminLayout>
  );
}

AdminProfit.auth = Role.Admin;
