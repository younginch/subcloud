import {
  Stack,
  Text,
  Image,
  HStack,
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
  duration: number;
  videoName: string;
  videoUrl: string;
  channelName: string;
  channelImageUrl: string;
  uploadDate?: Date;
  children: React.ReactNode;
};

export default function VideoCard({
  duration,
  videoUrl,
  videoName,
  channelName,
  channelImageUrl,
  uploadDate,
  children,
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
          {dayjs.duration(duration, "s").format("mm:ss")}
        </Text>
        {hover && uploadDate && (
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
          <Link href={`https://www.youtube.com/c/${channelName}`}>
            <Avatar size="sm" name={channelName} src={channelImageUrl} />
          </Link>
          <Text fontWeight="bold">{channelName}</Text>
        </HStack>
      </Stack>
      {children}
    </Stack>
  );
}
