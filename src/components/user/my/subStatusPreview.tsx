import {
  Button,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { YoutubeIcon } from "../../../components/icons/customIcons";
import { AiOutlineMenu } from "react-icons/ai";
import ReviewStatusBadge from "../../../components/badges/reviewStatusBadge";
import { ResSubSearch } from "../../../utils/types";
import { SubStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";

export default function SubStatusPreview() {
  const { t } = useTranslation("privateProfile");
  const session = useSession();
  const toast = useToast();
  const [subs, setSubs] = useState<ResSubSearch>();
  const [subStatus, setSubStatus] = useState<SubStatus | "All">("All");
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
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th>{t("vid")}</Th>
          <Th minW="70px">{t("language")}</Th>
          <Th textAlign="center">{t("status")}</Th>
          <Th textAlign="center">{t("task")}</Th>
        </Tr>
      </Thead>
      <Tbody overflowY="scroll">
        {subs?.map((sub) => {
          return (
            <Tr key={sub.id}>
              <Td>
                <HStack>
                  <YoutubeIcon size="30px" />
                  <Text noOfLines={1}>
                    {sub.video?.youtubeVideo?.title ?? "비디오 정보없음"}
                  </Text>
                </HStack>
              </Td>
              <Td>{sub.lang}</Td>
              <Td>
                <ReviewStatusBadge status={sub.status} />
              </Td>
              <Td>
                <Button bg="transparent">
                  <AiOutlineMenu />
                </Button>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
