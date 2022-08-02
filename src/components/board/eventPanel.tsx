import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Wrap,
  WrapItem,
  HStack,
  Text,
  Badge,
  useColorModeValue,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import DefaultCard from "./defaultCard";

type CardProps = {
  disabled?: boolean;
};

function EventCard({ disabled }: CardProps) {
  return (
    <DefaultCard
      imageUrl="https://jamake-asset-prod.s3.amazonaws.com/thumbnailcover_welcome coupon1.png"
      disabled={disabled}
      link="/board/1"
    >
      <HStack spacing="10px">
        <Text fontSize="15px" fontWeight="bold">
          2022.7.20 ~ 8.15
        </Text>
        {disabled ? (
          <Badge colorScheme="red">종료됨</Badge>
        ) : (
          <Badge colorScheme="green">진행중</Badge>
        )}
      </HStack>
      <Text fontSize="18px" fontWeight="bold">
        SubCloud가 처음인 모두에게 반값 쿠폰팩💸
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

export default function EventPanel() {
  return (
    <Stack spacing="30px">
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          w="150px"
          ml="10px"
        >
          전체
        </MenuButton>
        <MenuList>
          <MenuItem>전체</MenuItem>
          <MenuItem>진행중</MenuItem>
          <MenuItem>종료됨</MenuItem>
        </MenuList>
      </Menu>
      <Wrap justify="space-evenly" overflow="visible">
        <WrapItem>
          <EventCard />
        </WrapItem>
        <WrapItem>
          <EventCard />
        </WrapItem>
        <WrapItem>
          <EventCard disabled />
        </WrapItem>
        <WrapItem>
          <EventCard disabled />
        </WrapItem>
        <WrapItem>
          <EventCard disabled />
        </WrapItem>
        <WrapItem>
          <EventCard disabled />
        </WrapItem>
        <WrapItem>
          <EventCard disabled />
        </WrapItem>
        <WrapItem>
          <EventCard disabled />
        </WrapItem>
        <WrapItem>
          <EventCard disabled />
        </WrapItem>
        <WrapItem>
          <EventCard disabled />
        </WrapItem>
      </Wrap>
    </Stack>
  );
}
