import {
  useToast,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { File } from "@prisma/client";

export default function FilePanel(props: { files: File[] }) {
  const toast = useToast();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>(props.files);

  useEffect(getFiles, [router.query.userId, toast]);

  function getFiles() {
    axios
      .get("/api/file/search?userId=" + router.query.userId)
      .then((res) => {
        setFiles(res.data);
      })
      .catch(() => {
        toast({
          title: "오류",
          description: "파일 목록을 불러오는데 실패했습니다.",
          status: "error",
        });
      });
  }

  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>파일 제목</Th>
            <Th>URL</Th>
            <Th>작업</Th>
          </Tr>
        </Thead>
        <Tbody>
          {files.map((file) => {
            return (
              <Tr key={file.id}>
                <Td>{file.id}</Td>
                <Td>{file.title}</Td>
                <Td>{file.key}</Td>
                <Td>
                  <Button
                    marginEnd="6px"
                    onClick={() => {
                      axios.get(`/api/file/${file.id}`).then((res) => {
                        window.open(res.data.url);
                      });
                    }}
                  >
                    다운로드
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      axios
                        .delete(`/api/file/${file.id}`)
                        .then(() => {
                          toast({
                            title: "성공",
                            description: "파일을 삭제했습니다.",
                            status: "success",
                          });
                          getFiles();
                        })
                        .catch(() => {
                          toast({
                            title: "오류",
                            description: "파일을 삭제하는데 실패했습니다.",
                            status: "error",
                          });
                        });
                    }}
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
  );
}
