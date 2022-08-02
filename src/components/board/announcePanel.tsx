import {
  Stack,
  Wrap,
  WrapItem,
  Box,
  Image,
  HStack,
  Text,
  Badge,
} from "@chakra-ui/react";

type CardProps = {
  disabled?: boolean;
};

function AnnounceCard({ disabled }: CardProps) {
  return (
    <Stack w="350px" h="450px" borderRadius="10px" overflow="hidden">
      <Box w="350px" h="350px">
        <Image
          src="https://jamake-asset-prod.s3.amazonaws.com/thumbnailcover_welcome coupon1.png"
          alt="Announce Image"
          filter={disabled ? "brightness(50%)" : "none"}
        />
      </Box>
      <Stack pl="15px">
        <HStack spacing="10px">
          <Text fontSize="15px" fontWeight="bold">
            2022.7.20 ~ 8.15
          </Text>
          <Badge colorScheme="green">진행중</Badge>
        </HStack>
        <Text fontSize="18px" fontWeight="bold">
          잘생긴 신명진 이벤트 시작
        </Text>
        <Text fontSize="14px" color="gray.600" m="0px !important">
          자세히 보기...
        </Text>
      </Stack>
    </Stack>
  );
}

export default function AnnouncePanel() {
  return (
    <Wrap justifyContent="space-between">
      <WrapItem>
        <AnnounceCard />
      </WrapItem>
      <WrapItem>
        <AnnounceCard />
      </WrapItem>
      <WrapItem>
        <AnnounceCard disabled />
      </WrapItem>
      <WrapItem>
        <AnnounceCard disabled />
      </WrapItem>
      <WrapItem>
        <AnnounceCard disabled />
      </WrapItem>
      <WrapItem>
        <AnnounceCard disabled />
      </WrapItem>
      <WrapItem>
        <AnnounceCard />
      </WrapItem>
      <WrapItem>
        <AnnounceCard />
      </WrapItem>
      <WrapItem>
        <AnnounceCard />
      </WrapItem>
      <WrapItem>
        <AnnounceCard />
      </WrapItem>
      <WrapItem>
        <AnnounceCard />
      </WrapItem>
      <WrapItem>
        <AnnounceCard />
      </WrapItem>
    </Wrap>
  );
}
