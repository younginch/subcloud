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
} from "@chakra-ui/react";
import { Role, User } from "@prisma/client";
import useSWR from "swr";
import { PageOptions } from "../../utils/types";

function ModifyTestUsers() {
  return (
    <HStack>
      <Input />
    </HStack>
  );
}

export default function AdminTestUser() {
  const { data } = useSWR<User[]>("/api/admin/test-user");

  return (
    <>
      <ModifyTestUsers />
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
