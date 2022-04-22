import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import { PrismaClient, User } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import Layout from "../../components/layout";

export default function AdminUser({ users }: { users: User[] }) {
  return (
    <Layout>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => {
              return (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;

  const prisma = new PrismaClient();
  const users = prisma.user.findMany({});

  return {
    props: {
      users,
    },
  };
}
