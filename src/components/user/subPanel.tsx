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
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiOutlineMenu } from "react-icons/ai";
import { ResFileRead, ResSubSearch } from "../../utils/types";
import { YoutubeIcon } from "../icons/customIcons";
import DetailViewGraph from "./my/detailViewGraph";
import ReviewStatusBadge from "../badges/reviewStatusBadge";
import AvatarWithName from "../badges/avatarWithName";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";

type SubPanelProps = {
  subs: ResSubSearch;
};

export default function SubPanel(props: SubPanelProps) {
  const { t } = useTranslation("privateProfile");
  const session = useSession();
  const toast = useToast();
  const [subs, setSubs] = useState<ResSubSearch>(props.subs);
  const [subStatus, setSubStatus] = useState<SubStatus | "all">("all");
  const ref = useRef<any>();
  const [width, setWidth] = useState<number>(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);

  useEffect(getSubs, [session.data?.user.id, subStatus, toast]);

  function getSubs() {
    axios
      .get<ResSubSearch>("/api/public/search/sub", {
        params: { userId: session.data?.user.id, status: subStatus },
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
            {`${t("my_sub_progress")}: ${subStatus}`}
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup
              defaultValue="all"
              title={t("my_sub_progress")}
              type="radio"
              onChange={(value) => {
                setSubStatus(value as SubStatus | "all");
              }}
            >
              <MenuItemOption value="all">
                {t("my_sub_progress_all")}
              </MenuItemOption>
              <MenuItemOption value={SubStatus.Pending}>
                {t("my_sub_progress_wait")}
              </MenuItemOption>
              <MenuItemOption value={SubStatus.Approved}>
                {t("my_sub_progress_approve")}
              </MenuItemOption>
              <MenuItemOption value={SubStatus.Rejected}>
                {t("my_sub_progress_denial")}
              </MenuItemOption>
              <MenuItemOption value={SubStatus.Reported}>
                {t("my_sub_progress_report")}
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </HStack>

      <Table variant="simple" size="sm" ref={ref}>
        <Thead>
          <Tr>
            <Th>{t("vid")}</Th>
            <Th>{t("channel")}</Th>
            <Th>{t("language")}</Th>
            <Th>{t("status")}</Th>
            <Th>{t("my_sub_upload")}</Th>
            <Th>{t("my_sub_info")}</Th>
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
                <Td>{dayjs(sub.createdAt).format("YYYY-MM-DD")}</Td>
                <Td>
                  <Popover placement="bottom-end" isLazy>
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
                          <DetailViewGraph subId={sub.id} />
                          <HStack>
                            <CopyToClipboard text={sub.id}>
                              <Button>{t("my_sub_copy")}</Button>
                            </CopyToClipboard>
                            <Button marginEnd="6px" isDisabled>
                              {t("my_sub_edit")}
                            </Button>
                            <Button
                              onClick={() => {
                                axios
                                  .get<ResFileRead>(`/api/user/file`, {
                                    params: { id: sub.fileId },
                                  })
                                  .then((res) => {
                                    window.open(res.data.url);
                                  });
                              }}
                            >
                              {t("my_sub_download")}
                            </Button>
                            <Spacer />
                            <Button
                              colorScheme="red"
                              onClick={() => {
                                axios
                                  .delete(`/api/user/sub`, {
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
                              {t("delete")}
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
