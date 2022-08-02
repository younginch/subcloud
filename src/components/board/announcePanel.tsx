import {
  Wrap,
  WrapItem,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import DefaultCard from "./defaultCard";

type CardProps = {
  disabled?: boolean;
};

function AnnounceCard({ disabled }: CardProps) {
  return (
    <DefaultCard
      imageUrl="https://jamake-asset-prod.s3.amazonaws.com/thumbnailcover_welcome coupon1.png"
      disabled={disabled}
      link="/"
    >
      <HStack spacing="10px">
        <Text fontSize="15px" fontWeight="bold">
          2022.7.20
        </Text>
      </HStack>
      <Text fontSize="18px" fontWeight="bold">
        SubCloud가 처음인 모두에게 포인트 증정 🔫
      </Text>
      <Text
        fontSize="14px"
        color={useColorModeValue("gray.600", "gray.300")}
        m="0px !important"
      >
        자세히 보기...
      </Text>
    </DefaultCard>
  );
}

export default function AnnouncePanel() {
  return (
    <Wrap justify="space-evenly" overflow="visible">
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
