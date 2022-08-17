import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Input,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import { Role, User } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import { PageOptions } from "../../utils/types";

function ModifyTestUsers({ mutate }: { mutate: KeyedMutator<User[]> }) {
  const toast = useToast();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  function onCreate() {
    axios
      .post("/api/admin/test-user", {}, { params: { start, end } })
      .then((res) => {
        mutate();
        toast({
          title: "Success",
          description: `Test users created (${res.data}))`,
          status: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.response.data,
          status: "error",
        });
      });
  }

  function onDelete() {
    axios
      .delete(`/api/admin/test-user`, { params: { start, end } })
      .then((res) => {
        mutate();
        toast({
          title: "Success",
          description: `Test users deleted (${res.data}))`,
          status: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.response.data,
          status: "error",
        });
      });
  }

  return (
    <HStack>
      <Input
        type="number"
        w="150px"
        value={start}
        onChange={(e) => setStart(Number(e.target.value))}
      />
      <Text>부터</Text>
      <Input
        type="number"
        w="150px"
        value={end}
        onChange={(e) => setEnd(Number(e.target.value))}
      />
      <Text>까지</Text>
      <Button onClick={onCreate}>추가</Button>
      <Button onClick={onDelete}>삭제</Button>
    </HStack>
  );
}

export default function AdminTestUser() {
  const { data, mutate } = useSWR<User[]>("/api/admin/test-user");

  return (
    <>
      <ModifyTestUsers mutate={mutate} />
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Email</Th>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.email}</Td>
                <Td>{user.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

AdminTestUser.options = {
  role: Role.Admin,
  hideTitle: true,
} as PageOptions;
