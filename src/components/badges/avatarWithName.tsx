import { Avatar, HStack, Text } from "@chakra-ui/react";

type Props = {
  size?: string;
  name?: string;
  imageUrl?: string;
};

export default function AvatarWithName({ size, name, imageUrl }: Props) {
  return (
    <HStack>
      <Avatar
        name={name ?? "채널 정보없음"}
        src={imageUrl ?? undefined}
        size={size}
      />
      <Text maxW={120} noOfLines={1}>
        {name ?? "채널 정보없음"}
      </Text>
    </HStack>
  );
}
