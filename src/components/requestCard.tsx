import { ArrowUpIcon, ChevronRightIcon } from "@chakra-ui/icons";
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
import { useRouter } from "next/router";

export enum RequestStatus {
  Uploaded,
  Waiting,
}

function RequestBadge({ status }: { status: RequestStatus }) {
  if (status === RequestStatus.Uploaded)
    return (
      <Badge colorScheme="green" w="fit-content">
        업로드 완료
      </Badge>
    );
  return (
    <Badge colorScheme="red" w="fit-content">
      대기중
    </Badge>
  );
}

type Props = {
  title: string;
  time: string;
  link: string;
  requestLang: string;
  requestStatus?: RequestStatus;
  requestCount?: number;
  buttonType?: string | string[];
};

export default function RequestCard({
  title,
  time,
  link,
  requestLang,
  requestStatus,
  requestCount,
  buttonType,
}: Props) {
  const router = useRouter();
  const buttonColor = useColorModeValue("blue", "linkedin");

  let buttonComponent;
  if (buttonType === "request") {
    buttonComponent = (
      <Button
        colorScheme={buttonColor}
        rightIcon={<ChevronRightIcon />}
        borderRadius={0}
      >
        자막 요청하기
      </Button>
    );
  } else if (buttonType === "sub") {
    buttonComponent = (
      <Button
        colorScheme={buttonColor}
        rightIcon={<ArrowUpIcon />}
        borderRadius={0}
      >
        자막 업로드
      </Button>
    );
  }

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
        src="https://i.ytimg.com/vi/i7muqI90138/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBiRn-DycCbxyBJbKlGOXkfISW0FQ"
        alt="thumbnail"
        cursor="pointer"
        onClick={() => router.push(link)}
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
        {time}
      </Text>
      <Stack pl="10px" pb={buttonType === undefined ? "10px" : "0px"}>
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
            <Text fontWeight="bold">요청 언어</Text>
            <Badge colorScheme="purple" w="fit-content">
              {requestLang}
            </Badge>
          </Stack>
          <Spacer />
          {requestStatus !== undefined ? (
            <Stack>
              <Text fontWeight="bold">제작 현황</Text>
              <RequestBadge status={requestStatus} />
            </Stack>
          ) : (
            <Stack spacing={0}>
              <Text fontWeight="bold">요청 수</Text>
              <Text fontWeight="bold">{requestCount}</Text>
            </Stack>
          )}
          <Spacer />
        </HStack>
      </Stack>
      {buttonComponent}
    </Stack>
  );
}
