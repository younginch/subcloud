import {
  HStack,
  Text,
  useColorModeValue,
  Tr,
  Td,
  Avatar,
  Popover,
  PopoverTrigger,
  Button,
  PopoverCloseButton,
  PopoverArrow,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { YoutubeIcon } from "../../icons/customIcons";

type Props = {
  videoName: string;
  videoUrl: string;
  channelName: string;
  channelThumbnailUrl?: string;
  viewCount: number;
  lang: string;
  reviewStatus: string;
};

export default function UserSubtitleRow({
  videoUrl,
  videoName,
  channelName,
  channelThumbnailUrl,
  lang,
  reviewStatus,
  viewCount,
}: Props) {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const paddingLeftBp = { base: "7px", md: "15px", lg: "24px" };
  const mainTextSize = { base: "12px", md: "15px" };
  return (
    <Tr color={textColor}>
      <Td
        pl="0px"
        maxW={{
          base: "200px",
          sm: "calc(90vw-200px)",
          md: "calc(80vw - 450px)",
          lg: "calc(90vw - 580px)",
        }}
      >
        <HStack w="inherit">
          <Link href={videoUrl}>
            <YoutubeIcon size={30} />
          </Link>
          <Link href={videoUrl}>
            <Text
              fontSize={mainTextSize}
              fontWeight="bold"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
            >
              {videoName}
            </Text>
          </Link>
        </HStack>
      </Td>
      <Td>
        <HStack>
          <Avatar name={channelName} src={channelThumbnailUrl} size="sm" />
          <Text maxW={120} noOfLines={1}>
            {channelName}
          </Text>
        </HStack>
      </Td>
      <Td
        justifyContent="center"
        w={{ base: "24px", md: "100px", lg: "150px" }}
      >
        <Text fontSize={mainTextSize}>{lang}</Text>
      </Td>
      <Td
        w={{ base: "90px", md: "110px", lg: "140px" }}
        pl={paddingLeftBp}
        fontWeight="bold"
        fontSize={mainTextSize}
      >
        <Text>{reviewStatus}</Text>
      </Td>
      <Td
        w={{ base: "90px", md: "110px", lg: "140px" }}
        pl={paddingLeftBp}
        fontWeight="bold"
        fontSize={mainTextSize}
      >
        <HStack>
          <BsEye color={textColor} />
          <Text>{viewCount}</Text>
        </HStack>
      </Td>
      <Td>
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button>
              <AiOutlineMenu />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Confirmation!</PopoverHeader>
            <PopoverBody>
              Are you sure you want to have that milkshake?
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Td>
    </Tr>
  );
}
