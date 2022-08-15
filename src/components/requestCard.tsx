import { ArrowUpIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Stack,
  Text,
  Badge,
  HStack,
  Spacer,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { RequestStatus } from "@prisma/client";
import dayjs from "dayjs";
import ISO6391 from "iso-639-1";
import duration from "dayjs/plugin/duration";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import VideoCard from "./videoCard";
import PointGauge from "./pointGauge";

dayjs.extend(duration);

function RequestBadge({ status }: { status: RequestStatus }) {
  const { t } = useTranslation("badges");
  if (status === RequestStatus.Uploaded)
    return (
      <Badge colorScheme="green" w="fit-content">
        {t("complete")}
      </Badge>
    );
  return (
    <Badge colorScheme="red" w="fit-content">
      {t("waiting")}
    </Badge>
  );
}

type Props = {
  title: string;
  time: number;
  thumbnail: string;
  link: string;
  requestLang: string;
  requestStatus?: RequestStatus;
  requestCount?: number;
  requestPoint: number;
  requestGoal: number;
  buttonType?: string | string[];
  serviceId: string;
  videoId: string;
};

export default function RequestCard({
  title,
  time,
  thumbnail,
  link,
  requestLang,
  requestStatus,
  requestCount,
  requestPoint,
  requestGoal,
  buttonType,
  serviceId,
  videoId,
}: Props) {
  const { t } = useTranslation("videoRequest");
  const buttonColor = useColorModeValue("blue", "linkedin");

  let buttonComponent;
  if (buttonType === "request") {
    buttonComponent = (
      <Link
        href={`/video/${serviceId}/${videoId}/request/create?lang=${requestLang}`}
      >
        <Button
          colorScheme={buttonColor}
          rightIcon={<ChevronRightIcon w="25px" h="25px" />}
          borderRadius={0}
          as="a"
        >
          {t("request_sub")}
        </Button>
      </Link>
    );
  } else if (buttonType === "sub") {
    buttonComponent = (
      <Link
        href={`/video/${serviceId}/${videoId}/sub/create?lang=${requestLang}`}
      >
        <Button
          colorScheme={buttonColor}
          rightIcon={<ArrowUpIcon />}
          borderRadius={0}
          as="a"
        >
          {t("upload_sub")}
        </Button>
      </Link>
    );
  }

  return (
    <VideoCard
      duration={time}
      videoName={title}
      videoUrl={link}
      imageUrl={thumbnail}
      padding={buttonType ? "0px" : undefined}
    >
      <Stack p="0px 10px 0px 10px">
        <HStack pl="10px">
          <Stack>
            <Text fontWeight="bold">{t("request_lang")}</Text>
            <Badge colorScheme="purple" w="fit-content">
              {ISO6391.getNativeName(requestLang)}
            </Badge>
          </Stack>
          <Spacer />
          {requestStatus !== undefined ? (
            <Stack spacing="5px">
              <Text fontWeight="bold">{t("status")}</Text>
              <RequestBadge status={requestStatus} />
            </Stack>
          ) : (
            <Stack spacing={0}>
              <Text fontWeight="bold">{t("request_num")}</Text>
              <Text fontWeight="bold">{requestCount}</Text>
            </Stack>
          )}
          <Spacer />
        </HStack>
        <PointGauge point={requestPoint} goal={requestGoal} />
      </Stack>
      {buttonComponent}
    </VideoCard>
  );
}
