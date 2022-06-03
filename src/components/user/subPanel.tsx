import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  useToast,
  TableContainer,
  HStack,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  Text,
  IconButton,
  MenuItem,
} from "@chakra-ui/react";
import { request } from "@playwright/test";
import { Status } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaYoutube } from "react-icons/fa";
import { MoreIcon } from "../../utils/icons";
import { ResFileRead, ResSubSearch } from "../../utils/types";

type SubPanelProps = {
  subs: ResSubSearch;
};

export default function SubPanel(props: SubPanelProps) {
  const router = useRouter();
  const toast = useToast();
  const [subs, setSubs] = useState<ResSubSearch>(props.subs);
  const [subStatus, setSubStatus] = useState<Status | "all">("all");

  useEffect(getSubs, [router.query.userId, subStatus, toast]);

  function getSubs() {
    axios
      .get<ResSubSearch>("/api/sub/search", {
        params: { userId: router.query.userId, status: subStatus },
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
              <MenuItemOption value={Status.Pending}>대기중</MenuItemOption>
              <MenuItemOption value={Status.Approved}>승인</MenuItemOption>
              <MenuItemOption value={Status.Rejected}>거부</MenuItemOption>
              <MenuItemOption value={Status.Reported}>신고</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </HStack>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>영상</Th>
            <Th>채널</Th>
            <Th>언어</Th>
            <Th>진행도</Th>
            <Th>편집</Th>
          </Tr>
        </Thead>
        <Tbody>
          {subs.map((sub) => {
            return (
              <Tr key={sub.id}>
                <Td>
                  <HStack>
                    <FaYoutube size={36} />
                    <Text maxW={480} noOfLines={1}>
                      {sub.video?.youtubeVideo?.title ?? "비디오 정보없음"}
                    </Text>
                  </HStack>
                </Td>
                <Td>
                  <HStack>
                    <Avatar
                      name={
                        sub.video?.youtubeVideo?.channel.title ??
                        "채널 정보없음"
                      }
                      src={
                        sub.video?.youtubeVideo?.channel.thumbnailUrl ??
                        undefined
                      }
                      size="sm"
                    />
                    <Text maxW={120} noOfLines={1}>
                      {sub.video?.youtubeVideo?.channel.title ??
                        "채널 정보없음"}
                    </Text>
                  </HStack>
                </Td>
                <Td>{sub.lang}</Td>
                <Td>{sub.status}</Td>
                <Td>
                  <Button marginEnd="6px" isDisabled>
                    수정
                  </Button>
                  <Button
                    onClick={() => {
                      axios
                        .get<ResFileRead>(`/api/file`, {
                          params: { id: sub.fileId },
                        })
                        .then((res) => {
                          window.open(res.data.url);
                        });
                    }}
                  >
                    자막 파일 다운로드
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      axios
                        .delete(`/api/sub`, { params: { id: sub.id } })
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
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<MoreIcon />}
                      variant="outline"
                    />
                    <MenuList>
                      <MenuItem>
                        <CopyToClipboard text={sub.id}>
                          <Button>자막 ID 복사</Button>
                        </CopyToClipboard>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
