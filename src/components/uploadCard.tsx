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
  subId,
  editorFileId,
}: Props) {
  const { t } = useTranslation("uploadSub");

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
