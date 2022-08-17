import {
  Stack,
  useColorModeValue,
  Box,
  Link,
  Image,
  Text,
  Avatar,
  HStack,
  Grid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdSubtitles } from "react-icons/md";
import { RiFundsFill } from "react-icons/ri";
import NextLink from "next/link";
import { YoutubeIcon } from "./icons/customIcons";

type Props = {
  channelId: string;
  title: string;
  thumbnailUrl: string;
  subscriberCount: number;
  channelUrl: string;
  bannerUrl?: string;
  subCount: number;
  requestCount: number;
};

export default function ChannelCard({
  channelId,
  title,
  thumbnailUrl,
  subscriberCount,
  channelUrl,
  bannerUrl,
  subCount,
  requestCount,
}: Props) {
  return (
    <motion.div whileHover={{ translateY: -5 }}>
      <NextLink href={`/channel/${channelId}?title=${title}`}>
        <Stack
          w="300px"
          h="fit-content"
          bg={useColorModeValue("gray.50", "gray.700")}
          borderRadius="10px"
          overflow="hidden"
          p="0px 0px 10px 0px"
          boxShadow="base"
          cursor="pointer"
        >
          <Box position="relative">
            {bannerUrl ? (
              <Image
                src={`${bannerUrl}=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`}
                alt="channel background"
                maxH="169px"
                w="100%"
              />
            ) : (
              <Box
                backgroundImage={thumbnailUrl}
                backgroundSize="cover"
                w="100%"
                h="50px"
              />
            )}
            <Avatar
              size="lg"
              name="하창봉"
              src={thumbnailUrl}
              position="absolute"
              top="16px"
              left="50%"
              transform="translateX(-50%)"
              outline="4px solid"
              outlineColor={useColorModeValue("gray.50", "gray.700")}
            />
          </Box>
          <Stack pt="30px" alignItems="center">
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
            <HStack mt="0px !important">
              <Link href={channelUrl} isExternal>
                <YoutubeIcon size="25px" cursor="pointer" />
              </Link>
              <Text>구독자 {subscriberCount}</Text>
            </HStack>
            <Grid
              templateColumns="repeat(2, 1fr)"
              templateRows="repeat(2, 1fr)"
            >
              <Text fontWeight="bold">자막 수</Text>
              <Text fontWeight="bold">진행중인 펀딩 수</Text>
              <HStack>
                <MdSubtitles />
                <Text fontWeight="bold">{subCount}</Text>
              </HStack>
              <HStack>
                <RiFundsFill />
                <Text fontWeight="bold">{requestCount}</Text>
              </HStack>
            </Grid>
          </Stack>
        </Stack>
      </NextLink>
    </motion.div>
  );
}
