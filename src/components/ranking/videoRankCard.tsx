import {
  Stack,
  Text,
  Image,
  Badge,
  HStack,
  Spacer,
  useColorModeValue,
  Avatar,
  Link,
  Box,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useRouter } from "next/router";
import { useState } from "react";

dayjs.extend(duration);

type Props = {
  userId: string;
  videoName: string;
  videoUrl: string;
  viewCount: number;
  channelName: string;
  channelImageUrl: string;
  lang: string;
  uploadDate: Date;
};

export default function VideoRankCard({
  videoUrl,
  videoName,
  viewCount,
  userId,
  channelName,
  channelImageUrl,
  lang,
  uploadDate,
}: Props) {
  const router = useRouter();
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Stack
      w="300px"
      h="fit-content"
      bg={useColorModeValue("gray.50", "gray.700")}
      borderRadius="10px"
      overflow="hidden"
      pb="10px"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box position="relative">
        <Image
          src="https://i.ytimg.com/vi/TQ8WlA2GXbk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC-jCivJl2_ZKjT2GONS3-JWiYk1w"
          alt="thumbnail"
          onClick={() => router.push(videoUrl)}
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
          top="5px"
        >
          {dayjs.duration(346, "s").format("mm:ss")}
        </Text>
        {hover && (
          <Text
            bg="black"
            color="white"
            w="fit-content"
            p="1px 4px 1px 3px"
            borderRadius="5px"
            position="absolute"
            left="8px"
            bottom="5px"
          >
            자막 업로드: {dayjs(uploadDate).format("YYYY-MM-DD")}
          </Text>
        )}
      </Box>
      <Stack pl="10px">
        <Text
          fontWeight="bold"
          fontSize="18px"
          maxW="100%"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {videoName}
        </Text>
        <HStack overflow="hidden" pr="10px">
          <Link href={`/user/${userId}`}>
            <Avatar size="sm" name={channelName} src={channelImageUrl} />
          </Link>
          <Text fontWeight="bold">{channelName}</Text>
        </HStack>
        <HStack>
          <Stack>
            <Text fontWeight="bold">언어</Text>
            <Badge colorScheme="purple" w="fit-content">
              {lang}
            </Badge>
          </Stack>
          <Spacer />
          <Stack spacing={0}>
            <Text fontWeight="bold">조회수</Text>
            <Text fontWeight="bold">{viewCount}</Text>
          </Stack>
          <Spacer />
        </HStack>
      </Stack>
    </Stack>
  );
}
