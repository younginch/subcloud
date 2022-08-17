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
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import ReviewStatusBadge from "./badges/reviewStatusBadge";
import VideoCard from "./videoCard";

dayjs.extend(duration);

type Props = {
  title: string;
  time: number;
  thumbnail: string;
  link: string;
  lang: string;
  status: SubStatus;
  viewCount: number;
  uploadDate: Date;
  subId: string;
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
  uploadDate,
  subId,
  editorFileId,
}: Props) {
  const { t } = useTranslation("uploadSub");
  const uploadDateHover = (
    <Text
      bg="black"
      color="white"
      w="fit-content"
      p="1px 4px 1px 3px"
      borderRadius="5px"
      position="absolute"
      left="6px"
      top="128px"
    >
      자막 업로드: {dayjs(uploadDate).format("YYYY-MM-DD")}
    </Text>
  );

  return (
    <VideoCard
      duration={time}
      videoName={title}
      videoUrl={link}
      imageUrl={thumbnail}
      padding="0px"
      hoverComponent={uploadDateHover}
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
      <Link
        href={`/editor?${
          editorFileId ? `id=${editorFileId}` : `subId=${subId}`
        }`}
      >
        <Button
          rightIcon={<EditIcon />}
          colorScheme={useColorModeValue("blackAlpha", "linkedin")}
          borderRadius={0}
          as="a"
        >
          {t("edit_sub")}
        </Button>
      </Link>
    </VideoCard>
  );
}
