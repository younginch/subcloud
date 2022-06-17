import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Input,
  useToast,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { Role, ExampleVideo, Video } from "@prisma/client";
import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";
import useSWR from "swr";
import { PageOptions } from "../../utils/types";

export default function AdminExample() {
  const toast = useToast();
  const [url, setUrl] = useState<string>("");
  const { data, mutate } = useSWR<
    (ExampleVideo & {
      video: Video;
    })[]
  >("/api/admin/example");

  async function handleExample() {
    axios
      .post(`/api/admin/example`, { url: url })
      .then(() => {
        mutate();
        toast({
          title: "Success",
          description: "Example added",
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

  function handleDelete(id: string) {
    axios
      .delete(`/api/admin/example`, {
        params: { id },
      })
      .then(() => {
        mutate();
        toast({
          title: "Success",
          description: "Example deleted",
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
    setUrl(String(event.target.value));

  return (
    <>
      <Stack>
        <HStack>
          <Input
            value={url}
            onChange={handleChange}
            placeholder="Here is a sample placeholder"
            size="sm"
          />
          <Button colorScheme="blue" onClick={handleExample}>
            추가하기
          </Button>
        </HStack>
        <TableContainer>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>링크</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((example) => {
                return (
                  <Tr key={example.id}>
                    <Td>{example.video.url}</Td>
                    <Td>
                      <Button
                        id={example.id}
                        onClick={() => handleDelete(example.id)}
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
      </Stack>
    </>
  );
}

AdminExample.options = { role: Role.Admin, hideTitle: true } as PageOptions;
