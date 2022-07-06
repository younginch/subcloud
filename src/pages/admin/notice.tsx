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
import { Role, Notice, Notification } from "@prisma/client";
import axios from "axios";
import dayjs from "dayjs";
import { ChangeEvent, useRef, useState } from "react";
import useSWR from "swr";
import { PageOptions } from "../../utils/types";

export default function AdminNotice() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [message, setMessage] = useState("");
  const { data, mutate } = useSWR<
    (Notice & {
      notifications: Notification[];
    })[]
  >("/api/admin/notice");

  async function handleSettle() {
    axios
      .post(`/api/admin/notice`, { message })
      .then(() => {
        mutate();
        toast({
          title: "Success",
          description: "Notice completed",
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
      .delete(`/api/admin/notice`, {
        params: { id },
      })
      .then(() => {
        mutate();
        toast({
          title: "Success",
          description: "Notice deleted",
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
    setMessage(event.target.value);

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        공지하기
      </Button>
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>공지 종류</Th>
              <Th>공지 메세지</Th>
              <Th>공지 날짜</Th>
              <Th>공지 명수</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((notice) => {
              return (
                <Tr key={notice.id}>
                  <Td>{notice.type}</Td>
                  <Td>{notice.message}</Td>
                  <Td>
                    {dayjs(notice.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </Td>
                  <Td>{notice.notifications.length}</Td>
                  <Td>
                    <Button
                      id={notice.id}
                      onClick={() => handleDelete(notice.id)}
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
              공지하기
            </AlertDialogHeader>
            <Input
              value={message}
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

AdminNotice.options = { role: Role.Admin, hideTitle: true } as PageOptions;
