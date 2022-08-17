import {
  Stack,
  Text,
  Image,
  HStack,
  useColorModeValue,
  Avatar,
  Link,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useState } from "react";

dayjs.extend(duration);

type Props = {
  duration: number;
  videoName: string;
  videoUrl: string;
  imageUrl: string;
  channelName?: string;
  channelImageUrl?: string;
  channelUrl?: string;
  uploadDate?: Date;
  padding?: string;
  children: React.ReactNode;
};

export default function VideoCard({
  duration,
  videoName,
  videoUrl,
  imageUrl,
  channelName,
  channelImageUrl,
  channelUrl,
  uploadDate,
  padding,
  children,
}: Props) {
  const [hover, setHover] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <Stack
      w="300px"
      h="fit-content"
      bg={useColorModeValue("gray.50", "gray.700")}
      borderRadius="10px"
      overflow="hidden"
      p={padding || "0px 0px 10px 0px"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      boxShadow="base"
    >
      <Box position="relative">
        <Link href={videoUrl}>
          <Skeleton isLoaded={loaded}>
            <Image
              src={imageUrl}
              alt="thumbnail"
              cursor="pointer"
              maxH="169px"
              w="100%"
              onLoad={() => setLoaded(true)}
            />
          </Skeleton>
        </Link>
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
        {channelName && channelUrl && channelImageUrl && (
          <HStack overflow="hidden" pr="10px">
            <Link href={channelUrl}>
              <Avatar size="sm" name={channelName} src={channelImageUrl} />
            </Link>
            <Text fontWeight="bold">{channelName}</Text>
          </HStack>
        )}
      </Stack>
      {children}
    </Stack>
  );
}
