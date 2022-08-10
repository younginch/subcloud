import { EditIcon } from "@chakra-ui/icons";
import {
  Stack,
  Text,
  Image,
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

type Props = {
  title: string;
  time: number;
  thumbnail: string;
  link: string;
  lang: string;
  status: SubStatus;
  viewCount: number;
  serviceId: string;
  videoId: string;
  subId: string;
};

export default function UploadCard({
  title,
  time,
  thumbnail,
  link,
  lang,
  status,
  viewCount,
  serviceId,
  videoId,
  subId,
}: Props) {
  const router = useRouter();
  const { t } = useTranslation("uploadSub");
  dayjs.extend(duration);

  return (
    <Stack
      w="300px"
      h="fit-content"
      bg={useColorModeValue("gray.100", "gray.700")}
      borderRadius="10px"
      overflow="hidden"
      position="relative"
      boxShadow="base"
    >
      <Image
        src={thumbnail}
        alt="thumbnail"
        onClick={() => router.push(link)}
        cursor="pointer"
        maxH="169px"
      />
      <Text
        bg="black"
        color="white"
        w="fit-content"
        p="1px 4px 1px 3px"
        borderRadius="5px"
        position="absolute"
        right="8px"
      >
        {dayjs.duration(time, "s").format("mm:ss")}
      </Text>
      <Stack pl="10px">
        <Text
          fontWeight="bold"
          fontSize="18px"
          maxW="100%"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {title}
        </Text>
        <HStack>
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
      </Stack>
      <Button
        rightIcon={<EditIcon />}
        colorScheme={useColorModeValue("blackAlpha", "linkedin")}
        onClick={() =>
          router.push(`/editor?${serviceId}Id=${videoId}&subId=${subId}`)
        }
        borderRadius={0}
      >
        {t("edit_sub")}
      </Button>
    </Stack>
  );
}
