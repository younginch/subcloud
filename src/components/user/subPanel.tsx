import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  useToast,
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
  PopoverCloseButton,
  PopoverArrow,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
  Popover,
  Stack,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { SubStatus } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiOutlineMenu } from "react-icons/ai";
import { ResFileRead, ResSubSearch } from "../../utils/types";
import { YoutubeIcon } from "../icons/customIcons";
import DetailViewGraph from "./my/detailViewGraph";
import ReviewStatusBadge from "../badges/reviewStatusBadge";
import AvatarWithName from "../badges/avatarWithName";

type SubPanelProps = {
  subs: ResSubSearch;
};

export default function SubPanel(props: SubPanelProps) {
  const router = useRouter();
  const toast = useToast();
  const [subs, setSubs] = useState<ResSubSearch>(props.subs);
  const [subStatus, setSubStatus] = useState<SubStatus | "all">("all");
  const ref = useRef<any>();
  const [width, setWidth] = useState<number>(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);

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
    <Box pl="15px" pt="15px">
      <HStack>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {`진행도: ${subStatus}`}
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup
              defaultValue="all"
              title="진행도"
              type="radio"
              onChange={(value) => {
                setSubStatus(value as SubStatus | "all");
              }}
            >
              <MenuItemOption value="all">전체</MenuItemOption>
              <MenuItemOption value={SubStatus.Pending}>대기중</MenuItemOption>
              <MenuItemOption value={SubStatus.Approved}>승인</MenuItemOption>
              <MenuItemOption value={SubStatus.Rejected}>거부</MenuItemOption>
              <MenuItemOption value={SubStatus.Reported}>신고</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </HStack>

      <Table variant="simple" size="sm" ref={ref}>
        <Thead>
          <Tr>
            <Th>영상</Th>
            <Th>채널</Th>
            <Th>언어</Th>
            <Th>상태</Th>
            <Th>업로드 날짜</Th>
            <Th>상세정보</Th>
          </Tr>
        </Thead>
        <Tbody>
          {subs.map((sub) => {
            return (
              <Tr key={sub.id}>
                <Td>
                  <HStack>
                    <YoutubeIcon size="36px" />
                    <Text maxW={480} noOfLines={1}>
                      {sub.video?.youtubeVideo?.title ?? "비디오 정보없음"}
                    </Text>
                  </HStack>
                </Td>
                <Td>
                  <AvatarWithName
                    imageUrl={sub.video?.youtubeVideo?.channel.thumbnailUrl}
                    name={sub.video?.youtubeVideo?.channel.title}
                  />
                </Td>
                <Td>{sub.lang}</Td>
                <Td>
                  <ReviewStatusBadge status={sub.status} />
                </Td>
                <Td>2022.4.13</Td>
                <Td>
                  <Popover placement="bottom-end">
                    <PopoverTrigger>
                      <Button>
                        <AiOutlineMenu />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent w={width - 100} h="370px">
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Stack>
                          <DetailViewGraph />
                          <HStack>
                            <CopyToClipboard text={sub.id}>
                              <Button>자막 ID 복사</Button>
                            </CopyToClipboard>
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
                            <Spacer />
                            <Button
                              colorScheme="red"
                              onClick={() => {
                                axios
                                  .delete(`/api/sub`, {
                                    params: { id: sub.id },
                                  })
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
                                      description:
                                        "자막을 삭제하는데 실패했습니다.",
                                      status: "error",
                                    });
                                  });
                              }}
                            >
                              삭제
                            </Button>
                          </HStack>
                        </Stack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
