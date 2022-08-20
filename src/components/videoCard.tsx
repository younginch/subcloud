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
import { useState } from "react";

type Props = {
  duration: number;
  videoName: string;
  videoUrl: string;
  imageUrl: string;
  channelName?: string;
  channelImageUrl?: string;
  channelUrl?: string;
  hideChannel?: boolean;
  padding?: string;
  children: React.ReactNode;
  hoverComponent?: React.ReactNode;
};

export default function VideoCard({
  duration,
  videoName,
  videoUrl,
  imageUrl,
  channelName,
  channelImageUrl,
  channelUrl,
  hideChannel,
  padding,
  children,
  hoverComponent,
}: Props) {
  const [hover, setHover] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <Stack
      w="300px"
      h="fit-content"
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="10px"
      overflow="hidden"
      p={padding || "0px 0px 10px 0px"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      boxShadow="base"
      position="relative"
    >
      <Box h="169px" maxH="169px" overflow="hidden">
        <Link href={videoUrl}>
          <Skeleton isLoaded={loaded} w="100%" h="169px">
            <Image
              src={imageUrl}
              alt="thumbnail"
              cursor="pointer"
              h="228px"
              mt="-29px"
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
        {channelName && channelUrl && channelImageUrl && !hideChannel && (
          <HStack overflow="hidden" pr="10px">
            <Link href={channelUrl}>
              <Avatar size="sm" name={channelName} src={channelImageUrl} />
            </Link>
            <Text fontWeight="bold">{channelName}</Text>
          </HStack>
        )}
      </Stack>
      {children}
      {hover && hoverComponent}
    </Stack>
  );
}
