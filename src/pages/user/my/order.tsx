import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";
import { Order, Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { PageOptions } from "../../../utils/types";

export default function UserMyOrder() {
  const session = useSession();
  const { data } = useSWR<Order[]>(
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
                  <Button onClick={() => {}}>결제 취소</Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

UserMyOrder.options = { auth: Role.User } as PageOptions;
