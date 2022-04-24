import {
  Avatar,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Stack,
  Tab,
  Table,
  TableCaption,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { File, Request, Status, Sub } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TAB_LIST = ["request", "sub", "file"];

export default function UserRead() {
  const router = useRouter();
  const { data, status } = useSession();

  function getTabIndex() {
    if (router.query.tab === "request") {
      return 0;
    } else if (router.query.tab === "sub") {
      return 1;
    } else if (router.query.tab === "file") {
      return 2;
    } else {
      return 0;
    }
  }

  function onChangeTabIndex(index: number) {
    router.push(`/user/${router.query.userId}?tab=${TAB_LIST[index]}`);
  }

  return (
    <>
      <HStack marginBottom="18px">
        <Avatar
          size="2xl"
          name={data?.user.name ?? undefined}
          src={data?.user.image ?? undefined}
        />
        <Stack>
          <Text>{data?.user.name}</Text>
          <Text>{data?.user.email}</Text>
        </Stack>
      </HStack>
      <Tabs isLazy index={getTabIndex()} onChange={onChangeTabIndex}>
        <TabList>
          <Tab>자막 요청</Tab>
          <Tab>영상 자막</Tab>
          <Tab>자막 파일</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RequestPanel />
          </TabPanel>
          <TabPanel>
            <SubPanel />
          </TabPanel>
          <TabPanel>
            <FilePanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

function RequestPanel() {
  const { data, status } = useSession();
  const toast = useToast();
  const [requests, setRequests] = useState<Request[]>([]);

  function getRequests() {
    axios
      .get("/api/request/search", { params: { userId: data?.user.id } })
      .then((res) => {
        setRequests(res.data);
      })
      .catch(() => {
        toast({
          title: "오류",
          description: "자막 요청 목록을 불러오는데 실패했습니다.",
          status: "error",
        });
      });
  }

  useEffect(getRequests, [data?.user.id, status, toast]);

  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Video ID</Th>
            <Th>요청 언어</Th>
            <Th>취소</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request) => {
            return (
              <Tr key={request.id}>
                <Td>{request.id}</Td>
                <Td>{request.videoId}</Td>
                <Td>{request.lang}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      axios
                        .delete(`/api/request/${request.id}`)
                        .then(() => {
                          toast({
                            title: "성공",
                            description: "자막 요청을 취소했습니다.",
                            status: "success",
                          });
                          getRequests();
                        })
                        .catch(() => {
                          toast({
                            title: "오류",
                            description: "자막 요청을 취소하는데 실패했습니다.",
                            status: "error",
                          });
                        });
                    }}
                  >
                    취소
                  </Button>
                </Td>
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
  );
}

function SubPanel() {
  const { data, status } = useSession();
  const toast = useToast();
  const [subs, setSubs] = useState<Sub[]>([]);
  const [subStatus, setSubStatus] = useState<Status | "all">("all");

  useEffect(getSubs, [data?.user.id, status, subStatus, toast]);

  function getSubs() {
    axios
      .get("/api/sub/search", {
        params: { userId: data?.user.id, status: subStatus },
      })
      .then((res) => {
        setSubs(res.data);
      })
      .catch(() => {
        toast({
          title: "오류",
          description: "자막 목록을 불러오는데 실패했습니다.",
          status: "error",
        });
      });
  }

  return (
    <TableContainer>
      <HStack>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >{`진행도: ${subStatus}`}</MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup
              defaultValue="all"
              title="진행도"
              type="radio"
              onChange={(value) => {
                setSubStatus(value as Status | "all");
              }}
            >
              <MenuItemOption value="all">전체</MenuItemOption>
              <MenuItemOption value={Status.PENDING}>대기중</MenuItemOption>
              <MenuItemOption value={Status.APPROVED}>승인</MenuItemOption>
              <MenuItemOption value={Status.REJECTED}>거부</MenuItemOption>
              <MenuItemOption value={Status.REPORTED}>신고</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </HStack>
      <Table variant="simple" size="sm">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>자막 ID</Th>
            <Th>영상 ID</Th>
            <Th>요청 언어</Th>
            <Th>진행도</Th>
            <Th>편집</Th>
          </Tr>
        </Thead>
        <Tbody>
          {subs.map((sub) => {
            return (
              <Tr key={sub.id}>
                <Td>{sub.id}</Td>
                <Td>{sub.serviceId}.{sub.videoId}</Td>
                <Td>{sub.lang}</Td>
                <Td>{sub.status}</Td>
                <Td>
                  <Button marginEnd="6px" isDisabled>
                    수정
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      axios
                        .delete(`/api/sub/${sub.id}`)
                        .then(() => {
                          toast({
                            title: "성공",
                            description: "자막을 삭제했습니다.",
                            status: "success",
                          });
                          getSubs();
                        })
                        .catch(() => {
                          toast({
                            title: "오류",
                            description: "자막을 삭제하는데 실패했습니다.",
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
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}

function FilePanel() {
  const { data, status } = useSession();
  const toast = useToast();
  const [files, setFiles] = useState<File[]>([]);

  useEffect(getFiles, [data?.user.id, status, toast]);

  function getFiles() {
    axios
      .get("/api/file/search?userId=" + data?.user.id)
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
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>파일 제목</Th>
            <Th>URL</Th>
            <Th>삭제</Th>
          </Tr>
        </Thead>
        <Tbody>
          {files.map((file) => {
            return (
              <Tr key={file.id}>
                <Td>{file.id}</Td>
                <Td>{file.title}</Td>
                <Td>{file.url}</Td>
                <Td>
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
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
