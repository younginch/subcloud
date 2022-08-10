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
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineMenu } from "react-icons/ai";
import { SubStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { ResSubSearch } from "../../../utils/types";
import ReviewStatusBadge from "../../badges/reviewStatusBadge";
import { YoutubeIcon } from "../../icons/customIcons";

export default function SubStatusPreview() {
  const { t } = useTranslation("privateProfile");
  const session = useSession();
  const toast = useToast();
  const [subs, setSubs] = useState<ResSubSearch>();
  const [subStatus] = useState<SubStatus | "All">("All");

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
          title: t("my_sub_error"),
          description: t("my_sub_error_description"),
          status: "error",
        });
      });
  }

  useEffect(getSubs, [session.data?.user.id, subStatus, toast]);

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
        {subs?.map((sub) => (
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
        ))}
      </Tbody>
    </Table>
  );
}
