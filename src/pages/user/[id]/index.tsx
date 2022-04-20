import {
  Avatar,
  HStack,
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
} from "@chakra-ui/react";
import { File, Request, Sub } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";

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
    router.push(`/user/${router.query.id}?tab=${TAB_LIST[index]}`);
  }

  return (
    <Layout>
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
    </Layout>
  );
}

function RequestPanel() {
  const { data, status } = useSession();
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    axios.get("/api/request/search?userId=" + data?.user.id).then((res) => {
      setRequests(res.data);
    });
  }, [data?.user.id, status]);

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Video ID</Th>
            <Th>요청 언어</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests.map((request) => {
            return (
              <Tr key={request.id}>
                <Td>{request.id}</Td>
                <Td>{request.videoId}</Td>
                <Td>{request.lang}</Td>
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

function  SubPanel() {
  const { data, status } = useSession();
  const [subs, setSubs] = useState<Sub[]>([]);

  useEffect(() => {
    axios.get("/api/sub/search?userId=" + data?.user.id).then((res) => {
      setSubs(res.data);
    });
  }, [data?.user.id, status]);

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>자막 ID</Th>
            <Th>영상 ID</Th>
            <Th>요청 언어</Th>
          </Tr>
        </Thead>
        <Tbody>
          {subs.map((sub) => {
            return (
              <Tr key={sub.id}>
                <Td>{sub.id}</Td>
                <Td>{sub.videoId}</Td>
                <Td>{sub.lang}</Td>
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
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    axios.get("/api/file/search?userId=" + data?.user.id).then((res) => {
      setFiles(res.data);
    });
  }, [data?.user.id, status]);

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>파일 제목</Th>
            <Th>URL</Th>
          </Tr>
        </Thead>
        <Tbody>
          {files.map((file) => {
            return (
              <Tr key={file.id}>
                <Td>{file.id}</Td>
                <Td>{file.title}</Td>
                <Td>{file.url}</Td>
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
