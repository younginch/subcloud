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
};

export default function UploadCard({
  title,
  time,
  thumbnail,
  link,
  lang,
  status,
  viewCount,
}: Props) {
  const router = useRouter();
  dayjs.extend(duration);

  return (
    <Stack
      w="300px"
      h="fit-content"
      bg={useColorModeValue("gray.100", "gray.700")}
      borderRadius="10px"
      overflow="hidden"
      position="relative"
    >
      <Image
        src={thumbnail}
        alt="thumbnail"
        onClick={() => router.push(link)}
        cursor="pointer"
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
            <Text fontWeight="bold">언어</Text>
            <Badge colorScheme="purple" w="fit-content">
              {lang}
            </Badge>
          </Stack>
          <Spacer />
          <Stack>
            <Text fontWeight="bold">승인 상태</Text>
            <ReviewStatusBadge status={status} />
          </Stack>
          <Spacer />
          <Stack spacing={0}>
            <Text fontWeight="bold">조회수</Text>
            <Text fontWeight="bold">{viewCount}</Text>
          </Stack>
          <Spacer />
        </HStack>
      </Stack>
      <Button
        rightIcon={<EditIcon />}
        colorScheme={useColorModeValue("blackAlpha", "linkedin")}
        onClick={() => router.push("/editor")}
        borderRadius={0}
      >
        자막 편집하기
      </Button>
    </Stack>
  );
}
