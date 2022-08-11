import { EditIcon } from "@chakra-ui/icons";
import {
  Stack,
  Text,
  Badge,
  HStack,
  Spacer,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { SubStatus } from "@prisma/client";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import ReviewStatusBadge from "./badges/reviewStatusBadge";
import VideoCard from "./videoCard";

type Props = {
  title: string;
  time: number;
  thumbnail: string;
  link: string;
  lang: string;
  status: SubStatus;
  viewCount: number;
  editorFileId?: string;
};

export default function UploadCard({
  title,
  time,
  thumbnail,
  link,
  lang,
  status,
  viewCount,
  editorFileId,
}: Props) {
  const router = useRouter();
  const { t } = useTranslation("uploadSub");
  dayjs.extend(duration);

  return (
    <VideoCard
      duration={time}
      videoName={title}
      videoUrl={link}
      imageUrl={thumbnail}
      uploadDate={new Date()}
      padding="0px"
    >
      <HStack pl="10px">
        <Stack>
          <Text fontWeight="bold">{t("language")}</Text>
          <Badge colorScheme="purple" w="fit-content">
            {lang}
          </Badge>
        </Stack>
        <Spacer />
        <Stack spacing="5px">
          <Text fontWeight="bold">{t("status")}</Text>
          <ReviewStatusBadge status={status} />
        </Stack>
        <Spacer />
        <Stack spacing={0}>
          <Text fontWeight="bold">{t("view")}</Text>
          <Text fontWeight="bold">{viewCount}</Text>
        </Stack>
        <Spacer />
      </HStack>
      <Button
        rightIcon={<EditIcon />}
        colorScheme={useColorModeValue("blackAlpha", "linkedin")}
        onClick={() => router.push(`/editor?id=${editorFileId}`)}
        borderRadius={0}
      >
        {t("edit_sub")}
      </Button>
    </VideoCard>
  );
}
