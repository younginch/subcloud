import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { Request } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/layout";

export default function RequestPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  useEffect(() => {
    axios
      .get("/api/request/search")
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {});
  }, []);

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
            {requests.map((request) => (
              <Tr key={request.id}>
                <Td>{request.videoId}</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
