import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Role, User } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/adminLayout";

export default function AdminUser() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get(`/api/admin/user`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <AdminLayout>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>이름</Th>
              <Th>이메일</Th>
              <Th>역할</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => {
              return (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        {user.role}
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Admin</MenuItem>
                        <MenuItem>Reviewer</MenuItem>
                        <MenuItem>User</MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}

AdminUser.auth = Role.ADMIN;
