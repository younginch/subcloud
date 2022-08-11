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
import { useRouter } from "next/router";
import { RequestStatus } from "@prisma/client";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import useTranslation from "next-translate/useTranslation";
import VideoCard from "./videoCard";
import PointGauge from "./pointGauge";

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
  const router = useRouter();
  dayjs.extend(duration);
  const buttonColor = useColorModeValue("blue", "linkedin");

  let buttonComponent;
  if (buttonType === "request") {
    buttonComponent = (
      <Button
        colorScheme={buttonColor}
        rightIcon={<ChevronRightIcon w="25px" h="25px" />}
        borderRadius={0}
        onClick={() =>
          router.push(`/video/${serviceId}/${videoId}/request/create`)
        }
      >
        {t("request_sub")}
      </Button>
    );
  } else if (buttonType === "sub") {
    buttonComponent = (
      <Button
        colorScheme={buttonColor}
        rightIcon={<ArrowUpIcon />}
        borderRadius={0}
        onClick={() => router.push(`/video/${serviceId}/${videoId}/sub/create`)}
      >
        {t("upload_sub")}
      </Button>
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
              {requestLang}
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
