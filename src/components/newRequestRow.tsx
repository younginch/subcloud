import {
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Link,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function NewRequestRow() {
  const router = useRouter();
  return (
    <HStack
      bg={useColorModeValue("#fafafb", "gray.700")}
      boxShadow="md"
      borderRadius="7px"
      overflow="hidden"
      w="650px"
      maxW="85vw"
      h="100px"
      maxH="14vw"
      spacing={0}
    >
      <Image
        src="https://i.ytimg.com/vi/xcmn329fUbo/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDrXyEbFdPSdvQEAHFr6SMgpdSmrw"
        alt="thumbnail"
        onClick={() =>
          router.push(
            "https://www.youtube.com/watch?v=xcmn329fUbo&ab_channel=1hourplayer"
          )
        }
        cursor="pointer"
        h="100%"
      />
      <Stack p={3} spacing={0}>
        <Text
          fontWeight="bold"
          fontSize={{ base: "14px", md: "18px" }}
          maxW="100%"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          [1시간] Norihiro Tsuru - Last Carnival. ( Acoustic Cafe )dsfdf
        </Text>
        <HStack overflow="hidden" pr="10px">
          <Link
            href="https://www.youtube.com/channel/UC13QuLnUwERWa0a0Fp-a5vg"
            isExternal
          >
            <Avatar
              size="sm"
              name="Youtuber"
              src="https://yt3.ggpht.com/ytc/AMLnZu_QUPAp8D38spIKNfYYpxc27ZZDN_0j6URW_CKp=s48-c-k-c0x00ffffff-no-rj"
            />
          </Link>
          <Text fontSize={{ base: "12px", md: "16px" }}>1hour player</Text>
        </HStack>
        <HStack>
          <Text fontSize={{ base: "12px", md: "16px" }}>요청 언어</Text>
          <Badge
            colorScheme="purple"
            w="fit-content"
            fontSize={{ base: "12px", md: "14px" }}
          >
            한국어
          </Badge>
        </HStack>
      </Stack>
    </HStack>
  );
}
