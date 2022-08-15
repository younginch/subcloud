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

export default function ChannelCard() {
  return (
    <motion.div whileHover={{ translateY: -5 }}>
      <NextLink href="/channel/channelId">
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
            <Image
              src="https://yt3.ggpht.com/_wKeBj-JSLYSMyRf2XL7Vkywuw5F3T3pz5UKbpOcmbG5fqvAMSlYZqmNhjHrCmFWjmI6f5JRn8U=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
              alt="channel background"
              maxH="169px"
              w="100%"
            />
            <Avatar
              size="lg"
              name="하창봉"
              src="https://yt3.ggpht.com/S89f3rBGh0uzSlJkZIyEimQM-bYqCbaU1LhAlMQuMDr8r6lhnBQj8kD3NpPEMy_jDwflHDx101I=s176-c-k-c0x00ffffff-no-rj"
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
              하창봉
            </Text>
            <HStack mt="0px !important">
              <Link href="https://www.youtube.com/c/PongTV" isExternal>
                <YoutubeIcon size="25px" cursor="pointer" />
              </Link>
              <Text>구독자 311000명</Text>
            </HStack>
            <Grid
              templateColumns="repeat(2, 1fr)"
              templateRows="repeat(2, 1fr)"
            >
              <Text fontWeight="bold">자막 수</Text>
              <Text fontWeight="bold">진행중인 펀딩 수</Text>
              <HStack>
                <MdSubtitles />
                <Text fontWeight="bold">10</Text>
              </HStack>
              <HStack>
                <RiFundsFill />
                <Text fontWeight="bold">510</Text>
              </HStack>
            </Grid>
          </Stack>
        </Stack>
      </NextLink>
    </motion.div>
  );
}
