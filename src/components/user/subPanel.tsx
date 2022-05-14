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
} from "@chakra-ui/react";
import { Status } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FaYoutube } from "react-icons/fa";
import { ResSubSearch } from "../../utils/types";

type SubPanelProps = {
  subs: ResSubSearch;
};

export default function SubPanel(props: SubPanelProps) {
  const router = useRouter();
  const { status } = useSession();
  const toast = useToast();
  const [subs, setSubs] = useState<ResSubSearch>(props.subs);
  const [subStatus, setSubStatus] = useState<Status | "all">("all");

  useEffect(getSubs, [router.query.userId, status, subStatus, toast]);

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
              <MenuItemOption value={Status.PENDING}>대기중</MenuItemOption>
              <MenuItemOption value={Status.APPROVED}>승인</MenuItemOption>
              <MenuItemOption value={Status.REJECTED}>거부</MenuItemOption>
              <MenuItemOption value={Status.REPORTED}>신고</MenuItemOption>
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
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
