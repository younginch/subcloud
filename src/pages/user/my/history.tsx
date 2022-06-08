import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { SubHistory } from "@prisma/client";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export default function UserMyHistory() {
  const session = useSession();
  const { data } = useSWR<SubHistory[]>(
    `/api/history?userId=${session.data?.user.id}`
  );

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>subId</Th>
            <Th>viewAt</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((subHistory) => {
            return (
              <Tr key={subHistory.id}>
                <Td>{subHistory.subId}</Td>
                <Td>{subHistory.viewAt.toDateString()}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
